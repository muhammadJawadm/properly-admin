import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard, ShieldCheck, Gavel, CreditCard,
  Building2, BarChart3, FileWarning, ChevronLeft,
  ChevronRight, LogOut, Settings, X
} from "lucide-react"
import logo from "../assets/Logo.png"

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ShieldCheck, label: "User Verification", path: "/verification" },
  { icon: Gavel, label: "Disputes", path: "/disputes" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: Building2, label: "Listings & Sales", path: "/listings" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: FileWarning, label: "Compliance", path: "/compliance" },
]

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { pathname } = useLocation()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const itemCls = (active) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all no-underline w-full border ${active
      ? "bg-violet-500/10 text-violet-400 font-semibold border-violet-500/20"
      : "text-slate-400 hover:bg-[#252840] hover:text-slate-100 border-transparent"
    }`

  return (
    <>
      {/* ── Mobile overlay backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen flex flex-col z-50 overflow-hidden
          transition-[width,transform] duration-300 ease-in-out
          /* mobile: slide in/out as full-width drawer */
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{
          width: collapsed ? 72 : 260,
          backgroundColor: "#1a1d27",
          borderRight: "1px solid #2a2d3e",
        }}
      >
        {/* Logo row */}
        <div
          className="flex items-center gap-3 px-4 py-5 min-h-[72px] relative"
          style={{ borderBottom: "1px solid #2a2d3e" }}
        >
          <div className="w-12 h-12 min-w-[36px] rounded-xl flex items-center justify-center text-lg font-black text-white shadow-lg ">
            <img src={logo} alt="" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight overflow-hidden whitespace-nowrap">
              <span className="text-base font-bold text-slate-100">Properly</span>
              <span className="text-[10px] font-semibold text-violet-400 tracking-[1.5px] uppercase">Admin</span>
            </div>
          )}

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden md:flex items-center justify-center w-6 h-6 rounded-md text-slate-500 hover:text-violet-400 transition-all ${collapsed ? "mx-auto" : "absolute right-3 top-1/2 -translate-y-1/2"
              }`}
            style={{ backgroundColor: "#252840", border: "1px solid #353852" }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-md text-slate-500 hover:text-violet-400 transition-all"
            style={{ backgroundColor: "#252840", border: "1px solid #353852" }}
            title="Close sidebar"
          >
            <X size={14} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2.5 py-4 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
          {!collapsed && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2 pb-2.5">
              Main Menu
            </span>
          )}
          {NAV.map(({ icon: Icon, label, path }) => {
            const active = pathname === path || (path !== "/dashboard" && pathname.startsWith(path))
            return (
              <Link key={path} to={path} className={itemCls(active)} title={collapsed ? label : ""}>
                <Icon size={18} className={`shrink-0 ${active ? "text-violet-500" : ""}`} />
                {!collapsed && <span className="truncate">{label}</span>}
                {active && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_6px_#6c63ff]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2.5 pb-4">
          {!collapsed && <div className="h-px mb-3" style={{ backgroundColor: "#2a2d3e" }} />}
          <Link
            to="/settings"
            className={itemCls(pathname === "/settings")}
            title={collapsed ? "Settings" : ""}
          >
            <Settings size={18} className="shrink-0" />
            {!collapsed && <span>Settings</span>}
          </Link>
          <button
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer w-full mt-0.5"
            title={collapsed ? "Logout" : ""}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
