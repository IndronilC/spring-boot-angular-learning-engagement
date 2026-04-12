package com.indro.example.ecomerce_security_api.auth;

import com.indro.example.ecomerce_security_api.user.RefreshToken;
import com.indro.example.ecomerce_security_api.user.TokenPair;
import com.indro.example.ecomerce_security_api.user.User;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(User user);

    RefreshToken verifyExpiration(RefreshToken token);

    TokenPair generateNewAccessToken(String refreshToken);
}
