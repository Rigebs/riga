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

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrder(
            @PathVariable Long id,
            @RequestBody OrderRequest orderRequest
    ) {
        OrderResponse updatedOrder = orderService.updateOrder(id, orderRequest);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Order updated successfully", updatedOrder)
        );
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<ApiResponse<OrderResponse>> confirmOrder(@PathVariable Long id) {
        OrderResponse confirmedOrder = orderService.confirmOrder(id);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Order confirmed successfully", confirmedOrder)
        );
    }

    @PatchMapping("/{id}/customer-confirm")
    public ResponseEntity<ApiResponse<OrderResponse>> customerConfirmOrder(@PathVariable Long id) {
        OrderResponse confirmedOrder = orderService.customerConfirmOrder(id);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Order confirmed by customer", confirmedOrder)
        );
    }

    @PatchMapping("/{id}/deliver")
    public ResponseEntity<ApiResponse<OrderResponse>> deliverOrder(@PathVariable Long id) {
        OrderResponse deliveredOrder = orderService.deliverOrder(id);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Order marked as delivered", deliveredOrder)
        );
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(@PathVariable Long id) {
        OrderResponse canceledOrder = orderService.cancelOrder(id);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Order canceled successfully", canceledOrder)
        );
    }
}