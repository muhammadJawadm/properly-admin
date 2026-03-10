import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Sidebar      from "./components/Sidebar"
import Header       from "./components/Header"
import Login        from "./pages/Login"
import Dashboard    from "./pages/Dashboard"
import Verification from "./pages/Verification"
import Disputes     from "./pages/Disputes"
import Payments     from "./pages/Payments"
import Listings     from "./pages/Listings"
import Analytics    from "./pages/Analytics"
import Compliance   from "./pages/Compliance"

function AdminLayout({ children }) {
  // On small screens start collapsed; on desktop start expanded
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 768)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Auto-respond to window resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false) // close mobile drawer when going to desktop
      }
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#0f1117" }}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {/* On mobile, no left margin (sidebar is overlaid); on desktop, push content right */}
      <div
        className="flex flex-col flex-1 min-h-screen transition-all duration-300 md:ml-[var(--sidebar-w)]"
        style={{ "--sidebar-w": collapsed ? "72px" : "260px" }}
      >
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: "#0f1117" }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [authed, setAuthed] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setAuthed(true)} />} />
        <Route path="/" element={<Navigate to={authed ? "/dashboard" : "/login"} replace />} />
        {authed ? (
          <>
            <Route path="/dashboard"    element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/verification" element={<AdminLayout><Verification /></AdminLayout>} />
            <Route path="/disputes"     element={<AdminLayout><Disputes /></AdminLayout>} />
            <Route path="/payments"     element={<AdminLayout><Payments /></AdminLayout>} />
            <Route path="/listings"     element={<AdminLayout><Listings /></AdminLayout>} />
            <Route path="/analytics"    element={<AdminLayout><Analytics /></AdminLayout>} />
            <Route path="/compliance"   element={<AdminLayout><Compliance /></AdminLayout>} />
            <Route path="*"             element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}
