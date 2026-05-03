import { NavLink } from "react-router-dom";
import {
  MdSpaceDashboard,
  MdErrorOutline,
} from "react-icons/md";
import { FaShoppingCart, FaUsers } from "react-icons/fa";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white p-4 shadow-md">
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold text-slate-900">
          Sedap<span className="text-hijau">.</span>
        </h1>
        <p className="mt-2 text-sm text-gray-400">Modern Admin Dashboard</p>
      </div>

      <ul className="space-y-3">
        <li>
          <NavLink id="menu-1" to="/" className={menuClass}>
            <MdSpaceDashboard className="mr-4 text-xl" />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink id="menu-2" to="/orders" className={menuClass}>
            <FaShoppingCart className="mr-4 text-xl" />
            Orders
          </NavLink>
        </li>

        <li>
          <NavLink id="menu-3" to="/customers" className={menuClass}>
            <FaUsers className="mr-4 text-xl" />
            Customers
          </NavLink>
        </li>

        <li>
          <NavLink id="menu-4" to="/error-400" className={menuClass}>
            <MdErrorOutline className="mr-4 text-xl" />
            Error 400
          </NavLink>
        </li>

        <li>
          <NavLink id="menu-5" to="/error-401" className={menuClass}>
            <MdErrorOutline className="mr-4 text-xl" />
            Error 401
          </NavLink>
        </li>

        <li>
          <NavLink id="menu-6" to="/error-403" className={menuClass}>
            <MdErrorOutline className="mr-4 text-xl" />
            Error 403
          </NavLink>
        </li>
      </ul>
    </div>
  );
}