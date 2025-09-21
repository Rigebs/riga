package com.rige.dto.request;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private String imageUrl;
    private Double price;
    private Integer stock;
    private Long categoryId;
}
