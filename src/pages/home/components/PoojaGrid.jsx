import poojaThumb from "../../../assets/images/pooja.png"
import poojaIcon from "../../../assets/images/ganesh_pooja.jpeg"
import abhishekamIcon from "../../../assets/images/abishekam_pooja.jpeg"
import alankaramIcon from "../../../assets/images/alankaram_pooja.jpeg"
import navagrahaIcon from "../../../assets/images/navagraha_pooja.jpeg"
const poojas = [
  { name: "Ganapathy Pooja", price: "From ₹151",img:poojaIcon },
  { name: "Abhishekam", price: "From ₹251",img:abhishekamIcon },
  // { name: "Archana", price: "From ₹101" },
  { name: "Alankaram", price: "From ₹501",img:alankaramIcon },
  { name: "Navagraha Pooja", price: "From ₹351",img:navagrahaIcon },
  // { name: "Annadhanam", price: "From ₹251" },
  // { name: "Sankatahara", price: "From ₹101" },
]

const cardClass =
  "flex w-full max-w-[280px] mx-auto flex-col items-center rounded-2xl bg-white px-6 pt-7 pb-8 " +
  "border border-[#E8E4DF] shadow-[0_2px_12px_rgba(45,24,16,0.06)] " +
  "transition-all duration-200 hover:shadow-[0_6px_20px_rgba(45,24,16,0.1)] hover:-translate-y-0.5 hover:border-[#D4C9BC] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"

export default function PoojaGrid() {
  return (
    <section className="py-10 bg-[#F5E6D3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#2D1810]">Book Pooja & Sevas</h2>
          <p className="text-sm text-[#6B4423] mt-1">
            — Offer your prayers and receive divine blessings —
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7 max-w-7xl mx-auto justify-items-center">
          {poojas.map((pooja) => (
            <button key={pooja.name} type="button" className={cardClass} aria-label={`Book ${pooja.name}, ${pooja.price}`}>
              {/* <div
                className="mb-4 flex aspect-square w-[45%] min-w-[5.5rem] max-w-[6.75rem] shrink-0 items-center justify-center rounded-full bg-[#8B1A1A] shadow-inner ring-1 ring-black/10"
                aria-hidden
              >
                <img
                  src={pooja.img}
                  alt=""
                  className="h-[72%] w-[72%] object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                />
              </div> */}
              <img
                src={pooja.img}
                alt={pooja.name}
                className="mb-3 w-full aspect-[4/3] object-cover rounded-xl"
              />
              <h3 className="w-full text-center font-sans text-base font-bold leading-snug tracking-tight text-[#2D1810]">
                {pooja.name}
              </h3>
              <p className="mt-2 w-full text-center font-sans text-sm font-bold text-[#8B1A1A]">{pooja.price}</p>
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            type="button"
            className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#6B1414] transition-colors"
          >
            View All Poojas & Sevas
          </button>
        </div>
      </div>
    </section>
  )
}
