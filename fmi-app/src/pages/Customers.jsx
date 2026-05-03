import { useState } from "react";
import PageHeader from "../components/PageHeader";
import customersData from "../data/customers";

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    email: "",
    phone: "",
    loyalty: "Bronze",
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

    setCustomers([...customers, formData]);

    setFormData({
      customerId: "",
      customerName: "",
      email: "",
      phone: "",
      loyalty: "Bronze",
    });

    setShowForm(false);
  };

  return (
    <div>
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]}>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-green-500 px-4 py-2 text-white"
        >
          Add Customer
        </button>
      </PageHeader>

      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium">Customer ID</label>
              <input
                type="text"
                name="customerId"
                value={formData.customerId}
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
              <label className="mb-1 block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Loyalty</label>
              <select
                name="loyalty"
                value={formData.loyalty}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
              >
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="rounded-xl bg-blue-500 px-4 py-2 text-white"
              >
                Save Customer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl bg-white p-4 shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Customer ID</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.customerId}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{customer.customerId}</td>
                <td className="p-3">{customer.customerName}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3">{customer.loyalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}