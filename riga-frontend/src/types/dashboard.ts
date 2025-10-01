export interface RecentOrder {
  orderId: number;
  orderDate: string;
  total: number;
  status: string;
}

export interface DashboardResponse {
  totalOrders: number;
  totalDeliveredOrders: number;
  totalPendingOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalStock: number;
  recentOrders: RecentOrder[];
}
