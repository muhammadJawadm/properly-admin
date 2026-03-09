import { useState } from "react"
import {
  Users, Building2, DollarSign, ShieldX,
  Gavel, TrendingUp, AlertTriangle, CheckCircle, Clock
} from "lucide-react"
import StatCard from "../components/StatCard"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from "recharts"

const revData = {
  week: [
    { label:"Mon", revenue:11200, commission:1120 },
    { label:"Tue", revenue:14800, commission:1480 },
    { label:"Wed", revenue: 9600, commission: 960 },
    { label:"Thu", revenue:16400, commission:1640 },
    { label:"Fri", revenue:19200, commission:1920 },
    { label:"Sat", revenue:14600, commission:1460 },
    { label:"Sun", revenue:10200, commission:1020 },
  ],
  month: [
    { label:"Oct", revenue:42000, commission:4200 },
    { label:"Nov", revenue:58000, commission:5800 },
    { label:"Dec", revenue:51000, commission:5100 },
    { label:"Jan", revenue:74000, commission:7400 },
    { label:"Feb", revenue:89000, commission:8900 },
    { label:"Mar", revenue:96000, commission:9600 },
  ],
  year: [
    { label:"2020", revenue:280000, commission:28000 },
    { label:"2021", revenue:420000, commission:42000 },
    { label:"2022", revenue:580000, commission:58000 },
    { label:"2023", revenue:690000, commission:69000 },
    { label:"2024", revenue:820000, commission:82000 },
    { label:"2025", revenue:965000, commission:96500 },
  ],
}

const growthData = {
  week: [
    { label:"Mon", buyers:28, sellers:12 },
    { label:"Tue", buyers:35, sellers:15 },
    { label:"Wed", buyers:22, sellers: 9 },
    { label:"Thu", buyers:41, sellers:18 },
    { label:"Fri", buyers:48, sellers:22 },
    { label:"Sat", buyers:38, sellers:16 },
    { label:"Sun", buyers:19, sellers: 8 },
  ],
  month: [
    { label:"Oct", buyers:120, sellers: 45 },
    { label:"Nov", buyers:145, sellers: 58 },
    { label:"Dec", buyers:132, sellers: 52 },
    { label:"Jan", buyers:178, sellers: 71 },
    { label:"Feb", buyers:210, sellers: 89 },
    { label:"Mar", buyers:248, sellers:104 },
  ],
  year: [
    { label:"2020", buyers: 480, sellers:180 },
    { label:"2021", buyers: 720, sellers:280 },
    { label:"2022", buyers: 960, sellers:380 },
    { label:"2023", buyers:1240, sellers:510 },
    { label:"2024", buyers:1580, sellers:680 },
    { label:"2025", buyers:1920, sellers:840 },
  ],
}

const pieData = [
  { name:"Active",  value:142, color:"#22c55e" },
  { name:"Pending", value: 38, color:"#f59e0b" },
  { name:"Sold",    value: 91, color:"#6c63ff" },
  { name:"Closed",  value: 24, color:"#64748b" },
]

const activity = [
  { id:"U-1021", type:"KYC Submitted",   user:"Thomas Mark",    role:"Buyer",  time:"5m ago",  status:"pending" },
  { id:"D-0092", type:"New Dispute",      user:"Lerato Dlamini", role:"Seller", time:"18m ago", status:"open" },
  { id:"L-2241", type:"New Listing",      user:"Daniel Mthembu", role:"Seller", time:"32m ago", status:"review" },
  { id:"P-5512", type:"Payout Request",   user:"Sipho Nkosi",    role:"Seller", time:"1h ago",  status:"pending" },
  { id:"C-0041", type:"Compliance Alert", user:"Fatima Malik",   role:"Seller", time:"2h ago",  status:"violation" },
]

const STATUS_CLS = {
  pending:"bg-amber-500/10 text-amber-400 border-amber-500/20",
  open:"bg-red-500/10 text-red-400 border-red-500/20",
  review:"bg-blue-500/10 text-blue-400 border-blue-500/20",
  violation:"bg-red-500/10 text-red-400 border-red-500/20",
  resolved:"bg-green-500/10 text-green-400 border-green-500/20",
}
const STATUS_LBL = { pending:"Pending", open:"Open", review:"Under Review", violation:"Violation", resolved:"Resolved" }

const TT = {
  contentStyle:{ background:"#1e2130", border:"1px solid #2a2d3e", borderRadius:8, fontSize:12 },
  labelStyle:{ color:"#e2e8f0" },
}

const PeriodSelect = ({ value, onChange }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="rounded-lg px-2.5 py-1.5 text-slate-300 text-[12px] font-semibold outline-none cursor-pointer"
    style={{ backgroundColor:"#252840", border:"1px solid #353852" }}
  >
    <option value="week">This Week</option>
    <option value="month">Monthly</option>
    <option value="year">Yearly</option>
  </select>
)

const yFmt = (v, period) =>
  period === "year" ? `R${(v/1000000).toFixed(1)}M` : `R${(v/1000).toFixed(0)}k`

export default function Dashboard() {
  const [revPeriod,    setRevPeriod]    = useState("month")
  const [growthPeriod, setGrowthPeriod] = useState("month")
  const [activePie,    setActivePie]    = useState(null)

  return (
    <div className="flex flex-col gap-6">
      {/* Row 1 stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Users}      label="Total Users"      value="1,284" change="12.4%" changeType="up"   color="purple" />
        <StatCard icon={Building2}  label="Active Listings"  value="142"   change="8.1%"  changeType="up"   color="green"  />
        <StatCard icon={DollarSign} label="Revenue (Mar)"    value="R96k"  change="7.9%"  changeType="up"   color="blue"   />
        <StatCard icon={ShieldX}    label="Fraud Flags"      value="7"     change="2"     changeType="down" color="red"    />
      </div>

      {/* Row 2 stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Gavel}         label="Open Disputes"    value="12"  color="yellow" />
        <StatCard icon={CheckCircle}   label="KYC Approvals"    value="238" change="34" changeType="up" color="green" />
        <StatCard icon={TrendingUp}    label="Sales This Month" value="23"  change="5"  changeType="up" color="purple" />
        <StatCard icon={AlertTriangle} label="Compliance Flags" value="4"   color="red" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue & Commission */}
        <div className="rounded-2xl p-5" style={{ backgroundColor:"#1e2130", border:"1px solid #2a2d3e" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-100">Revenue & Commission</h3>
            <PeriodSelect value={revPeriod} onChange={setRevPeriod} />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revData[revPeriod]} margin={{ top:8, right:8, left:-10, bottom:0 }}>
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6c63ff" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gCom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#2a2d3e" strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v => yFmt(v, revPeriod)} />
              <Tooltip {...TT} />
              <Area type="monotone" dataKey="revenue"    stroke="#6c63ff" fill="url(#gRev)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="commission" stroke="#22c55e" fill="url(#gCom)" strokeWidth={2} name="Commission" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="rounded-2xl p-5" style={{ backgroundColor:"#1e2130", border:"1px solid #2a2d3e" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-100">User Growth</h3>
            <PeriodSelect value={growthPeriod} onChange={setGrowthPeriod} />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={growthData[growthPeriod]} margin={{ top:8, right:8, left:-10, bottom:0 }} barGap={4}>
              <CartesianGrid stroke="#2a2d3e" strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip {...TT} />
              <Bar dataKey="buyers"  fill="#6c63ff" radius={[4,4,0,0]} name="Buyers" />
              <Bar dataKey="sellers" fill="#a78bfa" radius={[4,4,0,0]} name="Sellers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Listing Status */}
        <div className="rounded-2xl p-6" style={{ backgroundColor:"#1e2130", border:"1px solid #2a2d3e" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-slate-100">Listing Status</h3>
            <span className="text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border bg-violet-500/10 text-violet-400 border-violet-500/20">295 total</span>
          </div>
          <div className="flex flex-col items-center gap-5">
            {/* Donut chart with center label */}
            <div className="relative flex items-center justify-center">
              <PieChart width={230} height={230}>
                <Pie
                  data={pieData}
                  cx={115} cy={115}
                  innerRadius={72} outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                  onClick={(_, i) => setActivePie(activePie === pieData[i].name ? null : pieData[i].name)}
                  style={{ cursor:"pointer" }}
                >
                  {pieData.map((e, i) => (
                    <Cell
                      key={i}
                      fill={e.color}
                      opacity={activePie && activePie !== e.name ? 0.25 : 1}
                      stroke={activePie === e.name ? "#fff" : "transparent"}
                      strokeWidth={activePie === e.name ? 2 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip {...TT} />
              </PieChart>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {activePie ? (
                  <>
                    <span className="text-[26px] font-extrabold text-slate-100 leading-none">
                      {pieData.find(p => p.name === activePie)?.value}
                    </span>
                    <span className="text-[12px] font-semibold mt-1" style={{ color: pieData.find(p => p.name === activePie)?.color }}>
                      {activePie}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[26px] font-extrabold text-slate-100 leading-none">295</span>
                    <span className="text-[12px] text-slate-500 mt-1">Total</span>
                  </>
                )}
              </div>
            </div>
            {/* Clickable legend grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {pieData.map(item => {
                const isActive = activePie === item.name
                return (
                  <button
                    key={item.name}
                    onClick={() => setActivePie(isActive ? null : item.name)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all cursor-pointer text-left"
                    style={{
                      backgroundColor: isActive ? `${item.color}18` : "#252840",
                      border: `1px solid ${isActive ? item.color : "#353852"}`,
                      boxShadow: isActive ? `0 0 12px ${item.color}22` : "none",
                    }}
                  >
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color, boxShadow: isActive ? `0 0 6px ${item.color}` : "none" }} />
                    <span className="text-[13px] flex-1" style={{ color: isActive ? item.color : "#94a3b8", fontWeight: isActive ? 700 : 500 }}>{item.name}</span>
                    <span className="text-[15px] font-extrabold" style={{ color: isActive ? item.color : "#e2e8f0" }}>{item.value}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl p-5" style={{ backgroundColor:"#1e2130", border:"1px solid #2a2d3e" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-100">Recent Activity</h3>
            <span className="text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border bg-blue-500/10 text-blue-400 border-blue-500/20">Live</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {activity.map(item => (
              <div key={item.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#252840] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md whitespace-nowrap">{item.id}</span>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-100">{item.type}</div>
                    <div className="text-[11.5px] text-slate-500">{item.user} · <span className="text-slate-400">{item.role}</span></div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${STATUS_CLS[item.status]}`}>
                    {STATUS_LBL[item.status]}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock size={11} /> {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
