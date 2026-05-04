import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { products } from "../../data/products";

export default function Produk() {
  return (
    <div>
      <PageHeader title="Produk" breadcrumb="Dashboard / Produk" />

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Data Produk
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-emerald-500 hover:text-emerald-700 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </td>

                  <td className="px-6 py-4">{item.code}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.brand}</td>
                  <td className="px-6 py-4">
                    Rp {(item.price * 1000).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}