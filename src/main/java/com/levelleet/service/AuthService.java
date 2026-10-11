package com.levelleet.service;

import com.levelleet.dto.AuthRequest;
import com.levelleet.dto.AuthResponse;
import com.levelleet.model.AuthToken;
import com.levelleet.model.User;
import com.levelleet.repo.AuthTokenRepository;
import com.levelleet.repo.UserRepository;
import com.levelleet.web.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.HexFormat;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class AuthService {

    private static final Pattern USERNAME = Pattern.compile("^[a-z0-9_]{3,20}$");

    private final UserRepository users;
    private final AuthTokenRepository tokens;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final SecureRandom random = new SecureRandom();
    private final String dummyHash = encoder.encode("not-a-real-password");

    @Value("${levelleet.token-days:30}")
    private long tokenDays;

    public AuthService(UserRepository users, AuthTokenRepository tokens) {
        this.users = users;
        this.tokens = tokens;
    }

    @Transactional
    public AuthResponse register(AuthRequest req) {
        String name = normalize(req.username());
        if (!USERNAME.matcher(name).matches()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Username must be 3 to 20 letters, numbers or underscores");
        }
        checkPassword(req.password());
        if (users.existsByUsername(name)) {
            throw new ApiException(HttpStatus.CONFLICT, "That username is taken");
        }
        User u = new User();
        u.setUsername(name);
        u.setPasswordHash(encoder.encode(req.password()));
        try {
            u = users.saveAndFlush(u);
        } catch (DataIntegrityViolationException e) {
            throw new ApiException(HttpStatus.CONFLICT, "That username is taken");
        }
        return new AuthResponse(issueToken(u.getId()), u.getUsername());
    }

    @Transactional
    public AuthResponse login(AuthRequest req) {
        String name = normalize(req.username());
        Optional<User> found = users.findByUsername(name);
        // Always run one BCrypt check so a wrong username and a wrong password take the same time.
        String hash = found.map(User::getPasswordHash).orElse(dummyHash);
        boolean ok = encoder.matches(req.password(), hash);
        if (found.isEmpty() || !ok) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Wrong username or password");
        }
        tokens.deleteExpired(Instant.now());
        User u = found.get();
        return new AuthResponse(issueToken(u.getId()), u.getUsername());
    }

    @Transactional
    public void logout(String rawToken) {
        tokens.deleteByHash(hash(rawToken));
    }

    /** Returns the user id when the token exists and has not expired. */
    @Transactional(readOnly = true)
    public Optional<Long> resolve(String rawToken) {
        if (rawToken == null || rawToken.isBlank()) return Optional.empty();
        return tokens.findByTokenHash(hash(rawToken))
                .filter(t -> t.getExpiresAt().isAfter(Instant.now()))
                .map(AuthToken::getUserId);
    }

    @Transactional(readOnly = true)
    public String usernameOf(Long userId) {
        return users.findById(userId)
                .map(User::getUsername)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Please log in again"));
    }

    private String issueToken(Long userId) {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        String raw = HexFormat.of().formatHex(bytes);
        AuthToken t = new AuthToken();
        t.setTokenHash(hash(raw));
        t.setUserId(userId);
        t.setExpiresAt(Instant.now().plus(Duration.ofDays(tokenDays)));
        tokens.save(t);
        return raw;
    }

    private static String normalize(String username) {
        return username == null ? "" : username.trim().toLowerCase();
    }

    private static void checkPassword(String password) {
        if (password == null || password.length() < 6) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Password needs at least 6 characters");
        }
        if (password.getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Password is too long (72 bytes at most)");
        }
    }

    private static String hash(String raw) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(md.digest(raw.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }
}
