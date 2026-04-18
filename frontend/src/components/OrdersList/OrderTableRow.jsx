export const getStatusColor = (status) => {
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

export default function OrderTableRow({ order, onStatusUpdate }) {
  // Use _id if available, fallback to id
  const id = order._id || order.id;

  return (
    <tr className="hover:bg-surface-container-high transition-colors">
      <td className="px-6 py-4 font-bold text-primary text-sm whitespace-nowrap">
        #{String(id).slice(-4).toUpperCase()}
      </td>
      <td className="px-6 py-4 font-semibold text-on-surface">
        {order.customerName}
      </td>
      <td className="px-6 py-4 text-on-surface-variant text-sm">
        {order.phone}
      </td>
      <td className="px-6 py-4">
        <select
          value={order.status}
          onChange={(e) => onStatusUpdate(id, e.target.value)}
          className={`font-label ${getStatusColor(order.status)} border-none text-[10px] font-bold px-2 py-1 pe-6 rounded-full uppercase tracking-tighter focus:ring-0 cursor-pointer appearance-none outline-none`}
          style={{ backgroundImage: "none" }}
        >
          <option value="RECEIVED">Received</option>
          <option value="PROCESSING">Processing</option>
          <option value="READY">Ready</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </td>
      <td className="px-6 py-4 font-bold text-on-surface text-right">
        ${Number(order.total).toFixed(2)}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button className="p-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">
              visibility
            </span>
          </button>
          <button className="p-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">edit</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
