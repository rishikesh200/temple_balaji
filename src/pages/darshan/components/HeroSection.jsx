import heroImg from "../../../assets/images/hero-balaji.jpg"

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] md:h-[614px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" aria-hidden />
      <img
        src={heroImg}
        alt="Paruthipattu Balaji Temple gopuram"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 text-center px-4">
        <span className="text-[#D4A853] tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase mb-4 block">
          OM NAMO VENKATESAYA
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Seek the Blessings of Balaji
        </h1>
        <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Experience the divine presence of Lord Venkateswara through our sacred Darshan services.
          Reserve your slot for a peaceful spiritual journey.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#types"
            className="bg-[#8B1A1A] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#6B1414] transition-all shadow-lg"
          >
            View Darshan Types
          </a>
          <a
            href="#booking"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-white/20 transition-all"
          >
            Check Availability
          </a>
        </div>
      </div>
    </section>
  )
}
