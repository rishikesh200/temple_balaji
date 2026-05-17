import React from "react"

function EventItem({ event, index }) {
  const flipped = index % 2 === 1
  return (
    <div className="mb-10 flex flex-col md:flex-row items-center">
      <div className={`md:w-1/3 ${flipped ? "md:order-2 md:pl-8" : "md:pr-8"}`}>
        <div className="text-sm text-[#6B4423] font-semibold">{event.date}</div>
        <div className="mt-3 w-full h-56 rounded-xl overflow-hidden shadow-sm border border-[#E5D5C5]">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="md:w-2/3 mt-4 md:mt-0">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5D5C5]">
          <h3 className="text-2xl font-serif text-[#2D1810] font-bold">{event.title}</h3>
          <p className="text-[#6B4423] mt-3">{event.details}</p>
        </div>
      </div>
    </div>
  )
}

export default function EventTimeline({ events = [] }) {
  return (
    <section>
      <div className="space-y-6">
        {events.map((ev, idx) => (
          <EventItem key={ev.id} event={ev} index={idx} />
        ))}
      </div>
    </section>
  )
}
