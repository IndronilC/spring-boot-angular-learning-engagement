package com.indro.example.ecomerce_security_api.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TokenPair {

    private String accessToken;
    private String refreshToken;
}
