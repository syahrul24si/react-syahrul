import { MdDashboard } from "react-icons/md";
import { FaShoppingBag, FaUsers, FaPlus, FaChartPie } from "react-icons/fa";

export default function Sidebar() {
    return (
        <div
            id="sidebar"
            className="flex min-h-screen w-[360px] flex-col bg-white p-10 shadow-lg"
        >
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span
                    id="logo-title"
                    className="font-poppins text-[48px] text-gray-900"
                >
                    Sedap <b id="logo-dot" className="text-green-500">.</b>
                </span>
                <span
                    id="logo-subtitle"
                    className="font-semibold text-gray-400"
                >
                    Modern Admin Dashboard
                </span>
            </div>
            {/* List Menu */}
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    <li>
                        <div
                            id="menu-1"
                            className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-green-500 hover:font-extrabold"
                        >
                            <MdDashboard className="mr-4 text-xl" />
                            <span>Dashboard</span>
                        </div>
                    </li>
                    <li>
                        <div
                            id="menu-2"
                            className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-green-500 hover:font-extrabold"
                        >
                            <FaShoppingBag className="mr-4 text-xl" />
                            <span>Orders</span>
                        </div>
                    </li>

                    <li>
                        <div
                            id="menu-3"
                            className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-green-500 hover:font-extrabold"
                        >
                            <FaUsers className="mr-4 text-xl" />
                            <span>Customers</span>
                        </div>
                    </li>

                    <li>
                        <div
                            id="menu-4"
                            className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-green-500 hover:font-extrabold"
                        >
                            <FaChartPie className="mr-4 text-xl" />
                            <span>Analytics</span>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div
                    id="footer-card"
                    className="mb-10 flex items-center rounded-md bg-green-500 px-4 py-2 shadow-lg"
                >
                    <div id="footer-text" className="text-sm text-white">
                        <span>Please organize your menus through button below!</span>

                        <div
                            id="add-menu-button"
                            className="mt-3 flex items-center justify-center space-x-2 rounded-md bg-white p-2"
                        >
                            <FaPlus />
                            <span className="flex items-center text-gray-600">
                                Add Menus
                            </span>
                        </div>
                    </div>

                    <img
                        id="footer-avatar"
                        className="w-20 rounded-full"
                        src="img/profpic.jpeg"
                        alt="avatar"
                    />
                </div>

                <span
                    id="footer-brand"
                    className="font-bold text-gray-400"
                >
                    Sedap Restaurant Admin Dashboard
                </span>

                <p
                    id="footer-copyright"
                    className="font-light text-gray-400"
                >
                    &copy; 2025 All Right Reserved
                </p>
            </div>
        </div>
    );
}