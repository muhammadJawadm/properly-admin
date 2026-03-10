import { useState } from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts"

/* ─── Multi-period traffic data ─────────────────────────────────── */
const trafficByPeriod = {
  week: [
    { label:"Mon", buyers:80,  sellers:32 }, { label:"Tue", buyers:95,  sellers:40 },
    { label:"Wed", buyers:72,  sellers:28 }, { label:"Thu", buyers:115, sellers:55 },
    { label:"Fri", buyers:134, sellers:62 }, { label:"Sat", buyers:98,  sellers:45 },
    { label:"Sun", buyers:60,  sellers:22 },
  ],
  month: [
    { label:"Week 1", buyers:380, sellers:140 }, { label:"Week 2", buyers:420, sellers:160 },
    { label:"Week 3", buyers:510, sellers:200 }, { label:"Week 4", buyers:390, sellers:145 },
  ],
  year: [
    { label:"Jan", buyers:1200, sellers:480 }, { label:"Feb", buyers:1400, sellers:560 },
    { label:"Mar", buyers:1180, sellers:440 }, { label:"Apr", buyers:1620, sellers:640 },
    { label:"May", buyers:1850, sellers:720 }, { label:"Jun", buyers:1420, sellers:560 },
    { label:"Jul", buyers:1680, sellers:660 }, { label:"Aug", buyers:1960, sellers:780 },
    { label:"Sep", buyers:2100, sellers:840 }, { label:"Oct", buyers:1740, sellers:680 },
    { label:"Nov", buyers:2200, sellers:880 }, { label:"Dec", buyers:1900, sellers:740 },
  ],
}

/* ─── Multi-period revenue data ─────────────────────────────────── */
const revenueByPeriod = {
  "3months": [
    { label:"Jan", rev:74000 }, { label:"Feb", rev:89000 }, { label:"Mar", rev:96000 },
  ],
  "6months": [
    { label:"Oct", rev:42000 }, { label:"Nov", rev:58000 }, { label:"Dec", rev:51000 },
    { label:"Jan", rev:74000 }, { label:"Feb", rev:89000 }, { label:"Mar", rev:96000 },
  ],
  year: [
    { label:"Apr", rev:62000 }, { label:"May", rev:57000 }, { label:"Jun", rev:68000 },
    { label:"Jul", rev:72000 }, { label:"Aug", rev:65000 }, { label:"Sep", rev:81000 },
    { label:"Oct", rev:42000 }, { label:"Nov", rev:58000 }, { label:"Dec", rev:51000 },
    { label:"Jan", rev:74000 }, { label:"Feb", rev:89000 }, { label:"Mar", rev:96000 },
  ],
}

/* ─── Multi-period engagement data ──────────────────────────────── */
const engagementByPeriod = {
  week: [
    { name:"Property Views",  value:1120, color:"#6c63ff" },
    { name:"Messages Sent",   value:480,  color:"#22c55e" },
    { name:"Offer Submitted", value:194,  color:"#f59e0b" },
    { name:"Deals Closed",    value:38,   color:"#3b82f6" },
  ],
  month: [
    { name:"Property Views",  value:4820, color:"#6c63ff" },
    { name:"Messages Sent",   value:2140, color:"#22c55e" },
    { name:"Offer Submitted", value:834,  color:"#f59e0b" },
    { name:"Deals Closed",    value:192,  color:"#3b82f6" },
  ],
  year: [
    { name:"Property Views",  value:58400, color:"#6c63ff" },
    { name:"Messages Sent",   value:26800, color:"#22c55e" },
    { name:"Offer Submitted", value:10200, color:"#f59e0b" },
    { name:"Deals Closed",    value:2340,  color:"#3b82f6" },
  ],
}

/* ─── Top listings with multiple sort options ───────────────────── */
const topListings = [
  { id:"L-2241", title:"4-Bed House, Sandton",       views:1240, offers:8, revenue:84000,  status:"active"  },
  { id:"L-2234", title:"5-Bed Estate, Constantia",   views:987,  offers:5, revenue:255000, status:"pending" },
  { id:"L-2238", title:"3-Bed Townhouse, Durban",    views:741,  offers:3, revenue:58500,  status:"sold"    },
  { id:"L-2240", title:"2-Bed Apartment, Cape Town", views:698,  offers:4, revenue:43500,  status:"pending" },
  { id:"L-2235", title:"Studio, Pretoria",            views:512,  offers:2, revenue:18600,  status:"active"  },
]

const STATUS_CLS = {
  active:"bg-green-500/10 text-green-400 border-green-500/20",
  pending:"bg-amber-500/10 text-amber-400 border-amber-500/20",
  sold:"bg-violet-500/10 text-violet-400 border-violet-500/20",
}

const TT = {
  contentStyle:{ background:"#1e2130", border:"1px solid #2a2d3e", borderRadius:8, fontSize:12 },
  labelStyle:{ color:"#e2e8f0" },
}
const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

/* ─── Reusable dropdown ─────────────────────────────────────────── */
function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="rounded-lg px-2.5 py-1.5 text-slate-300 text-[12px] font-semibold outline-none cursor-pointer"
      style={{ backgroundColor:"#252840", border:"1px solid #353852" }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

/* ─── Card with optional right-side control ─────────────────────── */
const Card = ({ title, badge, badgeCls, control, children }) => (
  <div className="rounded-2xl p-5" style={{ backgroundColor:"#1e2130", border:"1px solid #2a2d3e" }}>
    <div className="flex items-center justify-between mb-4 gap-3">
      <h3 className="text-base font-bold text-slate-100 shrink-0">{title}</h3>
      <div className="flex items-center gap-2 flex-wrap justify-end">
        {badge && <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${badgeCls}`}>{badge}</span>}
        {control}
      </div>
    </div>
    {children}
  </div>
)

export default function Analytics() {
  const [trafficPeriod,  setTrafficPeriod]  = useState("week")
  const [revenuePeriod,  setRevenuePeriod]  = useState("6months")
  const [engagePeriod,   setEngagePeriod]   = useState("month")
  const [listingsSort,   setListingsSort]   = useState("views")

  const sortedListings = [...topListings].sort((a, b) => {
    if (listingsSort === "views")   return b.views - a.views
    if (listingsSort === "offers")  return b.offers - a.offers
    if (listingsSort === "revenue") return b.revenue - a.revenue
    return 0
  })

  const engageData = engagementByPeriod[engagePeriod]

  return (
    <div className="flex flex-col gap-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label:"Weekly Visitors", val:"748",    sub:"+12% vs last week",   clr:"text-violet-400" },
          { label:"Conversion Rate", val:"4.8%",   sub:"Offers per visitor",  clr:"text-green-400"  },
          { label:"Avg Time on Site",val:"4m 22s", sub:"Per session",         clr:"text-blue-400"   },
          { label:"Bounce Rate",     val:"31.2%",  sub:"-3.4% vs last month", clr:"text-amber-400"  },
        ].map(k => (
          <div key={k.label} className="rounded-2xl p-5" style={{ backgroundColor:"#1e2130", border:"1px solid #2a2d3e" }}>
            <div className={`text-[28px] font-extrabold mb-1 ${k.clr}`}>{k.val}</div>
            <div className="text-[13px] font-semibold text-slate-100">{k.label}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 1 — Traffic */}
        <Card
          title="User Traffic"
          badge="Buyers vs Sellers"
          badgeCls="bg-blue-500/10 text-blue-400 border-blue-500/20"
          control={
            <Select
              value={trafficPeriod}
              onChange={setTrafficPeriod}
              options={[
                { value:"week",  label:"This Week"  },
                { value:"month", label:"This Month"  },
                { value:"year",  label:"This Year"   },
              ]}
            />
          }
        >
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trafficByPeriod[trafficPeriod]} margin={{ top:8, right:8, left:-10, bottom:0 }}>
              <defs>
                <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6c63ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6c63ff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#2a2d3e" strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip {...TT} />
              <Area type="monotone" dataKey="buyers"  stroke="#6c63ff" fill="url(#gB)" strokeWidth={2} name="Buyers" />
              <Area type="monotone" dataKey="sellers" stroke="#22c55e" fill="url(#gS)" strokeWidth={2} name="Sellers" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* 2 — Revenue */}
        <Card
          title="Revenue"
          badge="Platform earnings"
          badgeCls="bg-green-500/10 text-green-400 border-green-500/20"
          control={
            <Select
              value={revenuePeriod}
              onChange={setRevenuePeriod}
              options={[
                { value:"3months", label:"Last 3 Months" },
                { value:"6months", label:"Last 6 Months" },
                { value:"year",    label:"Last 12 Months" },
              ]}
            />
          }
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueByPeriod[revenuePeriod]} margin={{ top:8, right:8, left:-10, bottom:0 }}>
              <CartesianGrid stroke="#2a2d3e" strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`R${(v/1000).toFixed(0)}k`} />
              <Tooltip {...TT} formatter={v=>[`R${v.toLocaleString()}`,"Revenue"]} />
              <Bar dataKey="rev" fill="#6c63ff" radius={[5,5,0,0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 3 — Engagement pie */}
        <Card
          title="User Engagement"
          badgeCls="bg-violet-500/10 text-violet-400 border-violet-500/20"
          control={
            <Select
              value={engagePeriod}
              onChange={setEngagePeriod}
              options={[
                { value:"week",  label:"This Week"  },
                { value:"month", label:"This Month"  },
                { value:"year",  label:"This Year"   },
              ]}
            />
          }
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <PieChart width={175} height={175} className="shrink-0">
              <Pie data={engageData} cx={82} cy={82} innerRadius={48} outerRadius={75} paddingAngle={3} dataKey="value">
                {engageData.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip {...TT} />
            </PieChart>
            <div className="flex flex-col gap-3 flex-1">
              {engageData.map((item,i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background:item.color }} />
                  <span className="text-[13px] text-slate-400 flex-1">{item.name}</span>
                  <span className="text-[13px] font-bold text-slate-100">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 4 — Top listings */}
        <Card
          title="Top Performing Listings"
          badgeCls="bg-amber-500/10 text-amber-400 border-amber-500/20"
          control={
            <Select
              value={listingsSort}
              onChange={setListingsSort}
              options={[
                { value:"views",   label:"By Views"   },
                { value:"offers",  label:"By Offers"  },
                { value:"revenue", label:"By Revenue"  },
              ]}
            />
          }
        >
          <div className="overflow-x-auto -mx-1">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom:"1px solid #2a2d3e" }}>
                  {["ID","Title","Views","Offers","Revenue","Status"].map(h => (
                    <th key={h} className={TH}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedListings.map(l => (
                  <tr key={l.id} className="hover:bg-[#252840] transition-colors" style={{ borderBottom:"1px solid #2a2d3e" }}>
                    <td className={TD}><span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{l.id}</span></td>
                    <td className={`${TD} max-w-[160px]`}><div className="text-slate-100 font-medium truncate text-[12px]">{l.title}</div></td>
                    <td className={TD}><span className="font-bold text-slate-100">{l.views.toLocaleString()}</span></td>
                    <td className={TD}><span className="font-semibold text-amber-400">{l.offers}</span></td>
                    <td className={TD}><span className="font-semibold text-green-400">R {l.revenue.toLocaleString()}</span></td>
                    <td className={TD}><span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border ${STATUS_CLS[l.status]}`}>{l.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
