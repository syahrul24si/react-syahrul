import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabase/supabaseClient";
import PageHeader from "@/components/PageHeader";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const tierDiscount = {
  bronze: 5,
  silver: 10,
  gold: 15,
  platinum: 20,
};

const tierThresholds = [
  { tier: "platinum", min: 1001 },
  { tier: "gold", min: 501 },
  { tier: "silver", min: 101 },
];

function getTier(points) {
  for (const t of tierThresholds) {
    if (points >= t.min) return t.tier;
  }
  return "bronze";
}

export default function MemberCart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const tier = profile?.tier || "bronze";
  const discountPercent = tierDiscount[tier];

  const totalOriginal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const discountAmount = totalOriginal * (discountPercent / 100);
  const totalFinal = totalOriginal - discountAmount;
  const pointsEarned = Math.floor(totalFinal / 10000);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Validate stock for all items
      const { data: stockData, error: stockError } = await supabase
        .from("products")
        .select("id, stock")
        .in(
          "id",
          cartItems.map((item) => item.id)
        );

      if (stockError) throw new Error("Failed to check stock");

      for (const cartItem of cartItems) {
        const dbProduct = stockData.find((p) => p.id === cartItem.id);
        if (!dbProduct) throw new Error(`Product "${cartItem.name}" not found`);
        if (dbProduct.stock < cartItem.quantity) {
          throw new Error(
            `Insufficient stock for "${cartItem.name}". Available: ${dbProduct.stock}, Requested: ${cartItem.quantity}`
          );
        }
      }

      // Step 2: Create the order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: profile.id,
          total_original: totalOriginal,
          discount_amount: discountAmount,
          total_final: totalFinal,
          points_earned: pointsEarned,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw new Error(orderError.message);

      // Step 3: Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_per_item: Number(item.price),
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw new Error(itemsError.message);

      // Step 4: Reduce stock for each product
      for (const cartItem of cartItems) {
        const dbProduct = stockData.find((p) => p.id === cartItem.id);
        await supabase
          .from("products")
          .update({ stock: dbProduct.stock - cartItem.quantity })
          .eq("id", cartItem.id);
      }

      // Step 5: Update member points and check tier upgrade
      const newPoints = (profile.points || 0) + pointsEarned;
      const newTier = getTier(newPoints);

      await supabase
        .from("profiles")
        .update({ points: newPoints, tier: newTier })
        .eq("id", profile.id);

      // Refresh auth context to reflect new points/tier
      await refreshProfile();

      clearCart();
      setSuccess(
        `Order placed successfully! You earned ${pointsEarned} points. ${
          newTier !== tier ? `Congratulations! You've been upgraded to ${newTier}!` : ""
        }`
      );
      setTimeout(() => navigate("/my-orders"), 3000);
    } catch (err) {
      setError(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="My Cart" breadcrumb={["Home", "Cart"]} />

      {error && (
        <div className="mb-4 rounded-xl bg-red-100 border border-red-300 p-4 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-xl bg-green-100 border border-green-300 p-4 text-green-700">
          {success}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 shadow-lg text-center">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 rounded-xl bg-emerald-500 px-6 py-2 text-white font-semibold hover:bg-emerald-600"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-2xl bg-white p-4 shadow"
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-400">No img</span>
                  </div>
                )}

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-emerald-600 font-bold">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-400">
                    Stock available: {item.stock}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:ml-auto">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-lg bg-gray-200 p-2 hover:bg-gray-300"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => {
                      if (item.quantity < item.stock) {
                        updateQuantity(item.id, item.quantity + 1);
                      }
                    }}
                    disabled={item.quantity >= item.stock}
                    className="rounded-lg bg-gray-200 p-2 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 rounded-lg bg-red-100 p-2 text-red-500 hover:bg-red-200"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl bg-white p-6 shadow-lg h-fit sticky top-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>Rp {totalOriginal.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Discount ({discountPercent}% - {tier})
                </span>
                <span className="text-red-500">
                  - Rp {discountAmount.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-emerald-600">
                  Rp {totalFinal.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">You will earn</p>
                <p className="text-lg font-bold text-emerald-600">
                  {pointsEarned} Points
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-emerald-600 px-6 py-3 text-white font-bold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Checkout Now"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
