import { Calendar, Heart, Phone, Sparkles, Video } from "lucide-react"

const actions = [
  {
    icon: Heart,
    title: "Donate",
    subtitle: "Support the Temple",
  },
  {
    icon: Calendar,
    title: "Book Darshan",
    subtitle: "Reserve Your Slot",
  },
  {
    icon: Sparkles,
    title: "Book Pooja",
    subtitle: "Perform Sevas",
  },
  {
    icon: Video,
    title: "Live Darshan",
    subtitle: "Watch Live",
  },
  {
    icon: Phone,
    title: "Contact Temple",
    subtitle: "Get in Touch",
  },
]

export default function QuickActions() {
  return (
    <div className="relative z-10 -mt-12 mb-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg border border-[#E5D5C5] overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-[#E5D5C5]">
            {actions.map((action) => (
              <button
                key={action.title}
                className="flex flex-col items-center justify-center py-5 px-4 hover:bg-[#FDF8F3] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-2 group-hover:bg-[#D4A853] transition-colors">
                  <action.icon className="w-5 h-5 text-[#8B1A1A]" />
                </div>
                <span className="text-[#2D1810] font-medium text-sm">{action.title}</span>
                <span className="text-[#6B4423] text-xs">{action.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

