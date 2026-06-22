import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { supabase } from "@/supabase/supabaseClient";

export default function Produk() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image_url: formData.image_url,
    };

    if (editId) {
      await supabase.from("products").update(payload).eq("id", editId);
    } else {
      await supabase.from("products").insert(payload);
    }

    setEditId(null);
    setFormData({ name: "", description: "", price: "", stock: "", image_url: "" });
    setShowForm(false);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  return (
    <div>
      <PageHeader title="Produk" breadcrumb="Dashboard / Produk">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({ name: "", description: "", price: "", stock: "", image_url: "" });
          }}
          className="rounded-xl bg-green-500 px-4 py-2 text-white"
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </PageHeader>

      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Image URL</label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border p-2"
                rows="2"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="rounded-xl bg-blue-500 px-4 py-2 text-white"
              >
                {editId ? "Update Product" : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Data Produk
        </h2>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-4 text-center text-gray-500">Loading...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/products/${item.id}`}
                        className="text-emerald-500 hover:text-emerald-700 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">{item.stock}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded bg-yellow-400 px-3 py-1 text-xs text-white hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
