package com.rige.controllers;

import com.rige.dto.request.UpdateUserRequest;
import com.rige.dto.request.UserRequest;
import com.rige.dto.response.ApiResponse;
import com.rige.dto.response.UserResponse;
import com.rige.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest request) {

        userService.update(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "User updated successfully", null)
        );
    }
}