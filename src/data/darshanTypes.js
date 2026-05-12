import Img1 from "../assets/images/hero-balaji.jpg"
import Img2 from "../assets/images/darshan.jpg"
import Img3 from "../assets/images/temple-gopuram.jpg"

/** Shared darshan offerings — add entries to show more cards on Home and /darshan */
export const darshanTypes = [
  {
    id: "sarva",
    title: "Sarva Darshan",
    summary: "General darshan for all devotees. Entry based on availability.",
    description:
      "Free general darshan for all devotees. Access is based on availability and queue sequence. Suitable for those seeking a traditional, patient spiritual experience.",
    priceLabel: "FREE",
    badge: "FREE",
    tagline: "No Charge",
    featured: false,
    ctaLabel: "Select Slot",
    primaryCta: false,
    image: Img1,
  },
  {
    id: "special",
    title: "Special Darshan",
    summary: "Faster access with special queue for a blessed experience.",
    description:
      "Faster access with a dedicated special queue. Ideal for families and elderly devotees who prefer a shorter waiting time while maintaining the sanctity of the ritual.",
    priceLabel: "₹250",
    badge: "₹250",
    tagline: "Fast-Track",
    featured: true,
    ctaLabel: "Book Now",
    primaryCta: true,
    image: Img2,
  },
  {
    id: "vip",
    title: "VIP Darshan",
    summary: "Personalized darshan with minimal waiting time.",
    description:
      "Priority access with minimal waiting time. Includes specialized seating and guidance. Perfect for those on a tight schedule or seeking a highly focused spiritual session.",
    priceLabel: "₹750",
    badge: "₹750",
    tagline: "Priority Entry",
    featured: false,
    ctaLabel: "Book Now",
    primaryCta: false,
    image: Img3,
  },
]
