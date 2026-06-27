import FastMarquee from "react-fast-marquee"
import { FadeUp, BlurReveal } from "../../../components/Motion"
import eventImg1 from "../../../assets/images/festival.jpg"
import eventImg2 from "../../../assets/images/temple-gopuram.jpg"
import eventImg3 from "../../../assets/images/gallery-1.jpg"
import eventImg4 from "../../../assets/images/darshan.jpg"
import { useLanguage } from "../../../contexts/LanguageContext"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { Link } from "react-router-dom"
import { getT } from "../../../utils/i18n"

const Marquee = FastMarquee?.default ?? FastMarquee

// Map imageKey → imported image (for default events that don't have a URL)
const IMAGE_MAP = {
  festival: eventImg1,
  gopuram:  eventImg2,
  gallery1: eventImg3,
  darshan:  eventImg4,
}

const TRANSLATIONS = {
  upcomingFestivals: { en: "Upcoming Festivals & Events",        ta: "வரவிருக்கும் விழாக்கள் & நிகழ்ச்சிகள்" },
  viewAllEvents:     { en: "View All Events",                    ta: "அனைத்து நிகழ்ச்சிகளைக் காணக்கள்" },
}

export default function Events() {
  const { lang } = useLanguage()
  const { homeEvents } = useAdminData()

  if (homeEvents.length === 0) return null

  return (
    <section className="py-8 bg-parchment">
      <div className="max-w-7xl mx-auto px-4">
        <BlurReveal className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-earth-dark">
            {TRANSLATIONS.upcomingFestivals[lang]}
          </h2>
          <Link to="/events"
            className="text-sm text-maroon border border-maroon px-4 py-1.5 rounded-md hover:bg-maroon hover:text-white transition-colors">
            {TRANSLATIONS.viewAllEvents[lang]}
          </Link>
        </BlurReveal>

        <div className="relative -mx-4 md:mx-0 overflow-x-hidden overflow-y-hidden">
          <Marquee pauseOnHover speed={35} gradient gradientColor="var(--color-parchment)" gradientWidth={72} className="py-1 overflow-y-hidden">
            {homeEvents.map((event) => {
              const imgSrc = event.imageUrl || IMAGE_MAP[event.imageKey] || eventImg1
              return (
                <div key={event.id}
                  className="mx-2.5 flex-shrink-0 flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-border-warm min-w-[300px]">
                  <div className="w-36 h-36 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={imgSrc} alt={event.title} className="w-full h-full object-cover"
                      onError={e => { e.target.src = eventImg1 }} />
                  </div>
                  <div className="min-w-0 pr-1">
                    <h3 className="font-semibold text-base text-earth-dark leading-snug">{getT(event, 'title', lang)}</h3>
                    <p className="text-sm text-earth-medium mt-1">{event.date}</p>
                    {event.time && <p className="text-xs text-gray-400 mt-0.5">{event.time}</p>}
                  </div>
                </div>
              )
            })}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
