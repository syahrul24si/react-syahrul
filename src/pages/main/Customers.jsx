import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { supabase } from "@/supabase/supabaseClient";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    tier: "bronze",
    points: 0,
  });

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "member")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCustomers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (customer) => {
    setEditId(customer.id);
    setFormData({
      full_name: customer.full_name || "",
      tier: customer.tier,
      points: customer.points,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // Update
      await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          tier: formData.tier,
          points: Number(formData.points),
        })
        .eq("id", editId);
    }

    setEditId(null);
    setFormData({ full_name: "", tier: "bronze", points: 0 });
    setShowForm(false);
    fetchCustomers();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    await supabase.from("profiles").delete().eq("id", id);
    fetchCustomers();
  };

  return (
    <div>
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]}>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({ full_name: "", tier: "bronze", points: 0 });
          }}
          className="rounded-xl bg-green-500 px-4 py-2 text-white"
        >
          {showForm ? "Cancel" : "Add Customer"}
        </button>
      </PageHeader>

      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Tier</label>
              <select
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-medium">Points</label>
              <input
                type="number"
                name="points"
                value={formData.points}
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
                {editId ? "Update Customer" : "Save Customer"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl bg-white p-4 shadow-md">
        {loading ? (
          <p className="p-4 text-center text-gray-500">Loading...</p>
        ) : (
          <table className="min-w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b text-left">
                <th className="p-3">Full Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Tier</th>
                <th className="p-3">Points</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{customer.full_name || "-"}</td>
                  <td className="p-3">{customer.role}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      customer.tier === "platinum" ? "bg-purple-200 text-purple-800" :
                      customer.tier === "gold" ? "bg-yellow-200 text-yellow-800" :
                      customer.tier === "silver" ? "bg-gray-200 text-gray-800" :
                      "bg-orange-200 text-orange-800"
                    }`}>
                      {customer.tier}
                    </span>
                  </td>
                  <td className="p-3">{customer.points}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="rounded bg-yellow-400 px-3 py-1 text-xs text-white hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No customers found.
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
