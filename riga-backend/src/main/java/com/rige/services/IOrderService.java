package com.rige.services;

import com.rige.dto.request.OrderRequest;
import com.rige.dto.response.OrderResponse;
import com.rige.filters.OrderFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IOrderService {
    Page<OrderResponse> findAll(OrderFilter filter, Pageable pageable);
    OrderResponse findById(Long id);
    OrderResponse save(OrderRequest order);
    OrderResponse confirmOrder(Long id);
    OrderResponse updateOrder(Long id, OrderRequest orderRequest);
    OrderResponse customerConfirmOrder(Long id);
    OrderResponse deliverOrder(Long orderId);
    OrderResponse cancelOrder(Long orderId);
}
