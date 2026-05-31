import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAdminData } from "../../admin/contexts/AdminDataContext"
import { t } from "../../utils/i18n"
import DonateCTA from "../../components/DonateCTA"

const TR = {
  eyebrow:  { en: "OM NAMO VENKATESAYA",                                   ta: "ஓம் நமோ வேங்கடேசாய" },
  heading:  { en: "Gallery",                                                ta: "படக்காட்சி" },
  sub:      { en: "Witness the divine beauty and sacred moments of our temple", ta: "எங்கள் கோயிலின் தெய்வீக அழகையும் புனித தருணங்களையும் கண்டு மகிழுங்கள்" },
  all:      { en: "All",                                                    ta: "அனைத்தும்" },
  view:     { en: "View",                                                   ta: "காண்க" },
  category: { en: "Category:",                                              ta: "வகை:" },
  empty:    { en: "No images in this category yet.",                        ta: "இந்த வகையில் படங்கள் இல்லை." },
}

export default function GalleryPage() {
  const { lang } = useLanguage()
  const { gallery } = useAdminData()
  const [filter, setFilter] = useState("all")
  const [selectedIndex, setSelectedIndex] = useState(null)

  // Only active images
  const activeImages = gallery.filter(g => g.isActive)

  // Unique categories from DB
  const categories = ["all", ...new Set(activeImages.map(g => g.category).filter(Boolean))]

  const filtered = filter === "all"
    ? activeImages
    : activeImages.filter(g => g.category === filter)

  const openModal  = (i) => setSelectedIndex(i)
  const closeModal = () => setSelectedIndex(null)
  const nextImage  = () => setSelectedIndex(i => (i + 1) % filtered.length)
  const prevImage  = () => setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length)

  const heroImage = activeImages[0]?.imageUrl || ''

  return (
    <div className="min-h-screen bg-[#FDF8F3]">

      {/* ── Hero ── */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
        {heroImage && (
          <img src={heroImage} alt="Gallery Hero"
            className="absolute inset-0 w-full h-full object-cover"
            onError={e => e.target.style.display = 'none'} />
        )}
        <div className="absolute inset-0 bg-[#2D1810]/60" />
        <div className="relative z-20 text-center px-4">
          <span className="text-[#D4A853] tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase mb-4 block">
            {t(TR.eyebrow, lang)}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            {t(TR.heading, lang)}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            {t(TR.sub, lang)}
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Filter Buttons */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full font-medium capitalize transition-all ${
                    filter === cat
                      ? "bg-[#8B1A1A] text-white shadow-lg"
                      : "bg-white border-2 border-[#D4A853] text-[#2D1810] hover:border-[#8B1A1A]"
                  }`}>
                  {cat === 'all' ? t(TR.all, lang) : cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-20">{t(TR.empty, lang)}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((image, index) => (
                <div key={image.id} onClick={() => openModal(index)}
                  className="group relative overflow-hidden rounded-lg border-2 border-[#D4A853] cursor-pointer transition-all duration-300 hover:shadow-xl">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    {image.imageUrl ? (
                      <img src={image.imageUrl} alt={image.caption || 'Temple gallery'}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={e => e.target.style.display = 'none'} />
                    ) : null}
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    {image.caption && (
                      <h3 className="text-white text-xl font-serif font-bold mb-2 text-center px-4">
                        {image.caption}
                      </h3>
                    )}
                    <p className="text-[#D4A853] text-sm font-medium capitalize">{image.category}</p>
                    <div className="mt-4 px-6 py-2 bg-[#8B1A1A] text-white rounded-md text-sm font-medium">
                      {t(TR.view, lang)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {selectedIndex !== null && filtered[selectedIndex] && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-[#D4A853] transition-colors">
            <X size={32} />
          </button>
          <div className="relative max-w-4xl w-full">
            <img src={filtered[selectedIndex].imageUrl}
              alt={filtered[selectedIndex].caption || 'Temple gallery'}
              className="w-full h-auto rounded-lg"
              onError={e => e.target.style.display = 'none'} />
            {filtered[selectedIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-2xl font-serif font-bold mb-1">
                  {filtered[selectedIndex].caption}
                </h3>
                <p className="text-[#D4A853] text-sm capitalize">
                  {t(TR.category, lang)} {filtered[selectedIndex].category}
                </p>
              </div>
            )}
            <button onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#8B1A1A] hover:bg-[#6B1414] text-white p-3 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#8B1A1A] hover:bg-[#6B1414] text-white p-3 rounded-full transition-colors">
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-6 right-6 bg-[#8B1A1A] text-white px-4 py-2 rounded-full text-sm font-medium">
              {selectedIndex + 1} / {filtered.length}
            </div>
          </div>
        </div>
      )}

      <DonateCTA />
    </div>
  )
}
