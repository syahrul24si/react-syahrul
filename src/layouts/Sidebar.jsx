import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import {
  MdSpaceDashboard,
  MdErrorOutline,
} from "react-icons/md";
import {
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
  FaStore,
  FaClipboardList,
  FaShoppingBag,
} from "react-icons/fa";

export default function Sidebar({ onNavigate }) {
  const { profile } = useAuth();
  const role = profile?.role;
  const isAdmin = role === "admin";

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-3.5 space-x-2 transition-all ${
      isActive
        ? isAdmin
          ? "text-emerald-700 bg-emerald-100 font-bold"
          : "text-blue-700 bg-blue-100 font-bold"
        : "text-gray-600 hover:bg-gray-100 hover:font-semibold"
    }`;

  const handleNavClick = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white p-4 shadow-md overflow-y-auto flex flex-col">
      {/* Brand */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Sedap<span className={isAdmin ? "text-emerald-500" : "text-blue-500"}>.</span>
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <Badge
            variant="outline"
            className={
              isAdmin
                ? "border-emerald-300 text-emerald-700 bg-emerald-50 text-xs"
                : "border-blue-300 text-blue-700 bg-blue-50 text-xs"
            }
          >
            {isAdmin ? "Admin" : "Member"}
          </Badge>
          <span className="text-xs text-gray-400">
            {isAdmin ? "Dashboard" : "Portal"}
          </span>
        </div>
      </div>

      {/* Admin Menu */}
      {isAdmin && (
        <ul className="space-y-1.5 flex-1">
          <li onClick={handleNavClick}>
            <NavLink to="/admin" end className={menuClass}>
              <MdSpaceDashboard className="mr-3 text-lg" />
              Dashboard
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/admin/orders" className={menuClass}>
              <FaShoppingCart className="mr-3 text-lg" />
              Orders
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/admin/customers" className={menuClass}>
              <FaUsers className="mr-3 text-lg" />
              Customers
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/admin/products" className={menuClass}>
              <FaBoxOpen className="mr-3 text-lg" />
              Products
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/admin/components" className={menuClass}>
              <FaBoxOpen className="mr-3 text-lg" />
              Components
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/admin/fitur-xyz" className={menuClass}>
              <FaBoxOpen className="mr-3 text-lg" />
              Fitur Xyz
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/admin/note" className={menuClass}>
              <FaBoxOpen className="mr-3 text-lg" />
              Note
            </NavLink>
          </li>
          <li className="pt-3 mt-3 border-t border-gray-100">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Error Pages</p>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/admin/error-400" className={menuClass}>
              <MdErrorOutline className="mr-3 text-lg" />
              Error 400
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/admin/error-401" className={menuClass}>
              <MdErrorOutline className="mr-3 text-lg" />
              Error 401
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/admin/error-403" className={menuClass}>
              <MdErrorOutline className="mr-3 text-lg" />
              Error 403
            </NavLink>
          </li>
        </ul>
      )}

      {/* Member Menu */}
      {role === "member" && (
        <ul className="space-y-1.5 flex-1">
          <li onClick={handleNavClick}>
            <NavLink to="/dashboard" className={menuClass}>
              <MdSpaceDashboard className="mr-3 text-lg" />
              Dashboard
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/shop" className={menuClass}>
              <FaStore className="mr-3 text-lg" />
              Shop
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/cart" className={menuClass}>
              <FaShoppingBag className="mr-3 text-lg" />
              Cart
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/my-orders" className={menuClass}>
              <FaClipboardList className="mr-3 text-lg" />
              My Orders
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}
