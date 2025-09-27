package com.rige.dto.response;

import com.rige.enums.OrderItemStatus;
import lombok.Data;

@Data
public class OrderItemResponse {
    private Long id;
    private ProductResponse product;
    private Integer quantity;
    private Integer originalQuantity;
    private OrderItemStatus status;
    private Double unitPrice;
}
