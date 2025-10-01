package com.rige.services.impl;

import com.rige.dto.response.DashboardResponse;
import com.rige.dto.response.RecentOrderResponse;
import com.rige.enums.OrderStatus;
import com.rige.repositories.IOrderRepository;
import com.rige.repositories.IProductRepository;
import com.rige.services.IDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements IDashboardService {

    private final IOrderRepository orderRepository;
    private final IProductRepository productRepository;

    @Override
    public DashboardResponse getDashboardData() {
        DashboardResponse dto = new DashboardResponse();

        dto.setTotalOrders(orderRepository.count());
        dto.setTotalDeliveredOrders(orderRepository.countByStatus(OrderStatus.DELIVERED));
        dto.setTotalPendingOrders(orderRepository.countByStatus(OrderStatus.PENDING));

        dto.setTotalRevenue(orderRepository.sumTotalByStatus(OrderStatus.DELIVERED));

        dto.setTotalProducts(productRepository.count());
        dto.setTotalStock(productRepository.sumStock());

        List<RecentOrderResponse> recentOrders = orderRepository.findTop5ByOrderByOrderDateDesc()
                .stream()
                .map(o -> {
                    RecentOrderResponse ro = new RecentOrderResponse();
                    ro.setOrderId(o.getId());
                    ro.setOrderDate(o.getOrderDate());
                    ro.setTotal(o.getTotal());
                    ro.setStatus(o.getStatus().name());
                    return ro;
                }).collect(Collectors.toList());

        dto.setRecentOrders(recentOrders);

        return dto;
    }
}
