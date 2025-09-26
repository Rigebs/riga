package com.rige.controllers;

import com.rige.dto.request.OrderRequest;
import com.rige.dto.response.ApiResponse;
import com.rige.dto.response.OrderResponse;
import com.rige.filters.OrderFilter;
import com.rige.services.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<OrderResponse>>> getAllOrders(
            @ModelAttribute OrderFilter filter,
            @PageableDefault Pageable pageable
            ) {
        return ResponseEntity.ok(
                new ApiResponse<>(true,
                        "Orders retrieved successfully",
                        orderService.findAll(filter, pageable)
                )
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