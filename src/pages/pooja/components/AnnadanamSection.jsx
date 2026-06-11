import { Utensils, Users } from "lucide-react"
import { annadanamOptions, annadanamImages } from "../../../data/poojaData"

export default function AnnadanamSection() {
  const iconMap = {
    Utensils: Utensils,
    Users: Users,
  }

  return (
    <section className="py-16 md:py-24 bg-earth-dark text-gold relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full w-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-white/20" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-6">
              Annadanam: The Highest Offering
            </h2>
            <p className="font-sans text-base md:text-lg mb-8 opacity-90 text-white/90">
              "Gaja turaga Sahasram Gokulam koti danam... Annadanam samam naiva na bhutam na bhavishyati." There is no donation equal to feeding the hungry.
            </p>

            {/* Annadanam Options */}
            <div className="space-y-6 mb-10">
              {annadanamOptions.map((option) => {
                const IconComponent = iconMap[option.icon] || Utensils
                return (
                  <div key={option.id} className="flex items-start gap-4">
                    <div className="bg-gold p-3 rounded-lg flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-earth-dark" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-base md:text-lg mb-1 text-white">
                        {option.title}
                      </h4>
                      <p className="font-sans text-sm opacity-80 text-white/80">
                        {option.description}
                      </p>
                    </div>
                    <div className="font-bold text-lg text-gold flex-shrink-0 whitespace-nowrap">
                      ₹ {option.price.toLocaleString()}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="bg-gold text-earth-dark px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base hover:bg-gold-deep transition-all shadow-lg"
            >
              Donate for Annadanam
            </button>
          </div>

          {/* Right Images */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {annadanamImages.map((image, idx) => (
              <img
                key={idx}
                src={image.src}
                alt={image.alt}
                className="rounded-2xl h-56 sm:h-64 w-full object-cover shadow-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
