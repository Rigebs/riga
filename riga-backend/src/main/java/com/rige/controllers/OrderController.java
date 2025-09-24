package com.rige.controllers;

import com.rige.dto.request.OrderRequest;
import com.rige.dto.response.ApiResponse;
import com.rige.dto.response.OrderResponse;
import com.rige.services.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrders() {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Orders retrieved successfully", orderService.findAll())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Order retrieved successfully", orderService.findById(id))
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(@RequestBody OrderRequest order) {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Order created successfully", orderService.save(order))
        );
    }
}