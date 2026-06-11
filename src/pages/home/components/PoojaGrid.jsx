import poojaThumb from "../../../assets/images/pooja.png"
import { useLanguage } from "../../../contexts/LanguageContext"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { Link } from "react-router-dom"
import { slugify } from "../../../data/poojaData"

const POOJA_TRANSLATIONS = {
  bookPooja:    { en: "Book Pooja & Sevas",                          ta: "பூஜை & சேவைகளை முன்பதிவு செய்யுங்கள்" },
  offerPrayers: { en: "Offer your prayers and receive divine blessings", ta: "உங்கள் பிரார்த்தனைகளை செலுத்தவும் மற்றும் தெய்வீக ஆசிர்வாதங்களைப் பெறவும்" },
  viewAllPoojas:{ en: "View All Poojas & Sevas",                    ta: "அனைத்து பூஜைகள் & சேவைகளைக் காணக்கள்" },
  free:         { en: "Free",                                        ta: "இலவசம்" },
}

const cardClass =
  "flex w-full max-w-[280px] mx-auto flex-col items-center rounded-2xl bg-white px-6 pt-7 pb-8 " +
  "border border-gray-warm-light shadow-[0_2px_12px_rgba(45,24,16,0.06)] " +
  "transition-all duration-200 hover:shadow-[0_6px_20px_rgba(45,24,16,0.1)] hover:-translate-y-0.5 hover:border-border-warm"

export default function PoojaGrid() {
  const { lang } = useLanguage()
  const { homePoojas: displayPoojas } = useAdminData()

  return (
    <section className="py-10 bg-parchment-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl font-bold text-earth-dark">{POOJA_TRANSLATIONS.bookPooja[lang]}</h2>
          <p className="text-sm text-earth-medium mt-1">
            — {POOJA_TRANSLATIONS.offerPrayers[lang]} —
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7 max-w-7xl mx-auto justify-items-center">
          {displayPoojas.map((pooja) => (
            <Link
              key={pooja.id}
              to={`/pooja/${slugify(pooja.name)}`}
              className={cardClass}
              aria-label={`Book ${pooja.name}`}
            >
              <img
                src={pooja.image}
                alt={pooja.name}
                className="mb-3 w-full aspect-[4/3] object-cover rounded-xl"
                onError={e => { e.target.src = poojaThumb }}
              />
              <h3 className="w-full text-center font-sans text-base font-bold leading-snug tracking-tight text-earth-dark">
                {pooja.name}
              </h3>
              <p className="mt-2 w-full text-center font-sans text-sm font-bold text-maroon">
                {pooja.bookingType === 'free' || pooja.price === 0
                  ? POOJA_TRANSLATIONS.free[lang]
                  : `₹ ${pooja.price}`}
              </p>
              {pooja.bookingType === 'spot' && (
                <span className="mt-1 text-xs text-gray-400">Pay at temple</span>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/pooja"
            className="bg-btn-bg text-btn-text px-6 py-2.5 rounded-md text-sm font-medium hover:bg-btn-bg-hover transition-colors inline-block"
          >
            {POOJA_TRANSLATIONS.viewAllPoojas[lang]}
          </Link>
        </div>
      </div>
    </section>
  )
}

