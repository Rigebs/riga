package com.rige.services.impl;

import com.rige.dto.request.LoginRequest;
import com.rige.dto.request.RefreshTokenRequest;
import com.rige.dto.response.TokenResponse;
import com.rige.dto.request.UserRequest;
import com.rige.entities.RoleEntity;
import com.rige.entities.UserEntity;
import com.rige.repositories.IRoleRepository;
import com.rige.repositories.IUserRepository;
import com.rige.security.JwtUtils;
import com.rige.services.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public void register(UserRequest request) {
        RoleEntity customerRole = roleRepository.findByName("ROLE_CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Role CUSTOMER not found"));

        UserEntity user = new UserEntity();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);
        user.setExpired(false);
        user.setLocked(false);
        user.setRoles(Set.of(customerRole));

        userRepository.save(user);
    }

    @Override
    public TokenResponse login(LoginRequest request) {
        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String accessToken = jwtUtils.createAccessToken(user);

        String refreshToken = jwtUtils.createRefreshToken(
                user.getEmail()
        );

        return new TokenResponse(accessToken, refreshToken);
    }

    @Override
    public TokenResponse refresh(RefreshTokenRequest request) {
        String email = jwtUtils.getEmailFromRefreshToken(request.getRefreshToken());

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newAccessToken = jwtUtils.createAccessToken(user);

        return new TokenResponse(newAccessToken, request.getRefreshToken());
    }
}