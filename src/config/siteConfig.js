// ---------------------------------------------------------------------------
// SITE CONFIGURATION
// Edit everything about the business here. Nothing below needs to be touched
// in any component file.
// ---------------------------------------------------------------------------

export const siteConfig = {
  businessName: "Shiya Nail Studio",
  shortName: "Shiya",
  tagline: "Luxury nail artistry, one detail at a time.",

  // Phone shown in text, WhatsApp used for the wa.me link (digits only, with country code)
  phone: "+91 90739 30441",
  whatsapp: "919073930441",

  email: "hello@shiyanailstudio.com",

  address: {
    line1: "Near Ram-janaki mandir",
    line2: "Tikiyapara, Hawarah",
  },

  instagramHandle: "@shiyanailstudio",
  instagramUrl: "https://instagram.com/blushnailstudio",

  googleMapsUrl: "https://maps.app.goo.gl/z3MHqVEWtMZainfV8",

  openingHours: [
    { days: "Monday – Saturday", hours: "10:00 AM – 8:00 PM" },
    { days: "Sunday", hours: "11:00 AM – 6:00 PM" },
  ],

  // Used to build the WhatsApp deep link across the site
  get whatsappUrl() {
    return `https://wa.me/${this.whatsapp}`;
  },

  bookingMessage: "Hi Shiya Nail Studio! I'd like to book an appointment.",
};

export default siteConfig;
