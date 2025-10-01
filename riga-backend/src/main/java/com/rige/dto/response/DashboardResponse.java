package com.rige.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class DashboardResponse {

    private Long totalOrders;
    private Long totalDeliveredOrders;
    private Long totalPendingOrders;
    private Double totalRevenue;
    private Long totalProducts;
    private Long totalStock;
    private List<RecentOrderResponse> recentOrders;
}