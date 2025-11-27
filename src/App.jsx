import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Calendar, MapPin, Phone, Instagram, Facebook, 
  Twitter, Star, ArrowRight, Sparkles, Check, ChevronRight,
  Clock, Mail, Scissors, Shield, Gift
} from 'lucide-react';

/**
 * UTILS & HOOKS
 */
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

/**
 * DATA CONSTANTS
 */
const BRANDS = ["L'Oreal Prof", "Kérastase", "Olaplex", "Dyson", "MAC", "Bobbi Brown"];

const SERVICES = {
  "Hair Artistry": [
    { id: 1, name: "Couture Cut & Finish", price: "2,500", duration: "60 min", desc: "Bespoke styling tailored to your face shape." },
    { id: 2, name: "Balayage Transformation", price: "8,500+", duration: "180 min", desc: "Hand-painted dimensional color." },
    { id: 3, name: "Nano-Plastia Treatment", price: "12,000", duration: "240 min", desc: "Organic straightening & restoration." },
  ],
  "Esthetics": [
    { id: 4, name: "24K Gold Facial", price: "4,500", duration: "75 min", desc: "Cellular regeneration with pure gold leaf." },
    { id: 5, name: "Hydra-Medic Therapy", price: "6,000", duration: "90 min", desc: "Clinical deep cleanse for troubled skin." },
  ],
  "Bridal Suite": [
    { id: 6, name: "The Royal Bride", price: "35,000", duration: "5 hrs", desc: "Complete hair, HD makeup, and draping." },
    { id: 7, name: "Pre-Wedding Glow", price: "15,000", duration: "3 hrs", desc: "Exfoliation, facial, and trial session." },
  ]
};

const STAFF = [
  { id: 1, name: "Arjun V.", role: "Creative Director", img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Sana K.", role: "Master Colorist", img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Mira R.", role: "Esthetician", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
];

/**
 * SUB-COMPONENTS
 */
const SectionHeader = ({ title, subtitle, align = "center", light = false }) => (
  <div className={`mb-16 text-${align} animate-fade-in-up`}>
    <h3 className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${light ? 'text-gold' : 'text-zinc-500'}`}>{subtitle}</h3>
    <h2 className={`text-4xl md:text-5xl font-serif ${light ? 'text-white' : 'text-zinc-900'}`}>{title}</h2>
    <div className={`h-1 w-20 bg-gradient-to-r from-[#C6A355] to-[#E8D397] mt-6 ${align === 'center' ? 'mx-auto' : ''}`}></div>
  </div>
);

const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const base = "px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all duration-300 relative overflow-hidden group";
  const styles = {
    primary: "bg-black text-white hover:bg-zinc-800",
    gold: "bg-gradient-to-r from-[#C6A355] to-[#B08D55] text-white hover:shadow-[0_0_20px_rgba(198,163,85,0.4)]",
    outline: "border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white"
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

// 1. Navbar: Sleek, Text-only
const Navbar = ({ openBooking, scrolled }) => (
  <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
    <div className="container mx-auto px-6 flex justify-between items-center">
      <div className={`text-2xl font-serif tracking-widest font-bold ${scrolled ? 'text-black' : 'text-white'}`}>
        JOHANNA LUXE<span className="text-[#C6A355]">.</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {['Services', 'Collection', 'About', 'Journal'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className={`text-xs font-bold uppercase tracking-widest hover:text-[#C6A355] transition-colors ${scrolled ? 'text-zinc-800' : 'text-white/80'}`}>
            {item}
          </a>
        ))}
        <Button variant={scrolled ? "primary" : "gold"} onClick={openBooking} className="!py-3 !px-6 !text-xs">
          Book Appointment
        </Button>
      </div>
      <div className="md:hidden text-[#C6A355]"><Menu /></div>
    </div>
  </nav>
);

// 2. Hero: Cinematic & Dark
const Hero = ({ openBooking }) => (
  <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
    <div className="absolute inset-0 opacity-60">
      <img 
        src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=1920" 
        alt="Salon Interior" 
        className="w-full h-full object-cover scale-105 animate-slow-zoom" 
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
    
    <div className="relative z-10 text-center max-w-5xl px-6 mt-12">
      <p className="text-[#C6A355] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6 animate-fade-in-up">
        Est. 2025 • Ramprastha , DELHI-NCR
      </p>
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-[0.9] tracking-tight animate-fade-in-up animation-delay-100">
        DEFINING <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A355] via-[#E8D397] to-[#C6A355] italic">ELEGANCE</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12 animate-fade-in-up animation-delay-200">
        <Button variant="gold" onClick={openBooking}>Reserve Experience</Button>
        <span className="text-white/60 text-xs uppercase tracking-widest hidden md:block">Or</span>
        <button className="text-white border-b border-white/30 pb-1 hover:border-[#C6A355] hover:text-[#C6A355] transition-all text-sm uppercase tracking-widest">
          Explore Services
        </button>
      </div>
    </div>
    
    {/* Hero Footer */}
    <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/20 backdrop-blur-sm py-6">
      <div className="container mx-auto px-6 flex justify-between text-white/60 text-xs tracking-widest uppercase">
        <div className="hidden md:block">© 2025 Johanna Luxe</div>
        <div className="flex gap-8 mx-auto md:mx-0">
          <span>Daily 10AM - 8PM</span>
          <span className="hidden md:inline">•</span>
          <span>+91 80 4567 8900</span>
        </div>
      </div>
    </div>
  </div>
);

// 3. Brands Banner (Fills empty space)
const BrandsStrip = () => (
  <div className="bg-zinc-950 py-12 border-b border-white/5">
    <div className="container mx-auto px-6">
      <p className="text-center text-zinc-500 text-xs tracking-[0.2em] uppercase mb-8">Our Premium Partners</p>
      <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
        {BRANDS.map(brand => (
          <span key={brand} className="text-white text-xl md:text-2xl font-serif italic hover:text-[#C6A355] cursor-default transition-colors">
            {brand}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// 4. Intro Section: Overlapping Editorial Layout
const Intro = () => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <SectionHeader title="The Art of Beauty" subtitle="About Us" align="left" />
            <p className="text-zinc-600 leading-relaxed mb-6 text-lg font-light">
              At Johanna Luxe, we don't just style hair; we curate confidence.
            </p>
            <p className="text-zinc-600 leading-relaxed mb-8 text-lg font-light">
              Our philosophy is rooted in <span className="font-serif italic text-black">intentional beauty</span>—using sustainable, premium products that nourish while they transform.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-4xl font-serif text-[#C6A355]">15+</h4>
                <p className="text-xs uppercase tracking-widest mt-2 text-zinc-900 font-bold">Years of Mastery</p>
              </div>
              <div>
                <h4 className="text-4xl font-serif text-[#C6A355]">50k</h4>
                <p className="text-xs uppercase tracking-widest mt-2 text-zinc-900 font-bold">Clients Served</p>
              </div>
            </div>
          </div>
          
          <div className="relative mt-12 lg:mt-0">
            <div className="relative z-10">
              <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800" alt="Salon" className="w-[85%] shadow-2xl" />
            </div>
            <div className="absolute -bottom-12 -right-4 w-[60%] z-0 border-[12px] border-white shadow-xl">
              <img src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&q=80&w=600" alt="Detail" />
            </div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#f8f5f0] -z-10 rounded-full blur-3xl opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 5. Menu Style Services (More dense/professional)
const ServiceMenu = ({ openBooking }) => {
  const [activeTab, setActiveTab] = useState("Hair Artistry");
  
  return (
    <section id="services" className="py-32 bg-[#111] text-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1a1a1a] hidden lg:block"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <SectionHeader title="Service Menu" subtitle="Curated for You" align="left" light />
            <div className="flex flex-col items-start gap-2 mt-8">
              {Object.keys(SERVICES).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`text-2xl md:text-3xl font-serif transition-all duration-300 hover:pl-4 ${activeTab === cat ? 'text-[#C6A355] pl-4 italic' : 'text-zinc-600 hover:text-zinc-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="mt-16 p-8 bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-sm">
              <Sparkles className="text-[#C6A355] mb-4" />
              <h4 className="text-lg font-serif mb-2">First Time?</h4>
              <p className="text-zinc-400 text-sm mb-4">Book a complimentary consultation with our Creative Directors.</p>
              <button className="text-xs font-bold uppercase tracking-widest text-white border-b border-[#C6A355]">Book Consult</button>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-8 pt-8">
            <div className="grid gap-12">
              {SERVICES[activeTab].map((item, idx) => (
                <div key={item.id} className="group cursor-pointer" onClick={() => openBooking(item)}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#C6A355] transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex-1 mx-4 border-b border-zinc-800 border-dashed relative top-[-4px]"></div>
                    <span className="text-xl font-serif text-[#C6A355]">₹{item.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-zinc-500 font-light text-sm">{item.desc}</p>
                    <span className="text-zinc-600 text-xs uppercase tracking-widest border border-zinc-800 px-2 py-1 rounded-sm">{item.duration}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 flex justify-end">
              <Button variant="gold" onClick={openBooking}>Book Selected Service</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. Stylist Carousel (Simulated)
const StylistShowcase = () => (
  <section className="py-24 bg-[#f8f5f0]">
    <div className="container mx-auto px-6">
      <SectionHeader title="The Artisans" subtitle="Meet the Team" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {STAFF.map(stylist => (
          <div key={stylist.id} className="group relative overflow-hidden h-[500px]">
            <img src={stylist.img} alt={stylist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
              <p className="text-[#C6A355] text-xs uppercase tracking-widest mb-2">Book with</p>
              <h3 className="text-3xl font-serif text-white mb-1">{stylist.name}</h3>
              <p className="text-white/80 text-sm mb-6">{stylist.role}</p>
              <div className="flex gap-4">
                <button className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#C6A355] transition-colors">
                  Profile
                </button>
                <button className="border border-white text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  Instagram
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 7. Footer: Robust & Detailed
const Footer = () => (
  <footer className="bg-black text-white pt-24 pb-12 border-t border-zinc-900">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-serif tracking-widest font-bold mb-6">
            JOHANNA LUXE<span className="text-[#C6A355]">.</span>
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-8">
            Redefining the Indian salon experience with international standards, luxury products, and bespoke artistry.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-[#C6A355] hover:text-[#C6A355] transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#C6A355]">Explore</h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            {['Our Story', 'Services Menu', 'Gift Cards', 'Bridal Suite', 'Careers', 'Press'].map(item => (
              <li key={item} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-[1px] bg-[#C6A355] transition-all"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#C6A355]">Visit Us</h4>
          <div className="space-y-6 text-sm text-zinc-400">
            <div className="flex gap-4">
              <MapPin className="shrink-0 text-white" size={20} />
              <p>C-181,<br />Ramprastha , 201011</p>
            </div>
            <div className="flex gap-4">
              <Phone className="shrink-0 text-white" size={20} />
              <p>+91 93 1111 5011</p>
            </div>
            <div className="flex gap-4">
              <Mail className="shrink-0 text-white" size={20} />
              <p>concierge@johannaluxe.in</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#C6A355]">The Insider</h4>
          <p className="text-zinc-500 text-xs mb-4">Join our list for priority booking and exclusive beauty edits.</p>
          <div className="flex border-b border-zinc-700 pb-2">
            <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none text-white text-sm placeholder:text-zinc-600" />
            <button className="text-zinc-400 hover:text-[#C6A355]"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 uppercase tracking-wider">
        <p>&copy; 2025 Johanna Luxe. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-400">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// 8. Booking Modal (Refined)
const BookingModal = ({ isOpen, onClose, selectedService }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl relative z-10 animate-fade-in-up shadow-2xl overflow-hidden">
        <div className="flex h-full flex-col md:flex-row">
          {/* Side Image */}
          <div className="hidden md:block w-1/3 bg-black relative">
            <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
            <div className="relative z-10 p-8 text-white h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-serif mb-2">JOHANNA LUXE.</h3>
                <p className="text-xs uppercase tracking-widest text-[#C6A355]">Reservation</p>
              </div>
              <div className="text-xs text-white/60">
                <p className="mb-2">Indiranagar, BLR</p>
                <p>+91 80 4567 8900</p>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="w-full md:w-2/3 p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">Secure Your Spot</h2>
              <button onClick={onClose}><X className="text-zinc-400 hover:text-black" /></button>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Request sent!"); onClose(); }}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-zinc-500">Service</label>
                <div className="p-4 border border-zinc-200 bg-zinc-50 text-sm font-medium">
                  {selectedService ? selectedService.name : "Consultation / General Booking"}
                  {selectedService && <span className="block text-xs text-zinc-500 mt-1">Duration: {selectedService.duration} • Price: ₹{selectedService.price}</span>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-zinc-500">Date</label>
                  <input type="date" className="w-full p-3 border-b border-zinc-200 outline-none focus:border-black transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-zinc-500">Time</label>
                  <select className="w-full p-3 border-b border-zinc-200 outline-none focus:border-black bg-white" required>
                    <option>Morning (10am - 12pm)</option>
                    <option>Afternoon (12pm - 4pm)</option>
                    <option>Evening (4pm - 8pm)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-zinc-500">Contact</label>
                <input type="text" placeholder="Your Name" className="w-full p-3 border-b border-zinc-200 outline-none focus:border-black mb-4" required />
                <input type="tel" placeholder="Phone Number" className="w-full p-3 border-b border-zinc-200 outline-none focus:border-black" required />
              </div>

              <Button variant="primary" className="w-full justify-center mt-4">Confirm Request</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Wrapper
const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBooking = (item = null) => {
    setSelectedItem(item);
    setBookingOpen(true);
  };

  return (
    <div className="font-sans text-zinc-900 bg-white selection:bg-[#C6A355] selection:text-white">
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom { animation: slow-zoom 20s linear infinite alternate; }
        .text-gold { color: #C6A355; }
      `}</style>
      
      <Navbar scrolled={scrolled} openBooking={() => handleBooking(null)} />
      
      <main>
        <Hero openBooking={() => handleBooking(null)} />
        <BrandsStrip />
        <Intro />
        <ServiceMenu openBooking={handleBooking} />
        <StylistShowcase />
        
        {/* Why Choose Us / Value Props (Filler content) */}
        <section className="py-24 bg-white border-t border-zinc-100">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Shield, title: "Hygiene Standard", desc: "Hospital-grade sterilization for every tool and station." },
              { icon: Sparkles, title: "Premium Products", desc: "Only the finest global brands touch your hair and skin." },
              { icon: Gift, title: "Loyalty Rewards", desc: "Earn points on every visit redeemable for exclusive treatments." }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#f8f5f0] flex items-center justify-center text-[#C6A355] mb-6">
                  <f.icon size={24} />
                </div>
                <h4 className="text-lg font-serif mb-2">{f.title}</h4>
                <p className="text-zinc-500 text-sm max-w-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Instagram/Gallery Strip */}
        <section className="py-2 bg-black overflow-hidden">
          <div className="flex animate-scroll hover:pause gap-1">
             {/* Creating a seamless loop of images */}
            {[1,2,3,4,5,6,1,2,3,4].map((n, i) => (
              <div key={i} className="min-w-[200px] md:min-w-[300px] h-[300px] relative group cursor-pointer">
                <img src={`https://images.unsplash.com/photo-15${n}2337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Insta" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedService={selectedItem} />
    </div>
  );
};

export default App;