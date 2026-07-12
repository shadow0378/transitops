import {
  BarChart3,
  Car,
  ClipboardList,
  Gauge,
  LogOut,
  Moon,
  ReceiptText,
  Sun,
  UserRound,
  Wrench
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/", label: "Dashboard", icon: Gauge },
  { to: "/vehicles", label: "Vehicles", icon: Car },
  { to: "/drivers", label: "Drivers", icon: UserRound },
  { to: "/trips", label: "Trips", icon: ClipboardList },
  { to: "/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/expenses", label: "Expenses", icon: ReceiptText },
  { to: "/reports", label: "Reports", icon: BarChart3 }
];

export default function Layout() {
  const [dark, setDark] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-zinc-950 dark:text-zinc-100">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 lg:block">
        <div className="mb-6">
          <h1 className="text-2xl font-black tracking-tight">TransitOps</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400">{user?.role}</p>
        </div>
        <nav className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold ${
                    isActive
                      ? "bg-mint text-white"
                      : "text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
          <div>
            <p className="text-xs uppercase text-slate-500 dark:text-zinc-400">Smart Transport Operations</p>
            <p className="font-bold">{user?.name || "Team Demo"}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="icon-btn" onClick={toggleDark} title="Toggle dark mode">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-btn" onClick={handleLogout} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-7xl p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
