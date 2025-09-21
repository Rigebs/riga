package com.rige.dto.response;

import lombok.Data;

@Data
public class OrderItemResponse {
    private Long id;
    private ProductResponse product;
    private Integer quantity;
    private Double unitPrice;
}
