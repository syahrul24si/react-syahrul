import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import PageHeader from "../../components/PageHeader";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!product) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div>
      <PageHeader
        title="Detail Produk"
        breadcrumb={`Dashboard / Produk / ${product.name}`}
      />

      <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-10">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="rounded-xl mb-4 w-full h-48 object-cover"
          />
        )}

        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

        {product.description && (
          <p className="text-gray-600 mb-2">{product.description}</p>
        )}

        <p className="text-gray-600 mb-1">
          Stock: {product.stock}
        </p>

        <p className="text-gray-800 font-semibold text-lg">
          Harga: Rp {Number(product.price).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
