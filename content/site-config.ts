// ============================================================
// site-config.ts — single source of truth for all copy + brand
// Amber Crumb Bakery — Lagos, Nigeria. Artisan bakery online shop.
// ============================================================

import { asset } from "@/lib/assets";

export const siteConfig = {
  // -- Brand identity ---------------------------------------------
  slug: "amber-crumb-bakery",
  currency: "NGN",
  industry: "food_retail",
  cartVariant: "C1" as "C1" | "C2" | "C3" | "C4",

  company: {
    name: "Amber Crumb Bakery",
    tagline: "Baked fresh in Lagos",
    description:
      "A small-batch artisan bakery in Lagos crafting slow-fermented sourdough, buttery pastries and celebration cakes. Order online and we bake it fresh to order.",
    email: "hello@ambercrumb.ng",
    phone: "+234 802 555 0142",
    location: "24 Raymond Njoku St, Ikoyi, Lagos, Nigeria",
  },

  brand: {
    primary: "#E8A94B",
    accent: "#C56B3E",
    bg: "#1C1310",
  },

  typography: {
    display: "Fraunces",
    body: "Inter",
    mono: "JetBrains Mono",
  },

  // -- SEO + meta + sitemap ---------------------------------------
  seo: {
    siteUrl: "https://ambercrumb.ng",
    locale: "en_NG",
    htmlLang: "en-NG",
    defaultTitle: "Amber Crumb Bakery — Baked fresh in Lagos",
    defaultDescription:
      "Artisan sourdough, pastries and celebration cakes baked fresh to order in Lagos. Browse our signature bakes and order online for pickup or delivery.",
    defaultOgImage: "https://ambercrumb.ng/og-default.png",
    twitterHandle: "@ambercrumb",
    noindexPaths: ["/account", "/admin", "/auth", "/api"],
    googleSiteVerification: "",
    structuredData: {
      businessType: "Bakery",
      address: {
        streetAddress: "24 Raymond Njoku St, Ikoyi",
        addressLocality: "Lagos",
        addressRegion: "Lagos",
        postalCode: "101233",
        addressCountry: "NG",
      },
      hours: [
        { days: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "19:00" },
        { days: ["Saturday", "Sunday"], opens: "08:00", closes: "20:00" },
      ],
      priceRange: "$$",
      geo: { latitude: 6.4478, longitude: 3.4318 },
      rating: { ratingValue: 4.9, reviewCount: 218 },
      starRating: null,
      amenities: [],
      cuisine: ["Bakery", "Pastry", "Sourdough"],
    },
  },

  // -- Social profiles --------------------------------------------
  socials: {
    instagram: "https://instagram.com/ambercrumb",
    twitter: "https://twitter.com/ambercrumb",
    facebook: "https://facebook.com/ambercrumb",
    linkedin: "",
    youtube: "",
    tiktok: "https://tiktok.com/@ambercrumb",
    whatsapp: "https://wa.me/2348025550142",
  },

  // -- Hero ------------------------------------------------------
  hero: {
    h1: [
      { text: "Warm from", accent: false },
      { text: "the oven,", accent: true },
      { text: "made for you.", accent: false },
    ],
  },

  tagline: "Baked fresh in Lagos",

  // -- Services (signature bakes / collections) -------------------
  servicesHeading: "Our signature bakes",

  services: [
    {
      name: "Sourdough Loaves",
      slug: "sourdough",
      description:
        "Naturally leavened, 36-hour slow-fermented loaves with a burnished crust and open, custardy crumb. Baked fresh every morning.",
      highlights: ["36-hour wild fermentation", "Stone-milled heritage flour", "Crackling caramelised crust", "Nothing but flour, water, salt"],
      image: asset("service-sourdough"),
      price: "₦6,500",
      priceCents: 650000,
      productSlug: "sourdough-loaf",
    },
    {
      name: "Pastries & Croissants",
      slug: "pastries",
      description:
        "Laminated by hand over three days with cultured butter — flaky, golden croissants, pain au chocolat and seasonal danishes.",
      highlights: ["27 layers of cultured butter", "Laminated by hand", "Baked to order daily", "Sweet & savoury options"],
      image: asset("service-pastries"),
      price: "₦2,800",
      priceCents: 280000,
      productSlug: "croissant-box",
    },
    {
      name: "Celebration Cakes",
      slug: "cakes",
      description:
        "Show-stopping layer cakes for birthdays, weddings and everything in between — designed with you and baked from scratch.",
      highlights: ["Custom designs & flavours", "Bespoke tiered cakes", "48-hour notice", "Delivery across Lagos"],
      image: asset("service-cakes"),
      price: "from ₦28,000",
      priceCents: 2800000,
      productSlug: "celebration-cake",
    },
    {
      name: "Cookies & Boxes",
      slug: "cookies",
      description:
        "Thick, gooey brown-butter cookies and gift boxes — the perfect small indulgence or thoughtful treat to send someone.",
      highlights: ["Brown-butter chocolate chip", "Boxes of 6 or 12", "Corporate gifting", "Nationwide shipping"],
      image: asset("service-cookies"),
      price: "₦9,000 / box",
      priceCents: 900000,
      productSlug: "cookie-box",
    },
    {
      name: "Cinnamon Rolls",
      slug: "rolls",
      description:
        "Pillowy enriched-dough rolls swirled with cinnamon and finished with a cream-cheese glaze. Best served warm.",
      highlights: ["Cream-cheese glaze", "Trays of 6", "Weekend bakes", "Warm-and-serve"],
      image: asset("service-rolls"),
      price: "₦7,500 / tray",
      priceCents: 750000,
      productSlug: "cinnamon-rolls",
    },
    {
      name: "Gift Bundles",
      slug: "giftbox",
      description:
        "A curated hamper of our best-loved bakes — bread, pastries and sweets wrapped beautifully and ready to gift.",
      highlights: ["Curated seasonal selection", "Hand-wrapped", "Gift note included", "Same-day Lagos delivery"],
      image: asset("service-giftbox"),
      price: "from ₦18,000",
      priceCents: 1800000,
      productSlug: "gift-bundle",
    },
  ] as Array<{
    name: string;
    slug: string;
    description: string;
    highlights?: string[];
    image?: string;
    price?: string;
    priceCents?: number;
    productSlug?: string;
  }>,

  // -- Products (cart catalog) ------------------------------------
  products: [
    {
      slug: "sourdough-loaf",
      name: "Classic Country Sourdough",
      description: "Our flagship 36-hour loaf — deep crust, open crumb, ~800g.",
      priceCents: 650000,
      image: asset("product-sourdough", asset("service-sourdough")),
      category: "Bread",
    },
    {
      slug: "croissant-box",
      name: "Butter Croissant — Box of 4",
      description: "Hand-laminated all-butter croissants, baked golden.",
      priceCents: 1000000,
      image: asset("product-croissant", asset("service-pastries")),
      category: "Pastry",
    },
    {
      slug: "celebration-cake",
      name: "Signature Celebration Cake (6\")",
      description: "Custom two-layer cake — choose your flavour at checkout.",
      priceCents: 2800000,
      image: asset("product-cake", asset("service-cakes")),
      category: "Cakes",
    },
    {
      slug: "cookie-box",
      name: "Brown-Butter Cookie Box (6)",
      description: "Six thick, gooey brown-butter chocolate-chip cookies.",
      priceCents: 900000,
      image: asset("product-cookies", asset("service-cookies")),
      category: "Sweets",
    },
    {
      slug: "cinnamon-rolls",
      name: "Cinnamon Rolls — Tray of 6",
      description: "Soft enriched rolls with cream-cheese glaze.",
      priceCents: 750000,
      image: asset("product-rolls", asset("service-rolls")),
      category: "Sweets",
    },
    {
      slug: "gift-bundle",
      name: "The Amber Gift Bundle",
      description: "Loaf + croissants + cookies, hand-wrapped with a note.",
      priceCents: 1800000,
      image: asset("product-giftbox", asset("service-giftbox")),
      category: "Gifting",
    },
  ] as Array<{
    slug: string;
    name: string;
    description: string;
    priceCents: number;
    image?: string;
    category?: string;
  }>,

  // -- Rooms / locations (N/A) ------------------------------------
  rooms: [] as Array<never>,
  locations: [] as Array<never>,

  // -- Gallery ----------------------------------------------------
  gallery: [
    { src: asset("work-1"), alt: "Elegant tiered wedding cake" },
    { src: asset("work-2"), alt: "Birthday celebration cake with candles" },
    { src: asset("work-3"), alt: "Basket of assorted artisan bread" },
    { src: asset("work-4"), alt: "Pastry platter for an event" },
    { src: asset("work-5"), alt: "Cupcakes on a dessert table" },
    { src: asset("work-6"), alt: "Bakery cafe table with coffee and pastry" },
  ] as Array<{ src: string; alt: string; caption?: string }>,

  // -- Why us ----------------------------------------------------
  whyUs: {
    heading: "Slow craft",
    items: [
      { title: "Real fermentation", description: "We give our dough time — up to 36 hours — for flavour and digestibility you can taste in every slice." },
      { title: "Baked to order", description: "Nothing sits on a shelf. We bake against your order so it reaches you at its freshest." },
      { title: "Honest ingredients", description: "Stone-milled flour, cultured butter, real vanilla. No shortcuts, no improvers." },
    ],
  },

  // -- Process ---------------------------------------------------
  process: [
    { step: 1, title: "Browse & choose", description: "Explore our signature bakes and add your favourites to the cart." },
    { step: 2, title: "Order online", description: "Checkout securely and pick your pickup or delivery slot across Lagos." },
    { step: 3, title: "We bake fresh", description: "Our bakers start your order that morning — never before it's needed." },
    { step: 4, title: "Warm to your door", description: "Collect from Ikoyi or have it delivered, still smelling of the oven." },
  ],

  // -- About -----------------------------------------------------
  aboutHeading: "A little bakery with a long fermentation.",
  aboutStory:
    "Amber Crumb began in a tiny Ikoyi kitchen with one stubborn sourdough starter named Ada and a belief that bread should never be rushed. What started as weekend loaves for friends has grown into a small-batch bakery serving Lagos with slow-fermented breads, hand-laminated pastries and celebration cakes made entirely from scratch. We still bake in small batches, we still mill much of our own flour, and Ada is still very much alive.",
  manifesto:
    "Good bread cannot be hurried. We measure our craft in hours, not minutes — and every golden crust is worth the wait.",
  values: [
    { title: "Patience over speed", description: "Long, cool fermentations for depth of flavour and a crust that sings." },
    { title: "Made from scratch", description: "We laminate, mill and mix by hand. If we can make it ourselves, we do." },
    { title: "Rooted in Lagos", description: "We source locally where we can and bake for the community we love." },
    { title: "Generous by default", description: "Bigger crumbs, thicker glaze, an extra cookie in the box. Always." },
  ],

  // -- Work / featured bakes -------------------------------------
  work: [
    { title: "Adaeze & Tunde's Wedding", client: "Private event", service: "Celebration Cakes", result: "Four-tier naked cake for 200 guests" },
    { title: "Golden Hour Birthday", client: "The Bello Family", service: "Celebration Cakes", result: "Custom drip cake, delivered to Lekki" },
    { title: "Saturday Bread Club", client: "Ikoyi neighbourhood", service: "Sourdough Loaves", result: "80 loaves sold out before 10am" },
    { title: "Corporate Gifting", client: "Fintech HQ, VI", service: "Gift Bundles", result: "150 hampers for staff appreciation" },
    { title: "Launch Party Platters", client: "Concept store, Ikoyi", service: "Pastries & Croissants", result: "Grazing table for a boutique opening" },
    { title: "Café Residency", client: "Third-wave coffee bar", service: "Pastries & Croissants", result: "Daily pastry supply partnership" },
  ] as Array<{ title: string; client: string; service: string; result: string }>,

  // -- Stats -----------------------------------------------------
  stats: [
    { value: "36h", label: "Fermentation" },
    { value: "12k+", label: "Loaves baked" },
    { value: "4.9", label: "Avg rating" },
    { value: "100%", label: "From scratch" },
  ],

  // -- Features (archetype G section 2) --------------------------
  features: [
    { title: "Small batch, big flavour.", description: "Every bake is made in small batches so quality never slips. What comes out of our oven is what we'd proudly serve our own family." },
    { title: "Order the night before", description: "Place your order and pick a slot — we start baking at dawn." },
    { title: "Pickup or delivery", description: "Collect warm from Ikoyi or have it delivered across Lagos." },
    { title: "Custom cakes welcome", description: "Tell us the occasion; we'll design something unforgettable." },
  ],

  sectionThemeWord: "Crumb",

  narrative: [] as Array<{ speaker: string; text: string }>,

  // -- Mixed-media (archetype G) ---------------------------------
  mixedMedia: {
    skipSecondaryVideo: true,
    accentEyebrow: "The Amber promise",
    accentLine: "Warm crust, tender crumb, baked the moment you order.",
  },

  // -- CTA -------------------------------------------------------
  cta: {
    primary: "Order fresh bakes",
    secondary: "Browse the menu",
  },

  ctaBlock: {
    heading: "Hungry yet?",
    description: "Order today's bake before it sells out. Fresh sourdough, pastries and cakes — baked in Lagos, delivered to your door.",
  },

  trustBar: ["Baked fresh daily", "Lagos-wide delivery", "Secure checkout", "4.9★ from 218 reviews"],

  // -- Cinematic config ------------------------------------------
  scrollHero: {
    archetype: "G" as "A" | "B" | "C" | "D" | "E" | "F" | "G",
    styleId: "warm-artisan",
    assetMode: "live-generate" as "live-generate" | "prompt-only",
    imageUrl: asset("section-hero-poster"),
    scrollDistance: 3000,
  },

  headerVariant: "command-bar" as const,
  footerVariant: "FT5" as const,

  motion: {
    scrollProgress: true,
    cursorFollower: false,
    intensity: "medium" as "low" | "medium" | "high",
  },
} as const;

export type SiteConfig = typeof siteConfig;
