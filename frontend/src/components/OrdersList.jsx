import { useEffect, useState } from "react";
import api from "../services/api";
import Pagination from "./ui/Pagination";
import Select from "./ui/Select";
import OrderTableRow from "./OrdersList/OrderTableRow";

export default function OrdersList({ refreshTrigger, onOrderUpdated }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter && statusFilter !== "All Status") {
        params.append("status", statusFilter);
      }
      params.append("page", currentPage);
      params.append("limit", 10);

      const response = await api.get(`/orders?${params.toString()}`);
      // The backend returns an object with `data` property holding the array
      setOrders(response.data.data || []);
      setPaginationInfo(
        response.data.pagination || { total: 0, page: 1, pages: 1 },
      );
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, statusFilter, refreshTrigger, currentPage]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.patch(`/orders/${id}/status`, { status: newStatus });
      fetchOrders(); // Refresh table
      if (onOrderUpdated) onOrderUpdated(); // Trigger dashboard refresh
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "RECEIVED":
        return "bg-error-container/20 text-on-error-container";
      case "PROCESSING":
        return "bg-primary-container text-on-primary-container";
      case "READY":
        return "bg-secondary-container text-on-secondary-container";
      case "DELIVERED":
        return "bg-surface-container-highest text-on-surface-variant";
      default:
        return "bg-surface-container-highest text-on-surface-variant";
    }
  };

  return (
    <section className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/10">
        <h2 className="text-xl font-bold tracking-tight">Recent Orders</h2>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest rounded-lg border-none focus:ring-1 focus:ring-primary shadow-sm outline-none placeholder:text-outline-variant"
              placeholder="Search by name or phone..."
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Select
            className="px-4 py-2 rounded-lg text-sm shadow-sm font-medium"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { label: "All Status", value: "All Status" },
              { label: "Received", value: "RECEIVED" },
              { label: "Processing", value: "PROCESSING" },
              { label: "Ready", value: "READY" },
              { label: "Delivered", value: "DELIVERED" },
            ]}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface-container-high/50">
              <th className="font-label px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Order ID
              </th>
              <th className="font-label px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Customer
              </th>
              <th className="font-label px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Phone
              </th>
              <th className="font-label px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Est. Delivery
              </th>
              <th className="font-label px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Status
              </th>
              <th className="font-label px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">
                Total Amount
              </th>
              <th className="font-label px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 relative">
            {loading && (
              <tr>
                <td
                  colSpan="7"
                  className="p-8 text-center text-on-surface-variant text-sm font-medium"
                >
                  Loading orders...
                </td>
              </tr>
            )}
            {!loading && orders.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="p-8 text-center text-on-surface-variant text-sm font-medium"
                >
                  No orders found.
                </td>
              </tr>
            )}
            {!loading &&
              orders.map((order) => (
                <OrderTableRow
                  key={order._id || order.id}
                  order={order}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={paginationInfo.pages || 1}
        totalItems={paginationInfo.total}
        pageSize={10}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
