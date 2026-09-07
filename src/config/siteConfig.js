// ---------------------------------------------------------------------------
// SITE CONFIGURATION
// Edit everything about the business here. Nothing below needs to be touched
// in any component file.
// ---------------------------------------------------------------------------

export const siteConfig = {
  businessName: "Blush Nail Studio",
  shortName: "Blush",
  tagline: "Luxury nail artistry, one detail at a time.",

  // Phone shown in text, WhatsApp used for the wa.me link (digits only, with country code)
  phone: "+91 98765 43210",
  whatsapp: "919876543210",

  email: "hello@blushnailstudio.com",

  address: {
    line1: "14 Lavelle Court, 2nd Floor",
    line2: "Indiranagar, Bengaluru, Karnataka 560038",
  },

  instagramHandle: "@blushnailstudio",
  instagramUrl: "https://instagram.com/blushnailstudio",

  googleMapsUrl: "https://maps.google.com/?q=Blush+Nail+Studio+Indiranagar+Bengaluru",

  openingHours: [
    { days: "Monday – Saturday", hours: "10:00 AM – 8:00 PM" },
    { days: "Sunday", hours: "11:00 AM – 6:00 PM" },
  ],

  // Used to build the WhatsApp deep link across the site
  get whatsappUrl() {
    return `https://wa.me/${this.whatsapp}`;
  },

  bookingMessage:
    "Hi Blush Nail Studio! I'd like to book an appointment.",
};

export default siteConfig;
