import { useState, useRef } from "react"
import {
  Search, X, Gavel, MessageSquare, Paperclip, FileText,
  FileImage, FileArchive, File, Trash2, Download, Calendar,
  Clock, ChevronDown, AlertTriangle, CheckCircle, Upload
} from "lucide-react"

const INITIAL_DISPUTES = [
  {
    id:"D-0091", title:"Deposit not returned",
    buyer:"Lerato Dlamini", seller:"Sipho Nkosi",
    amount:"R 12,500", status:"escalated", category:"Deposit",
    date:"2025-05-18", time:"09:32 AM",
    desc:"Buyer paid deposit but seller refuses to return after deal fell through.",
    userAttachments:[
      { name:"proof_of_payment.pdf", size:"214 KB", type:"pdf" },
      { name:"agreement_signed.pdf", size:"487 KB", type:"pdf" },
    ],
  },
  {
    id:"D-0092", title:"Property misrepresented",
    buyer:"Thomas Mark", seller:"Fatima Malik",
    amount:"R 3,200", status:"open", category:"Listing",
    date:"2025-05-18", time:"11:14 AM",
    desc:"Photos did not match the actual property condition on viewing day.",
    userAttachments:[
      { name:"listing_screenshot.png", size:"892 KB", type:"image" },
      { name:"actual_photos.zip",      size:"3.2 MB", type:"zip" },
    ],
  },
  {
    id:"D-0088", title:"Commission dispute",
    buyer:"Daniel Mthembu", seller:"Aisha Patel",
    amount:"R 8,400", status:"under_review", category:"Commission",
    date:"2025-05-16", time:"02:45 PM",
    desc:"Disagreement over commission split agreed during offer stage.",
    userAttachments:[
      { name:"offer_to_purchase.pdf", size:"1.1 MB", type:"pdf" },
    ],
  },
  {
    id:"D-0085", title:"Transfer delay",
    buyer:"Sipho Nkosi", seller:"Thomas Mark",
    amount:"R 0", status:"resolved", category:"Transfer",
    date:"2025-05-14", time:"10:08 AM",
    desc:"Transfer delayed more than 30 days with no communication from seller.",
    userAttachments:[],
  },
  {
    id:"D-0082", title:"Agent not responsive",
    buyer:"Fatima Malik", seller:"Lerato Dlamini",
    amount:"R 0", status:"resolved", category:"Communication",
    date:"2025-05-12", time:"04:22 PM",
    desc:"Agent stopped responding for two weeks prior to signing date.",
    userAttachments:[
      { name:"email_thread.pdf", size:"320 KB", type:"pdf" },
    ],
  },
]

const STATUS = {
  open:         { cls:"bg-red-500/10 text-red-400 border-red-500/20",         label:"Open" },
  under_review: { cls:"bg-amber-500/10 text-amber-400 border-amber-500/20",   label:"Under Review" },
  resolved:     { cls:"bg-green-500/10 text-green-400 border-green-500/20",   label:"Resolved" },
  escalated:    { cls:"bg-violet-500/10 text-violet-400 border-violet-500/20",label:"Escalated" },
}

const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

function fileIcon(type) {
  if (type === "pdf")   return <FileText   size={15} className="text-red-400 shrink-0" />
  if (type === "image") return <FileImage  size={15} className="text-blue-400 shrink-0" />
  if (type === "zip")   return <FileArchive size={15} className="text-amber-400 shrink-0" />
  return <File size={15} className="text-slate-400 shrink-0" />
}
function extType(filename) {
  const ext = filename.split(".").pop().toLowerCase()
  if (["pdf"].includes(ext)) return "pdf"
  if (["png","jpg","jpeg","gif","webp"].includes(ext)) return "image"
  if (["zip","rar","7z"].includes(ext)) return "zip"
  return "other"
}

function AttachRow({ file, onRemove }) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 group"
      style={{ backgroundColor:"#0f1117", border:"1px solid #2a2d3e" }}>
      {fileIcon(file.type || extType(file.name))}
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-slate-200 truncate">{file.name}</div>
        {file.size && <div className="text-[10px] text-slate-500">{file.size}</div>}
      </div>
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-[#252840] transition-all cursor-pointer" title="Download">
          <Download size={13} />
        </button>
        {onRemove && (
          <button onClick={onRemove} className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer" title="Remove">
            <Trash2 size={13} />
          </button>
        )}
      </div>
    </div>
  )
}

export default function Disputes() {
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState("")
  const [adminFiles, setAdminFiles] = useState({})
  const fileInputRef = useRef(null)

  function changeStatus(newStatus) {
    setDisputes(prev => prev.map(d => d.id === selected.id ? { ...d, status: newStatus } : d))
    setSelected(prev => ({ ...prev, status: newStatus }))
  }

  function handleAdminFileChange(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    const mapped = files.map(f => ({ name: f.name, size: formatBytes(f.size), type: extType(f.name) }))
    setAdminFiles(prev => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), ...mapped] }))
    e.target.value = ""
  }

  function removeAdminFile(disputeId, idx) {
    setAdminFiles(prev => ({ ...prev, [disputeId]: (prev[disputeId] || []).filter((_, i) => i !== idx) }))
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const selAdminFiles = selected ? (adminFiles[selected.id] || []) : []

  const filtered = disputes.filter(d => {
    const q = search.toLowerCase()
    const matchQ = d.title.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.buyer.toLowerCase().includes(q)
    const matchF = filter === "all" || d.status === filter
    return matchQ && matchF
  })

  const counts = Object.keys(STATUS).reduce((acc, k) => {
    acc[k] = disputes.filter(d => d.status === k).length
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.entries(STATUS).map(([key, s]) => (
          <div key={key} className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border mb-3 ${s.cls}`}>{s.label}</div>
            <div className="text-[28px] font-extrabold text-slate-100">{counts[key] || 0}</div>
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
                {["ID","Title","Buyer","Seller","Amount","Status","Category","Date & Time","Actions"].map(h => (
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
                  <td className={TD}>
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 text-[12px] text-slate-300 font-medium"><Calendar size={11} className="text-slate-500"/>{d.date}</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500"><Clock size={10}/>{d.time}</span>
                    </div>
                  </td>
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
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] w-[620px] max-w-full flex flex-col"
            style={{ backgroundColor:"#1e2130", border:"1px solid #2a2d3e", maxHeight:"92vh" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-5 py-4" style={{ borderBottom:"1px solid #2a2d3e" }}>
              <div>
                <h3 className="text-[15px] font-extrabold text-slate-100 leading-tight">{selected.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{selected.id}</span>
                  <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${STATUS[selected.status].cls}`}>{STATUS[selected.status].label}</span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-200 transition-colors cursor-pointer ml-3 shrink-0">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3.5 flex items-center gap-3" style={{ backgroundColor:"#252840" }}>
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                    <Calendar size={15} className="text-violet-400"/>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Date Filed</div>
                    <div className="text-[13px] font-bold text-slate-100">{selected.date}</div>
                  </div>
                </div>
                <div className="rounded-xl p-3.5 flex items-center gap-3" style={{ backgroundColor:"#252840" }}>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Clock size={15} className="text-blue-400"/>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Time Filed</div>
                    <div className="text-[13px] font-bold text-slate-100">{selected.time}</div>
                  </div>
                </div>
              </div>

              {/* Parties + Amount */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl p-3.5" style={{ backgroundColor:"#252840" }}>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Buyer</div>
                  <div className="text-[13px] font-semibold text-slate-100">{selected.buyer}</div>
                </div>
                <div className="rounded-xl p-3.5" style={{ backgroundColor:"#252840" }}>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Seller</div>
                  <div className="text-[13px] font-semibold text-slate-100">{selected.seller}</div>
                </div>
                <div className="rounded-xl p-3.5" style={{ backgroundColor:"#252840" }}>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Amount</div>
                  <div className="text-[13px] font-bold text-slate-100">{selected.amount}</div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-xl p-4" style={{ backgroundColor:"#252840" }}>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Description</div>
                <p className="text-[13px] text-slate-300 leading-relaxed">{selected.desc}</p>
              </div>

              {/* User Attachments */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Paperclip size={13} className="text-slate-500"/>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">User Submitted Attachments</span>
                  <span className="text-[10px] font-bold text-slate-600 bg-[#252840] border border-[#353852] px-1.5 py-0.5 rounded-md ml-auto">
                    {selected.userAttachments.length} file{selected.userAttachments.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {selected.userAttachments.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {selected.userAttachments.map((f, i) => (
                      <AttachRow key={i} file={f} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl px-4 py-3 text-[12px] text-slate-600 italic" style={{ backgroundColor:"#252840", border:"1px dashed #353852" }}>
                    No attachments submitted by user
                  </div>
                )}
              </div>

              {/* Admin Attachments */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Upload size={13} className="text-slate-500"/>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Admin Attachments</span>
                  {selAdminFiles.length > 0 && (
                    <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 rounded-md ml-auto">
                      {selAdminFiles.length} file{selAdminFiles.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                {selAdminFiles.length > 0 && (
                  <div className="flex flex-col gap-2 mb-3">
                    {selAdminFiles.map((f, i) => (
                      <AttachRow key={i} file={f} onRemove={() => removeAdminFile(selected.id, i)} />
                    ))}
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-semibold text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                  style={{ border:"2px dashed #353852", backgroundColor:"transparent" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#6c63ff")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#353852")}
                >
                  <Paperclip size={15}/> Attach File (PDF, DOC, Image, ZIP…)
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip,.rar,.xlsx,.csv"
                  className="hidden"
                  onChange={handleAdminFileChange}
                />
              </div>

              {/* Status Change */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <ChevronDown size={12}/> Change Status
                </label>
                <div className="relative">
                  <select
                    value={selected.status}
                    onChange={e => changeStatus(e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-slate-100 text-[13px] font-semibold outline-none cursor-pointer appearance-none pr-9"
                    style={{ backgroundColor:"#252840", border:"1px solid #353852" }}
                  >
                    <option value="open">Open</option>
                    <option value="under_review">Under Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="escalated">Escalated</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"/>
                </div>
              </div>

              {/* Resolution Note */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare size={12}/> Resolution Note
                </label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={3}
                  placeholder="Add an admin resolution note or internal remark..."
                  className="w-full rounded-xl px-3.5 py-3 text-slate-100 text-[13px] outline-none resize-none placeholder:text-slate-500"
                  style={{ backgroundColor:"#252840", border:"1px solid #353852" }}
                  onFocus={e => (e.target.style.border = "1px solid #6c63ff")}
                  onBlur={e => (e.target.style.border = "1px solid #353852")}
                />
              </div>
            </div>

            {/* Sticky footer */}
            <div className="shrink-0 flex items-center gap-2.5 px-5 py-4" style={{ borderTop:"1px solid #2a2d3e", backgroundColor:"#1e2130" }}>
              <button
                onClick={() => changeStatus("resolved")}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all cursor-pointer"
              >
                <CheckCircle size={14}/> Resolve
              </button>
              <button
                onClick={() => changeStatus("escalated")}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/30 hover:bg-violet-500/20 transition-all cursor-pointer"
              >
                <AlertTriangle size={14}/> Escalate
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-[#252840] transition-all cursor-pointer"
                style={{ border:"1px solid #353852" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
