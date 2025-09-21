package com.rige.services;

import com.rige.dto.request.LoginRequest;
import com.rige.dto.request.RefreshTokenRequest;
import com.rige.dto.request.TokenResponse;
import com.rige.dto.request.UserRequest;

public interface IAuthService {
    void register(UserRequest request);
    TokenResponse login(LoginRequest request);
    TokenResponse refresh(RefreshTokenRequest request);
}
