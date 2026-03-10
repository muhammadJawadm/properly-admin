import { useState } from "react"
import { Search, AlertTriangle, ShieldAlert, CheckCircle, X, FileWarning } from "lucide-react"

const VIOLATIONS = [
  { id: "CV-0041", listing: "L-2234", user: "Daniel Mthembu", type: "Price Misrepresentation", severity: "critical", status: "open", date: "2025-05-18", desc: "Listing price differs by >20% from SARS valuation. Potential misrepresentation to buyers." },
  { id: "CV-0040", listing: "L-2230", user: "Aisha Patel", type: "FICA Non-Compliance", severity: "high", status: "open", date: "2025-05-17", desc: "Agent did not complete FICA verification for seller before listing was published." },
  { id: "CV-0039", listing: "L-2241", user: "Sipho Nkosi", type: "Fraudulent Docs", severity: "critical", status: "open", date: "2025-05-17", desc: "Uploaded documents flagged as potentially altered by automated verification system." },
  { id: "CV-0038", listing: "L-2198", user: "Lerato Dlamini", type: "Disclosure Omission", severity: "medium", status: "resolved", date: "2025-05-15", desc: "Property disclosure form missing mandatory section on structural defects." },
  { id: "CV-0037", listing: "L-2192", user: "Thomas Mark", type: "Unauthorized Listing", severity: "low", status: "resolved", date: "2025-05-14", desc: "Listing posted without seller signature on mandate form." },
]

const SEV = {
  critical: { cls: "bg-red-500/10 text-red-400 border-red-500/20", icon: <AlertTriangle size={14} /> },
  high: { cls: "bg-orange-500/10 text-orange-400 border-orange-500/20", icon: <ShieldAlert size={14} /> },
  medium: { cls: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: <FileWarning size={14} /> },
  low: { cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: <AlertTriangle size={14} /> },
}

const STATUS = {
  open: "bg-red-500/10 text-red-400 border-red-500/20",
  resolved: "bg-green-500/10 text-green-400 border-green-500/20",
}

const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

export default function Compliance() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)

  const filtered = VIOLATIONS.filter(v => {
    const q = search.toLowerCase()
    const matchQ = v.type.toLowerCase().includes(q) || v.id.toLowerCase().includes(q) || v.user.toLowerCase().includes(q)
    return matchQ && (filter === "all" || v.severity === filter || v.status === filter)
  })

  const criticalOpen = VIOLATIONS.filter(v => v.severity === "critical" && v.status === "open")

  return (
    <div className="flex flex-col gap-6">
      {/* Critical alert banner */}
      {criticalOpen.length > 0 && (
        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-500/8 border border-red-500/25">
          <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-red-300">{criticalOpen.length} Critical Violation{criticalOpen.length > 1 ? "s" : ""} Require Immediate Attention</div>
            <div className="text-[12px] text-red-400/80 mt-0.5">
              {criticalOpen.map(v => v.id).join(", ")} — review and resolve immediately to maintain platform compliance.
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Critical", val: 2, cls: "bg-red-500/10 border-red-500/20 text-red-400" },
          { label: "High", val: 1, cls: "bg-orange-500/10 border-orange-500/20 text-orange-400" },
          { label: "Medium", val: 1, cls: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
          { label: "Low", val: 1, cls: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
            <div className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border mb-3 ${s.cls}`}>{s.label}</div>
            <div className="text-[28px] font-extrabold text-slate-100">{s.val}</div>
            <div className="text-[12px] text-slate-500">violations</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
        <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap" style={{ borderBottom: "1px solid #2a2d3e" }}>
          <h3 className="text-base font-bold text-slate-100">Compliance Violations</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <Search size={14} className="text-slate-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search violations..." className="bg-transparent outline-none text-slate-100 text-[13px] w-36 placeholder:text-slate-500" />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-lg px-3 py-2 text-slate-400 text-[13px] outline-none cursor-pointer" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <option value="all">All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto w-[100vw]">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2d3e" }}>
                {["ID", "Violation Type", "User", "Listing", "Severity", "Status", "Date", "Actions"].map(h => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id} className="hover:bg-[#252840] transition-colors" style={{ borderBottom: "1px solid #2a2d3e" }}>
                  <td className={TD}><span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{v.id}</span></td>
                  <td className={`${TD} max-w-[220px]`}><div className="text-slate-100 font-medium text-[13px]">{v.type}</div></td>
                  <td className={TD}>{v.user}</td>
                  <td className={TD}><span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">{v.listing}</span></td>
                  <td className={TD}>
                    <span className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border w-fit ${SEV[v.severity].cls}`}>
                      {SEV[v.severity].icon} {v.severity}
                    </span>
                  </td>
                  <td className={TD}><span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${STATUS[v.status]}`}>{v.status}</span></td>
                  <td className={TD}>{v.date}</td>
                  <td className={TD}>
                    <button onClick={() => setSelected(v)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#252840] text-slate-300 border border-[#353852] hover:bg-[#353852] transition-all cursor-pointer">
                      <CheckCircle size={13} /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]" onClick={() => setSelected(null)}>
          <div className="rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)] w-[500px] max-w-[95vw]" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #2a2d3e" }}>
              <div>
                <h3 className="text-base font-bold text-slate-100">Violation Review</h3>
                <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{selected.id}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-200 transition-colors"><X size={18} /></button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "User", val: selected.user },
                  { label: "Listing", val: <span className="text-blue-400">{selected.listing}</span> },
                  { label: "Severity", val: <span className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border w-fit ${SEV[selected.severity].cls}`}>{SEV[selected.severity].icon}{selected.severity}</span> },
                  { label: "Status", val: <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border ${STATUS[selected.status]}`}>{selected.status}</span> },
                ].map(r => (
                  <div key={r.label} className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                    <div className="text-[11px] text-slate-500 mb-1">{r.label}</div>
                    <div className="text-sm font-semibold text-slate-200">{r.val}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                <div className="text-[11px] text-slate-500 mb-2">Violation Type</div>
                <div className="text-[14px] font-semibold text-slate-100">{selected.type}</div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                <div className="text-[11px] text-slate-500 mb-2">Description</div>
                <p className="text-sm text-slate-300 leading-relaxed">{selected.desc}</p>
              </div>
              <div className="flex gap-2.5">
                <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all cursor-pointer">
                  Mark Resolved
                </button>
                <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all cursor-pointer">
                  Escalate
                </button>
                <button onClick={() => setSelected(null)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-[#252840] transition-all cursor-pointer" style={{ border: "1px solid #353852" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
