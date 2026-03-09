import { useState } from "react"
import { Search, ShieldCheck, ShieldX, Eye, X, Check, XCircle, AlertTriangle } from "lucide-react"

const USERS = [
  { id: "U-1001", name: "Sipho Nkosi",    email: "sipho@email.com",   role: "Seller", status: "pending",  fraud: false, docs: ["ID Doc", "Bank Statement"],          submitted: "2025-05-18" },
  { id: "U-1002", name: "Lerato Dlamini", email: "lerato@email.com",  role: "Buyer",  status: "approved", fraud: false, docs: ["ID Doc", "Proof of Address"],         submitted: "2025-05-17" },
  { id: "U-1003", name: "Thomas Mark",    email: "thomas@email.com",  role: "Seller", status: "pending",  fraud: true,  docs: ["ID Doc"],                             submitted: "2025-05-18" },
  { id: "U-1004", name: "Fatima Malik",   email: "fatima@email.com",  role: "Buyer",  status: "rejected", fraud: false, docs: ["ID Doc", "Bank Statement"],           submitted: "2025-05-16" },
  { id: "U-1005", name: "Daniel Mthembu", email: "daniel@email.com",  role: "Seller", status: "approved", fraud: false, docs: ["ID Doc", "Proof of Address", "FICA"], submitted: "2025-05-15" },
  { id: "U-1006", name: "Aisha Patel",    email: "aisha@email.com",   role: "Buyer",  status: "pending",  fraud: true,  docs: ["ID Doc"],                             submitted: "2025-05-18" },
]

const STATUS = {
  pending:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  approved: "bg-green-500/10 text-green-400 border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
}

const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

export default function Verification() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)

  const filtered = USERS.filter(u => {
    const q = search.toLowerCase()
    const matchQ = u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const matchF = filter === "all" || u.status === filter || (filter === "fraud" && u.fraud)
    return matchQ && matchF
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Pending Review", val: 3, cls: "bg-amber-500/10 border-amber-500/20",  icon: <AlertTriangle size={18} className="text-amber-400" /> },
          { label: "Approved",       val: 2, cls: "bg-green-500/10 border-green-500/20",  icon: <ShieldCheck   size={18} className="text-green-400" /> },
          { label: "Rejected",       val: 1, cls: "bg-red-500/10 border-red-500/20",      icon: <ShieldX       size={18} className="text-red-400" />   },
          { label: "Fraud Flags",    val: 2, cls: "bg-red-500/10 border-red-500/20",      icon: <AlertTriangle size={18} className="text-red-400" />   },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-3.5 ${s.cls}`}>{s.icon}</div>
            <div className="text-[26px] font-extrabold text-slate-100">{s.val}</div>
            <div className="text-[13px] text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap" style={{ borderBottom: "1px solid #2a2d3e" }}>
          <h3 className="text-base font-bold text-slate-100">Identity Verification Queue</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <Search size={14} className="text-slate-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search users..."
                className="bg-transparent outline-none text-slate-100 text-[13px] w-36 placeholder:text-slate-500"
              />
            </div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="rounded-lg px-3 py-2 text-slate-400 text-[13px] outline-none cursor-pointer"
              style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="fraud">Fraud Flags</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2d3e" }}>
                {["User ID", "Name", "Role", "Status", "Fraud Flag", "Submitted", "Actions"].map(h => (
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
                    <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${
                      u.role === "Seller"
                        ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className={TD}>
                    <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${STATUS[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className={TD}>
                    {u.fraud ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full w-fit">
                        <AlertTriangle size={11} /> Flagged
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full w-fit">
                        Clear
                      </span>
                    )}
                  </td>
                  <td className={TD}>{u.submitted}</td>
                  <td className={TD}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelected(u)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#252840] text-slate-300 border border-[#353852] hover:bg-[#353852] transition-all cursor-pointer"
                      >
                        <Eye size={13} /> Review
                      </button>
                      {u.status === "pending" && (
                        <>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all cursor-pointer">
                            <Check size={13} />
                          </button>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all cursor-pointer">
                            <XCircle size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]"
          onClick={() => setSelected(null)}
        >
          <div
            className="rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)] w-[480px] max-w-[95vw]"
            style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #2a2d3e" }}>
              <h3 className="text-base font-bold text-slate-100">User Details — {selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-200 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4">
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-violet-400 rounded-xl flex items-center justify-center text-[18px] font-bold text-white">
                  {selected.name[0]}
                </div>
                <div>
                  <div className="text-[16px] font-bold text-slate-100">{selected.name}</div>
                  <div className="text-[13px] text-slate-400">{selected.email} · {selected.role}</div>
                </div>
              </div>

              {/* KYC + Fraud */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                  <div className="text-[11px] text-slate-500 mb-1">KYC Status</div>
                  <span className={`text-[12px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${STATUS[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>
                <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                  <div className="text-[11px] text-slate-500 mb-1">Fraud Flag</div>
                  <span className={`text-[12px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${
                    selected.fraud
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-green-500/10 text-green-400 border-green-500/20"
                  }`}>
                    {selected.fraud ? "Flagged" : "Clear"}
                  </span>
                </div>
              </div>

              {/* Documents */}
              <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                <div className="text-[11px] text-slate-500 mb-2">Submitted Documents</div>
                <div className="flex flex-wrap gap-2">
                  {selected.docs.map(d => (
                    <span key={d} className="text-[12px] font-medium text-slate-300 bg-[#1e2130] border border-[#2a2d3e] px-3 py-1 rounded-lg">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Submission date */}
              <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                <div className="text-[11px] text-slate-500 mb-1">Submitted On</div>
                <div className="text-sm font-semibold text-slate-200">{selected.submitted}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all cursor-pointer">
                  <Check size={15} /> Approve
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all cursor-pointer">
                  <XCircle size={15} /> Reject
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-[#252840] transition-all cursor-pointer"
                  style={{ border: "1px solid #353852" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
