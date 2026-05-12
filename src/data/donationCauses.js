import imgAnnadanam from "../assets/images/hero-balaji.jpg"
import imgRenovation from "../assets/images/temple-gopuram.jpg"
import imgGeneral from "../assets/images/festival.jpg"
import imgGoshala from "../assets/images/darshan.jpg"
import imgEducation from "../assets/images/gallery-1.jpg"
import imgFestivals from "../assets/images/gallery-2.jpg"
import imgArchana from "../assets/images/vilaku.jpeg"
import imgOutreach from "../assets/images/ganesh_pooja.jpeg"

/**
 * Donation cause cards — extend this array to add more rows.
 * inputMode: "presets" shows quick amount chips; "custom" shows amount input only.
 */
export const donationCauses = [
  {
    id: "annadanam",
    title: "Annadanam",
    description:
      "Provide nutritious meals to devotees and the underprivileged in the sacred temple premises.",
    image: imgAnnadanam,
    inputMode: "presets",
    presetAmounts: [501, 1001, 5001],
    ctaIcon: "heart",
  },
  {
    id: "renovation",
    title: "Renovation",
    description:
      "Contribute to structural maintenance and restoration of Gopurams, Vimanas, and sacred mandapams.",
    image: imgRenovation,
    inputMode: "custom",
    ctaIcon: "building",
  },
  {
    id: "general-fund",
    title: "General Fund",
    description:
      "Supporting daily temple operations, ritual materials, and utilities for uninterrupted worship.",
    image: imgGeneral,
    inputMode: "custom",
    ctaIcon: "landmark",
  },
  {
    id: "goshala",
    title: "Goshala",
    description:
      "Preserve Gomatha care with fodder, veterinary support, and shelter for temple cows.",
    image: imgGoshala,
    inputMode: "presets",
    presetAmounts: [251, 501, 1001],
    ctaIcon: "heartHandshake",
  },
  {
    id: "vedic-education",
    title: "Vedic Pathashala",
    description:
      "Support young archakas learning Vedas, Agamas, and temple traditions under qualified acharyas.",
    image: imgEducation,
    inputMode: "custom",
    ctaIcon: "book",
  },
  {
    id: "festivals",
    title: "Festivals & Utsavam",
    description:
      "Help sponsor Brahmotsavam, Kalyanotsavam, and seasonal utsavams with flowers, alankaram, and annadanam.",
    image: imgFestivals,
    inputMode: "presets",
    presetAmounts: [1001, 5001, 11000],
    ctaIcon: "sparkles",
  },
  {
    id: "daily-archana",
    title: "Daily Archana",
    description:
      "Sponsor daily archana, naivedyam, and oil for lamps to sustain unbroken seva to the Lord.",
    image: imgArchana,
    inputMode: "presets",
    presetAmounts: [101, 501, 1001],
    ctaIcon: "flame",
  },
  {
    id: "community",
    title: "Community Outreach",
    description:
      "Extend seva beyond the temple—medical camps, education aid, and relief during festivals and crises.",
    image: imgOutreach,
    inputMode: "custom",
    ctaIcon: "users",
  },
]
