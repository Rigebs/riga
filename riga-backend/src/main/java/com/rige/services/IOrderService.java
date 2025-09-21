package com.rige.services;

import com.rige.dto.request.OrderRequest;
import com.rige.dto.response.OrderResponse;

import java.util.List;

public interface IOrderService {
    List<OrderResponse> findAll();
    OrderResponse findById(Long id);
    OrderResponse save(OrderRequest order);
}
