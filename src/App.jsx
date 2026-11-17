import { useState, useEffect, useRef } from "react";
import "./App.css";

// ── Contact details (change the number here only, it updates everywhere) ──
const WHATSAPP_NUMBER = "919033314485";   // used for wa.me link (no + or spaces)
const PHONE_TEL = "+919033314485";        // used for tap-to-call
const PHONE_DISPLAY = "+91 90333 14485";  // what people read on the website
const SITE_URL = "https://kajal-makeover.netlify.app/";

// Pre-filled WhatsApp message. The customer fills in the ____ parts,
// so Kajal always sees their name even if the number is not saved.
const buildWhatsAppLink = (service) => {
  const text = service
    ? `Hello Kajal Makeover! 💄\nMy name: ____\nService: ${service}\nPreferred date: ____`
    : `Hello Kajal Makeover! 💄\nMy name: ____\nService: ____\nPreferred date: ____`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
const WHATSAPP_LINK = buildWhatsAppLink();

// GPS coordinates
const MAPS_LINK = "https://maps.app.goo.gl/6e7uAhAviQhb41an6";

// ── "Save contact" button: downloads a .vcf file so the number is saved
// with the name "Kajal Makeover" in the customer's phone contacts ──
function downloadContact() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Kajal Makeover",
    "N:;Kajal Makeover;;;",
    "ORG:Kajal Makeover",
    "TITLE:Hair & Makeup Artist",
    `TEL;TYPE=CELL,VOICE:${PHONE_TEL}`,
    `URL:${SITE_URL}`,
    "ADR;TYPE=WORK:;;Near Main Chowk;Tarsadi, Kosamba;Gujarat;394120;India",
    "NOTE:Bridal makeover, hair styling and skin care. Instagram @kajal_rathod_98",
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Kajal-Makeover.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── SVG Icons ──────────────────────────────
const IconBride = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="32" cy="18" r="10" />
    <path d="M16 56c0-8.837 7.163-16 16-16s16 7.163 16 16" />
    <path d="M22 10 C22 6 28 2 32 2 C36 2 42 6 42 10" strokeDasharray="2 2" />
    <path d="M26 10 L28 6 L32 8 L36 6 L38 10" />
  </svg>
);
const IconHair = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 8 C20 8 16 20 20 30 C24 40 20 52 20 52" />
    <path d="M32 6 C32 6 30 20 32 32 C34 44 32 56 32 56" />
    <path d="M44 8 C44 8 48 20 44 30 C40 40 44 52 44 52" />
    <path d="M16 24 Q32 18 48 24" />
    <path d="M18 38 Q32 32 46 38" />
  </svg>
);
const IconFacial = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="32" cy="28" r="16" />
    <path d="M24 26 Q26 22 28 26" strokeLinecap="round" />
    <path d="M36 26 Q38 22 40 26" strokeLinecap="round" />
    <path d="M26 34 Q32 40 38 34" strokeLinecap="round" />
    <path d="M16 14 Q10 8 8 4" strokeLinecap="round" />
    <path d="M48 14 Q54 8 56 4" strokeLinecap="round" />
    <path d="M32 12 Q32 6 32 2" strokeLinecap="round" />
    <circle cx="32" cy="52" r="3" />
    <path d="M32 55 L32 60" strokeLinecap="round" />
  </svg>
);

function PhoneIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.99 2.82 2 2 0 012.98 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function SaveContactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function InstagramIconSolid() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.385.627 4.623 1.724 6.563L2 30l7.698-1.7A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.4a11.35 11.35 0 01-5.77-1.574l-.413-.246-4.57 1.008 1.03-4.45-.27-.43A11.36 11.36 0 014.6 16c0-6.286 5.114-11.4 11.4-11.4S27.4 9.714 27.4 16 22.286 27.4 16 27.4zm6.26-8.54c-.343-.172-2.03-1.002-2.346-1.115-.315-.114-.545-.172-.774.172-.23.343-.888 1.115-1.088 1.344-.2.23-.4.258-.744.086-.343-.172-1.449-.534-2.76-1.704-1.02-.91-1.71-2.035-1.91-2.378-.2-.343-.02-.528.15-.7.154-.153.343-.4.515-.6.17-.2.23-.344.343-.572.115-.23.058-.43-.028-.6-.086-.172-.775-1.872-1.06-2.563-.28-.672-.565-.58-.774-.59l-.658-.013c-.23 0-.6.086-.915.43-.315.343-1.202 1.174-1.202 2.863 0 1.69 1.23 3.322 1.4 3.552.172.23 2.42 3.696 5.866 5.185.82.354 1.46.565 1.96.724.823.261 1.572.224 2.163.136.66-.099 2.03-.83 2.317-1.632.287-.8.287-1.487.2-1.63-.086-.143-.315-.228-.658-.4z" />
    </svg>
  );
}

// ── Data ──────────────────────────────
const SERVICES = [
  {
    title: "Bridal Makeover",
    desc: "Timeless bridal looks crafted with precision — from traditional to contemporary, your dream look made real.",
    Icon: IconBride,
    tag: "Most Booked",
  },
  {
    title: "Hair Styling",
    desc: "Blowouts, braids, updos, and salon treatments tailored to your hair type and the occasion.",
    Icon: IconHair,
    tag: "Trending",
  },
  {
    title: "Hydra Facial & Skin Care",
    desc: "Experience deep cleansing, hydration, and instant radiance with our signature HydraFacial ritual — a medical-grade treatment fused with luxury skincare to resurface, replenish, and protect your skin.",
    Icon: IconFacial,
    tag: "Glow Up",
  },
];

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80",
];

const NAV_LINKS = ["Home", "Services", "Gallery", "Booking", "Contact"];

function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Navbar ──────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = (id) => {
    setOpen(false);
    if (id === "Home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-zinc-900/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-rose-300 text-2xl">✦</span>
          <span className="km-brand-logo font-semibold tracking-widest text-base sm:text-lg">
            KAJAL <span className="km-text-gold">MAKEOVER</span>
          </span>
        </div>
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} className="km-nav-item text-sm tracking-widest uppercase transition-colors duration-200 hover:text-rose-400">
                {l}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <a href={`tel:${PHONE_TEL}`} className="km-nav-phone hidden xl:inline-flex items-center gap-2 text-sm transition-colors hover:text-rose-400">
            <PhoneIcon className="w-4 h-4" /> {PHONE_DISPLAY}
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="km-btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <WhatsAppIcon /> Book Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-3 -mr-1 rounded-xl transition-colors active:bg-rose-50"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <span className={`km-burger-line block w-5 h-0.5 mb-1.5 transition-all ${open ? "is-open-top" : ""}`} />
          <span className={`km-burger-line block w-5 h-0.5 mb-1.5 transition-all ${open ? "is-open-mid" : ""}`} />
          <span className={`km-burger-line-bottom block h-0.5 transition-all ${open ? "is-open-bot" : ""}`} />
        </button>
      </div>

      {/* FIXED LINE 234: Replaced max-h-[32rem] with max-h-128 */}
      <div
        className={`km-mobile-drawer md:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-128 is-open" : "max-h-0"}`}
      >
        <ul className="flex flex-col px-6 py-5 gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className="km-nav-item text-sm tracking-widest uppercase w-full text-left py-3.5 px-2 rounded-xl transition-colors hover:bg-zinc-800 active:bg-zinc-700"
              >
                {l}
              </button>
            </li>
          ))}
          <li className="pt-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="km-btn-gold inline-flex items-center gap-2.5 w-full justify-center px-6 py-4 rounded-2xl text-sm tracking-widest uppercase font-medium shadow-md active:scale-95 transition-transform"
            >
              <WhatsAppIcon /> Book via WhatsApp
            </a>
          </li>
          <li className="pt-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="km-nav-phone flex items-center gap-2 w-full justify-center py-3 text-sm"
            >
              <PhoneIcon className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────
function Hero() {
  return (
    <section id="home" className="km-bg-dark relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=85" alt="Hero background" className="w-full h-full object-cover object-top" />
        <div className="km-hero-gradient absolute inset-0" />
      </div>

      {/* Decorative lines (hidden on mobile) */}
      <div className="km-bg-gold absolute left-0 top-0 w-px h-full opacity-20 hidden sm:block" />
      <div className="km-bg-gold absolute right-0 top-0 w-px h-full opacity-20 hidden sm:block" />

      <div className="relative z-10 text-center px-5 sm:px-8 w-full max-w-3xl mx-auto flex flex-col items-center mt-12 sm:mt-0">
        <p className="km-text-gold text-[0.65rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.35em] uppercase mb-4 sm:mb-6 px-2 w-full">
          ✦   Hair &amp; Makeup Artist   ✦
        </p>

        <h1 className="km-hero-heading mb-4 sm:mb-6 leading-none w-full">
          Elevate<br />
          <em className="km-text-rose">Your Beauty</em>
        </h1>

        <p className="km-hero-subtext mb-8 sm:mb-10 leading-relaxed px-2 w-full">
          Premium Bridal Makeover, Hair Styling &amp; Cosmetics<br className="hidden sm:block" />
          — crafted for the woman who deserves the best.
        </p>

        {/* FIXED LINE 310: Replaced max-w-[280px] with max-w-70 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-70 sm:max-w-none mx-auto">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="km-btn-primary inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto rounded-full text-[0.7rem] sm:text-sm tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon /> Book via WhatsApp
          </a>
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="km-btn-outline inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto rounded-full text-[0.7rem] sm:text-sm tracking-widest uppercase font-medium border transition-all duration-300 hover:bg-white/10 active:scale-95"
          >
            Explore Services
          </button>
        </div>

        {/* Phone number right under the buttons */}
        <a
          href={`tel:${PHONE_TEL}`}
          className="km-hero-tel mt-6 inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
        >
          <PhoneIcon className="w-4 h-4" /> Call or WhatsApp: {PHONE_DISPLAY}
        </a>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="km-scroll-label text-[0.6rem] sm:text-xs tracking-widest uppercase">Scroll</span>
        <div className="km-bg-gold w-px h-8 sm:h-10 animate-bounce" />
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────
function Services() {
  const [ref, visible] = useFadeIn();
  return (
    <section id="services" className="km-bg-dark py-20 sm:py-24 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="km-text-gold text-xs tracking-[0.35em] uppercase mb-3">✦   What We Offer</p>
          <h2 className="km-section-heading">
            Our <em className="km-text-rose">Services</em>
          </h2>
          <div className="km-bg-gold w-16 h-px mx-auto mt-6" />
        </div>
        <div
          ref={ref}
          className={`km-fade-section grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 ${visible ? "is-visible" : ""}`}
        >
          {SERVICES.map(({ title, desc, Icon, tag }, i) => (
            <div
              key={title}
              className="km-service-card group relative rounded-3xl p-7 sm:p-8 flex flex-col items-start gap-5 border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-sm"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="km-service-badge absolute top-6 right-6 text-xs px-3 py-1 rounded-full tracking-widest">{tag}</span>
              <div className="km-service-icon-box flex items-center justify-center w-16 h-16 rounded-2xl transition-colors duration-300 group-hover:bg-zinc-800">
                <Icon />
              </div>
              <h3 className="km-service-title">{title}</h3>
              <p className="km-service-desc">{desc}</p>
              <a
                href={buildWhatsAppLink(title)}
                target="_blank"
                rel="noreferrer"
                className="km-service-link mt-auto text-xs tracking-widest uppercase font-medium flex items-center gap-2 transition-colors hover:text-rose-400 py-2"
              >
                Book Now  →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Gallery ──────────────────────────────
function Gallery() {
  const [ref, visible] = useFadeIn(0.1);
  return (
    <section id="gallery" className="km-gallery-section py-20 sm:py-24 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="km-text-gold text-xs tracking-[0.35em] uppercase mb-3">✦   Instagram Portfolio</p>
          <h2 className="km-section-heading">
            Our <em className="km-text-rose">Gallery</em>
          </h2>
          <div className="km-bg-gold w-16 h-px mx-auto mt-6" />
        </div>
        <div
          ref={ref}
          className={`km-fade-section grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 ${visible ? "is-visible" : ""}`}
        >
          {GALLERY_IMGS.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm">
              <img src={src} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="km-gallery-hover absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="https://instagram.com/kajal_rathod_98" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#E8839A" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="#E8839A" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 sm:mt-12">
          <a href="https://instagram.com/kajal_rathod_98" target="_blank" rel="noreferrer" className="km-btn-rose-outline inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm tracking-widest uppercase border transition-all hover:bg-zinc-800/50 hover:scale-105 active:scale-95">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#E8839A" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="#E8839A" stroke="none" />
            </svg>
            Follow @kajal_rathod_98
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Booking section ──────────────────────────────
function Booking() {
  const [ref, visible] = useFadeIn(0.15);
  return (
    <section id="booking" className="km-bg-dark py-20 sm:py-24 px-5 sm:px-6">
      <div
        ref={ref}
        className={`km-fade-section max-w-3xl mx-auto text-center ${visible ? "is-visible" : ""}`}
      >
        <p className="km-text-gold text-xs tracking-[0.35em] uppercase mb-3">✦   Booking</p>
        <h2 className="km-section-heading">
          Book Your <em className="km-text-rose">Appointment</em>
        </h2>
        <div className="km-bg-gold w-16 h-px mx-auto mt-6 mb-8" />

        <p className="km-booking-sub mb-6 leading-relaxed">
          Send us a WhatsApp message with your name, the service you want and your date. We will reply and confirm your slot.
        </p>

        {/* Big number */}
        <a
          href={`tel:${PHONE_TEL}`}
          className="km-booking-phone inline-block mb-8 transition-colors hover:text-white"
        >
          {PHONE_DISPLAY}
        </a>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none mx-auto">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="km-btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="km-btn-outline inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm tracking-widest uppercase font-medium border transition-all duration-300 hover:bg-white/10 active:scale-95"
          >
            <PhoneIcon className="w-4 h-4" /> Call Now
          </a>
          <button
            type="button"
            onClick={downloadContact}
            className="km-btn-rose-save inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm tracking-widest uppercase font-medium border transition-all duration-300 hover:bg-zinc-800/50 active:scale-95"
          >
            <SaveContactIcon /> Save Contact
          </button>
        </div>

        {/* Short note for new customers */}
        <div className="km-booking-note mt-10 rounded-2xl p-5 sm:p-6 text-left">
          <p className="km-note-title mb-2 text-sm font-medium">
            See only a phone number when WhatsApp opens?
          </p>
          <p className="km-note-desc">
            WhatsApp shows only the number for contacts you have not saved. It is us, Kajal Makeover, at {PHONE_DISPLAY}. Tap Save Contact and our name will show in your chat.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Contact items (Footer) ──────────────────────────────
const CONTACT_ITEMS = [
  {
    label: "Call or WhatsApp",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
    icon: <PhoneIcon />,
    accentClass: "km-contact-bubble-gold",
  },
  {
    label: "Location",
    value: "Near Main Chowk, Tarsadi, Kosamba, Gujarat – 394120",
    href: MAPS_LINK,
    icon: <LocationIcon />,
    accentClass: "km-contact-bubble-rose",
  },
  {
    label: "Instagram",
    value: "@kajal_rathod_98",
    href: "https://instagram.com/kajal_rathod_98",
    icon: <InstagramIconSolid />,
    accentClass: "km-contact-bubble-gold",
  },
];

function Footer() {
  return (
    <footer id="contact" className="km-footer">
      {/* Top decorative band */}
      <div className="km-footer-band h-1 w-full" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-14 sm:pt-16 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12">

        {/* Col 1: Brand */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="km-text-gold text-xl">✦</span>
            <span className="km-footer-brand">
              KAJAL <span className="km-text-gold">MAKEOVER</span>
            </span>
          </div>
          <p className="km-footer-bio">
            Premium hair &amp; makeup artistry for every occasion — because every woman deserves to feel extraordinary.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="km-btn-footer-gold inline-flex items-center gap-2.5 w-fit px-5 py-3 rounded-full text-xs tracking-widest uppercase font-medium transition-all hover:opacity-90 hover:scale-105 shadow-md active:scale-95"
            >
              <WhatsAppIcon /> Book Now
            </a>
            <button
              type="button"
              onClick={downloadContact}
              className="km-btn-footer-rose inline-flex items-center gap-2.5 w-fit px-5 py-3 rounded-full text-xs tracking-widest uppercase font-medium border transition-all hover:bg-zinc-800/50 active:scale-95"
            >
              <SaveContactIcon /> Save Contact
            </button>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="km-text-gold mb-6 text-xs tracking-[0.3em] uppercase">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l} className="flex items-center gap-2">
                <span className="km-text-gold text-[0.5rem]">◆</span>
                <button
                  onClick={() => {
                    if (l === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
                    else document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="km-footer-nav-btn text-sm py-2.5 transition-colors hover:text-white"
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div>
          <h4 className="km-text-gold mb-6 text-xs tracking-[0.3em] uppercase">
            Get In Touch
          </h4>

          <ul className="flex flex-col gap-6">
            {CONTACT_ITEMS.map(({ label, value, href, icon, accentClass }) => (
              <li key={label} className="flex items-start gap-4">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 ${accentClass}`}>
                  {icon}
                </div>
                <div>
                  <p className="km-contact-label text-xs tracking-[0.2em] uppercase mb-1">
                    {label}
                  </p>
                  <a
                    href={href}
                    target={href.startsWith("tel:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="km-hero-tel text-sm leading-relaxed transition-colors hover:text-white"
                  >
                    {value}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="km-footer-divider h-px w-full" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="km-footer-copy text-xs tracking-widest">
          © {new Date().getFullYear()} Kajal Makeover. All rights reserved.
        </p>
        <p className="km-footer-copy text-xs">
          Made with ♥ for beauty &amp; elegance
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="km-root">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Booking />
      <Footer />
    </div>
  );
}