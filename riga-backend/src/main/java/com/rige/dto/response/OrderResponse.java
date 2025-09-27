package com.rige.dto.response;

import com.rige.enums.OrderStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private LocalDateTime orderDate;
    private boolean deliveryRequired;
    private OrderStatus status;
    private boolean modified;
    private boolean customerConfirmed;
    private Double total;
    private UserResponse user;
    private List<OrderItemResponse> items;
}
