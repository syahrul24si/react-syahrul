import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabase/supabaseClient";
import PageHeader from "@/components/PageHeader";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function MemberOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(name, image_url))")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

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
      <PageHeader title="My Orders" breadcrumb={["Home", "Order History"]} />

      {loading ? (
        <p className="p-4 text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 shadow-lg text-center">
          <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl bg-white shadow-md overflow-hidden"
            >
              {/* Order Header */}
              <div
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  setExpandedId(expandedId === order.id ? null : order.id)
                }
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.order_items?.length || 0} item(s)
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-emerald-600">
                    Rp {Number(order.total_final).toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-400">
                    +{order.points_earned} points
                  </p>
                </div>

                <div className="ml-4 text-gray-400">
                  {expandedId === order.id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {/* Expanded Order Items */}
              {expandedId === order.id && (
                <div className="border-t p-5 bg-gray-50">
                  <h4 className="font-semibold text-gray-700 mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {order.order_items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3"
                      >
                        {item.products?.image_url ? (
                          <img
                            src={item.products.image_url}
                            alt={item.products?.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-200" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {item.products?.name || "Unknown Product"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} x Rp {Number(item.price_per_item).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          Rp {(item.quantity * Number(item.price_per_item)).toLocaleString("id-ID")}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-4 pt-3 border-t space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span>Rp {Number(order.total_original).toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Discount</span>
                      <span>- Rp {Number(order.discount_amount).toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                      <span>Total</span>
                      <span className="text-emerald-600">
                        Rp {Number(order.total_final).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
