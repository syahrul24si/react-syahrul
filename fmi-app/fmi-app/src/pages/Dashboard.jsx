import PageHeader from "../components/PageHeader";
import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div id="dashboard-container">
      <PageHeader
        title="Dashboard"
        breadcrumb={["Home", "Home Detail", "Home Very Detail"]}
      />

      <div
        id="dashboard-grid"
        className="grid gap-4 p-5 sm:grid-cols-2 md:grid-cols-5"
      >
        <div
          id="dashboard-orders"
          className="flex items-center space-x-5 rounded-lg bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            id="orders-icon"
            className="rounded-full bg-green-500 p-4"
          >
            <FaShoppingCart className="text-3xl text-white" />
          </div>
          <div id="orders-info" className="flex flex-col">
            <span
              id="orders-count"
              className="text-2xl font-bold"
            >
              75
            </span>
            <span
              id="orders-text"
              className="text-gray-400"
            >
              Total Orders
            </span>
          </div>
        </div>

        <div
          id="dashboard-delivered"
          className="flex items-center space-x-5 rounded-lg bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            id="delivered-icon"
            className="rounded-full bg-blue-500 p-4"
          >
            <FaTruck className="text-3xl text-white" />
          </div>
          <div id="delivered-info" className="flex flex-col">
            <span
              id="delivered-count"
              className="text-2xl font-bold"
            >
              175
            </span>
            <span
              id="delivered-text"
              className="text-gray-400"
            >
              Total Delivered
            </span>
          </div>
        </div>

        <div
          id="dashboard-canceled"
          className="flex items-center space-x-5 rounded-lg bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            id="canceled-icon"
            className="rounded-full bg-red-500 p-4"
          >
            <FaBan className="text-3xl text-white" />
          </div>
          <div id="canceled-info" className="flex flex-col">
            <span
              id="canceled-count"
              className="text-2xl font-bold"
            >
              40
            </span>
            <span
              id="canceled-text"
              className="text-gray-400"
            >
              Total Canceled
            </span>
          </div>
        </div>

        <div
          id="dashboard-revenue"
          className="flex items-center space-x-5 rounded-lg bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            id="revenue-icon"
            className="rounded-full bg-yellow-500 p-4"
          >
            <FaDollarSign className="text-3xl text-white" />
          </div>
          <div id="revenue-info" className="flex flex-col">
            <span
              id="revenue-amount"
              className="text-2xl font-bold"
            >
              Rp.128
            </span>
            <span
              id="revenue-text"
              className="text-gray-400"
            >
              Total Revenue
            </span>
          </div>
        </div>

        <div
          id="dashboard-customers"
          className="flex items-center space-x-5 rounded-lg bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            id="customers-icon"
            className="rounded-full bg-purple-500 p-4"
          >
            <FaUsers className="text-3xl text-white" />
          </div>
          <div id="customers-info" className="flex flex-col">
            <span
              id="customers-count"
              className="text-2xl font-bold"
            >
              320
            </span>
            <span
              id="customers-text"
              className="text-gray-400"
            >
              Total Customers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}