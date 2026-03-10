import { useState } from "react"
import {
  Search, ShieldCheck, ShieldX, Eye, X, Check, XCircle,
  AlertTriangle, User, FileText, CreditCard, Home, Briefcase,
  ChevronDown, CheckCircle2, Clock, Ban, RefreshCw, UserCheck
} from "lucide-react"

/* ─── Mock document image placeholders ─────────────────────── */
const DOC_CONFIGS = {
  id: { label: "National ID / Passport", color: "from-violet-900 to-violet-700", accent: "#7c3aed", icon: CreditCard, lines: [95, 80, 60, 70] },
  bank: { label: "Bank Statement", color: "from-blue-900 to-blue-700", accent: "#1d4ed8", icon: FileText, lines: [90, 75, 85, 50] },
  address: { label: "Proof of Address", color: "from-emerald-900 to-emerald-700", accent: "#047857", icon: Home, lines: [80, 90, 65, 75] },
  fica: { label: "FICA Document", color: "from-amber-900 to-amber-700", accent: "#b45309", icon: Briefcase, lines: [85, 70, 90, 60] },
  selfie: { label: "Selfie / Photo Proof", color: "from-pink-900 to-pink-700", accent: "#9d174d", icon: User, lines: [50, 40, 55, 45] },
}

function DocPreview({ doc }) {
  const cfg = DOC_CONFIGS[doc.type] || DOC_CONFIGS.id
  const Icon = cfg.icon
  return (
    <div
      className={`rounded-xl overflow-hidden bg-gradient-to-br ${cfg.color} relative select-none`}
      style={{ height: 200, border: `1px solid ${cfg.accent}55` }}
    >
      {/* watermark grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 28px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 28px)"
      }} />
      {/* corner badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-lg">
        <Icon size={12} color="#fff" />
        <span className="text-[10px] font-bold text-white uppercase tracking-wide">{cfg.label}</span>
      </div>
      {/* document number placeholder */}
      <div className="absolute top-3 right-3 text-[9px] font-mono text-white/40 uppercase tracking-widest">DOC-{doc.seed}</div>
      {/* fake content lines */}
      <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2.5">
        {cfg.lines.map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-white/20" style={{ width: `${w}%` }} />
        ))}
      </div>
      {/* photo box for selfie */}
      {doc.type === "selfie" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
          <User size={36} className="text-white/40" />
        </div>
      )}
    </div>
  )
}

/* ─── Data ──────────────────────────────────────────────────── */
const INITIAL_USERS = [
  {
    id: "U-1001", name: "Sipho Nkosi", email: "sipho@email.com", role: "Seller",
    kycStatus: "pending", userStatus: "active", fraud: false, submitted: "2025-05-18",
    phone: "+27 71 234 5678", country: "South Africa", idNumber: "8601015800082",
    docs: [
      { id: "D-101", name: "National ID", type: "id", kycDocStatus: "pending", seed: "SN881" },
      { id: "D-102", name: "Bank Statement", type: "bank", kycDocStatus: "pending", seed: "SN942" },
    ],
  },
  {
    id: "U-1002", name: "Lerato Dlamini", email: "lerato@email.com", role: "Buyer",
    kycStatus: "approved", userStatus: "active", fraud: false, submitted: "2025-05-17",
    phone: "+27 82 987 6543", country: "South Africa", idNumber: "9202200800083",
    docs: [
      { id: "D-201", name: "National ID", type: "id", kycDocStatus: "approved", seed: "LD001" },
      { id: "D-202", name: "Proof of Address", type: "address", kycDocStatus: "approved", seed: "LD002" },
      { id: "D-203", name: "Selfie", type: "selfie", kycDocStatus: "approved", seed: "LD003" },
    ],
  },
  {
    id: "U-1003", name: "Thomas Mark", email: "thomas@email.com", role: "Seller",
    kycStatus: "under_review", userStatus: "suspended", fraud: true, submitted: "2025-05-18",
    phone: "+27 63 112 3344", country: "South Africa", idNumber: "7805114800085",
    docs: [
      { id: "D-301", name: "National ID", type: "id", kycDocStatus: "under_review", seed: "TM401" },
      { id: "D-302", name: "FICA Document", type: "fica", kycDocStatus: "pending", seed: "TM402" },
    ],
  },
  {
    id: "U-1004", name: "Fatima Malik", email: "fatima@email.com", role: "Buyer",
    kycStatus: "rejected", userStatus: "active", fraud: false, submitted: "2025-05-16",
    phone: "+27 79 554 8821", country: "South Africa", idNumber: "9407310800081",
    docs: [
      { id: "D-401", name: "National ID", type: "id", kycDocStatus: "rejected", seed: "FM501" },
      { id: "D-402", name: "Bank Statement", type: "bank", kycDocStatus: "rejected", seed: "FM502" },
    ],
  },
  {
    id: "U-1005", name: "Daniel Mthembu", email: "daniel@email.com", role: "Seller",
    kycStatus: "approved", userStatus: "active", fraud: false, submitted: "2025-05-15",
    phone: "+27 84 778 9900", country: "South Africa", idNumber: "8811285800084",
    docs: [
      { id: "D-501", name: "National ID", type: "id", kycDocStatus: "approved", seed: "DM601" },
      { id: "D-502", name: "Proof of Address", type: "address", kycDocStatus: "approved", seed: "DM602" },
      { id: "D-503", name: "FICA Document", type: "fica", kycDocStatus: "approved", seed: "DM603" },
    ],
  },
  {
    id: "U-1006", name: "Aisha Patel", email: "aisha@email.com", role: "Buyer",
    kycStatus: "under_processing", userStatus: "active", fraud: true, submitted: "2025-05-18",
    phone: "+27 66 221 7788", country: "South Africa", idNumber: "9305120800086",
    docs: [
      { id: "D-601", name: "National ID", type: "id", kycDocStatus: "under_processing", seed: "AP701" },
      { id: "D-602", name: "Selfie", type: "selfie", kycDocStatus: "pending", seed: "AP702" },
    ],
  },
]

/* ─── Status configs ─────────────────────────────────────────── */
const KYC_STATUS_CFG = {
  pending: { cls: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "Pending" },
  under_review: { cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Under Review" },
  under_processing: { cls: "bg-violet-500/10 text-violet-400 border-violet-500/20", label: "Under Processing" },
  approved: { cls: "bg-green-500/10 text-green-400 border-green-500/20", label: "Approved" },
  rejected: { cls: "bg-red-500/10 text-red-400 border-red-500/20", label: "Rejected" },
}
const USER_STATUS_CFG = {
  active: { cls: "bg-green-500/10 text-green-400 border-green-500/20", label: "Active" },
  suspended: { cls: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "Suspended" },
  blocked: { cls: "bg-red-500/10 text-red-400 border-red-500/20", label: "Blocked" },
}
const DOC_STATUS_CFG = {
  pending: { cls: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "Pending" },
  under_review: { cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Under Review" },
  under_processing: { cls: "bg-violet-500/10 text-violet-400 border-violet-500/20", label: "Under Processing" },
  approved: { cls: "bg-green-500/10 text-green-400 border-green-500/20", label: "Approved" },
  rejected: { cls: "bg-red-500/10 text-red-400 border-red-500/20", label: "Rejected" },
}

const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

function StatusBadge({ status, cfg }) {
  const c = cfg[status]
  return c ? (
    <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${c.cls}`}>{c.label}</span>
  ) : null
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function Verification() {
  const [users, setUsers] = useState(INITIAL_USERS)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)

  /* live-update helpers */
  function updateUser(id, patch) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...patch } : u))
    if (selected?.id === id) setSelected(prev => ({ ...prev, ...patch }))
  }
  function updateDoc(userId, docId, patch) {
    setUsers(prev => prev.map(u => u.id === userId
      ? { ...u, docs: u.docs.map(d => d.id === docId ? { ...d, ...patch } : d) }
      : u
    ))
    if (selected?.id === userId) {
      setSelected(prev => ({ ...prev, docs: prev.docs.map(d => d.id === docId ? { ...d, ...patch } : d) }))
    }
  }

  /* derived stats from live state */
  const stats = {
    pending: users.filter(u => u.kycStatus === "pending").length,
    under_review: users.filter(u => u.kycStatus === "under_review").length,
    under_processing: users.filter(u => u.kycStatus === "under_processing").length,
    approved: users.filter(u => u.kycStatus === "approved").length,
    rejected: users.filter(u => u.kycStatus === "rejected").length,
    fraud: users.filter(u => u.fraud).length,
  }

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    const matchQ = u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const matchF =
      filter === "all" ? true :
        filter === "fraud" ? u.fraud :
          filter === "under_review" ? u.kycStatus === "under_review" :
            filter === "under_processing" ? u.kycStatus === "under_processing" :
              u.kycStatus === filter
    return matchQ && matchF
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Pending", val: stats.pending, icon: Clock, cls: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "Under Review", val: stats.under_review, icon: Eye, cls: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Processing", val: stats.under_processing, icon: RefreshCw, cls: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
          { label: "Approved", val: stats.approved, icon: ShieldCheck, cls: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
          { label: "Rejected", val: stats.rejected, icon: ShieldX, cls: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
          { label: "Fraud Flags", val: stats.fraud, icon: AlertTriangle, cls: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border mb-3 ${s.bg}`}>
              <s.icon size={16} className={s.cls} />
            </div>
            <div className="text-[24px] font-extrabold text-slate-100">{s.val}</div>
            <div className="text-[12px] text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
        <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap" style={{ borderBottom: "1px solid #2a2d3e" }}>
          <h3 className="text-base font-bold text-slate-100">Identity Verification Queue</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <Search size={14} className="text-slate-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                className="bg-transparent outline-none text-slate-100 text-[13px] w-36 placeholder:text-slate-500" />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="rounded-lg px-3 py-2 text-slate-400 text-[13px] outline-none cursor-pointer"
              style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="under_processing">Under Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="fraud">Fraud Flags</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto w-[100vw]">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2d3e" }}>
                {["User ID", "Name", "Role", "KYC Status", "User Status", "Fraud", "Docs", "Submitted", "Actions"].map(h => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[#252840] transition-colors" style={{ borderBottom: "1px solid #2a2d3e" }}>
                  <td className={TD}>
                    <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{u.id}</span>
                  </td>
                  <td className={TD}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-violet-400 rounded-lg flex items-center justify-center text-[12px] font-bold text-white shrink-0">
                        {u.name[0]}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-slate-100">{u.name}</div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={TD}>
                    <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${u.role === "Seller" ? "bg-violet-500/10 text-violet-400 border-violet-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}>{u.role}</span>
                  </td>
                  <td className={TD}><StatusBadge status={u.kycStatus} cfg={KYC_STATUS_CFG} /></td>
                  <td className={TD}><StatusBadge status={u.userStatus} cfg={USER_STATUS_CFG} /></td>
                  <td className={TD}>
                    {u.fraud
                      ? <span className="flex items-center gap-1 text-[11px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full w-fit"><AlertTriangle size={11} /> Flagged</span>
                      : <span className="text-[11px] font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full w-fit">Clear</span>
                    }
                  </td>
                  <td className={TD}>
                    <span className="text-[12px] font-semibold text-slate-300">{u.docs.length} docs</span>
                  </td>
                  <td className={TD}>{u.submitted}</td>
                  <td className={TD}>
                    <button
                      onClick={() => setSelected(u)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/30 hover:bg-violet-500/20 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Eye size={13} /> Review Docs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Review Drawer ──────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-[200] flex">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />

          {/* panel */}
          <div
            className="relative ml-auto flex flex-col"
            style={{
              width: "min(780px, 96vw)",
              height: "100vh",
              backgroundColor: "#0f1117",
              borderLeft: "1px solid #2a2d3e",
              boxShadow: "-24px 0 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Sticky header */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4" style={{ backgroundColor: "#1e2130", borderBottom: "1px solid #2a2d3e" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-violet-400 rounded-xl flex items-center justify-center text-[16px] font-bold text-white">
                  {selected.name[0]}
                </div>
                <div>
                  <div className="text-[15px] font-extrabold text-slate-100">{selected.name}</div>
                  <div className="text-[12px] text-slate-400">{selected.email} · {selected.id}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={selected.kycStatus} cfg={KYC_STATUS_CFG} />
                <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-200 transition-colors cursor-pointer ml-2">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">

              {/* ── User Details ──────────────── */}
              <section>
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">User Information</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Full Name", selected.name],
                    ["Email", selected.email],
                    ["Phone", selected.phone],
                    ["Country", selected.country],
                    ["ID Number", selected.idNumber],
                    ["Role", selected.role],
                    ["Submitted", selected.submitted],
                    ["Docs Count", `${selected.docs.length} document${selected.docs.length !== 1 ? "s" : ""}`],
                  ].map(([lbl, val]) => (
                    <div key={lbl} className="rounded-xl p-3.5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{lbl}</div>
                      <div className="text-[13px] font-semibold text-slate-100">{val}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Status Management ─────────── */}
              <section>
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Status Management</h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* KYC Status */}
                  <div className="rounded-xl p-4" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">KYC Verification Status</div>
                    <div className="mb-3"><StatusBadge status={selected.kycStatus} cfg={KYC_STATUS_CFG} /></div>
                    <div className="relative">
                      <select
                        value={selected.kycStatus}
                        onChange={e => updateUser(selected.id, { kycStatus: e.target.value })}
                        className="w-full rounded-lg px-3 py-2.5 text-slate-100 text-[13px] font-semibold outline-none cursor-pointer appearance-none pr-8"
                        style={{ backgroundColor: "#252840", border: "1px solid #353852" }}
                      >
                        <option value="pending">Pending</option>
                        <option value="under_review">Under Review</option>
                        <option value="under_processing">Under Processing</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* User Account Status */}
                  <div className="rounded-xl p-4" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">User Account Status</div>
                    <div className="mb-3"><StatusBadge status={selected.userStatus} cfg={USER_STATUS_CFG} /></div>
                    <div className="relative">
                      <select
                        value={selected.userStatus}
                        onChange={e => updateUser(selected.id, { userStatus: e.target.value })}
                        className="w-full rounded-lg px-3 py-2.5 text-slate-100 text-[13px] font-semibold outline-none cursor-pointer appearance-none pr-8"
                        style={{ backgroundColor: "#252840", border: "1px solid #353852" }}
                      >
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="blocked">Blocked</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Fraud toggle */}
                <div className="mt-3 rounded-xl p-4 flex items-center justify-between" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-100">Fraud Flag</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Mark this user account as potentially fraudulent</div>
                  </div>
                  <button
                    onClick={() => updateUser(selected.id, { fraud: !selected.fraud })}
                    className={`px-4 py-2 rounded-lg text-[12px] font-bold border transition-all cursor-pointer ${selected.fraud
                      ? "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
                      : "bg-[#252840] text-slate-400 border-[#353852] hover:bg-[#353852]"
                      }`}
                  >
                    {selected.fraud ? "⚑ Flagged — Click to Clear" : "Flag as Fraud"}
                  </button>
                </div>
              </section>

              {/* ── Documents ─────────────────── */}
              <section>
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Submitted Documents ({selected.docs.length})
                </h4>
                <div className="flex flex-col gap-5">
                  {selected.docs.map((doc, idx) => (
                    <div key={doc.id} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
                      {/* doc header */}
                      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #2a2d3e" }}>
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-bold text-slate-500 bg-[#252840] border border-[#353852] px-2 py-0.5 rounded-md">
                            {idx + 1}/{selected.docs.length}
                          </span>
                          <span className="text-[13px] font-bold text-slate-100">{doc.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">{doc.id}</span>
                        </div>
                        <StatusBadge status={doc.kycDocStatus} cfg={DOC_STATUS_CFG} />
                      </div>

                      {/* doc image */}
                      <div className="px-4 pt-4">
                        <DocPreview doc={{ ...doc }} />
                      </div>

                      {/* doc actions */}
                      <div className="px-4 pb-4 pt-3 flex items-center gap-2.5 flex-wrap">
                        {/* Status select */}
                        <div className="relative flex-1 min-w-[160px]">
                          <select
                            value={doc.kycDocStatus}
                            onChange={e => updateDoc(selected.id, doc.id, { kycDocStatus: e.target.value })}
                            className="w-full rounded-lg px-3 py-2 text-slate-100 text-[12px] font-semibold outline-none cursor-pointer appearance-none pr-7"
                            style={{ backgroundColor: "#252840", border: "1px solid #353852" }}
                          >
                            <option value="pending">Pending</option>
                            <option value="under_review">Under Review</option>
                            <option value="under_processing">Under Processing</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                        {/* Quick buttons */}
                        <button
                          onClick={() => updateDoc(selected.id, doc.id, { kycDocStatus: "approved" })}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all cursor-pointer"
                        >
                          <CheckCircle2 size={13} /> Approve Doc
                        </button>
                        <button
                          onClick={() => updateDoc(selected.id, doc.id, { kycDocStatus: "rejected" })}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all cursor-pointer"
                        >
                          <XCircle size={13} /> Reject Doc
                        </button>
                        <button
                          onClick={() => updateDoc(selected.id, doc.id, { kycDocStatus: "under_review" })}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-all cursor-pointer"
                        >
                          <Eye size={13} /> Set Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* bottom spacer */}
              <div className="h-4" />
            </div>

            {/* Sticky footer */}
            <div className="shrink-0 px-6 py-4 flex items-center gap-3" style={{ backgroundColor: "#1e2130", borderTop: "1px solid #2a2d3e" }}>
              <button
                onClick={() => { updateUser(selected.id, { kycStatus: "approved" }); setSelected(null) }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-600 to-green-400 text-white hover:opacity-90 transition-all cursor-pointer"
              >
                <UserCheck size={15} /> Approve All & Close
              </button>
              <button
                onClick={() => { updateUser(selected.id, { kycStatus: "rejected" }); setSelected(null) }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all cursor-pointer"
              >
                <XCircle size={15} /> Reject
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-[#252840] transition-all cursor-pointer"
                style={{ border: "1px solid #353852" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
