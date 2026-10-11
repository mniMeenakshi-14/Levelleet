package com.levelleet.web;

import com.levelleet.dto.AuthRequest;
import com.levelleet.dto.AuthResponse;
import com.levelleet.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody AuthRequest req) {
        return auth.register(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest req) {
        return auth.login(req);
    }

    @GetMapping("/me")
    public Map<String, String> me(@RequestAttribute("userId") Long userId) {
        return Map.of("username", auth.usernameOf(userId));
    }

    @PostMapping("/logout")
    public Map<String, Boolean> logout(@RequestHeader("Authorization") String header) {
        auth.logout(header.startsWith("Bearer ") ? header.substring(7).trim() : header);
        return Map.of("ok", true);
    }
}
