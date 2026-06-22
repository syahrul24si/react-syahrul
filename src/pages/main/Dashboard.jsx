import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { supabase } from "@/supabase/supabaseClient";
import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCompleted: 0,
    totalCancelled: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const [ordersRes, customersRes] = await Promise.all([
        supabase.from("orders").select("total_final, status"),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "member"),
      ]);

      if (!ordersRes.error && ordersRes.data) {
        const orders = ordersRes.data;
        const totalOrders = orders.length;
        const totalCompleted = orders.filter((o) => o.status === "completed").length;
        const totalCancelled = orders.filter((o) => o.status === "cancelled").length;
        const totalRevenue = orders
          .filter((o) => o.status === "completed")
          .reduce((sum, o) => sum + Number(o.total_final), 0);

        setStats((prev) => ({
          ...prev,
          totalOrders,
          totalCompleted,
          totalCancelled,
          totalRevenue,
        }));
      }

      if (!customersRes.error) {
        setStats((prev) => ({
          ...prev,
          totalCustomers: customersRes.count || 0,
        }));
      }

      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    {
      id: "orders",
      icon: <FaShoppingCart className="text-3xl text-white" />,
      bgColor: "bg-green-500",
      value: stats.totalOrders,
      label: "Total Orders",
    },
    {
      id: "delivered",
      icon: <FaTruck className="text-3xl text-white" />,
      bgColor: "bg-blue-500",
      value: stats.totalCompleted,
      label: "Total Completed",
    },
    {
      id: "canceled",
      icon: <FaBan className="text-3xl text-white" />,
      bgColor: "bg-red-500",
      value: stats.totalCancelled,
      label: "Total Canceled",
    },
    {
      id: "revenue",
      icon: <FaDollarSign className="text-3xl text-white" />,
      bgColor: "bg-yellow-500",
      value: `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`,
      label: "Total Revenue",
    },
    {
      id: "customers",
      icon: <FaUsers className="text-3xl text-white" />,
      bgColor: "bg-purple-500",
      value: stats.totalCustomers,
      label: "Total Customers",
    },
  ];

  return (
    <div id="dashboard-container">
      <PageHeader
        title="Dashboard"
        breadcrumb={["Home", "Admin Dashboard"]}
      />

      {loading ? (
        <p className="p-5 text-gray-500">Loading statistics...</p>
      ) : (
        <div
          id="dashboard-grid"
          className="grid gap-4 p-4 sm:p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center space-x-5 rounded-lg bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`rounded-full ${card.bgColor} p-4`}>
                {card.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{card.value}</span>
                <span className="text-gray-400">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
