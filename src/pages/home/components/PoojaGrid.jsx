const poojas = [
  { name: "Ganapathy Pooja", price: "From ₹151", icon: "🕉️" },
  { name: "Abhishekam", price: "From ₹251", icon: "🕉️" },
  { name: "Archana", price: "From ₹101", icon: "🕉️" },
  { name: "Alankaram", price: "From ₹501", icon: "🕉️" },
  { name: "Navagraha Pooja", price: "From ₹351", icon: "🕉️" },
  { name: "Annadhanam", price: "From ₹251", icon: "🕉️" },
  { name: "Sankatahara", price: "From ₹101", icon: "🕉️" },
]

export default function PoojaGrid() {
  return (
    <section className="py-10 bg-[#F5E6D3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#2D1810]">Book Pooja & Sevas</h2>
          <p className="text-sm text-[#6B4423] mt-1">
            — Offer your prayers and receive divine blessings —
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {poojas.map((pooja) => (
            <button key={pooja.name} className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-[#FDF8F3] border-2 border-[#D4A853] flex items-center justify-center mb-2 group-hover:bg-[#D4A853] transition-colors overflow-hidden">
                <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
                  <circle cx="30" cy="30" r="25" fill="#8B1A1A" opacity="0.1" />
                  <path
                    d="M30 15c-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm0 27c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z"
                    fill="#8B1A1A"
                  />
                  <circle cx="30" cy="30" r="6" fill="#D4A853" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#2D1810]">{pooja.name}</span>
              <span className="text-xs text-[#8B1A1A] font-medium">{pooja.price}</span>
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#6B1414] transition-colors">
            View All Poojas & Sevas
          </button>
        </div>
      </div>
    </section>
  )
}

