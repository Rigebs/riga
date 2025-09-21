package com.rige.services;

import com.rige.dto.request.ProductRequest;
import com.rige.dto.response.ProductResponse;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    List<ProductResponse> findAll();
    Optional<ProductResponse> findById(Long id);
    ProductResponse save(ProductRequest request);
    ProductResponse update(Long id, ProductRequest request);
}