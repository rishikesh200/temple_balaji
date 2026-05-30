import img1 from "../../../assets/images/hero-balaji.jpg"
import img2 from "../../../assets/images/temple-gopuram.jpg"
import img3 from "../../../assets/images/darshan.jpg"
import img4 from "../../../assets/images/festival.jpg"
import { Link } from "react-router-dom"
import { useLanguage } from "../../../contexts/LanguageContext"

const GALLERY_TRANSLATIONS = {
  aboutOurTemple: {
    en: "About Our Temple",
    ta: "எங்கள் கோவிலைப் பற்றி"
  },
  timelessAbode: {
    en: "A Timeless Abode of Divine Grace",
    ta: "தெய்வீக அருளின் நிரந்தர வாசஸ்தலம்"
  },
  viewFullGallery: {
    en: "View Full Gallery",
    ta: "முழு கேலரியைக் காணக்கள்"
  }
}

/** Order: top-wide, top-narrow, bottom-narrow, bottom-wide */
const collageImages = [img1, img2, img3, img4]

const cellClass =
  "relative min-h-0 rounded-lg overflow-hidden border-2 border-[#D4A853] cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"

export default function Gallery() {
  const { lang } = useLanguage()
  
  return (
    <section className="py-10 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
        <div className="">
          <p className="text-[#8B1A1A] text-sm font-medium mb-2">{GALLERY_TRANSLATIONS.aboutOurTemple[lang]}</p>
              <h2 className="font-serif text-3xl font-bold text-[#2D1810] mb-4">
                {GALLERY_TRANSLATIONS.timelessAbode[lang]}
              </h2>
        </div>
        <div className="">
          <Link to="/gallery" className="inline-block bg-[#8B1A1A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#6B1414] transition-colors">
            {GALLERY_TRANSLATIONS.viewFullGallery[lang]}
          </Link>
        </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3 w-full h-[clamp(19rem,56vh,34rem)] sm:h-[clamp(20rem,58vh,38rem)] md:h-[clamp(22rem,60vh,44rem)] max-h-[85vh]">
            <div className={`col-span-2 row-start-1 ${cellClass}`}>
              <img
                src={collageImages[0]}
                alt="Temple gallery — wide view"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className={`col-span-1 row-start-1 ${cellClass}`}>
              <img
                src={collageImages[1]}
                alt="Temple gallery — detail"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className={`col-span-1 row-start-2 ${cellClass}`}>
              <img
                src={collageImages[2]}
                alt="Temple gallery — vertical scene"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className={`col-span-2 row-start-2 ${cellClass}`}>
              <img
                src={collageImages[3]}
                alt="Temple gallery — landscape"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

       
      </div>
    </section>
  )
}
