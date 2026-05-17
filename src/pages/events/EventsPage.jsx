import React from "react"
import EventTimeline from "./components/EventTimeline"
import DonateCTA from "../../components/DonateCTA"
import eventImg1 from "../../assets/images/festival.jpg"
import eventImg2 from "../../assets/images/temple-gopuram.jpg"
import eventImg3 from "../../assets/images/gallery-1.jpg"
import eventImg4 from "../../assets/images/darshan.jpg"

const events = [
  {
    id: 1,
    title: "Temple Anniversary Celebration",
    date: "May 22, 2025",
    image: eventImg1,
    details:
      "Join us for the annual temple anniversary with special poojas, cultural programs, and prasadam for all devotees.",
  },
  {
    id: 2,
    title: "Heritage Walk & Talks",
    date: "Jun 10, 2025",
    image: eventImg2,
    details:
      "A guided walk through the temple's history followed by talks from scholars and elders.",
  },
  {
    id: 3,
    title: "Rath Yatra",
    date: "Jun 27, 2025",
    image: eventImg3,
    details:
      "Chariot procession and community prayers—volunteers needed for arrangements and seva.",
  },
  {
    id: 4,
    title: "Annadanam Drive",
    date: "Jul 12, 2025",
    image: eventImg4,
    details:
      "Community meal for devotees and the needy. Sponsors welcome to join and support the cause.",
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-4xl text-[#2D1810] font-bold">Events & Milestones</h1>
          <p className="text-[#6B4423] mt-2">Latest temple happenings, important dates and community milestones.</p>
        </header>

        <EventTimeline events={events} />
        <DonateCTA />
      </div>
    </div>
  )
}
