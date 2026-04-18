import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "./ui/StatCard";

export default function DashboardStats({ refreshTrigger }) {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    inProcessing: 0,
    ready: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard");
        // Handle if response is missing some keys
        const data = response.data || {};

        // Count orders per status based on backend statusBreakdown object
        let processingCount = 0;
        let readyCount = 0;
        if (data.statusBreakdown) {
          processingCount = data.statusBreakdown.PROCESSING || 0;
          readyCount = data.statusBreakdown.READY || 0;
        }

        setStats({
          totalOrders: data.totalOrders || 0,
          totalRevenue: data.totalRevenue || 0,
          inProcessing: processingCount,
          ready: readyCount,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };
    fetchStats();
  }, [refreshTrigger]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Orders"
        value={stats.totalOrders}
        renderIcon={() => (
          <span className="text-primary font-bold text-sm bg-primary-container px-2 py-1 rounded">
            +12%
          </span>
        )}
      />
      <StatCard
        label="Total Revenue"
        value={`$${stats.totalRevenue.toFixed(2)}`}
        renderIcon={() => (
          <span className="material-symbols-outlined text-primary">
            payments
          </span>
        )}
      />
      <StatCard
        label="In Processing"
        value={stats.inProcessing}
        renderIcon={() => (
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-surface flex items-center justify-center text-[10px] font-bold text-primary">
              +5
            </div>
          </div>
        )}
      />
      <StatCard
        label="Ready for Pickup"
        value={stats.ready}
        renderIcon={() => (
          <span className="material-symbols-outlined text-on-error-container bg-error-container/20 p-1 rounded">
            priority_high
          </span>
        )}
      />
    </section>
  );
}
