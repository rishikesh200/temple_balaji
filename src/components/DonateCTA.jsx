export default function DonateCTA() {
  return (
    <section className=" bg-[#FDF8F3] px-6 py-12 text-center border-y border-[#E5D5C5] sm:px-12 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="mx-auto mb-3 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#8B1A1A]">
          Support the Sacred Traditions
        </p>
        <h2 className="font-serif text-3xl font-bold leading-tight text-[#2D1810] sm:text-4xl">
          Support the Sacred Traditions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-[#6B4423]">
          Your contributions help us maintain the temple's daily rituals, community services, and architectural heritage for future generations.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="/donate"
            className="inline-flex items-center justify-center bg-[#8B1A1A] px-8 py-3 text-sm md:text-base font-bold text-white rounded-lg shadow-md transition hover:bg-[#6B1414]"
          >
            Donate Now
          </a>
        </div>
      </div>
    </section>
  )
}
