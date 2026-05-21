import { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "919033314485";
const WHATSAPP_MSG = encodeURIComponent("Hello Kajal! I'd like to book a makeover appointment 💄");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// GPS coordinates: 21°28'15.6"N 72°57'17.8"E
const MAPS_LINK = "https://maps.google.com/?q=21°28'15.6%22N+72°57'17.8%22E";

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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.99 2.82 2 2 0 012.98 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
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

// ── 1. Updated SERVICES array ──────────────
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

// ── 2. Updated GALLERY_IMGS with facial/skincare image ──
const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80", // facial / skincare treatment
  "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80",
];

const NAV_LINKS = ["Home", "Services", "Gallery", "Contact"];

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

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.385.627 4.623 1.724 6.563L2 30l7.698-1.7A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.4a11.35 11.35 0 01-5.77-1.574l-.413-.246-4.57 1.008 1.03-4.45-.27-.43A11.36 11.36 0 014.6 16c0-6.286 5.114-11.4 11.4-11.4S27.4 9.714 27.4 16 22.286 27.4 16 27.4zm6.26-8.54c-.343-.172-2.03-1.002-2.346-1.115-.315-.114-.545-.172-.774.172-.23.343-.888 1.115-1.088 1.344-.2.23-.4.258-.744.086-.343-.172-1.449-.534-2.76-1.704-1.02-.91-1.71-2.035-1.91-2.378-.2-.343-.02-.528.15-.7.154-.153.343-.4.515-.6.17-.2.23-.344.343-.572.115-.23.058-.43-.028-.6-.086-.172-.775-1.872-1.06-2.563-.28-.672-.565-.58-.774-.59l-.658-.013c-.23 0-.6.086-.915.43-.315.343-1.202 1.174-1.202 2.863 0 1.69 1.23 3.322 1.4 3.552.172.23 2.42 3.696 5.866 5.185.82.354 1.46.565 1.96.724.823.261 1.572.224 2.163.136.66-.099 2.03-.83 2.317-1.632.287-.8.287-1.487.2-1.63-.086-.143-.315-.228-.658-.4z" />
    </svg>
  );
}

// ── 3. Premium Mobile-First Navbar ──────────
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-rose-300 text-2xl">✦</span>
          <span className="font-semibold tracking-widest text-base sm:text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2C2C2C", letterSpacing: "0.12em" }}>
            KAJAL <span style={{ color: "#C9A96E" }}>MAKEOVER</span>
          </span>
        </div>
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} className="text-sm tracking-widest uppercase transition-colors duration-200 hover:text-rose-400" style={{ fontFamily: "Jost, sans-serif", color: "#2C2C2C", letterSpacing: "0.15em" }}>
                {l}
              </button>
            </li>
          ))}
        </ul>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: "#C9A96E", color: "#fff", fontFamily: "Jost, sans-serif", letterSpacing: "0.12em" }}>
          <WhatsAppIcon /> Book Now
        </a>
        {/* Mobile hamburger — larger touch target */}
        <button
          className="md:hidden p-3 -mr-1 rounded-xl transition-colors active:bg-rose-50"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <span className="block w-5 h-0.5 mb-1.5 transition-all" style={{ background: "#2C2C2C", transform: open ? "rotate(45deg) translate(2px, 8px)" : "none" }} />
          <span className="block w-5 h-0.5 mb-1.5 transition-all" style={{ background: "#2C2C2C", opacity: open ? 0 : 1 }} />
          <span className="block w-3 h-0.5 transition-all" style={{ background: "#2C2C2C", transform: open ? "rotate(-45deg) translate(-2px, -8px)" : "none", width: open ? "1.25rem" : "0.75rem" }} />
        </button>
      </div>

      {/* ── Mobile menu: glassmorphism ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${open ? "max-h-96" : "max-h-0"}`}
        style={{
          background: "rgba(255, 249, 249, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: open ? "1px solid rgba(232, 131, 154, 0.18)" : "none",
          boxShadow: open ? "0 12px 40px rgba(201, 169, 110, 0.12)" : "none",
        }}
      >
        <ul className="flex flex-col px-6 py-5 gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className="text-sm tracking-widest uppercase w-full text-left py-3.5 px-2 rounded-xl transition-colors hover:bg-rose-50 active:bg-rose-100"
                style={{ fontFamily: "Jost, sans-serif", color: "#2C2C2C", letterSpacing: "0.15em" }}
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
              className="inline-flex items-center gap-2.5 w-full justify-center px-6 py-4 rounded-2xl text-sm tracking-widest uppercase font-medium shadow-md active:scale-95 transition-transform"
              style={{ background: "#C9A96E", color: "#fff", fontFamily: "Jost, sans-serif" }}
            >
              <WhatsAppIcon /> Book via WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#FFF9F9" }}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=85" alt="Hero background" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(242,184,198,0.75) 0%, rgba(255,249,249,0.88) 50%, rgba(201,169,110,0.25) 100%)" }} />
      </div>
      <div className="absolute left-0 top-0 w-px h-full opacity-20" style={{ background: "#C9A96E" }} />
      <div className="absolute right-0 top-0 w-px h-full opacity-20" style={{ background: "#C9A96E" }} />
      <div className="relative z-10 text-center px-6 sm:px-8 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E" }}>
          ✦ &nbsp; Hair &amp; Makeup Artist &nbsp; ✦
        </p>
        {/* Balanced mobile typography: clamp starts at 2.6rem instead of 3rem */}
        <h1 className="mb-6 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 8vw, 7rem)", color: "#2C2C2C", fontWeight: 300 }}>
          Elevate<br />
          <em style={{ color: "#E8839A" }}>Your Beauty</em>
        </h1>
        <p className="mb-10 leading-relaxed px-2" style={{ fontFamily: "Jost, sans-serif", fontSize: "clamp(0.9rem, 2.2vw, 1.15rem)", color: "#8A7070", letterSpacing: "0.04em" }}>
          Premium Bridal Makeover, Hair Styling &amp; Cosmetics<br className="hidden sm:block" />
          — crafted for the woman who deserves the best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Enlarged touch targets on mobile */}
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95" style={{ background: "#2C2C2C", color: "#fff", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em", minHeight: "52px" }}>
            <WhatsAppIcon /> Book via WhatsApp
          </a>
          <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium border transition-all duration-300 hover:bg-rose-50 active:scale-95" style={{ borderColor: "#E8839A", color: "#E8839A", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em", minHeight: "52px" }}>
            Explore Services
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "Jost, sans-serif", color: "#8A7070", fontSize: "0.65rem" }}>Scroll</span>
        <div className="w-px h-10 animate-bounce" style={{ background: "#C9A96E" }} />
      </div>
    </section>
  );
}

function Services() {
  const [ref, visible] = useFadeIn();
  return (
    <section id="services" className="py-20 sm:py-24 px-5 sm:px-6" style={{ background: "#FFF9F9" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E" }}>✦ &nbsp; What We Offer</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#2C2C2C" }}>
            Our <em style={{ color: "#E8839A" }}>Services</em>
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "#C9A96E" }} />
        </div>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        >
          {SERVICES.map(({ title, desc, Icon, tag }, i) => (
            <div
              key={title}
              className="group relative rounded-3xl p-7 sm:p-8 flex flex-col items-start gap-5 border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-sm"
              style={{ background: "#fff", borderColor: "#F2B8C6", transitionDelay: `${i * 80}ms`, boxShadow: "0 2px 16px rgba(232, 131, 154, 0.10)" }}
            >
              <span className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full tracking-widest" style={{ background: "#FFF0F5", color: "#E8839A", fontFamily: "Jost, sans-serif", fontSize: "0.65rem" }}>{tag}</span>
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl transition-colors duration-300 group-hover:bg-rose-100" style={{ background: "#FFF0F5", color: "#E8839A" }}>
                <Icon />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500, color: "#2C2C2C" }}>{title}</h3>
              <p style={{ fontFamily: "Jost, sans-serif", color: "#8A7070", lineHeight: 1.75, fontSize: "0.91rem" }}>{desc}</p>
              {/* Larger touch target for Book Now */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-auto text-xs tracking-widest uppercase font-medium flex items-center gap-2 transition-colors hover:text-rose-400 py-2"
                style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E", letterSpacing: "0.15em" }}
              >
                Book Now &nbsp;→
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [ref, visible] = useFadeIn(0.1);
  return (
    <section id="gallery" className="py-20 sm:py-24 px-5 sm:px-6" style={{ background: "linear-gradient(180deg, #FFF0F5 0%, #FFF9F9 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E" }}>✦ &nbsp; Instagram Portfolio</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#2C2C2C" }}>
            Our <em style={{ color: "#E8839A" }}>Gallery</em>
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "#C9A96E" }} />
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          {GALLERY_IMGS.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm">
              <img src={src} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(242,184,198,0.55)", backdropFilter: "blur(2px)" }}>
                <a href="https://instagram.com/kajal_rathod_98" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center shadow-md" style={{ background: "#fff" }}>
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
          <a href="https://instagram.com/kajal_rathod_98" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm tracking-widest uppercase border transition-all hover:bg-rose-50 hover:scale-105 active:scale-95" style={{ borderColor: "#E8839A", color: "#E8839A", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em" }}>
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

// ── Contact Info Items — location now links to exact GPS coords ──
const CONTACT_ITEMS = [
  {
    label: "Phone",
    value: "+91 90333 14485",
    href: "tel:+919033314485",
    icon: <PhoneIcon />,
    accent: "#C9A96E",
  },
  {
    label: "Location",
    value: "Near Main Chowk, Tarsadi, Kosamba, Gujarat – 394120",
    href: MAPS_LINK,        // ← exact GPS link
    icon: <LocationIcon />,
    accent: "#E8839A",
  },
  {
    label: "Instagram",
    value: "@kajal_rathod_98",
    href: "https://instagram.com/kajal_rathod_98",
    icon: <InstagramIconSolid />,
    accent: "#C9A96E",
  },
];

function Footer() {
  return (
    <footer id="contact" style={{ background: "#1E1A1A" }}>
      {/* ── Top decorative band ── */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #C9A96E, #E8839A, #F2B8C6, #C9A96E)" }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-14 sm:pt-16 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12">

        {/* ── Col 1 : Brand ── */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span style={{ color: "#C9A96E", fontSize: "1.3rem" }}>✦</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", letterSpacing: "0.12em", color: "#fff", fontWeight: 300 }}>
              KAJAL <span style={{ color: "#C9A96E" }}>MAKEOVER</span>
            </span>
          </div>
          <p style={{ fontFamily: "Jost, sans-serif", color: "#9A8585", lineHeight: 1.8, fontSize: "0.88rem" }}>
            Premium hair &amp; makeup artistry for every occasion — because every woman deserves to feel extraordinary.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 w-fit px-5 py-3 rounded-full text-xs tracking-widest uppercase font-medium transition-all hover:opacity-90 hover:scale-105 shadow-md active:scale-95"
            style={{ background: "#C9A96E", color: "#fff", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em", minHeight: "48px" }}
          >
            <WhatsAppIcon /> Book Now
          </a>
        </div>

        {/* ── Col 2 : Quick Links ── */}
        <div>
          <h4 className="mb-6 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E" }}>
            Quick Links
          </h4>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l} className="flex items-center gap-2">
                <span style={{ color: "#C9A96E", fontSize: "0.5rem" }}>◆</span>
                <button
                  onClick={() => {
                    if (l === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
                    else document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm py-2.5 transition-colors hover:text-white"
                  style={{ fontFamily: "Jost, sans-serif", color: "#9A8585", letterSpacing: "0.05em" }}
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3 : Contact ── */}
        <div>
          <h4 className="mb-6 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E" }}>
            Get In Touch
          </h4>

          <ul className="flex flex-col gap-6">
            {CONTACT_ITEMS.map(({ label, value, href, icon, accent }) => (
              <li key={label} className="flex items-start gap-4">
                {/* Icon bubble */}
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${accent}40`, color: accent }}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-1"
                    style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E", fontSize: "0.62rem" }}>
                    {label}
                  </p>
                  {/* Location now opens exact GPS coordinates in Google Maps */}
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm leading-relaxed transition-colors hover:text-white"
                      style={{ fontFamily: "Jost, sans-serif", color: "#C4AFAF" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "Jost, sans-serif", color: "#C4AFAF" }}>
                      {value}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #3D3030, transparent)" }} />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs tracking-widest" style={{ fontFamily: "Jost, sans-serif", color: "#5A4A4A", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} Kajal Makeover. All rights reserved.
        </p>
        <p className="text-xs" style={{ fontFamily: "Jost, sans-serif", color: "#5A4A4A" }}>
          Made with ♥ for beauty &amp; elegance
        </p>
      </div>
    </footer>
  );
}

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
    `}</style>
  );
}

export default function App() {
  return (
    <>
      <FontLoader />
      <div style={{ fontFamily: "Jost, sans-serif" }}>
        <Navbar />
        <Hero />
        <Services />
        <Gallery />
        <Footer />
      </div>
    </>
  );
}
