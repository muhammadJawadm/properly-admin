import { useState } from "react"
import { Bell, Send, Clock, Settings, Search, Filter, Plus, CheckCircle2, AlertCircle, Smartphone, Mail, MessageCircle, X } from "lucide-react"

const NOTIFICATION_HISTORY = [
  { id: 1, title: "System Update v2.4", message: "New features have been added to the renter dashboard.", audience: "All Users", type: "System", date: "2026-03-27 09:00 AM", status: "Sent" },
  { id: 2, title: "Payment Reminder", message: "Your weekly payout has been processed.", audience: "Hosts only", type: "Alert", date: "2026-03-26 02:30 PM", status: "Sent" },
  { id: 3, title: "Promotional Offer", message: "Get 20% off your next rental this weekend!", audience: "Renters only", type: "Promo", date: "2026-04-10 09:30 AM", status: "Scheduled" },
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
  const [deliveryType, setDeliveryType] = useState("now")
  const [scheduledAt, setScheduledAt] = useState("")
  
  // For specific user selection
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])

  const handleChannelToggle = (channel) => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }))
  }

  const handleSend = (e) => {
    e.preventDefault()
    const scheduleDate = scheduledAt ? new Date(scheduledAt) : null
    
    // Validation
    if (!channels.push && !channels.email && !channels.whatsapp) {
      alert("Please select at least one notification channel.")
      return
    }

    if (audience === "Specific User(s)" && selectedUsers.length === 0) {
      alert("Please select at least one user.")
      return
    }

    if (deliveryType === "scheduled") {
      if (!scheduledAt) {
        alert("Please choose a schedule date and time.")
        return
      }

      if (Number.isNaN(scheduleDate?.getTime()) || scheduleDate <= new Date()) {
        alert("Scheduled date and time must be in the future.")
        return
      }
    }

    // Implementation for sending notification would go here
    setTitle("")
    setMessage("")
    setAudience("All Users")
    setSelectedUsers([])
    setChannels({ push: true, email: false, whatsapp: false })
    setDeliveryType("now")
    setScheduledAt("")
    alert(
      deliveryType === "scheduled"
        ? `Notification scheduled successfully for ${scheduleDate.toLocaleString()}!`
        : "Notification sent successfully!"
    )
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
    // Hide scrollbar utility for the whole wrapper just in case, plus base layout
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-8">
      
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

      {/* Tabs with Horizontal Scroll for Mobile */}
      <div className="w-full overflow-x-auto no-scrollbar pb-1">
        <div className="flex bg-[#1a1d27] p-1 rounded-xl border border-[#2a2d3e] w-max min-w-full sm:min-w-0">
          <button
            onClick={() => setActiveTab("send")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === "send" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Send size={16} className="shrink-0" /> Send Message
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === "history" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Clock size={16} className="shrink-0" /> History
          </button>
          <button
            onClick={() => setActiveTab("setup")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === "setup" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Settings size={16} className="shrink-0" /> Setup
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-[#1a1d27] rounded-xl border border-[#2a2d3e] p-4 sm:p-6 overflow-hidden">
        
        {/* TAB: SEND PUSH */}
        {activeTab === "send" && (
          <div className="max-w-2xl w-full">
            <h2 className="text-lg font-semibold text-white mb-4 sm:mb-6">Send New Notification</h2>
            <form onSubmit={handleSend} className="flex flex-col gap-5 sm:gap-6">
              
              {/* Delivery Channels */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-slate-300">Delivery Channels</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div 
                    onClick={() => handleChannelToggle("push")}
                    className={`flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl border cursor-pointer transition-all w-full select-none ${
                      channels.push ? "bg-violet-600/20 border-violet-500 text-violet-300" : "bg-[#0f1117] border-[#2a2d3e] text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    <Smartphone size={18} className="shrink-0" /> Push Notification
                  </div>
                  <div 
                    onClick={() => handleChannelToggle("email")}
                    className={`flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl border cursor-pointer transition-all w-full select-none ${
                      channels.email ? "bg-blue-600/20 border-blue-500 text-blue-300" : "bg-[#0f1117] border-[#2a2d3e] text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    <Mail size={18} className="shrink-0" /> Email
                  </div>
                  <div 
                    onClick={() => handleChannelToggle("whatsapp")}
                    className={`flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl border cursor-pointer transition-all w-full select-none ${
                      channels.whatsapp ? "bg-green-600/20 border-green-500 text-green-300" : "bg-[#0f1117] border-[#2a2d3e] text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    <MessageCircle size={18} className="shrink-0" /> WhatsApp
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
                  className="bg-[#0f1117] border border-[#2a2d3e] text-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors w-full appearance-none"
                >
                  <option>All Users</option>
                  <option>Renters only</option>
                  <option>Hosts only</option>
                  <option>Specific User(s)</option>
                </select>
              </div>

              {/* Delivery Timing */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-slate-300">Delivery Timing</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("now")}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-left ${
                      deliveryType === "now"
                        ? "bg-violet-600/20 border-violet-500 text-violet-300"
                        : "bg-[#0f1117] border-[#2a2d3e] text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    <Send size={16} className="shrink-0" />
                    Send now
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType("scheduled")}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-left ${
                      deliveryType === "scheduled"
                        ? "bg-blue-600/20 border-blue-500 text-blue-300"
                        : "bg-[#0f1117] border-[#2a2d3e] text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    <Clock size={16} className="shrink-0" />
                    Schedule for later
                  </button>
                </div>
              </div>

              {deliveryType === "scheduled" && (
                <div className="flex flex-col gap-2 w-full p-3 sm:p-4 bg-[#0f1117] border border-[#2a2d3e] rounded-xl">
                  <label className="text-sm font-medium text-slate-300">Schedule Date & Time</label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    min={new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 16)}
                    className="bg-[#1a1d27] border border-[#2a2d3e] text-slate-200 text-sm rounded-lg px-4 py-3 outline-none focus:border-violet-500 w-full"
                  />
                  <p className="text-xs text-slate-500">The notification will be sent automatically at the scheduled time.</p>
                </div>
              )}

              {/* Specific Users Selection */}
              {audience === "Specific User(s)" && (
                <div className="flex flex-col gap-3 p-3 sm:p-4 bg-[#0f1117] border border-[#2a2d3e] rounded-xl w-full">
                  <label className="text-sm font-medium text-slate-300">Select Users</label>
                  
                  {/* Selected Users Pills */}
                  {selectedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-1 sm:mb-2">
                      {selectedUsers.map(user => (
                        <div key={user.id} className="flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 text-violet-300 px-3 py-1.5 rounded-lg text-xs sm:text-sm">
                          <span className="truncate max-w-[100px] sm:max-w-none">{user.name}</span>
                          <span className="text-xs opacity-70 border-l border-violet-500/30 pl-2">({user.role})</span>
                          <button type="button" onClick={() => handleRemoveUser(user.id)} className="hover:text-white transition-colors p-0.5">
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
                      placeholder="Search name or email..."
                      className="bg-[#1a1d27] border border-[#2a2d3e] text-slate-200 text-sm rounded-lg pl-9 pr-4 py-3 outline-none focus:border-violet-500 w-full"
                    />
                  </div>

                  {/* User Search Results */}
                  {searchTerm && (
                    <div className="flex flex-col gap-1 max-h-48 overflow-y-auto mt-2 border border-[#2a2d3e] rounded-lg bg-[#1a1d27] p-1 shadow-lg">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                          <div 
                            key={user.id}
                            onClick={() => handleAddUser(user)}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-2 hover:bg-[#252840] rounded-md cursor-pointer transition-colors gap-2 sm:gap-0"
                          >
                            <div className="flex flex-col truncate pr-2">
                              <span className="text-sm font-medium text-slate-200 truncate">{user.name}</span>
                              <span className="text-xs text-slate-500 truncate">{user.email}</span>
                            </div>
                            <span className="text-xs font-medium bg-[#0f1117] px-2 py-1 rounded text-slate-400 w-max border border-[#2a2d3e] sm:border-transparent">
                              {user.role}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-sm text-slate-500 text-center">No users found</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Message Content */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium text-slate-300">Notification Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Special Weekend Offer!"
                  className="bg-[#0f1117] border border-[#2a2d3e] text-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium text-slate-300">Message Body</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Type your notification message here..."
                  className="bg-[#0f1117] border border-[#2a2d3e] text-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors resize-none w-full"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-3 sm:py-2.5 rounded-xl transition-colors flex justify-center items-center gap-2"
                >
                  <Send size={18} className="shrink-0" />
                  {deliveryType === "scheduled" ? "Schedule Notification" : "Send Notification"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: HISTORY */}
        {activeTab === "history" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-2">
              <h2 className="text-lg font-semibold text-white">Notification History</h2>
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto relative">
                <div className="relative w-full sm:w-max">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search history..."
                    className="bg-[#0f1117] border border-[#2a2d3e] text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2.5 sm:py-2 outline-none focus:border-violet-500 w-full sm:w-64"
                  />
                </div>
                <button className="bg-[#252840] border border-[#353852] text-slate-300 px-4 sm:px-3 py-2.5 sm:py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-[#2a2d3e] transition-colors w-full sm:w-auto shrink-0">
                  <Filter size={16} /> Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0 w-[calc(100%+32px)] sm:w-full">
              <div className="min-w-[700px] px-4 sm:px-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#2a2d3e] text-sm text-slate-400">
                      <th className="pb-3 px-2 font-medium w-5/12">Title & Message</th>
                      <th className="pb-3 px-2 font-medium w-2/12">Audience</th>
                      <th className="pb-3 px-2 font-medium w-3/12">Date & Time</th>
                      <th className="pb-3 px-2 font-medium w-2/12">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {NOTIFICATION_HISTORY.map((item) => (
                      <tr key={item.id} className="border-b border-[#2a2d3e]/50 hover:bg-[#252840]/30 transition-colors group">
                        <td className="py-4 px-2 align-top">
                          <div className="flex flex-col pr-4">
                            <span className="font-semibold text-slate-200">{item.title}</span>
                            <span className="text-slate-400 line-clamp-2 leading-relaxed mt-0.5">{item.message}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-slate-300 align-top">
                          <span className="bg-[#252840] px-2.5 py-1 rounded-md text-xs whitespace-nowrap">{item.audience}</span>
                        </td>
                        <td className="py-4 px-2 text-slate-400 align-top whitespace-nowrap">{item.date}</td>
                        <td className="py-4 px-2 align-top">
                          <span className={`flex items-center justify-center gap-1.5 w-max px-2.5 py-1 rounded-md text-xs font-medium ${
                            item.status === "Scheduled" ? "text-blue-400 bg-blue-400/10" : "text-green-400 bg-green-400/10"
                          }`}>
                            {item.status === "Scheduled" ? (
                              <Clock size={14} className="shrink-0" />
                            ) : (
                              <CheckCircle2 size={14} className="shrink-0" />
                            )}
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SETUP */}
        {activeTab === "setup" && (
          <div className="max-w-3xl flex flex-col gap-8 w-full">
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Notification Settings</h2>
              <p className="text-sm text-slate-400 mb-6">Configure how system notifications are delivered to users.</p>
              
              <div className="flex flex-col gap-3 sm:gap-4 w-full">
                {/* Setting toggle 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0f1117] border border-[#2a2d3e] rounded-xl w-full">
                  <div className="flex flex-col pr-4">
                    <span className="text-slate-200 font-medium text-sm sm:text-base">System Push Notifications</span>
                    <span className="text-slate-500 text-xs sm:text-sm mt-0.5">Allow sending push notifications to mobile devices</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 self-start sm:self-auto">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#252840] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>

                {/* Setting toggle 2 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0f1117] border border-[#2a2d3e] rounded-xl w-full">
                  <div className="flex flex-col pr-4">
                    <span className="text-slate-200 font-medium text-sm sm:text-base">WhatsApp Integration</span>
                    <span className="text-slate-500 text-xs sm:text-sm mt-0.5">Enable WhatsApp messaging via API</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 self-start sm:self-auto">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#252840] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Setting toggle 3 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0f1117] border border-[#2a2d3e] rounded-xl w-full">
                  <div className="flex flex-col pr-4">
                    <span className="text-slate-200 font-medium text-sm sm:text-base">Email Delivery Server</span>
                    <span className="text-slate-500 text-xs sm:text-sm mt-0.5">Connect your SMTP server for transactional emails</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 self-start sm:self-auto">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#252840] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 sm:pt-4 border-t border-[#2a2d3e]">
              <h3 className="text-md font-medium text-slate-200 mb-4">Automated Triggers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="p-4 sm:p-5 border border-[#2a2d3e] rounded-xl hover:border-violet-500/50 transition-colors cursor-pointer group flex flex-col h-full bg-[#1a1d27]">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <AlertCircle size={20} className="text-blue-400 shrink-0" />
                    <span className="font-semibold text-slate-200 text-sm sm:text-base">New Listing</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-auto leading-relaxed">Triggers when a host creates a new property listing.</p>
                </div>
                <div className="p-4 sm:p-5 border border-[#2a2d3e] rounded-xl hover:border-violet-500/50 transition-colors cursor-pointer group flex flex-col h-full bg-[#1a1d27]">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <CheckCircle2 size={20} className="text-green-400 shrink-0" />
                    <span className="font-semibold text-slate-200 text-sm sm:text-base">Payment Success</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-auto leading-relaxed">Triggers when a rental payment is successfully captured.</p>
                </div>
              </div>
              <button className="mt-5 sm:mt-4 inline-flex items-center justify-center sm:justify-start gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors w-full sm:w-auto bg-[#252840] sm:bg-transparent py-3 sm:py-0 rounded-xl sm:rounded-none">
                <Plus size={16} /> Add New Trigger
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
