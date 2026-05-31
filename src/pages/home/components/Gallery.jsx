import { Link } from "react-router-dom"
import { useLanguage } from "../../../contexts/LanguageContext"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"

const TR = {
  aboutOurTemple: { en: "About Our Temple",                   ta: "எங்கள் கோவிலைப் பற்றி" },
  timelessAbode:  { en: "A Timeless Abode of Divine Grace",   ta: "தெய்வீக அருளின் நிரந்தர வாசஸ்தலம்" },
  viewFullGallery:{ en: "View Full Gallery",                  ta: "முழு கேலரியைக் காணக்கள்" },
}

const cellClass =
  "relative min-h-0 rounded-lg overflow-hidden border-2 border-[#D4A853] cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"

export default function Gallery() {
  const { lang } = useLanguage()
  const { gallery } = useAdminData()

  // Up to 4 home-featured active images for the collage
  const homeImages = gallery.filter(g => g.isActive && g.isHome).slice(0, 4)

  if (homeImages.length === 0) return null

  // Pad to exactly 4 slots (repeat from start if fewer than 4)
  const slots = Array.from({ length: 4 }, (_, i) => homeImages[i % homeImages.length])

  return (
    <section className="py-10 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#8B1A1A] text-sm font-medium mb-2">{TR.aboutOurTemple[lang]}</p>
            <h2 className="font-serif text-3xl font-bold text-[#2D1810] mb-4">
              {TR.timelessAbode[lang]}
            </h2>
          </div>
          <Link to="/gallery"
            className="inline-block bg-[#8B1A1A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#6B1414] transition-colors">
            {TR.viewFullGallery[lang]}
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3 w-full h-[clamp(19rem,56vh,34rem)] sm:h-[clamp(20rem,58vh,38rem)] md:h-[clamp(22rem,60vh,44rem)] max-h-[85vh]">
            <div className={`col-span-2 row-start-1 ${cellClass}`}>
              <img src={slots[0].imageUrl} alt={slots[0].caption || 'Temple gallery'}
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => e.target.style.display = 'none'} />
            </div>
            <div className={`col-span-1 row-start-1 ${cellClass}`}>
              <img src={slots[1].imageUrl} alt={slots[1].caption || 'Temple gallery'}
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => e.target.style.display = 'none'} />
            </div>
            <div className={`col-span-1 row-start-2 ${cellClass}`}>
              <img src={slots[2].imageUrl} alt={slots[2].caption || 'Temple gallery'}
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => e.target.style.display = 'none'} />
            </div>
            <div className={`col-span-2 row-start-2 ${cellClass}`}>
              <img src={slots[3].imageUrl} alt={slots[3].caption || 'Temple gallery'}
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => e.target.style.display = 'none'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
