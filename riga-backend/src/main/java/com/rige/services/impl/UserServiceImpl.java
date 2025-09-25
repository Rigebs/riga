package com.rige.services.impl;

import com.rige.dto.request.UpdateUserRequest;
import com.rige.dto.request.UserRequest;
import com.rige.dto.response.UserResponse;
import com.rige.entities.UserEntity;
import com.rige.repositories.IUserRepository;
import com.rige.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;

    @Override
    public void update(Long id, UpdateUserRequest request) {
        UserEntity existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setAddress(request.getAddress());
        existing.setPhone(request.getPhone());

        userRepository.save(existing);
    }
}
