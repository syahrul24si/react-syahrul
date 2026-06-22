import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { supabase } from "@/supabase/supabaseClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    fetchOrders();
  };

  const statusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-200 text-yellow-800";
      case "processing": return "bg-blue-200 text-blue-800";
      case "completed": return "bg-green-200 text-green-800";
      case "cancelled": return "bg-red-200 text-red-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div>
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order List"]} />

      <div className="mt-6 overflow-x-auto rounded-xl bg-white p-4 shadow-md">
        {loading ? (
          <p className="p-4 text-center text-gray-500">Loading...</p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="p-3">Customer</th>
                <th className="p-3">Total Original</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Total Final</th>
                <th className="p-3">Points Earned</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.profiles?.full_name || "-"}</td>
                  <td className="p-3">
                    Rp {Number(order.total_original).toLocaleString("id-ID")}
                  </td>
                  <td className="p-3">
                    Rp {Number(order.discount_amount).toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 font-semibold">
                    Rp {Number(order.total_final).toLocaleString("id-ID")}
                  </td>
                  <td className="p-3">{order.points_earned}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(order.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="rounded border p-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
