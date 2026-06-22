import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import Header from "./Header";

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar - Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Mobile Header Bar */}
        <div className="flex items-center gap-3 p-4 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg bg-white p-2.5 shadow-sm hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <FaBars className="text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">
            Sedap<span className="text-emerald-500">.</span>
          </h1>
        </div>

        <Header />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
