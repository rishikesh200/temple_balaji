// Annadanam Options
export const annadanamOptions = [
  {
    id: "feed-10",
    title: "Feed 10 Devotees",
    description: "Provide full meals to 10 visiting pilgrims.",
    price: 1000,
    icon: "Utensils",
  },
  {
    id: "feed-100",
    title: "One Day Annadanam",
    description: "Sponsor the entire day's meals for hundreds.",
    price: 25000,
    icon: "Users",
  },
];

// Booking Guidelines
export const bookingGuidelines = [
  {
    id: "reporting-time",
    title: "Reporting Time",
    description: "Reporting time: 30 mins before Pooja.",
    icon: "Clock",
  },
  {
    id: "dress-code",
    title: "Dress Code",
    description: "Men: Dhoti or Lungi with Angavastram. Women: Saree or Chudidhar with Dupatta.",
    icon: "Shirt",
  },
  {
    id: "materials-provided",
    title: "Materials Provided",
    description: "The temple provides all necessary items like flowers, camphor, and oil for the rituals.",
    icon: "Package",
  },
  {
    id: "identity",
    title: "ID Proof",
    description: "Original ID proof is mandatory for online booked sevas for verification.",
    icon: "FileText",
  },
  {
    id: "restrictions",
    title: "Restrictions",
    description: "Photography and mobile phones are strictly prohibited inside the sanctum.",
    icon: "CameraOff",
  },
];

// Annadanam Images
export const annadanamImages = [
  {
    alt: "Annadanam Feeding",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_rWUOTVD5dXG_9zbwEGkp694Eph1gmGO3_3ia7VkyK0dbpqfJu3ebBtVrzvHCC4DTEGx6dH8Wbs9_lVlmL-iRtSidVv2vunIOlpeqgAKQYQkzuc5PIWbWb4O5zOMVV8-gRSQzFYYoLZWA3WWaxDd69VfU01ojEg5G3MhRVrqPPLIpnxiGyex-btOqlkyjjg9J2cxS9eVyiT2e4-Lm-B1OGxBnUXhW8uTj-jLL-kU7TjcUQIDh3o71hXQod_AHCbXdJrDXZ3xyykg",
  },
  {
    alt: "Traditional Cooking",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEtMJ7EJK7vmlF9xANVqJSUiIuqtChUd4MbvoqJz2ZXSROMXjLgd0TDg9Rq1pucwqnUpFsa5tjkSqQtdrJMlG2e64yOK5tVhNutJMpx5uJFE2cdNzu_-Ex5owXB42J2O7Y3zFnmBND81J4Qc1LOEzLC8T6dvYLX3YupCQrnSV3DOoE6gSzMLaQ_VECsg1fESohoG09Lo2HYFyGocdutDnPRGxitCqiN6WCwePxQFN60GAR-odbDOM8zjmLQAb1vvF5eMIhLp02ht0",
  },
];

// Helper to convert names to URL slugs
export const slugify = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
