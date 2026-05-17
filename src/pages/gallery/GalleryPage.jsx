import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState } from "react"
import img1 from "../../assets/images/hero-balaji.jpg"
import img2 from "../../assets/images/temple-gopuram.jpg"
import img3 from "../../assets/images/darshan.jpg"
import img4 from "../../assets/images/festival.jpg"
import img5 from "../../assets/images/gallery-1.jpg"
import img6 from "../../assets/images/gallery-2.jpg"
import DonateCTA from "../../components/DonateCTA"

const galleryImages = [
  {
    id: 1,
    src: img1,
    alt: "Lord Balaji - Main Deity",
    title: "Divine Blessings",
    category: "Deity",
  },
  {
    id: 2,
    src: img2,
    alt: "Temple Gopuram",
    title: "Sacred Architecture",
    category: "Temple",
  },
  {
    id: 3,
    src: img3,
    alt: "Darshan Moment",
    title: "Darshan Experience",
    category: "Worship",
  },
  {
    id: 4,
    src: img4,
    alt: "Festival Celebration",
    title: "Festival Joy",
    category: "Events",
  },
  {
    id: 5,
    src: img5,
    alt: "Temple Entrance",
    title: "Gateway to Divinity",
    category: "Temple",
  },
  {
    id: 6,
    src: img6,
    alt: "Temple Interiors",
    title: "Sacred Interiors",
    category: "Temple",
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filter, setFilter] = useState("All")

  const categories = ["All", ...new Set(galleryImages.map((img) => img.category))]

  const filteredImages =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter)

  const openModal = (index) => {
    setSelectedImage(filteredImages[index])
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[nextIndex])
    setSelectedIndex(nextIndex)
  }

  const prevImage = () => {
    const prevIndex =
      (selectedIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[prevIndex])
    setSelectedIndex(prevIndex)
  }

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
        <img
          src={img1}
          alt="Gallery Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <span className="text-[#D4A853] tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase mb-4 block">
            OM NAMO VENKATESAYA
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Gallery
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Witness the divine beauty and sacred moments of our temple
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  filter === category
                    ? "bg-[#8B1A1A] text-white shadow-lg"
                    : "bg-white border-2 border-[#D4A853] text-[#2D1810] hover:border-[#8B1A1A]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => openModal(index)}
                className="group relative overflow-hidden rounded-lg border-2 border-[#D4A853] cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <h3 className="text-white text-xl font-serif font-bold mb-2 text-center">
                    {image.title}
                  </h3>
                  <p className="text-[#D4A853] text-sm font-medium">
                    {image.category}
                  </p>
                  <div className="mt-4 px-6 py-2 bg-[#8B1A1A] text-white rounded-md text-sm font-medium">
                    View
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal - Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-[#D4A853] transition-colors"
          >
            <X size={32} />
          </button>

          {/* Image Container */}
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-2xl font-serif font-bold mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-[#D4A853] text-sm">
                Category: {selectedImage.category}
              </p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#8B1A1A] hover:bg-[#6B1414] text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#8B1A1A] hover:bg-[#6B1414] text-white p-3 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-6 right-6 bg-[#8B1A1A] text-white px-4 py-2 rounded-full text-sm font-medium">
              {selectedIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
      <DonateCTA/>
    </div>
  )
}
