const COLORS = {
  purple: { ring: "bg-violet-500/10 border-violet-500/20", icon: "text-violet-400", bar: "from-violet-500 to-violet-400" },
  green:  { ring: "bg-green-500/10 border-green-500/20",   icon: "text-green-400",  bar: "from-green-500 to-green-400" },
  yellow: { ring: "bg-amber-500/10 border-amber-500/20",   icon: "text-amber-400",  bar: "from-amber-500 to-amber-400" },
  red:    { ring: "bg-red-500/10 border-red-500/20",       icon: "text-red-400",    bar: "from-red-500 to-red-400" },
  blue:   { ring: "bg-blue-500/10 border-blue-500/20",     icon: "text-blue-400",   bar: "from-blue-500 to-blue-400" },
}

export default function StatCard({ icon: Icon, label, value, change, changeType = "up", color = "purple", suffix = "" }) {
  const c = COLORS[color] || COLORS.purple
  return (
    <div
      className="relative rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-200 group overflow-hidden"
      style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}
    >
      {/* Hover top accent */}
      <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${c.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />

      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${c.ring}`}>
          <Icon size={20} className={c.icon} />
        </div>
        {change !== undefined && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            changeType === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          }`}>
            {changeType === "up" ? "▲" : "▼"} {change}
          </span>
        )}
      </div>
      <div className="text-[28px] font-extrabold text-slate-100 leading-none mb-1.5">
        {value}{suffix}
      </div>
      <div className="text-[13px] text-slate-500 font-medium">{label}</div>
    </div>
  )
}
