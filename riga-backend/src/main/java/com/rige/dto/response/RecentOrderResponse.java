package com.rige.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RecentOrderResponse {
    private Long orderId;
    private LocalDateTime orderDate;
    private Double total;
    private String status;
}