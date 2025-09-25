package com.rige.services;

import com.rige.dto.request.UpdateUserRequest;

public interface IUserService {
    void update(Long id, UpdateUserRequest request);
}