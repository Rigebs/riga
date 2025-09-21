package com.rige.dto.response;

import com.rige.enums.OrderStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private LocalDateTime orderDate;
    private OrderStatus status;
    private Double total;
    private UserResponse user;
    private List<OrderItemResponse> items;
}
