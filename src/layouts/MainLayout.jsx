import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
            <Header />

            <Outlet />
      </div>
    </div>
  );
}
