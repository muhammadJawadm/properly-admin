import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts"

const trafficData = [
  { day:"Mon", buyers:80,  sellers:32 }, { day:"Tue", buyers:95,  sellers:40 },
  { day:"Wed", buyers:72,  sellers:28 }, { day:"Thu", buyers:115, sellers:55 },
  { day:"Fri", buyers:134, sellers:62 }, { day:"Sat", buyers:98,  sellers:45 },
  { day:"Sun", buyers:60,  sellers:22 },
]

const revenueData = [
  { month:"Oct", rev:42000 }, { month:"Nov", rev:58000 },
  { month:"Dec", rev:51000 }, { month:"Jan", rev:74000 },
  { month:"Feb", rev:89000 }, { month:"Mar", rev:96000 },
]

const engagementData = [
  { name:"Property Views",  value:4820, color:"#6c63ff" },
  { name:"Messages Sent",   value:2140, color:"#22c55e" },
  { name:"Offer Submitted", value:834,  color:"#f59e0b" },
  { name:"Deals Closed",    value:192,  color:"#3b82f6" },
]

const topListings = [
  { id:"L-2241", title:"4-Bed House, Sandton",       views:1240, offers:8, status:"active"  },
  { id:"L-2234", title:"5-Bed Estate, Constantia",   views:987,  offers:5, status:"pending" },
  { id:"L-2238", title:"3-Bed Townhouse, Durban",    views:741,  offers:3, status:"sold"    },
  { id:"L-2240", title:"2-Bed Apartment, Cape Town", views:698,  offers:4, status:"pending" },
  { id:"L-2235", title:"Studio, Pretoria",            views:512,  offers:2, status:"active"  },
]

const STATUS_CLS = {
  active:"bg-green-500/10 text-green-400 border-green-500/20",
  pending:"bg-amber-500/10 text-amber-400 border-amber-500/20",
  sold:"bg-violet-500/10 text-violet-400 border-violet-500/20",
}

const TT = { contentStyle:{ background:"#1e2130", border:"1px solid #2a2d3e", borderRadius:8, fontSize:12 }, labelStyle:{ color:"#e2e8f0" } }
const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

const Card = ({ title, badge, badgeCls, children }) => (
  <div className="rounded-2xl p-5" style={{ backgroundColor:"#1e2130", border:"1px solid #2a2d3e" }}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-bold text-slate-100">{title}</h3>
      {badge && <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${badgeCls}`}>{badge}</span>}
    </div>
    {children}
  </div>
)

export default function Analytics() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label:"Weekly Visitors", val:"748",    sub:"+12% vs last week",   clr:"text-violet-400" },
          { label:"Conversion Rate", val:"4.8%",   sub:"Offers per visitor",  clr:"text-green-400"  },
          { label:"Avg Time on Site","":null,"val":"4m 22s", sub:"Per session",clr:"text-blue-400"  },
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
        <Card title="Weekly Traffic" badge="Buyers vs Sellers" badgeCls="bg-blue-500/10 text-blue-400 border-blue-500/20">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trafficData} margin={{ top:8, right:8, left:-10, bottom:0 }}>
              <defs>
                <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6c63ff" stopOpacity={0.3}/><stop offset="95%" stopColor="#6c63ff" stopOpacity={0}/></linearGradient>
                <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid stroke="#2a2d3e" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip {...TT} />
              <Area type="monotone" dataKey="buyers"  stroke="#6c63ff" fill="url(#gB)" strokeWidth={2} name="Buyers" />
              <Area type="monotone" dataKey="sellers" stroke="#22c55e" fill="url(#gS)" strokeWidth={2} name="Sellers" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Monthly Revenue" badge="Last 6 months" badgeCls="bg-green-500/10 text-green-400 border-green-500/20">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} margin={{ top:8, right:8, left:-10, bottom:0 }}>
              <CartesianGrid stroke="#2a2d3e" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`R${v/1000}k`} />
              <Tooltip {...TT} formatter={v=>[`R${v.toLocaleString()}`,"Revenue"]} />
              <Bar dataKey="rev" fill="#6c63ff" radius={[5,5,0,0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Engagement pie */}
        <Card title="User Engagement" badge="All time" badgeCls="bg-violet-500/10 text-violet-400 border-violet-500/20">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <PieChart width={175} height={175} className="shrink-0">
              <Pie data={engagementData} cx={82} cy={82} innerRadius={48} outerRadius={75} paddingAngle={3} dataKey="value">
                {engagementData.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip {...TT} />
            </PieChart>
            <div className="flex flex-col gap-3 flex-1">
              {engagementData.map((item,i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background:item.color }} />
                  <span className="text-[13px] text-slate-400 flex-1">{item.name}</span>
                  <span className="text-[13px] font-bold text-slate-100">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top listings */}
        <Card title="Top Performing Listings" badge="By views" badgeCls="bg-amber-500/10 text-amber-400 border-amber-500/20">
          <div className="overflow-x-auto -mx-1">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom:"1px solid #2a2d3e" }}>
                  {["ID","Title","Views","Offers","Status"].map(h => <th key={h} className={TH}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {topListings.map(l => (
                  <tr key={l.id} className="hover:bg-[#252840] transition-colors" style={{ borderBottom:"1px solid #2a2d3e" }}>
                    <td className={TD}><span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{l.id}</span></td>
                    <td className={`${TD} max-w-[160px]`}><div className="text-slate-100 font-medium truncate text-[12px]">{l.title}</div></td>
                    <td className={TD}><span className="font-bold text-slate-100">{l.views.toLocaleString()}</span></td>
                    <td className={TD}><span className="font-semibold text-amber-400">{l.offers}</span></td>
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
