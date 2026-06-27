import { CameraOff, Download, Hand, Info, PhoneOff, Shirt } from "lucide-react"

export default function GuidelinesSection() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <div className="bg-btn-bg text-btn-text rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2"
          aria-hidden
        />
        <div className="relative z-10 lg:w-1/2">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Guidelines for Devotees</h2>
          <p className="text-white/80 mb-8 text-base">
            To maintain the sanctity of the temple and ensure a smooth experience for all, we kindly request you to
            follow these guidelines.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Shirt className="w-6 h-6 text-gold shrink-0" aria-hidden />
              <span className="text-sm font-medium">Traditional Dress Code</span>
            </div>
            <div className="flex items-center gap-3">
              <CameraOff className="w-6 h-6 text-gold shrink-0" aria-hidden />
              <span className="text-sm font-medium">No Photography Inside</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneOff className="w-6 h-6 text-gold shrink-0" aria-hidden />
              <span className="text-sm font-medium">Phones on Silent</span>
            </div>
            <div className="flex items-center gap-3">
              <Hand className="w-6 h-6 text-gold shrink-0" aria-hidden />
              <span className="text-sm font-medium">Maintain Cleanliness</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 lg:w-1/2 bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 w-full">
          <h4 className="font-bold text-gold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" aria-hidden />
            Important Rules
          </h4>
          <ul className="space-y-4 text-sm text-white/90">
            <li className="flex items-start gap-3">
              <span className="text-gold">•</span>
              <span>Devotees are requested to arrive at least 30 minutes before their scheduled slot.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold">•</span>
              <span>Proof of identity (Aadhar, Voter ID, etc.) is mandatory for paid darshan bookings.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold">•</span>
              <span>
                Consumption of non-vegetarian food, alcohol, or smoking within temple premises is strictly
                prohibited.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold">•</span>
              <span>Cooperate with the security personnel for checks and queue management.</span>
            </li>
          </ul>
          <button
            type="button"
            className="mt-8 text-gold font-bold flex items-center gap-2 hover:underline"
          >
            Download Full Guidelines PDF
            <Download className="w-5 h-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}

