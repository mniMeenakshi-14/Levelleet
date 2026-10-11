package com.levelleet;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ApiIntegrationTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper json;

    private String register(String user, String pass) throws Exception {
        MvcResult r = mvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"" + user + "\",\"password\":\"" + pass + "\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", hasLength(64)))
                .andReturn();
        JsonNode n = json.readTree(r.getResponse().getContentAsString());
        return n.get("token").asText();
    }

    @Test
    void fullFlow() throws Exception {
        String token = register("Meena_1", "secret1");

        // username is stored in lowercase and is unique
        mvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"meena_1\",\"password\":\"secret1\"}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error", is("That username is taken")));

        mvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("meena_1")));

        // new account has nothing saved yet
        mvc.perform(get("/api/progress").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.exists", is(false)));

        String body = """
                {"stars":{"0":3,"1":2,"5":1,"6":0},"coins":55,"xp":120,"hearts":4,"heartTs":1760000000000,
                 "streak":3,"lastDay":"2026-10-10","treatDay":"2026-10-10","sound":true,"voice":false,"seen":[0,1]}
                """;
        mvc.perform(put("/api/progress").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.exists", is(true)));

        mvc.perform(get("/api/progress").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stars['0']", is(3)))
                .andExpect(jsonPath("$.stars['1']", is(2)))
                .andExpect(jsonPath("$.stars['5']", is(1)))
                .andExpect(jsonPath("$.stars['6']").doesNotExist())
                .andExpect(jsonPath("$.coins", is(55)))
                .andExpect(jsonPath("$.xp", is(120)))
                .andExpect(jsonPath("$.hearts", is(4)))
                .andExpect(jsonPath("$.heartTs", is(1760000000000L)))
                .andExpect(jsonPath("$.voice", is(false)))
                .andExpect(jsonPath("$.seen", contains(0, 1)));

        // saving again replaces the old stars
        mvc.perform(put("/api/progress").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"stars\":{\"0\":1},\"coins\":10,\"xp\":10,\"hearts\":5,\"sound\":true,\"voice\":true,\"seen\":[]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stars['0']", is(1)))
                .andExpect(jsonPath("$.stars['1']").doesNotExist());

        // out-of-range values are clamped / dropped
        mvc.perform(put("/api/progress").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"stars\":{\"0\":99,\"-4\":2,\"5000\":3},\"coins\":-5,\"xp\":1,\"hearts\":50,\"lastDay\":\"nope\",\"sound\":true,\"voice\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stars['0']", is(3)))
                .andExpect(jsonPath("$.stars['5000']").doesNotExist())
                .andExpect(jsonPath("$.coins", is(0)))
                .andExpect(jsonPath("$.hearts", is(5)))
                .andExpect(jsonPath("$.lastDay", is("")));

        // leaderboard is public
        mvc.perform(get("/api/leaderboard"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].rank", is(1)))
                .andExpect(jsonPath("$[0].username", is("meena_1")))
                .andExpect(jsonPath("$[0].stars", is(3)));

        // login works with different letter case, wrong password does not
        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"MEENA_1\",\"password\":\"secret1\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("meena_1")));
        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"meena_1\",\"password\":\"wrong-pass\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error", is("Wrong username or password")));

        // logout kills the token
        mvc.perform(post("/api/auth/logout").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
        mvc.perform(get("/api/progress").header("Authorization", "Bearer " + token))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void validationAndAuthRules() throws Exception {
        mvc.perform(get("/api/progress")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/progress").header("Authorization", "Bearer nonsense")).andExpect(status().isUnauthorized());

        mvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"ab\",\"password\":\"secret1\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", containsString("3 to 20")));
        mvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"good_name\",\"password\":\"123\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", containsString("6 characters")));
        mvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"\",\"password\":\"secret1\"}"))
                .andExpect(status().isBadRequest());
    }
}
