import { useState } from "react"
import { Search, MapPin, Eye, X } from "lucide-react"

const LISTINGS = [
  { id:"L-2241", title:"4-Bed House, Sandton",        seller:"Sipho Nkosi",    price:"R 2,800,000", commission:"R 84,000", status:"active",  type:"House",      area:"Sandton",      date:"2025-05-18" },
  { id:"L-2240", title:"2-Bed Apartment, Cape Town",  seller:"Lerato Dlamini", price:"R 1,450,000", commission:"R 43,500", status:"pending", type:"Apartment",  area:"Cape Town",    date:"2025-05-17" },
  { id:"L-2238", title:"3-Bed Townhouse, Durban",     seller:"Thomas Mark",    price:"R 1,950,000", commission:"R 58,500", status:"sold",    type:"Townhouse",  area:"Durban",       date:"2025-05-16" },
  { id:"L-2235", title:"Studio, Pretoria",             seller:"Fatima Malik",   price:"R   620,000", commission:"R 18,600", status:"active",  type:"Apartment",  area:"Pretoria",     date:"2025-05-15" },
  { id:"L-2234", title:"5-Bed Estate, Constantia",    seller:"Daniel Mthembu", price:"R 8,500,000", commission:"R255,000", status:"pending", type:"Estate",     area:"Constantia",   date:"2025-05-14" },
  { id:"L-2230", title:"2-Bed Flat, Johannesburg",    seller:"Aisha Patel",    price:"R   980,000", commission:"R 29,400", status:"closed",  type:"Apartment",  area:"Johannesburg", date:"2025-05-12" },
]

const STATUS = {
  active:  "bg-green-500/10 text-green-400 border-green-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  sold:    "bg-violet-500/10 text-violet-400 border-violet-500/20",
  closed:  "bg-slate-500/10 text-slate-400 border-slate-500/20",
}

const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

export default function Listings() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)

  const filtered = LISTINGS.filter(l => {
    const q = search.toLowerCase()
    const matchQ = l.title.toLowerCase().includes(q) || l.id.toLowerCase().includes(q) || l.seller.toLowerCase().includes(q)
    return matchQ && (filter === "all" || l.status === filter)
  })

  const counts = { active:2, pending:2, sold:1, closed:1 }

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { key:"active",  label:"Active",  color:"bg-green-500/10 border-green-500/20 text-green-400" },
          { key:"pending", label:"Pending", color:"bg-amber-500/10 border-amber-500/20 text-amber-400" },
          { key:"sold",    label:"Sold",    color:"bg-violet-500/10 border-violet-500/20 text-violet-400" },
          { key:"closed",  label:"Closed",  color:"bg-slate-500/10 border-slate-500/20 text-slate-400" },
        ].map(s => (
          <div key={s.key} className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
            <div className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border mb-3 ${s.color}`}>{s.label}</div>
            <div className="text-[28px] font-extrabold text-slate-100">{counts[s.key]}</div>
            <div className="text-[12px] text-slate-500">listings</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
        <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap" style={{ borderBottom: "1px solid #2a2d3e" }}>
          <h3 className="text-base font-bold text-slate-100">All Property Listings</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <Search size={14} className="text-slate-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..." className="bg-transparent outline-none text-slate-100 text-[13px] w-36 placeholder:text-slate-500" />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-lg px-3 py-2 text-slate-400 text-[13px] outline-none cursor-pointer" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2d3e" }}>
                {["ID","Property","Seller","Price","Commission","Status","Type","Area","Listed","Actions"].map(h => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-[#252840] transition-colors" style={{ borderBottom: "1px solid #2a2d3e" }}>
                  <td className={TD}><span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{l.id}</span></td>
                  <td className={`${TD} max-w-[200px]`}><div className="text-slate-100 font-medium truncate">{l.title}</div></td>
                  <td className={TD}>{l.seller}</td>
                  <td className={TD}><span className="font-bold text-slate-100">{l.price}</span></td>
                  <td className={TD}><span className="text-green-400 font-semibold">{l.commission}</span></td>
                  <td className={TD}><span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${STATUS[l.status]}`}>{l.status}</span></td>
                  <td className={TD}><span className="text-[12px] font-medium bg-[#252840] border border-[#353852] text-slate-300 px-2 py-0.5 rounded-lg">{l.type}</span></td>
                  <td className={TD}><span className="flex items-center gap-1 text-slate-400 text-[13px]"><MapPin size={11} className="text-slate-500" />{l.area}</span></td>
                  <td className={TD}>{l.date}</td>
                  <td className={TD}>
                    <button onClick={() => setSelected(l)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#252840] text-slate-300 border border-[#353852] hover:bg-[#353852] transition-all cursor-pointer">
                      <Eye size={13} /> View
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
          <div className="rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)] w-[480px] max-w-[95vw]" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #2a2d3e" }}>
              <div>
                <h3 className="text-base font-bold text-slate-100">{selected.title}</h3>
                <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{selected.id}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-200 transition-colors"><X size={18} /></button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label:"Seller",    val:selected.seller },
                  { label:"Status",    val:<span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border ${STATUS[selected.status]}`}>{selected.status}</span> },
                  { label:"Price",     val:<span className="font-bold text-slate-100">{selected.price}</span> },
                  { label:"Commission",val:<span className="font-bold text-green-400">{selected.commission}</span> },
                  { label:"Type",      val:selected.type },
                  { label:"Area",      val:<span className="flex items-center gap-1"><MapPin size={11} />{selected.area}</span> },
                ].map(r => (
                  <div key={r.label} className="rounded-xl p-3" style={{ backgroundColor: "#252840" }}>
                    <div className="text-[11px] text-slate-500 mb-1">{r.label}</div>
                    <div className="text-sm font-semibold text-slate-200">{r.val}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setSelected(null)} className="w-full py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-[#252840] transition-all cursor-pointer" style={{ border: "1px solid #353852" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
