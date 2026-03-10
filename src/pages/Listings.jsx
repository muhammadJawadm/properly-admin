import { useState } from "react"
import {
  Search, MapPin, Eye, X, CheckCircle, XCircle, ShieldCheck,
  Home, Zap, Droplets, BedDouble, Bath, Car, Building2, ShieldX,
  Image as ImageIcon, PlayCircle, ChevronRight, AlertTriangle,
  DollarSign, Tag, Lock
} from "lucide-react"

const DETAIL = {
  "L-2241": {
    verificationStatus: "verified",
    ownership: { erfNumber: "2241", streetName: "Acacia Avenue", titleDeed: "T-8821", lightstoneVerified: "LV-4412", erfSize: "480 m²", lifeOwnerStatus: "Life owner verified" },
    autoFilled: { erfNumber: "2241", highestBestUse: "Residential", town: "Sandton", province: "Gauteng", valuation: "R 2,650,000", suburb: "Bryanston" },
    details: { electricitySupply: "Eskom", waterSupply: "Municipal", description: "Stunning 4-bedroom family home in the heart of Sandton. Features a modern open-plan kitchen, entertainer's patio, and manicured garden. Pool and double garage." },
    residential: { bedrooms: "4", bathrooms: "3", garages: "2", category: "Furnished", outbuildings: "1", ratesLevies: "R 5,200", security: ["Alarm System", "Electric Fence", "CCTV"], extras: ["Garden", "Pool", "Paved Driveway"] },
    pricing: { askingPrice: "R 2,800,000", listingPrice: "R 2,828,000", commission: "R 84,000" },
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  "L-2240": {
    verificationStatus: "pending",
    ownership: { erfNumber: "1140", streetName: "Sea Point Road", titleDeed: "T-3302", lightstoneVerified: "LV-2210", erfSize: "210 m²", lifeOwnerStatus: "Verification in progress" },
    autoFilled: { erfNumber: "1140", highestBestUse: "Residential", town: "Cape Town", province: "Western Cape", valuation: "R 1,380,000", suburb: "Sea Point" },
    details: { electricitySupply: "Eskom", waterSupply: "Municipal", description: "Modern 2-bed apartment on the Atlantic seaboard with panoramic ocean views. Open-plan living and dining. Secure basement parking included." },
    residential: { bedrooms: "2", bathrooms: "2", garages: "1", category: "Semi-Furnished", outbuildings: "0", ratesLevies: "R 3,100", security: ["Alarm System", "Biometric"], extras: ["Ocean View", "Balcony"] },
    pricing: { askingPrice: "R 1,450,000", listingPrice: "R 1,464,500", commission: "R 43,500" },
    images: [
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  "L-2238": {
    verificationStatus: "verified",
    ownership: { erfNumber: "3381", streetName: "Berea Boulevard", titleDeed: "T-6614", lightstoneVerified: "LV-9901", erfSize: "320 m²", lifeOwnerStatus: "Life owner verified" },
    autoFilled: { erfNumber: "3381", highestBestUse: "Residential", town: "Durban", province: "KwaZulu-Natal", valuation: "R 1,850,000", suburb: "Berea" },
    details: { electricitySupply: "Eskom", waterSupply: "Municipal", description: "Well-maintained three-bedroom townhouse in a secure complex. Includes a private garden, covered braai area, and direct access garage." },
    residential: { bedrooms: "3", bathrooms: "2", garages: "1", category: "Unfurnished", outbuildings: "1", ratesLevies: "R 4,400", security: ["Alarm System", "Electric Fence"], extras: ["Braai Area", "Garden", "Garage"] },
    pricing: { askingPrice: "R 1,950,000", listingPrice: "R 1,969,500", commission: "R 58,500" },
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  "L-2235": {
    verificationStatus: "rejected",
    ownership: { erfNumber: "552", streetName: "Church Street", titleDeed: "T-1102", lightstoneVerified: "Pending", erfSize: "75 m²", lifeOwnerStatus: "Verification failed – mismatch" },
    autoFilled: { erfNumber: "552", highestBestUse: "Residential", town: "Pretoria", province: "Gauteng", valuation: "R 590,000", suburb: "Sunnyside" },
    details: { electricitySupply: "Prepaid", waterSupply: "Municipal", description: "Compact studio apartment in a central Pretoria location. Close to public transport, universities, and amenities. Ideal for a first-time buyer or investor." },
    residential: { bedrooms: "1", bathrooms: "1", garages: "0", category: "Unfurnished", outbuildings: "0", ratesLevies: "R 1,800", security: ["Alarm System"], extras: ["Balcony"] },
    pricing: { askingPrice: "R 620,000", listingPrice: "R 626,200", commission: "R 18,600" },
    images: [
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  "L-2234": {
    verificationStatus: "verified",
    ownership: { erfNumber: "8833", streetName: "Constantia Main Road", titleDeed: "T-9920", lightstoneVerified: "LV-7754", erfSize: "4,200 m²", lifeOwnerStatus: "Life owner verified" },
    autoFilled: { erfNumber: "8833", highestBestUse: "Residential", town: "Cape Town", province: "Western Cape", valuation: "R 8,200,000", suburb: "Constantia" },
    details: { electricitySupply: "Eskom + Solar", waterSupply: "Borehole + Municipal", description: "Grand five-bedroom estate set on 4,200 m² of lush, landscaped grounds. Wine cellar, heated pool, guest cottage, and a triple garage. Minutes from top schools." },
    residential: { bedrooms: "5", bathrooms: "4", garages: "3", category: "Furnished", outbuildings: "2", ratesLevies: "R 12,000", security: ["Biometric", "Electric Fence", "CCTV", "24h Guard"], extras: ["Pool", "Wine Cellar", "Guest Cottage", "Tennis Court"] },
    pricing: { askingPrice: "R 8,500,000", listingPrice: "R 8,585,000", commission: "R 255,000" },
    images: [
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  "L-2230": {
    verificationStatus: "verified",
    ownership: { erfNumber: "1710", streetName: "Rissik Street", titleDeed: "T-5541", lightstoneVerified: "LV-3320", erfSize: "140 m²", lifeOwnerStatus: "Life owner verified" },
    autoFilled: { erfNumber: "1710", highestBestUse: "Residential", town: "Johannesburg", province: "Gauteng", valuation: "R 935,000", suburb: "Braamfontein" },
    details: { electricitySupply: "Prepaid", waterSupply: "Municipal", description: "Spacious 2-bedroom flat in a well-managed block. Recently renovated kitchen and bathrooms. Secure parking bay and communal garden." },
    residential: { bedrooms: "2", bathrooms: "1", garages: "1", category: "Semi-Furnished", outbuildings: "0", ratesLevies: "R 2,600", security: ["Alarm System", "Intercom"], extras: ["Renovated Kitchen", "Communal Garden"] },
    pricing: { askingPrice: "R 980,000", listingPrice: "R 989,800", commission: "R 29,400" },
    images: [
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
}

const LISTINGS = [
  { id: "L-2241", title: "4-Bed House, Sandton", seller: "Sipho Nkosi", price: "R 2,800,000", commission: "R 84,000", status: "active", type: "House", area: "Sandton", date: "2025-05-18" },
  { id: "L-2240", title: "2-Bed Apartment, Cape Town", seller: "Lerato Dlamini", price: "R 1,450,000", commission: "R 43,500", status: "pending", type: "Apartment", area: "Cape Town", date: "2025-05-17" },
  { id: "L-2238", title: "3-Bed Townhouse, Durban", seller: "Thomas Mark", price: "R 1,950,000", commission: "R 58,500", status: "sold", type: "Townhouse", area: "Durban", date: "2025-05-16" },
  { id: "L-2235", title: "Studio, Pretoria", seller: "Fatima Malik", price: "R 620,000", commission: "R 18,600", status: "active", type: "Apartment", area: "Pretoria", date: "2025-05-15" },
  { id: "L-2234", title: "5-Bed Estate, Constantia", seller: "Daniel Mthembu", price: "R 8,500,000", commission: "R 255,000", status: "pending", type: "Estate", area: "Constantia", date: "2025-05-14" },
  { id: "L-2230", title: "2-Bed Flat, Johannesburg", seller: "Aisha Patel", price: "R 980,000", commission: "R 29,400", status: "closed", type: "Apartment", area: "Johannesburg", date: "2025-05-12" },
]

const STATUS_CLS = {
  active: "bg-green-500/10 text-green-400 border-green-500/30",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  sold: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  closed: "bg-slate-500/10 text-slate-400 border-slate-500/30",
}

const TH = "bg-[#1a1d27] text-slate-500 text-[11px] font-semibold uppercase tracking-widest px-4 py-3 text-left"
const TD = "px-4 py-3.5 text-sm text-slate-400 align-middle"

/* ── Verification badge ─────────────────────────────────────────── */
function VerifBadge({ status }) {
  if (status === "verified")
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)" }}>
        <CheckCircle size={15} className="text-green-400" />
        <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Verified – Automatic</span>
      </div>
    )
  if (status === "rejected")
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
        <XCircle size={15} className="text-red-400" />
        <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Rejected</span>
      </div>
    )
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}>
      <AlertTriangle size={15} className="text-amber-400" />
      <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Pending Verification</span>
    </div>
  )
}

/* ── Section card ───────────────────────────────────────────────── */
function Section({ icon: Icon, title, accent = false, children }) {
  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
      <div className="flex items-center gap-2 mb-5">
        {Icon && <Icon size={16} className={accent ? "text-[#6c63ff]" : "text-slate-400"} />}
        <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">{title}</h4>
      </div>
      {children}
    </div>
  )
}

/* ── Info cell ──────────────────────────────────────────────────── */
function InfoCell({ label, value }) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#252840", border: "1px solid #353852" }}>
      <p className="text-[11px] text-slate-500 mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-slate-100">{value}</p>
    </div>
  )
}

/* ── Circular stat ──────────────────────────────────────────────── */
function CircleStat({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[11px] text-slate-500 uppercase tracking-wider text-center">{label}</p>
      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
        style={{ background: "linear-gradient(135deg,#6c63ff,#9b59b6)", boxShadow: "0 0 16px rgba(108,99,255,0.35)" }}>
        {value}
      </div>
    </div>
  )
}

/* ── Full-screen property detail modal ─────────────────────────── */
function PropertyDetailModal({ listing, onClose }) {
  const d = DETAIL[listing.id] || {}
  const vs = d.verificationStatus || "pending"

  return (
    <div className="fixed inset-0 z-[300] flex" style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      {/* Panel */}
      <div className="relative flex flex-col w-full h-full overflow-hidden" style={{ backgroundColor: "#0f1117" }}>

        {/* ── Sticky header ── */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-8 py-4 z-10"
          style={{ backgroundColor: "#1a1d27", borderBottom: "1px solid #2a2d3e" }}>
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)" }}>
              <Home size={16} className="text-[#6c63ff]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-100 leading-none truncate">{listing.title}</h2>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-[11px] font-bold text-[#6c63ff] bg-violet-500/10 px-2 py-0.5 rounded-md">{listing.id}</span>
                <span className="flex items-center gap-1 text-[12px] text-slate-500"><MapPin size={10} />{listing.area}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${STATUS_CLS[listing.status]}`}>{listing.status}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <VerifBadge status={vs} />
            <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors" style={{ border: "1px solid #353852", backgroundColor: "#252840" }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-5">

          {/* Top KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Tag, label: "Listing Price", val: listing.price, color: "text-slate-100" },
              { icon: DollarSign, label: "Commission", val: listing.commission, color: "text-green-400" },
              { icon: Building2, label: "Property Type", val: listing.type, color: "text-slate-200" },
              { icon: ChevronRight, label: "Listed On", val: listing.date, color: "text-slate-200" },
            ].map(k => (
              <div key={k.label} className="rounded-2xl p-4 flex items-center gap-3" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.2)" }}>
                  <k.icon size={15} className="text-[#6c63ff]" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider">{k.label}</p>
                  <p className={`text-sm font-bold ${k.color}`}>{k.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Seller & Ownership */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Ownership details */}
            <Section icon={ShieldCheck} title="Ownership Details" accent>
              <div className="grid grid-cols-2 gap-3">
                <InfoCell label="Erf / Stand #" value={d.ownership?.erfNumber} />
                <InfoCell label="Street Name" value={d.ownership?.streetName} />
                <InfoCell label="Title Deed Number" value={d.ownership?.titleDeed} />
                <InfoCell label="Lightstone Verified" value={d.ownership?.lightstoneVerified} />
                <InfoCell label="Erf Size" value={d.ownership?.erfSize} />
                <InfoCell label="Seller" value={listing.seller} />
              </div>
              <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
                <span className="text-green-400 text-[12px]">{d.ownership?.lifeOwnerStatus}</span>
              </div>
            </Section>

            {/* Auto-filled data */}
            <Section icon={Building2} title="Auto-Filled Data (Lightstone)" accent>
              <div className="grid grid-cols-2 gap-3">
                <InfoCell label="Erf Number" value={d.autoFilled?.erfNumber} />
                <InfoCell label="Highest & Best Use" value={d.autoFilled?.highestBestUse} />
                <InfoCell label="Town" value={d.autoFilled?.town} />
                <InfoCell label="Province" value={d.autoFilled?.province} />
                <InfoCell label="Suburb" value={d.autoFilled?.suburb} />
                <InfoCell label="Valuation" value={d.autoFilled?.valuation} />
              </div>
            </Section>
          </div>

          {/* Utilities & Description */}
          <Section icon={Zap} title="Property Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3 rounded-xl p-4" style={{ backgroundColor: "#252840", border: "1px solid #353852" }}>
                <Zap size={16} className="text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider">Electricity Supply</p>
                  <p className="text-sm font-semibold text-slate-100">{d.details?.electricitySupply}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl p-4" style={{ backgroundColor: "#252840", border: "1px solid #353852" }}>
                <Droplets size={16} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider">Water Supply</p>
                  <p className="text-sm font-semibold text-slate-100">{d.details?.waterSupply}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: "#252840", border: "1px solid #353852" }}>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">Seller Description / Special Features</p>
              <p className="text-sm text-slate-300 leading-relaxed">{d.details?.description}</p>
            </div>
          </Section>

          {/* Residential stats + security */}
          <Section icon={Home} title="Residential Property">
            {/* Circles */}
            <div className="flex flex-wrap gap-8 justify-start mb-6 pl-2">
              <CircleStat label="Bedrooms" value={d.residential?.bedrooms} />
              <CircleStat label="Bathrooms" value={d.residential?.bathrooms} />
              <CircleStat label="Garages" value={d.residential?.garages} />
            </div>
            {/* Text stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              <InfoCell label="Category" value={d.residential?.category} />
              <InfoCell label="Outbuildings" value={d.residential?.outbuildings} />
              <InfoCell label="Rates & Levies" value={d.residential?.ratesLevies} />
            </div>
            {/* Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Lock size={11} />Security Features</p>
                <div className="flex flex-wrap gap-2">
                  {(d.residential?.security || []).map(f => (
                    <span key={f} className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.25)", color: "#a5a0ff" }}>{f}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-3">Extras & Features</p>
                <div className="flex flex-wrap gap-2">
                  {(d.residential?.extras || []).map(e => (
                    <span key={e} className="text-xs px-3 py-1 rounded-full font-medium text-slate-300" style={{ backgroundColor: "#252840", border: "1px solid #353852" }}>{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Pricing */}
          <Section icon={DollarSign} title="Pricing (1% Commission + VAT)" accent>
            <p className="text-[12px] text-slate-500 mb-4">Properly uses a transparent, factor-based pricing model. Commission is 1% + VAT of the listing price.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl p-4" style={{ backgroundColor: "#252840", border: "1px solid #353852" }}>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">Asking Price</p>
                <p className="text-2xl font-extrabold text-slate-100">{d.pricing?.askingPrice}</p>
                <p className="text-[11px] text-slate-500 mt-1 italic">Amount seller wants to receive</p>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: "#252840", border: "1px solid #353852" }}>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">Listing Price</p>
                <p className="text-2xl font-extrabold text-slate-100">{d.pricing?.listingPrice}</p>
                <p className="text-[11px] text-slate-500 mt-1 italic">Final price incl. commission & VAT</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.25)" }}>
                <p className="text-[11px] text-green-500 uppercase tracking-wider mb-2">Properly Commission</p>
                <p className="text-2xl font-extrabold text-green-400">{listing.commission}</p>
                <p className="text-[11px] text-green-600 mt-1 italic">1% of listing price + VAT</p>
              </div>
            </div>
          </Section>

          {/* Media */}
          <Section icon={ImageIcon} title="Property Media">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(d.images || []).map((src, i) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden relative group">
                  <img src={src} alt={`Property ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {i === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
                      <PlayCircle size={36} className="text-white/90" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    {i === 3
                      ? <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-slate-900" style={{ backgroundColor: "#6c63ff" }}>VIDEO</span>
                      : <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-slate-900" style={{ backgroundColor: "rgba(255,255,255,0.8)" }}>PHOTO</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </div>

        {/* ── Sticky footer ── */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-8 py-4 gap-3"
          style={{ backgroundColor: "#1a1d27", borderTop: "1px solid #2a2d3e" }}>
          <p className="text-[12px] text-slate-500">Admin Review — <span className="text-slate-300 font-medium">{listing.id}</span> · Listed by <span className="text-slate-300 font-medium">{listing.seller}</span></p>
          <div className="flex items-center gap-3">
            <button onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors"
              style={{ border: "1px solid #353852" }}>
              Close
            </button>
            <button
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
              style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
              <span className="flex items-center gap-2"><XCircle size={14} /> Delete Listing</span>
            </button>
            <button
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-green-900 transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#4ade80,#22c55e)", boxShadow: "0 4px 14px rgba(34,197,94,0.25)" }}>
              <span className="flex items-center gap-2"><ShieldX size={14} /> Flag Listing</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function Listings() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)

  const filtered = LISTINGS.filter(l => {
    const q = search.toLowerCase()
    const matchQ = l.title.toLowerCase().includes(q) || l.id.toLowerCase().includes(q) || l.seller.toLowerCase().includes(q)
    return matchQ && (filter === "all" || l.status === filter)
  })

  const counts = {
    active: LISTINGS.filter(l => l.status === "active").length,
    pending: LISTINGS.filter(l => l.status === "pending").length,
    sold: LISTINGS.filter(l => l.status === "sold").length,
    closed: LISTINGS.filter(l => l.status === "closed").length,
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { key: "active", label: "Active", color: "bg-green-500/10 border-green-500/20 text-green-400" },
          { key: "pending", label: "Pending", color: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
          { key: "sold", label: "Sold", color: "bg-violet-500/10 border-violet-500/20 text-violet-400" },
          { key: "closed", label: "Closed", color: "bg-slate-500/10 border-slate-500/20 text-slate-400" },
        ].map(s => (
          <div key={s.key} className="rounded-2xl p-5" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
            <div className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border mb-3 ${s.color}`}>{s.label}</div>
            <div className="text-[28px] font-extrabold text-slate-100">{counts[s.key]}</div>
            <div className="text-[12px] text-slate-500">listings</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e2130", border: "1px solid #2a2d3e" }}>
        <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap" style={{ borderBottom: "1px solid #2a2d3e" }}>
          <h3 className="text-base font-bold text-slate-100">All Property Listings</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <Search size={14} className="text-slate-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..." className="bg-transparent outline-none text-slate-100 text-[13px] w-36 placeholder:text-slate-500" />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-lg px-3 py-2 text-slate-400 text-[13px] outline-none cursor-pointer" style={{ backgroundColor: "#0f1117", border: "1px solid #2a2d3e" }}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto w-[100vw]">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2d3e" }}>
                {["ID", "Property", "Seller", "Price", "Commission", "Status", "Type", "Area", "Listed", "Actions"].map(h => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-[#252840] transition-colors" style={{ borderBottom: "1px solid #2a2d3e" }}>
                  <td className={TD}><span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{l.id}</span></td>
                  <td className={`${TD} max-w-[200px]`}><div className="text-slate-100 font-medium truncate">{l.title}</div></td>
                  <td className={TD}>{l.seller}</td>
                  <td className={TD}><span className="font-bold text-slate-100">{l.price}</span></td>
                  <td className={TD}><span className="text-green-400 font-semibold">{l.commission}</span></td>
                  <td className={TD}><span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${STATUS_CLS[l.status]}`}>{l.status}</span></td>
                  <td className={TD}><span className="text-[12px] font-medium bg-[#252840] border border-[#353852] text-slate-300 px-2 py-0.5 rounded-lg">{l.type}</span></td>
                  <td className={TD}><span className="flex items-center gap-1 text-slate-400 text-[13px]"><MapPin size={11} className="text-slate-500" />{l.area}</span></td>
                  <td className={TD}>{l.date}</td>
                  <td className={TD}>
                    <button onClick={() => setSelected(l)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#252840] text-slate-300 border border-[#353852] hover:bg-[#353852] transition-all cursor-pointer">
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full-screen property detail modal */}
      {selected && <PropertyDetailModal listing={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
