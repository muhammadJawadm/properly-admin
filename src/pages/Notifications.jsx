import { useState } from "react"
import { Bell, Send, Clock, Settings, Search, Filter, Plus, CheckCircle2, AlertCircle, Smartphone, Mail, MessageCircle, X } from "lucide-react"

const NOTIFICATION_HISTORY = [
  { id: 1, title: "System Update v2.4", message: "New features have been added to the renter dashboard.", audience: "All Users", type: "System", date: "2026-03-27 09:00 AM", status: "Sent" },
  { id: 2, title: "Payment Reminder", message: "Your weekly payout has been processed.", audience: "Hosts only", type: "Alert", date: "2026-03-26 02:30 PM", status: "Sent" },
  { id: 3, title: "Promotional Offer", message: "Get 20% off your next rental this weekend!", audience: "Renters only", type: "Promo", date: "2026-03-25 11:15 AM", status: "Sent" },
]

const DUMMY_USERS = [
  { id: "u1", name: "Alice Smith", email: "alice@example.com", phone: "+1234567890", role: "Renter" },
  { id: "u2", name: "Bob Jones", email: "bob@example.com", phone: "+1987654321", role: "Host" },
  { id: "u3", name: "Charlie Brown", email: "charlie@example.com", phone: "+1122334455", role: "Renter" },
  { id: "u4", name: "Diana Prince", email: "diana@example.com", phone: "+1555666777", role: "Host" }
]

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("send")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [audience, setAudience] = useState("All Users")
  const [channels, setChannels] = useState({ push: true, email: false, whatsapp: false })
  
  // For specific user selection
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])

  const handleChannelToggle = (channel) => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }))
  }

  const handleSend = (e) => {
    e.preventDefault()
    
    // Validation
    if (!channels.push && !channels.email && !channels.whatsapp) {
      alert("Please select at least one notification channel.")
      return
    }

    if (audience === "Specific User(s)" && selectedUsers.length === 0) {
      alert("Please select at least one user.")
      return
    }

    // Implementation for sending notification would go here
    setTitle("")
    setMessage("")
    setAudience("All Users")
    setSelectedUsers([])
    setChannels({ push: true, email: false, whatsapp: false })
    alert("Notification sent successfully!")
  }

  const filteredUsers = DUMMY_USERS.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(u => !selectedUsers.find(selected => selected.id === u.id))

  const handleAddUser = (user) => {
    setSelectedUsers(prev => [...prev, user])
    setSearchTerm("")
  }

  const handleRemoveUser = (userId) => {
    setSelectedUsers(prev => prev.filter(u => u.id !== userId))
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="text-violet-400" />
            Notifications
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage, send, and configure system notifications</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#1a1d27] p-1 rounded-xl border border-[#2a2d3e] w-max">
        <button
          onClick={() => setActiveTab("send")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "send" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Send size={16} /> Send Message
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "history" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Clock size={16} /> History
        </button>
        <button
          onClick={() => setActiveTab("setup")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "setup" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Settings size={16} /> Setup
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-[#1a1d27] rounded-xl border border-[#2a2d3e] p-6">
        
        {/* TAB: SEND PUSH */}
        {activeTab === "send" && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-white mb-6">Send New Notification</h2>
            <form onSubmit={handleSend} className="flex flex-col gap-6">
              
              {/* Delivery Channels */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-slate-300">Delivery Channels</label>
                <div className="flex flex-wrap gap-4">
                  <div 
                    onClick={() => handleChannelToggle("push")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${
                      channels.push ? "bg-violet-600/20 border-violet-500 text-violet-300" : "bg-[#0f1117] border-[#2a2d3e] text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <Smartphone size={18} /> Push Notification
                  </div>
                  <div 
                    onClick={() => handleChannelToggle("email")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${
                      channels.email ? "bg-blue-600/20 border-blue-500 text-blue-300" : "bg-[#0f1117] border-[#2a2d3e] text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <Mail size={18} /> Email
                  </div>
                  <div 
                    onClick={() => handleChannelToggle("whatsapp")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${
                      channels.whatsapp ? "bg-green-600/20 border-green-500 text-green-300" : "bg-[#0f1117] border-[#2a2d3e] text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <MessageCircle size={18} /> WhatsApp
                  </div>
                </div>
              </div>

              {/* Target Audience */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">Target Audience</label>
                <select
                  value={audience}
                  onChange={(e) => {
                    setAudience(e.target.value)
                    if (e.target.value !== "Specific User(s)") setSelectedUsers([])
                  }}
                  className="bg-[#0f1117] border border-[#2a2d3e] text-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
                >
                  <option>All Users</option>
                  <option>Renters only</option>
                  <option>Hosts only</option>
                  <option>Specific User(s)</option>
                </select>
              </div>

              {/* Specific Users Selection */}
              {audience === "Specific User(s)" && (
                <div className="flex flex-col gap-3 p-4 bg-[#0f1117] border border-[#2a2d3e] rounded-xl">
                  <label className="text-sm font-medium text-slate-300">Select Users</label>
                  
                  {/* Selected Users Pills */}
                  {selectedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedUsers.map(user => (
                        <div key={user.id} className="flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 text-violet-300 px-3 py-1.5 rounded-lg text-sm">
                          <span>{user.name}</span>
                          <span className="text-xs opacity-70">({user.role})</span>
                          <button type="button" onClick={() => handleRemoveUser(user.id)} className="hover:text-white transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* User Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search users by name or email..."
                      className="bg-[#1a1d27] border border-[#2a2d3e] text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2.5 outline-none focus:border-violet-500 w-full"
                    />
                  </div>

                  {/* User Search Results */}
                  {searchTerm && (
                    <div className="flex flex-col gap-1 max-h-40 overflow-y-auto mt-2 border border-[#2a2d3e] rounded-lg bg-[#1a1d27] p-1">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                          <div 
                            key={user.id}
                            onClick={() => handleAddUser(user)}
                            className="flex items-center justify-between p-2 hover:bg-[#252840] rounded-md cursor-pointer transition-colors"
                          >
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-slate-200">{user.name}</span>
                              <span className="text-xs text-slate-500">{user.email}</span>
                            </div>
                            <span className="text-xs font-medium bg-[#0f1117] px-2 py-1 rounded text-slate-400">{user.role}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-slate-500 text-center">No users found</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Message Content */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">Notification Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Special Weekend Offer!"
                  className="bg-[#0f1117] border border-[#2a2d3e] text-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">Message Body</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Type your notification message here..."
                  className="bg-[#0f1117] border border-[#2a2d3e] text-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Send size={18} />
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: HISTORY */}
        {activeTab === "history" && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-white">Notification History</h2>
              <div className="flex gap-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search history..."
                  className="bg-[#0f1117] border border-[#2a2d3e] text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:border-violet-500 w-64"
                />
                <button className="bg-[#252840] border border-[#353852] text-slate-300 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a2d3e] transition-colors">
                  <Filter size={16} /> Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#2a2d3e] text-sm text-slate-400">
                    <th className="pb-3 px-2 font-medium">Title & Message</th>
                    <th className="pb-3 px-2 font-medium">Audience</th>
                    <th className="pb-3 px-2 font-medium">Date & Time</th>
                    <th className="pb-3 px-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {NOTIFICATION_HISTORY.map((item) => (
                    <tr key={item.id} className="border-b border-[#2a2d3e]/50 hover:bg-[#252840]/30 transition-colors group">
                      <td className="py-4 px-2">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-200">{item.title}</span>
                          <span className="text-slate-400 line-clamp-1">{item.message}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-slate-300">
                        <span className="bg-[#252840] px-2.5 py-1 rounded-md text-xs">{item.audience}</span>
                      </td>
                      <td className="py-4 px-2 text-slate-400">{item.date}</td>
                      <td className="py-4 px-2">
                        <span className="flex items-center gap-1.5 text-green-400 bg-green-400/10 w-max px-2.5 py-1 rounded-md text-xs font-medium">
                          <CheckCircle2 size={14} /> {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: SETUP */}
        {activeTab === "setup" && (
          <div className="max-w-3xl flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Notification Settings</h2>
              <p className="text-sm text-slate-400 mb-6">Configure how system notifications are delivered to users.</p>
              
              <div className="flex flex-col gap-4">
                {/* Setting toggle 1 */}
                <div className="flex items-center justify-between p-4 bg-[#0f1117] border border-[#2a2d3e] rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-slate-200 font-medium">System Push Notifications</span>
                    <span className="text-slate-500 text-sm">Allow sending push notifications to mobile devices</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#252840] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>

                {/* Setting toggle 2 */}
                <div className="flex items-center justify-between p-4 bg-[#0f1117] border border-[#2a2d3e] rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-slate-200 font-medium">WhatsApp Integration</span>
                    <span className="text-slate-500 text-sm">Enable WhatsApp messaging via API</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#252840] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Setting toggle 3 */}
                <div className="flex items-center justify-between p-4 bg-[#0f1117] border border-[#2a2d3e] rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-slate-200 font-medium">Email Delivery Server</span>
                    <span className="text-slate-500 text-sm">Connect your SMTP server for transactional emails</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#252840] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2a2d3e]">
              <h3 className="text-md font-medium text-slate-200 mb-4">Automated Triggers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-[#2a2d3e] rounded-xl hover:border-violet-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={18} className="text-blue-400" />
                    <span className="font-semibold text-slate-200">New Listing</span>
                  </div>
                  <p className="text-xs text-slate-400">Triggers when a host creates a new property listing.</p>
                </div>
                <div className="p-4 border border-[#2a2d3e] rounded-xl hover:border-violet-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={18} className="text-green-400" />
                    <span className="font-semibold text-slate-200">Payment Success</span>
                  </div>
                  <p className="text-xs text-slate-400">Triggers when a rental payment is successfully captured.</p>
                </div>
              </div>
              <button className="mt-4 flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
                <Plus size={16} /> Add New Trigger
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
