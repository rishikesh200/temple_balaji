import { darshanTypes } from "../../../data/darshanTypes"

function DarshanTypeCard({ option }) {
  return (
    <div className={option.featured ? "pt-5 sm:pt-6" : undefined}>
      <article
        className={`group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col bg-[#F6F3F2] h-full ${
          option.featured
            ? "border-2 border-[#D4A853]/50 shadow-md md:scale-[1.02] z-10"
            : "border-[#E5D5C5]/50"
        }`}
      >
        {option.featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A853] text-[#2D1810] px-6 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-md z-20 whitespace-nowrap">
            Most Preferred
          </div>
        )}
        <div className="h-64 overflow-hidden relative">
          <img
            src={option.image}
            alt={option.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded text-sm font-bold ${
              option.badge === "FREE"
                ? "bg-white/90 backdrop-blur-sm text-[#8B1A1A]"
                : "bg-[#D4A853] text-[#2D1810]"
            }`}
          >
            {option.badge}
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2D1810] mb-3">
            {option.title}
          </h3>
          <p className="text-sm text-[#6B4423] mb-6 flex-grow leading-relaxed">
            {option.description}
          </p>
          <div className="flex items-center justify-between mt-auto gap-3 flex-wrap">
            <span className="text-[#8B4513] font-bold text-sm">{option.tagline}</span>
            <button
              type="button"
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                option.primaryCta
                  ? "bg-[#8B1A1A] text-white hover:bg-[#6B1414]"
                  : "bg-[#6B4423] text-white hover:bg-[#2D1810]"
              }`}
            >
              {option.ctaLabel}
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default function TypesSection() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto" id="types">
      <div className="text-center mb-16">
        <div className="divine-divider text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#6B4423] mb-4">
          Service Offerings
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] mb-4">
          Types of Darshan
        </h2>
        <p className="text-[#6B4423] max-w-2xl mx-auto text-base">
          Choose the darshan experience that best suits your requirements and spiritual focus.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {darshanTypes.map((option) => (
          <DarshanTypeCard key={option.id} option={option} />
        ))}
      </div>
    </section>
  )
}
