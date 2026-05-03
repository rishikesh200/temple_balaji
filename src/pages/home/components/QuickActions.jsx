import { Calendar, Heart, Phone, Sparkles, Video } from "lucide-react"
import Concave from "../../../components/Concave"
import templeicon from "../../../assets/images/temple.png"
import poojaicon from "../../../assets/images/pooja.png"
import darshanicon from "../../../assets/images/calendar.png"
import liveicon from "../../../assets/images/live.png"
import contacticon from "../../../assets/images/konark-sun-temple.png"







const actions = [
  {
    icon: templeicon,
    title: "Donate",
    subtitle: "Support the Temple",
  },
  {
    icon: darshanicon,
    title: "Book Darshan",
    subtitle: "Reserve Your Slot",
  },
  {
    icon: poojaicon,
    title: "Book Pooja",
    subtitle: "Perform Sevas",
  },
  {
    icon: liveicon,
    title: "Live Darshan",
    subtitle: "Watch Live",
  },
  {
    icon: contacticon,
    title: "Contact Temple",
    subtitle: "Get in Touch",
  },
]

export default function QuickActions() {
  return (
    <div className="relative z-10 -mt-7 ">
      <div className="max-w-6xl mx-auto px-4 [filter:drop-shadow(4px_6px_14px_rgba(0,0,0,0.18))_drop-shadow(1px_2px_4px_rgba(0,0,0,0.08))]">
        <Concave
          borderRadius="18px"
          concave="15px"
          className="bg-[#FFF9F0] border border-[#E8D9C8] overflow-hidden px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-5  px-4">
            {actions.map((action, index) => {
              const insetRule =
                index > 0
                  ? [
                      "before:pointer-events-none before:absolute before:left-0 before:top-[22%] before:bottom-[22%] before:w-px before:bg-[#C8C4BC] before:content-['']",
                      index % 2 === 0 ? "max-md:before:hidden" : "",
                    ].join(" ")
                  : ""
              return (
              <button
                key={action.title}
                type="button"
                className={`relative flex flex-row items-center justify-center gap-3 py-5 px-4 md:px-3 text-left hover:bg-[#FFF3E6]/80 transition-colors group ${insetRule}`}
              >
                <img src={action.icon} alt={action.title} className="h-10 w-10 shrink-0 text-[#6B1414] md:h-7 md:w-7" />
                 
                <div className="min-w-0 flex flex-col gap-0.5">
                  <span className="font-serif text-sm font-bold leading-tight text-[#2D1810] md:text-[0.95rem]">
                    {action.title}
                  </span>
                  <span className="text-xs leading-tight text-[#7A756D]">{action.subtitle}</span>
                </div>
              </button>
              )
            })}
          </div>
        </Concave>
      </div>
    </div>
  )
}

