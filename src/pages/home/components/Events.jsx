import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import eventImg1 from "../../../assets/images/festival.jpg"
import eventImg2 from "../../../assets/images/temple-gopuram.jpg"
import eventImg3 from "../../../assets/images/gallery-1.jpg"
import eventImg4 from "../../../assets/images/darshan.jpg"


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
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (!scrollRef.current) return

    const scrollAmount = 200
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-8 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-[#2D1810]">
            Upcoming Festivals & Events
          </h2>
          <button className="text-sm text-[#8B1A1A] border border-[#8B1A1A] px-4 py-1.5 rounded-full hover:bg-[#8B1A1A] hover:text-white transition-colors">
            View All Events
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-[#F5E6D3] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#8B1A1A]" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {events.map((event) => (
              <div
                key={event.title}
                className="flex-shrink-0 flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-[#E5D5C5] min-w-[200px]"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#2D1810]">{event.title}</h3>
                  <p className="text-xs text-[#6B4423]">{event.date}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-[#F5E6D3] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#8B1A1A]" />
          </button>
        </div>
      </div>
    </section>
  )
}

