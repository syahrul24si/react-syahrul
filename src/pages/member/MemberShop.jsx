import { useState, useEffect } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { useCart } from "@/context/CartContext";
import PageHeader from "@/components/PageHeader";
import { FaShoppingCart } from "react-icons/fa";

export default function MemberShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .gt("stock", 0)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <PageHeader title="Shop" breadcrumb={["Home", "Product Shop"]} />

      {loading ? (
        <p className="p-4 text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 truncate">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <p className="text-lg font-bold text-emerald-600 mb-1">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  Stock: {product.stock}
                </p>

                <button
                  onClick={() => addToCart(product, 1)}
                  disabled={product.stock <= 0}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-white font-semibold hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              No products available at the moment.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
