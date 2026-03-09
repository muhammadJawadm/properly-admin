import { useState } from "react"
import { Search, X, Gavel, MessageSquare } from "lucide-react"

const DISPUTES = [
  { id:"D-0091", title:"Deposit not returned",        buyer:"Lerato Dlamini", seller:"Sipho Nkosi",    amount:"R 12,500", status:"escalated",    category:"Deposit",        date:"2025-05-18", desc:"Buyer paid deposit but seller refuses to return after deal fell through." },
  { id:"D-0092", title:"Property misrepresented",     buyer:"Thomas Mark",    seller:"Fatima Malik",   amount:"R 3,200",  status:"open",         category:"Listing",        date:"2025-05-18", desc:"Photos did not match the actual property condition on viewing day." },
  { id:"D-0088", title:"Commission dispute",           buyer:"Daniel Mthembu", seller:"Aisha Patel",    amount:"R 8,400",  status:"under_review", category:"Commission",     date:"2025-05-16", desc:"Disagreement over commission split agreed during offer stage." },
  { id:"D-0085", title:"Transfer delay",               buyer:"Sipho Nkosi",    seller:"Thomas Mark",    amount:"R 0",      status:"resolved",     category:"Transfer",       date:"2025-05-14", desc:"Transfer delayed more than 30 days with no communication from seller." },
  { id:"D-0082", title:"Agent not responsive",         buyer:"Fatima Malik",   seller:"Lerato Dlamini", amount:"R 0",      status:"resolved",     category:"Communication",  date:"2025-05-12", desc:"Agent stopped responding for two weeks prior to signing date." },
]

const STATUS = {
  open:         { cls:"bg-red-500/10 text-red-400 border-red-500/20",         label:"Open" },
  under_review: { cls:"bg-amber-500/10 text-amber-400 border-amber-500/20",   label:"Under Review" },
  resolved:     { cls:"bg-green-500/10 text-green-400 border-green-500/20",   label:"Resolved" },
  escalated:    { cls:"bg-violet-500/10 text-violet-400 border-violet-500/20",label:"Escalated" },
}

const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

export default function Disputes() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState("")

  const filtered = DISPUTES.filter(d => {
    const q = search.toLowerCase()
    const matchQ = d.title.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.buyer.toLowerCase().includes(q)
    const matchF = filter === "all" || d.status === filter
    return matchQ && matchF
  })

  const counts = { open:1, under_review:1, resolved:2, escalated:1 }

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.entries(STATUS).map(([key, s]) => (
          <div key={key} className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border mb-3 ${s.cls}`}>{s.label}</div>
            <div className="text-[28px] font-extrabold text-slate-100">{counts[key]}</div>
            <div className="text-[12px] text-slate-500">disputes</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
        <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap" style={{ borderBottom: "1px solid #2a2d3e" }}>
          <h3 className="text-base font-bold text-slate-100">All Disputes</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <Search size={14} className="text-slate-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search disputes..." className="bg-transparent outline-none text-slate-100 text-[13px] w-36 placeholder:text-slate-500" />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-lg px-3 py-2 text-slate-400 text-[13px] outline-none cursor-pointer" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2d3e" }}>
                {["ID","Title","Buyer","Seller","Amount","Status","Category","Date","Actions"].map(h => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-[#252840] transition-colors" style={{ borderBottom: "1px solid #2a2d3e" }}>
                  <td className={TD}><span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{d.id}</span></td>
                  <td className={`${TD} max-w-[200px]`}><div className="text-slate-100 font-medium truncate">{d.title}</div></td>
                  <td className={TD}>{d.buyer}</td>
                  <td className={TD}>{d.seller}</td>
                  <td className={TD}><span className="font-semibold text-slate-100">{d.amount}</span></td>
                  <td className={TD}><span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${STATUS[d.status].cls}`}>{STATUS[d.status].label}</span></td>
                  <td className={TD}><span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold px-2 py-0.5 rounded-full">{d.category}</span></td>
                  <td className={TD}>{d.date}</td>
                  <td className={TD}>
                    <button onClick={() => { setSelected(d); setNote("") }} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#252840] text-slate-300 border border-[#353852] hover:bg-[#353852] transition-all cursor-pointer">
                      <Gavel size={13} /> Manage
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
          <div className="rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)] w-[520px] max-w-[95vw]" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #2a2d3e" }}>
              <div>
                <h3 className="text-base font-bold text-slate-100">{selected.title}</h3>
                <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{selected.id}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-200 transition-colors"><X size={18} /></button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                  <div className="text-[11px] text-slate-500 mb-1">Buyer</div>
                  <div className="text-sm font-semibold text-slate-100">{selected.buyer}</div>
                </div>
                <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                  <div className="text-[11px] text-slate-500 mb-1">Seller</div>
                  <div className="text-sm font-semibold text-slate-100">{selected.seller}</div>
                </div>
                <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                  <div className="text-[11px] text-slate-500 mb-1">Amount</div>
                  <div className="text-sm font-bold text-slate-100">{selected.amount}</div>
                </div>
                <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                  <div className="text-[11px] text-slate-500 mb-1">Status</div>
                  <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border ${STATUS[selected.status].cls}`}>{STATUS[selected.status].label}</span>
                </div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                <div className="text-[11px] text-slate-500 mb-2">Description</div>
                <p className="text-sm text-slate-300 leading-relaxed">{selected.desc}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-slate-400 flex items-center gap-1.5"><MessageSquare size={12} /> Resolution Note</label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={3}
                  placeholder="Add resolution note..."
                  className="w-full rounded-xl px-3.5 py-2.5 text-slate-100 text-[13px] outline-none resize-none placeholder:text-slate-500"
                  style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}
                />
              </div>
              <div className="flex gap-2.5">
                <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all cursor-pointer">Resolve</button>
                <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/30 hover:bg-violet-500/20 transition-all cursor-pointer">Escalate</button>
                <button onClick={() => setSelected(null)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-[#252840] transition-all cursor-pointer" style={{ border: "1px solid #353852" }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
