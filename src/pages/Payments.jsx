import { useState } from "react"
import { Search, DollarSign, TrendingUp, CreditCard, ArrowDownRight, Pencil, Check, Percent } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const TXNS = [
  { id: "TXN-8821", user: "Sipho Nkosi", type: "Payout", amount: "R 24,500", status: "completed", date: "2025-05-18", ref: "L-2198" },
  { id: "TXN-8820", user: "Lerato Dlamini", type: "Commission", amount: "R  4,800", status: "pending", date: "2025-05-18", ref: "L-2192" },
  { id: "TXN-8819", user: "Thomas Mark", type: "Deposit", amount: "R 15,000", status: "completed", date: "2025-05-17", ref: "L-2241" },
  { id: "TXN-8818", user: "Fatima Malik", type: "Refund", amount: "R  8,200", status: "failed", date: "2025-05-16", ref: "L-2188" },
  { id: "TXN-8817", user: "Daniel Mthembu", type: "Payout", amount: "R 38,000", status: "completed", date: "2025-05-15", ref: "L-2171" },
  { id: "TXN-8816", user: "Aisha Patel", type: "Commission", amount: "R  6,120", status: "pending", date: "2025-05-15", ref: "L-2165" },
]

const revenueByPeriod = {
  week: [
    { label: "Mon", amount: 11200 }, { label: "Tue", amount: 14800 },
    { label: "Wed", amount: 9600 }, { label: "Thu", amount: 16400 },
    { label: "Fri", amount: 19200 }, { label: "Sat", amount: 14600 },
    { label: "Sun", amount: 10200 },
  ],
  month: [
    { label: "Week 1", amount: 21000 }, { label: "Week 2", amount: 28000 },
    { label: "Week 3", amount: 32000 }, { label: "Week 4", amount: 15000 },
  ],
  "6months": [
    { label: "Oct", amount: 42000 }, { label: "Nov", amount: 58000 },
    { label: "Dec", amount: 51000 }, { label: "Jan", amount: 74000 },
    { label: "Feb", amount: 89000 }, { label: "Mar", amount: 96000 },
  ],
  year: [
    { label: "Jan", amount: 62000 }, { label: "Feb", amount: 75000 },
    { label: "Mar", amount: 96000 }, { label: "Apr", amount: 88000 },
    { label: "May", amount: 72000 }, { label: "Jun", amount: 84000 },
    { label: "Jul", amount: 91000 }, { label: "Aug", amount: 78000 },
    { label: "Sep", amount: 97000 }, { label: "Oct", amount: 42000 },
    { label: "Nov", amount: 58000 }, { label: "Dec", amount: 51000 },
  ],
}

const STATUS = {
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
}
const TYPE_CLR = { Payout: "text-green-400", Commission: "text-violet-400", Deposit: "text-blue-400", Refund: "text-red-400" }
const TT = { contentStyle: { background: "#1e2130", border: "1px solid #2a2d3e", borderRadius: 8, fontSize: 12 }, labelStyle: { color: "#e2e8f0" } }
const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

export default function Payments() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [revPeriod, setRevPeriod] = useState("6months")
  const [commRate, setCommRate] = useState(1.0)
  const [editingRate, setEditingRate] = useState(false)
  const [draftRate, setDraftRate] = useState("")

  const filtered = TXNS.filter(t => {
    const q = search.toLowerCase()
    const match = t.user.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.type.toLowerCase().includes(q)
    return match && (filter === "all" || t.status === filter)
  })

  function startEditRate() {
    setDraftRate(String(commRate))
    setEditingRate(true)
  }

  function saveGlobalRate() {
    const val = parseFloat(draftRate)
    if (!isNaN(val) && val >= 0 && val <= 100) setCommRate(val)
    setEditingRate(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: DollarSign, label: "Total Revenue", val: "R 96,000", sub: "+7.9% vs last month", clr: "text-green-400" },
          { icon: ArrowDownRight, label: "Total Payouts", val: "R 62,500", sub: "3 completed", clr: "text-violet-400" },
          { icon: CreditCard, label: "Commissions", val: "R 10,920", sub: "2 pending", clr: "text-blue-400" },
          { icon: TrendingUp, label: "Pending Payments", val: "2", sub: "R 10,920 on hold", clr: "text-amber-400" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
            <s.icon size={18} className={`${s.clr} mb-3`} />
            <div className="text-[24px] font-extrabold text-slate-100 mb-0.5">{s.val}</div>
            <div className="text-[13px] text-slate-500 font-medium">{s.label}</div>
            <div className="text-[11px] text-slate-600 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-100">Revenue Overview</h3>
          <select
            value={revPeriod}
            onChange={e => setRevPeriod(e.target.value)}
            className="rounded-lg px-2.5 py-1.5 text-slate-300 text-[12px] font-semibold outline-none cursor-pointer"
            style={{ backgroundColor: "#252840", border: "1px solid #353852" }}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="6months">Last 6 Months</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueByPeriod[revPeriod]} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#2a2d3e" strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `R${(v / 1000).toFixed(0)}k`} />
            <Tooltip {...TT} formatter={v => [`R ${v.toLocaleString()}`, "Revenue"]} />
            <Bar dataKey="amount" fill="#6c63ff" radius={[5, 5, 0, 0]} name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Global Commission Rate */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-100">Platform Commission Rate</h3>
            <p className="text-[12px] text-slate-500 mt-0.5">Applied uniformly to all listings on the platform</p>
          </div>
          {!editingRate && (
            <button
              onClick={startEditRate}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/30 hover:bg-violet-500/20 transition-all cursor-pointer"
            >
              <Pencil size={12} /> Edit Rate
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* Big rate display */}
          <div className="flex items-center gap-4 rounded-2xl px-6 py-5 flex-shrink-0" style={{ backgroundColor: "#252840", border: "1px solid #353852" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)" }}>
              <Percent size={20} className="text-[#6c63ff]" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">Current Rate</p>
              <p className="text-[36px] font-extrabold leading-none" style={{ color: "#6c63ff" }}>{commRate.toFixed(1)}<span className="text-[20px] text-slate-400">%</span></p>
            </div>
          </div>

          {/* Edit form or info chips */}
          {editingRate ? (
            <div className="flex flex-col gap-3 flex-1">
              <label className="text-[12px] font-semibold text-slate-400">New Commission Rate (%)</label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-[200px]">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={draftRate}
                    onChange={e => setDraftRate(e.target.value)}
                    className="w-full rounded-xl px-3.5 py-2.5 text-slate-100 text-[15px] font-bold outline-none pr-10"
                    style={{ backgroundColor: "#0f1117", border: "1px solid #6c63ff" }}
                    placeholder="e.g. 1.5"
                    autoFocus
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">%</span>
                </div>
                <button
                  onClick={saveGlobalRate}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all cursor-pointer"
                  style={{ background: "linear-gradient(135deg,#6c63ff,#9b59b6)" }}
                >
                  <Check size={14} /> Save
                </button>
                <button
                  onClick={() => setEditingRate(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-[#252840] transition-all cursor-pointer"
                  style={{ border: "1px solid #353852" }}
                >
                  Cancel
                </button>
              </div>
              <span className="text-[11px] text-slate-500">Enter a value between 0 and 100. This will apply to all platform listings.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              {[
                { label: "Commission Type", val: "Percentage of listing price" },
                { label: "Applies To", val: "All platform listings" },
                { label: "VAT Inclusive", val: "Yes – 1% + VAT" },
              ].map(item => (
                <div key={item.label} className="rounded-xl px-4 py-3" style={{ backgroundColor: "#252840", border: "1px solid #353852" }}>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-[13px] font-semibold text-slate-200">{item.val}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
        <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap" style={{ borderBottom: "1px solid #2a2d3e" }}>
          <h3 className="text-base font-bold text-slate-100">Transaction Ledger</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <Search size={14} className="text-slate-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions..." className="bg-transparent outline-none text-slate-100 text-[13px] w-40 placeholder:text-slate-500" />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-lg px-3 py-2 text-slate-400 text-[13px] outline-none cursor-pointer" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto w-[100vw]">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2d3e" }}>
                {["Txn ID", "User", "Type", "Amount", "Status", "Date", "Ref Listing"].map(h => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-[#252840] transition-colors" style={{ borderBottom: "1px solid #2a2d3e" }}>
                  <td className={TD}><span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{t.id}</span></td>
                  <td className={TD}><span className="text-slate-100 font-medium">{t.user}</span></td>
                  <td className={TD}><span className={`text-[13px] font-semibold ${TYPE_CLR[t.type]}`}>{t.type}</span></td>
                  <td className={TD}><span className="font-bold text-slate-100">{t.amount}</span></td>
                  <td className={TD}><span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${STATUS[t.status]}`}>{t.status}</span></td>
                  <td className={TD}>{t.date}</td>
                  <td className={TD}><span className="text-[12px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">{t.ref}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}
