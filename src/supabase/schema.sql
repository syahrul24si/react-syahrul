-- ============================================================
-- SEDAP - SQL Schema v2 (Simplified)
-- Jalankan script ini di Supabase SQL Editor
-- Jika sudah pernah menjalankan versi sebelumnya, jalankan ini saja
-- ============================================================

-- Bersihkan dulu (jika sudah ada dari percobaan sebelumnya)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS get_user_role() CASCADE;

DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- ============================================================
-- 1. BUAT TABEL
-- ============================================================

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'guest')),
  tier text NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  points integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id),
  total_original numeric NOT NULL,
  discount_amount numeric NOT NULL DEFAULT 0,
  total_final numeric NOT NULL,
  points_earned integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL,
  price_per_item numeric NOT NULL
);

-- ============================================================
-- 2. TRIGGER: Auto-buat profile saat user daftar
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, tier, points)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'), 'member', 'bronze', 0);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 3. HELPER FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$;

-- ============================================================
-- 4. AKTIFKAN RLS
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 5. RLS POLICIES
-- ============================================================

-- profiles
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (id = auth.uid() OR get_user_role() = 'admin');

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (id = auth.uid() OR get_user_role() = 'admin');

CREATE POLICY "profiles_insert_all"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- products
CREATE POLICY "products_select_all"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "products_insert_admin"
  ON products FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "products_update_admin"
  ON products FOR UPDATE
  USING (get_user_role() = 'admin');

CREATE POLICY "products_delete_admin"
  ON products FOR DELETE
  USING (get_user_role() = 'admin');

-- orders
CREATE POLICY "orders_select"
  ON orders FOR SELECT
  USING (user_id = auth.uid() OR get_user_role() = 'admin');

CREATE POLICY "orders_insert"
  ON orders FOR INSERT
  WITH CHECK (user_id = auth.uid() OR get_user_role() = 'admin');

CREATE POLICY "orders_update_admin"
  ON orders FOR UPDATE
  USING (get_user_role() = 'admin');

-- order_items
CREATE POLICY "order_items_select"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR get_user_role() = 'admin')
    )
  );

CREATE POLICY "order_items_insert"
  ON order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR get_user_role() = 'admin')
    )
  );

-- ============================================================
-- SELESAI! Schema sudah siap.
-- ============================================================
