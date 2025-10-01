// src/hooks/useDashboard.ts
import { useEffect, useState } from "react";
import { dashboardService } from "../services/dashboardService";
import type { DashboardResponse } from "../types/dashboard";

interface UseDashboardOptions {
  autoFetch?: boolean;
}

export function useDashboard({ autoFetch = true }: UseDashboardOptions = {}) {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getDashboard();
      if (res.success) {
        setDashboard(res.data);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Error fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchDashboard();
  }, [autoFetch]);

  return {
    dashboard,
    loading,
    error,
    refresh: fetchDashboard,
  };
}
