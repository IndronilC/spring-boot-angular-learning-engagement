package com.indro.example.ecomerce_security_api.auth;

import com.indro.example.ecomerce_security_api.security.JwtService;
import com.indro.example.ecomerce_security_api.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository repository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private Long refreshTokenDurationMs;

    // 🔐 Create Refresh Token
    @Override
    public RefreshToken createRefreshToken(User user) {

        RefreshToken token = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshTokenDurationMs))
                .revoked(false)
                .build();

        return repository.save(token);
    }

    // ⏳ Validate Expiry
    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {

        if (token.getExpiryDate().isBefore(Instant.now())) {
            repository.delete(token);
            throw new RuntimeException("Refresh token expired");
        }

        if (token.isRevoked()) {
            throw new RuntimeException("Refresh token revoked");
        }

        return token;
    }



    @Override
    public TokenPair generateNewAccessToken(String refreshToken) {

        RefreshToken token = repository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        verifyExpiration(token);

        User user = token.getUser();

        // 🔴 Revoke old token
        token.setRevoked(true);
        repository.save(token);

        // 🟢 Create new refresh token
        RefreshToken newRefreshToken = createRefreshToken(user);

        // 🔐 Generate access token
        Map<String, Object> claims = new HashMap<>();
        claims.put("fullName", user.getFullName());

        String accessToken = jwtService.generateToken(claims, user);

        return TokenPair.builder()
                .accessToken(accessToken)
                .refreshToken(newRefreshToken.getToken())
                .build();
    }
}
