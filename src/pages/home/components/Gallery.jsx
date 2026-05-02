
import img1 from "../../../assets/images/hero-balaji.jpg"
import img2 from "../../../assets/images/temple-gopuram.jpg"
import img3 from "../../../assets/images/darshan.jpg"
import img4 from "../../../assets/images/festival.jpg"
import img5 from "../../../assets/images/gallery-1.jpg"


const images = [img1, img2, img3, img4, img5]

export default function Gallery() {
  return (
    <section className="py-10 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl font-bold text-[#2D1810] flex items-center justify-center gap-2">
            <span className="text-[#D4A853]">✦</span>
            Divine Glimpses
            <span className="text-[#D4A853]">✦</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-[3/2] rounded-lg overflow-hidden border-2 border-[#D4A853] hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={image}
                alt={`Temple Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#6B1414] transition-colors">
            View Full Gallery
          </button>
        </div>
      </div>
    </section>
  )
}

