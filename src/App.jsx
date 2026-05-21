import { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "919033314485";
const WHATSAPP_MSG = encodeURIComponent("Hello Kajal! I'd like to book a makeover appointment 💄");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

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
const IconCare = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M32 54 C32 54 10 40 10 24 C10 16 16 10 24 12 C28 13 32 18 32 18 C32 18 36 13 40 12 C48 10 54 16 54 24 C54 40 32 54 32 54Z" />
    <path d="M24 28 L30 34 L42 22" strokeLinecap="round" />
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

const SERVICES = [
  { title: "Bridal Makeover", desc: "Timeless bridal looks crafted with precision — from traditional to contemporary, your dream look made real.", Icon: IconBride, tag: "Most Booked" },
  { title: "Hair Styling", desc: "Blowouts, braids, updos, and salon treatments tailored to your hair type and the occasion.", Icon: IconHair, tag: "Trending" },
  { title: "Personal Care", desc: "Facials, skin prep, threading, waxing, and full-body grooming rituals to keep you radiant.", Icon: IconCare, tag: "Everyday Glow" },
];

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80",
  "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
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
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-rose-300 text-2xl">✦</span>
          <span className="font-semibold tracking-widest text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2C2C2C", letterSpacing: "0.12em" }}>
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
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: "#C9A96E", color: "#fff", fontFamily: "Jost, sans-serif", letterSpacing: "0.12em" }}>
          <WhatsAppIcon /> Book Now
        </a>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
          <span className="block w-5 h-0.5 mb-1" style={{ background: "#2C2C2C" }} />
          <span className="block w-5 h-0.5 mb-1" style={{ background: "#2C2C2C" }} />
          <span className="block w-3 h-0.5" style={{ background: "#2C2C2C" }} />
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white/98 backdrop-blur-md ${open ? "max-h-72 border-t border-rose-100" : "max-h-0"}`}>
        <ul className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} className="text-sm tracking-widest uppercase w-full text-left transition-colors hover:text-rose-400" style={{ fontFamily: "Jost, sans-serif", color: "#2C2C2C", letterSpacing: "0.15em" }}>
                {l}
              </button>
            </li>
          ))}
          <li>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-widest uppercase font-medium" style={{ background: "#C9A96E", color: "#fff", fontFamily: "Jost, sans-serif" }}>
              <WhatsAppIcon /> Book Now
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
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E" }}>
          ✦ &nbsp; Hair &amp; Makeup Artist &nbsp; ✦
        </p>
        <h1 className="mb-6 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 8vw, 7rem)", color: "#2C2C2C", fontWeight: 300 }}>
          Elevate<br />
          <em style={{ color: "#E8839A" }}>Your Beauty</em>
        </h1>
        <p className="mb-10 leading-relaxed" style={{ fontFamily: "Jost, sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: "#8A7070", letterSpacing: "0.05em" }}>
          Premium Bridal Makeover, Hair Styling &amp; Cosmetics<br className="hidden sm:block" />
          — crafted for the woman who deserves the best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: "#2C2C2C", color: "#fff", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em" }}>
            <WhatsAppIcon /> Book via WhatsApp
          </a>
          <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium border transition-all duration-300 hover:bg-rose-50" style={{ borderColor: "#E8839A", color: "#E8839A", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em" }}>
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
    <section id="services" className="py-24 px-6" style={{ background: "#FFF9F9" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E" }}>✦ &nbsp; What We Offer</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#2C2C2C" }}>
            Our <em style={{ color: "#E8839A" }}>Services</em>
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "#C9A96E" }} />
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          {SERVICES.map(({ title, desc, Icon, tag }, i) => (
            <div key={title} className="group relative rounded-3xl p-8 flex flex-col items-start gap-5 border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl" style={{ background: "#fff", borderColor: "#F2B8C6", transitionDelay: `${i * 80}ms` }}>
              <span className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full tracking-widest" style={{ background: "#FFF0F5", color: "#E8839A", fontFamily: "Jost, sans-serif", fontSize: "0.65rem" }}>{tag}</span>
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl transition-colors duration-300 group-hover:bg-rose-100" style={{ background: "#FFF0F5", color: "#E8839A" }}>
                <Icon />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.55rem", fontWeight: 500, color: "#2C2C2C" }}>{title}</h3>
              <p style={{ fontFamily: "Jost, sans-serif", color: "#8A7070", lineHeight: 1.7, fontSize: "0.92rem" }}>{desc}</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="mt-auto text-xs tracking-widest uppercase font-medium flex items-center gap-2 transition-colors hover:text-rose-400" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E", letterSpacing: "0.15em" }}>
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
    <section id="gallery" className="py-24 px-6" style={{ background: "linear-gradient(180deg, #FFF0F5 0%, #FFF9F9 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E" }}>✦ &nbsp; Instagram Portfolio</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#2C2C2C" }}>
            Our <em style={{ color: "#E8839A" }}>Gallery</em>
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "#C9A96E" }} />
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          {GALLERY_IMGS.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square">
              <img src={src} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(242,184,198,0.55)", backdropFilter: "blur(2px)" }}>
                <a href="https://instagram.com/kajal_rathod_98" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fff" }}>
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
        <div className="text-center mt-12">
          <a href="https://instagram.com/kajal_rathod_98" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm tracking-widest uppercase border transition-all hover:bg-rose-50 hover:scale-105" style={{ borderColor: "#E8839A", color: "#E8839A", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em" }}>
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

// ── Contact Info Items ─────────────────────
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
    href: null,
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

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-12">

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
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "#C9A96E", color: "#fff", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em" }}>
            <WhatsAppIcon /> Book Now
          </a>
        </div>

        {/* ── Col 2 : Quick Links ── */}
        <div>
          <h4 className="mb-6 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "Jost, sans-serif", color: "#C9A96E" }}>
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <li key={l} className="flex items-center gap-2">
                <span style={{ color: "#C9A96E", fontSize: "0.5rem" }}>◆</span>
                <button
                  onClick={() => {
                    if (l === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
                    else document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm transition-colors hover:text-white"
                  style={{ fontFamily: "Jost, sans-serif", color: "#9A8585", letterSpacing: "0.05em" }}>
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
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      className="text-sm leading-relaxed transition-colors hover:text-white"
                      style={{ fontFamily: "Jost, sans-serif", color: "#C4AFAF" }}>
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
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #3D3030, transparent)" }} />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
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