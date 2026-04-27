import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div
            id="header-container"
            className="flex items-center justify-between p-4"
        >
            {/* Search Bar */}
            <div
                id="search-bar"
                className="relative w-full max-w-lg"
            >
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search Here..."
                    className="w-full max-w-lg rounded-md border border-gray-100 bg-white p-2 pr-10 outline-none"
                />
                <FaSearch
                    id="search-icon"
                    className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-300"
                />
            </div>

            {/* Icon & Profile Section */}
            <div
                id="icons-container"
                className="flex items-center space-x-4"
            >
                {/* Icons */}
                <div
                    id="notification-icon"
                    className="relative cursor-pointer rounded-2xl bg-blue-100 p-3 text-blue-500"
                >
                    <FaBell />
                    <span
                        id="notification-badge"
                        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-200 px-2 py-1 text-xs"
                    >
                        50
                    </span>
                </div>

                <div
                    id="chart-icon"
                    className="cursor-pointer rounded-2xl bg-blue-100 p-3"
                >
                    <FcAreaChart />
                </div>

                <div
                    id="settings-icon"
                    className="cursor-pointer rounded-2xl bg-red-100 p-3 text-red-500"
                >
                    <SlSettings />
                </div>

                {/* Profile Section */}
                <div
                    id="profile-container"
                    className="flex items-center space-x-4 border-l pl-4 border-gray-300"
                >
                    <span id="profile-text">
                        Hello, <b>Syahrul Ramadhan</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="./profpic.jpeg"
                        alt="profile avatar"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}