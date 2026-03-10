import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Bell, Search, ChevronDown, Menu } from "lucide-react"

const PAGE_INFO = {
  "/dashboard":    { title: "Dashboard",           sub: "Welcome back, Admin" },
  "/verification": { title: "User Verification",   sub: "Manage identity & fraud prevention" },
  "/disputes":     { title: "Dispute Management",  sub: "Handle buyer-seller disputes" },
  "/payments":     { title: "Payments & Accounts", sub: "Track transactions and commissions" },
  "/listings":     { title: "Listings & Sales",    sub: "Monitor all property listings" },
  "/analytics":    { title: "Platform Analytics",  sub: "Insights, trends and performance" },
  "/compliance":   { title: "Compliance Monitor",  sub: "Policy checks and violation alerts" },
  "/settings":     { title: "Settings",            sub: "Platform configuration" },
}

const NOTIFS = [
  { id: 1, dot: "bg-amber-400", text: "New fraud flag detected — User #4421",       time: "2m ago" },
  { id: 2, dot: "bg-blue-400",  text: "Dispute #D-0091 escalated to review",        time: "15m ago" },
  { id: 3, dot: "bg-green-400", text: "KYC approved for Daniel Mthembu",            time: "1h ago" },
  { id: 4, dot: "bg-red-400",   text: "Compliance violation: Listing #L-2234",      time: "3h ago" },
]

export default function Header({ onMenuClick }) {
  const { pathname } = useLocation()
  const page = PAGE_INFO[pathname] || { title: "Admin", sub: "" }
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-40 h-16 flex items-center justify-between px-3 sm:px-6 gap-3"
      style={{ backgroundColor: "#1a1d27", borderBottom: "1px solid #2a2d3e" }}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:bg-[#252840] hover:text-violet-400 transition-all shrink-0"
        style={{ border: "1px solid #2a2d3e" }}
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      {/* Page title */}
      <div className="flex flex-col leading-tight flex-1 min-w-0">
        <h1 className="text-[17px] font-bold text-slate-100">{page.title}</h1>
        <span className="text-xs text-slate-500">{page.sub}</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search – hidden on xs */}
        <div
          className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 w-[160px] md:w-[220px] focus-within:border-violet-500 focus-within:shadow-[0_0_0_2px_rgba(108,99,255,0.15)] transition-all"
          style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}
        >
          <Search size={14} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search users, listings..."
            className="bg-transparent border-none outline-none text-slate-100 text-[13px] w-full placeholder:text-slate-500"
          />
        </div>

        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="relative flex items-center justify-center w-10 h-10 rounded-lg text-slate-400 hover:bg-[#252840] hover:text-violet-400 hover:border-violet-500 transition-all"
            style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}
          >
            <Bell size={17} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#1a1d27]">
              4
            </span>
          </button>

          {open && (
            <div
              className="absolute top-[calc(100%+10px)] right-0 w-80 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden z-50"
              style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}
            >
              <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid #2a2d3e" }}>
                <span className="text-[13px] font-bold text-slate-100">Notifications</span>
                <span className="text-[11px] font-semibold bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-full">4 new</span>
              </div>
              {NOTIFS.map(n => (
                <div
                  key={n.id}
                  className="flex items-start gap-2.5 px-4 py-3 hover:bg-[#252840] cursor-pointer transition-colors"
                  style={{ borderBottom: "1px solid #2a2d3e" }}
                >
                  <div className={`w-2 h-2 min-w-[8px] rounded-full mt-1 ${n.dot}`} />
                  <div>
                    <p className="text-[12.5px] text-slate-300 leading-snug">{n.text}</p>
                    <span className="text-[11px] text-slate-500">{n.time}</span>
                  </div>
                </div>
              ))}
              <div
                className="px-4 py-2.5 text-center text-[12px] font-semibold text-violet-400 hover:text-violet-300 cursor-pointer"
                style={{ backgroundColor: "#1a1d27", borderTop: "1px solid #2a2d3e" }}
              >
                View all notifications
              </div>
            </div>
          )}
        </div>

        {/* Admin profile */}
        <div
          className="flex items-center gap-2.5 rounded-xl pl-1.5 pr-2 sm:pr-3 py-1.5 cursor-pointer hover:border-violet-500 hover:bg-[#252840] transition-all"
          style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}
        >
          <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-violet-400 rounded-lg flex items-center justify-center text-[13px] font-bold text-white shrink-0">
            A
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-slate-100">Super Admin</span>
            <span className="text-[10px] text-slate-500">Administrator</span>
          </div>
          <ChevronDown size={13} className="hidden sm:block text-slate-500 ml-1" />
        </div>
      </div>
    </header>
  )
}
