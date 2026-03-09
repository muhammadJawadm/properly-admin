import {
  Users, Building2, DollarSign, ShieldX,
  Gavel, TrendingUp, AlertTriangle, CheckCircle, Clock
} from "lucide-react"
import StatCard from "../components/StatCard"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from "recharts"

const revenueData = [
  { month: "Oct", revenue: 42000, commission: 4200 },
  { month: "Nov", revenue: 58000, commission: 5800 },
  { month: "Dec", revenue: 51000, commission: 5100 },
  { month: "Jan", revenue: 74000, commission: 7400 },
  { month: "Feb", revenue: 89000, commission: 8900 },
  { month: "Mar", revenue: 96000, commission: 9600 },
]

const userGrowthData = [
  { month: "Oct", buyers: 120, sellers: 45 },
  { month: "Nov", buyers: 145, sellers: 58 },
  { month: "Dec", buyers: 132, sellers: 52 },
  { month: "Jan", buyers: 178, sellers: 71 },
  { month: "Feb", buyers: 210, sellers: 89 },
  { month: "Mar", buyers: 248, sellers: 104 },
]

const pieData = [
  { name: "Active",  value: 142, color: "#22c55e" },
  { name: "Pending", value: 38,  color: "#f59e0b" },
  { name: "Sold",    value: 91,  color: "#6c63ff" },
  { name: "Closed",  value: 24,  color: "#64748b" },
]

const activity = [
  { id: "U-1021", type: "KYC Submitted",    user: "Thomas Mark",    role: "Buyer",  time: "5m ago",  status: "pending" },
  { id: "D-0092", type: "New Dispute",       user: "Lerato Dlamini", role: "Seller", time: "18m ago", status: "open" },
  { id: "L-2241", type: "New Listing",       user: "Daniel Mthembu", role: "Seller", time: "32m ago", status: "review" },
  { id: "P-5512", type: "Payout Request",    user: "Sipho Nkosi",    role: "Seller", time: "1h ago",  status: "pending" },
  { id: "C-0041", type: "Compliance Alert",  user: "Fatima Malik",   role: "Seller", time: "2h ago",  status: "violation" },
]

const STATUS_CLS = {
  pending:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
  open:      "bg-red-500/10 text-red-400 border-red-500/20",
  review:    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  violation: "bg-red-500/10 text-red-400 border-red-500/20",
  resolved:  "bg-green-500/10 text-green-400 border-green-500/20",
}
const STATUS_LBL = { pending: "Pending", open: "Open", review: "Under Review", violation: "Violation", resolved: "Resolved" }

const TT = {
  contentStyle: { background: "#1e2130", border: "1px solid #2a2d3e", borderRadius: 8, fontSize: 12 },
  labelStyle:   { color: "#e2e8f0" },
}

const Card = ({ children, badge, title, badgeCls }) => (
  <div className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-bold text-slate-100">{title}</h3>
      {badge && <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${badgeCls}`}>{badge}</span>}
    </div>
    {children}
  </div>
)

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Row 1 stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Users}      label="Total Users"       value="1,284" change="12.4%" changeType="up"   color="purple" />
        <StatCard icon={Building2}  label="Active Listings"   value="142"   change="8.1%"  changeType="up"   color="green"  />
        <StatCard icon={DollarSign} label="Revenue (Mar)"     value="R96k"  change="7.9%"  changeType="up"   color="blue"   />
        <StatCard icon={ShieldX}    label="Fraud Flags"       value="7"     change="2"     changeType="down" color="red"    />
      </div>

      {/* Row 2 stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Gavel}         label="Open Disputes"     value="12"  color="yellow" />
        <StatCard icon={CheckCircle}   label="KYC Approvals"     value="238" change="34"   changeType="up" color="green" />
        <StatCard icon={TrendingUp}    label="Sales This Month"  value="23"  change="5"    changeType="up" color="purple" />
        <StatCard icon={AlertTriangle} label="Compliance Flags"  value="4"   color="red" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Revenue & Commission" badge="Last 6 months" badgeCls="bg-green-500/10 text-green-400 border-green-500/20">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
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
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `R${v/1000}k`} />
              <Tooltip {...TT} />
              <Area type="monotone" dataKey="revenue"    stroke="#6c63ff" fill="url(#gRev)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="commission" stroke="#22c55e" fill="url(#gCom)" strokeWidth={2} name="Commission" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="User Growth" badge="Buyers vs Sellers" badgeCls="bg-blue-500/10 text-blue-400 border-blue-500/20">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={userGrowthData} margin={{ top: 8, right: 8, left: -10, bottom: 0 }} barGap={4}>
              <CartesianGrid stroke="#2a2d3e" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...TT} />
              <Bar dataKey="buyers"  fill="#6c63ff" radius={[4,4,0,0]} name="Buyers" />
              <Bar dataKey="sellers" fill="#a78bfa" radius={[4,4,0,0]} name="Sellers" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pie */}
        <Card title="Listing Status" badge="295 total" badgeCls="bg-violet-500/10 text-violet-400 border-violet-500/20">
          <div className="flex items-center gap-5">
            <PieChart width={175} height={175}>
              <Pie data={pieData} cx={82} cy={82} innerRadius={48} outerRadius={75} paddingAngle={3} dataKey="value">
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip {...TT} />
            </PieChart>
            <div className="flex flex-col gap-3 flex-1">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                  <span className="text-[13px] text-slate-400 flex-1">{item.name}</span>
                  <span className="text-[13px] font-bold text-slate-100">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Activity */}
        <Card title="Recent Activity" badge="Live" badgeCls="bg-blue-500/10 text-blue-400 border-blue-500/20">
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
        </Card>
      </div>
    </div>
  )
}
