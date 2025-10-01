package com.rige.controllers;

import com.rige.dto.response.ApiResponse;
import com.rige.dto.response.DashboardResponse;
import com.rige.services.IDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final IDashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard() {
        DashboardResponse dashboard = dashboardService.getDashboardData();
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Dashboard data retrieved successfully", dashboard)
        );
    }
}
