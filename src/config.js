export const brand = {
  name: "PureNest",
  suffix: "CLEANING",
  city: "Calgary",
  province: "Alberta",
  tagline: "A cleaner home. A lighter life.",
  demo: "Fictional business · Website demonstration · No real bookings",
  currency: "CAD",
};
export const nav = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/about", "About"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
];
export const photos = [
  {
    id: "photo-1600210492486-724fe5c67fb0",
    alt: "Light-filled living room with neutral furniture and leafy plants",
    label: "Room to unwind",
    category: "Living spaces",
  },
  {
    id: "photo-1556912172-45b7abe8b7e1",
    alt: "Bright, organized kitchen with a spacious island",
    label: "A fresh start",
    category: "Kitchens",
  },
  {
    id: "photo-1505693416388-ac5ce068fe85",
    alt: "Serene bedroom with crisp bedding and warm natural light",
    label: "Rest comes naturally",
    category: "Bedrooms",
  },
  {
    id: "photo-1600585154340-be6161a56a0c",
    alt: "Modern home with open, airy living spaces",
    label: "Space to settle in",
    category: "Living spaces",
  },
  {
    id: "photo-1497366811353-6870744d04b2",
    alt: "Bright contemporary office with plants and shared workspaces",
    label: "A clearer workday",
    category: "Workspaces",
  },
  {
    id: "photo-1581578731548-c64695cc6952",
    alt: "Cleaning professional caring for an interior space",
    label: "Care in every detail",
    category: "Cleaning",
  },
];
export const imageUrl = (photo, width = 1000) =>
  `https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=${width}&q=80`;
export const services = [
  {
    id: "residential",
    name: "Residential cleaning",
    short: "Your everyday, made easier.",
    description:
      "A thoughtful reset for the rooms you live in most. Explore a sample weekly, biweekly, or occasional cleaning routine.",
    base: 120,
    icon: "home",
    photo: 0,
    includes: [
      "Dust accessible surfaces and furniture",
      "Vacuum carpets and mop hard floors",
      "Clean kitchen counters and appliance exteriors",
      "Refresh bathrooms and empty waste bins",
    ],
  },
  {
    id: "deep",
    name: "Deep cleaning",
    short: "A little extra attention. A big difference.",
    description:
      "A more detailed, top-to-bottom refresh for seasonal resets and spaces that need a little extra care.",
    base: 210,
    icon: "sparkles",
    photo: 1,
    includes: [
      "Everything in residential cleaning",
      "Detailed baseboard and door cleaning",
      "Reachable fixture and vent dusting",
      "Extra attention to kitchen and bathroom buildup",
    ],
  },
  {
    id: "moving",
    name: "Move-in & move-out",
    short: "New chapter. Fresh beginning.",
    description:
      "An empty-home clean designed around the transition, whether you are settling in or handing over the keys.",
    base: 250,
    icon: "key",
    photo: 2,
    includes: [
      "Empty cupboard and drawer interiors",
      "Accessible closet shelves and floors",
      "Kitchen and bathroom detail cleaning",
      "Interior appliance cleaning available as an extra",
    ],
  },
  {
    id: "office",
    name: "Office cleaning",
    short: "Make space for your best work.",
    description:
      "An illustrative cleaning plan for small offices and shared workspaces. Final commercial scope would require a walkthrough.",
    base: 180,
    icon: "building",
    photo: 4,
    includes: [
      "Desk and common-area surface cleaning",
      "Kitchenette and washroom refresh",
      "Vacuuming and hard-floor care",
      "Waste and recycling bin emptying",
    ],
  },
];
export const pricing = {
  bedroom: 25,
  bathroom: 30,
  extras: [
    { id: "oven", label: "Inside oven", price: 35 },
    { id: "fridge", label: "Inside fridge", price: 30 },
    { id: "windows", label: "Interior windows", price: 45 },
  ],
  frequencies: [
    { id: "once", label: "One time", discount: 0 },
    { id: "biweekly", label: "Every two weeks", discount: 0.1 },
    { id: "weekly", label: "Every week", discount: 0.15 },
  ],
};
export function estimate({
  service = "residential",
  bedrooms = 2,
  bathrooms = 1,
  frequency = "once",
  extras = [],
}) {
  const selected = services.find((s) => s.id === service) || services[0];
  const subtotal =
    selected.base +
    Number(bedrooms) * pricing.bedroom +
    Number(bathrooms) * pricing.bathroom +
    pricing.extras
      .filter((e) => extras.includes(e.id))
      .reduce((sum, e) => sum + e.price, 0);
  return Math.round(
    subtotal *
      (1 -
        (pricing.frequencies.find((f) => f.id === frequency)?.discount || 0)),
  );
}
export const faqs = [
  [
    "Is PureNest a real cleaning company?",
    "No. PureNest Cleaning is a fictional website demonstration for potential cleaning business clients in Calgary. No services can be booked here.",
  ],
  [
    "What is included in a standard clean?",
    "The sample residential service includes accessible surface dusting, floor care, kitchen surfaces, and bathrooms. See Services for the illustrative checklist and exclusions.",
  ],
  [
    "Are these actual service prices?",
    "No. Every amount is an illustrative sample in Canadian dollars, before applicable taxes. It is not an offer or a binding quote. A real provider would confirm scope, availability, and pricing.",
  ],
  [
    "Can I try the quote form safely?",
    "Yes. Use only the supplied fictional scenario options. There are no fields for your name, email, phone number, or address, and form selections are never transmitted or saved.",
  ],
  [
    "Which areas would this demo serve?",
    "The example service area is Calgary, Alberta. This is demonstration content and does not represent actual service coverage.",
  ],
  [
    "Do I need to provide supplies?",
    "For a real service, supply preferences, allergies, and special surfaces would be discussed with the provider. This demo does not make product, insurance, or certification claims.",
  ],
];
export const testimonials = [
  {
    quote:
      "Coming home to a fresh, calm space would be the best part of my week.",
    name: "Alex · Sample homeowner",
    type: "Residential cleaning",
  },
  {
    quote:
      "Exactly the kind of thoughtful reset I would want before moving into a new place.",
    name: "Jordan · Sample renter",
    type: "Move-in cleaning",
  },
  {
    quote: "A simple way to imagine a cleaner, more welcoming workspace.",
    name: "Taylor · Sample office manager",
    type: "Office cleaning",
  },
];
export const pageMeta = {
  "/": [
    "Home",
    "A cleaner home. A lighter life. Explore a fictional Calgary cleaning company demo.",
  ],
  "/services": [
    "Services",
    "Explore sample residential, deep, move-in, move-out, and office cleaning services.",
  ],
  "/about": [
    "About",
    "Meet the design idea behind PureNest, a fictional Calgary cleaning business.",
  ],
  "/gallery": [
    "Gallery",
    "Explore stock photography illustrating fresh, calm homes and workspaces.",
  ],
  "/quote": [
    "Get a Quote",
    "Try the interactive sample cleaning estimator. Illustrative CAD prices only.",
  ],
  "/contact": [
    "Contact",
    "Explore a simulated contact experience. No real messages or personal data are collected.",
  ],
  "/privacy": [
    "Privacy Policy",
    "Learn how this demo handles form selections and third-party image requests.",
  ],
};
