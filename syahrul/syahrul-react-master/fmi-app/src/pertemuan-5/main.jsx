import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <div id="app-container" className="min-h-screen bg-gray-100 flex">
            <div id="layout-wrapper" className="flex flex-1 flex-row">
                <Sidebar />
                <div id="main-content" className="flex-1 p-4">
                    <Header />
                    <Dashboard />
                </div>
            </div>
        </div>
    </React.StrictMode>
);