import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ordersData from "../data/orders";

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    orderId: "",
    customerName: "",
    status: "Pending",
    totalPrice: "",
    orderDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setOrders([
      ...orders,
      {
        ...formData,
        totalPrice: Number(formData.totalPrice),
      },
    ]);

    setFormData({
      orderId: "",
      customerName: "",
      status: "Pending",
      totalPrice: "",
      orderDate: "",
    });

    setShowForm(false);
  };

  return (
    <div>
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order List"]}>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-green-500 px-4 py-2 text-white"
        >
          Add Orders
        </button>
      </PageHeader>

      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium">Order ID</label>
              <input
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-medium">Total Price</label>
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Order Date</label>
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="rounded-xl bg-blue-500 px-4 py-2 text-white"
              >
                Save Order
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl bg-white p-4 shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.orderId}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">
                  Rp {Number(order.totalPrice).toLocaleString("id-ID")}
                </td>
                <td className="p-3">{order.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}