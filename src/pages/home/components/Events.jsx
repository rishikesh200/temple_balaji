import FastMarquee from "react-fast-marquee"
import eventImg1 from "../../../assets/images/festival.jpg"
import eventImg2 from "../../../assets/images/temple-gopuram.jpg"
import eventImg3 from "../../../assets/images/gallery-1.jpg"
import eventImg4 from "../../../assets/images/darshan.jpg"

const Marquee = FastMarquee?.default ?? FastMarquee

const events = [
  {
    title: "Vaikunta Ekadashi",
    date: "May 22, 2025",
    image: eventImg1,
  },
  {
    title: "Panguni Uthiram",
    date: "Jun 10, 2025",
    image: eventImg2,
  },
  {
    title: "Rath Yatra",
    date: "Jun 27, 2025",
    image: eventImg3,
  },
  {
    title: "Aadi Pooram",
    date: "Jul 12, 2025",
    image: eventImg4,
  },
]

export default function Events() {
  return (
    <section className="py-8 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-[#2D1810]">
            Upcoming Festivals & Events
          </h2>
          <button className="text-sm text-[#8B1A1A] border border-[#8B1A1A] px-4 py-1.5 rounded-md hover:bg-[#8B1A1A] hover:text-white transition-colors">
            View All Events
          </button>
        </div>

        <div className="relative -mx-4 md:mx-0 overflow-x-hidden overflow-y-hidden">
          <Marquee
            pauseOnHover
            speed={35}
            gradient
            gradientColor="#FDF8F3"
            gradientWidth={72}
            className="py-1 overflow-y-hidden"
          >
            {events.map((event) => (
              <div
                key={event.title}
                className="mx-2.5 flex-shrink-0 flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-[#E5D5C5] min-w-[300px]"
              >
                <div className="w-36 h-36 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 pr-1">
                  <h3 className="font-semibold text-base text-[#2D1810] leading-snug">{event.title}</h3>
                  <p className="text-sm text-[#6B4423] mt-1">{event.date}</p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
