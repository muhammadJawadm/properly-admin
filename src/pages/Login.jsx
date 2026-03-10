import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShieldCheck, Eye, EyeOff } from "lucide-react"

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (email === "admin@properly.co.za" && password === "Admin@123") {
      onLogin()
      navigate("/dashboard")
    } else {
      setError("Invalid credentials. Use admin@properly.co.za / Admin@123")
    }
  }

  const inp = "w-full rounded-lg px-3.5 py-2.5 text-slate-100 text-[14px] outline-none transition-all placeholder:text-slate-500"

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#0f1117" }}>
      {/* Glow bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div
        className="relative z-10 w-full max-w-[420px] mx-4 rounded-2xl p-6 sm:p-9 shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
        style={{ backgroundColor: "#1a1d27", border: "1px solid #2a2d3e" }}
      >
        {/* Logo row */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-violet-400 rounded-xl flex items-center justify-center text-[22px] font-black text-white shadow-lg shadow-violet-500/30">
            P
          </div>
          <div>
            <div className="text-[17px] font-bold text-slate-100">Properly Admin</div>
            <div className="text-[11px] text-slate-500">Management Portal</div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-7">
          <ShieldCheck size={26} className="text-violet-500 mx-auto mb-3" />
          <h2 className="text-[22px] font-bold text-slate-100 mb-1.5">Secure Admin Access</h2>
          <p className="text-[13px] text-slate-500">Sign in to manage the Properly platform</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-3.5 py-2.5 rounded-lg text-[13px]">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-slate-400 tracking-wide">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError("") }}
              placeholder="admin@properly.co.za"
              required
              className={inp}
              style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}
              onFocus={e => (e.target.style.border = "1px solid #6c63ff")}
              onBlur={e => (e.target.style.border = "1px solid #2a2d3e")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-slate-400 tracking-wide">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={e => { setPassword(e.target.value); setError("") }}
                placeholder="Enter your password"
                required
                className={`${inp} pr-11`}
                style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}
                onFocus={e => (e.target.style.border = "1px solid #6c63ff")}
                onBlur={e => (e.target.style.border = "1px solid #2a2d3e")}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 flex items-center"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 mt-1 rounded-xl text-[14px] font-bold bg-gradient-to-r from-violet-600 to-violet-400 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 transition-all"
          >
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-5 rounded-xl p-3.5" style={{ backgroundColor: "#252840" }}>
          <span className="text-[12px] text-slate-500 block mb-1">Demo credentials:</span>
          <code className="text-[11.5px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">
            admin@properly.co.za&nbsp;/&nbsp;Admin@123
          </code>
        </div>
      </div>
    </div>
  )
}
