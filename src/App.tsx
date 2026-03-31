import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { Instagram, Phone, MessageCircle, Star, Menu, X, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';

export default function App() {
  return (
    <div className="relative bg-black text-white min-h-screen selection:bg-white/30 font-sans">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Process />
        <ParallaxBreak />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}

// --- Custom Cursor ---
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, input, textarea, .hoverable'));
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[100] hidden md:block mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}

// --- Navbar ---
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Services', 'Process', 'Gallery', 'Testimonials', 'Contact'];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="hoverable flex items-center">
            <img src="https://i.imgur.com/PTZoBb7.png" alt="J&A Detailing" className="h-16 md:h-24 w-auto object-contain" referrerPolicy="no-referrer" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors hoverable">
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-4">
              <a href="https://www.instagram.com/jadetailingofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors hoverable"><Instagram className="w-5 h-5" /></a>
            </div>
            <a href="#contact" className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 hover:scale-105 active:scale-95 transition-all hoverable shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              Call Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button aria-label="Open Menu" className="md:hidden text-white active:scale-95 transition-transform" onClick={() => setIsOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-8"
          >
            <button aria-label="Close Menu" className="absolute top-6 right-6 text-white active:scale-95 transition-transform" onClick={() => setIsOpen(false)}>
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2 }}
                  className="text-4xl font-bold tracking-tight"
                >
                  {link}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex gap-6"
            >
              <a href="https://www.instagram.com/jadetailingofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white"><Instagram className="w-6 h-6" /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Hero ---
function Hero() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
  const item = { hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://instagram.fdac3-1.fna.fbcdn.net/v/t51.82787-15/567924832_17940103629081640_7688213644200932738_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=108&ig_cache_key=Mzc0NjIyNTk2NjEzODg4NzQ0NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5oZHIuQzMifQ%3D%3D&_nc_ohc=VOlohmKnvnQQ7kNvwHjA0ti&_nc_oc=Ado8WT5mAP2hGQWv2QxmTszl_v4Yvoq8PaBGhAXJZuAq7A9W_Pcft27MikT2avvdNoc&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=xZO29dFaZ4cHudcmmugatg&_nc_ss=7a32e&oh=00_AfzsI6cSa99tCd0NBFcbJdmgjSSr76P6rIp7ioW2dVWNgw&oe=69D1C78A" 
          alt="Luxury Car Detailing" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-start text-left mt-20"
      >
        <motion.div variants={item} className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8 border-red-500/30">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <span className="text-xs font-medium tracking-widest uppercase text-gray-300">Eastern Shore, MD</span>
        </motion.div>
        
        <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6">
          Precision Detailing.<br />
          <span className="text-gray-500">Long-Term Protection.</span>
        </motion.h1>
        
        <motion.p variants={item} className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-10 font-light">
          Specializing in paint correction, ceramic coatings, and maintenance plans for those who demand perfection.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#contact" className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all hoverable shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            Book Appointment <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#services" className="glass text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all hoverable">
            Explore Services
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- Trust Banner (Marquee) ---
function Marquee() {
  const items = [
    "5-Star Rated", "Certified Installers", "Paint Correction Experts", "Ceramic Coating Specialists", "Long-Term Protection"
  ];

  return (
    <div className="py-8 border-y border-white/10 bg-black/50 overflow-hidden flex relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div
        className="flex whitespace-nowrap gap-12 items-center px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-gray-400 font-medium tracking-widest uppercase text-sm">
            <Star className="w-4 h-4 text-white" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// --- About ---
function About() {
  return (
    <section id="about" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
        >
          <img 
            src="https://instagram.fdac3-2.fna.fbcdn.net/v/t51.71878-15/564605581_1899457448116886_2192311066454434492_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=100&ig_cache_key=Mzc0MzMwNjM2MDMzMjA3MTIxMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=JVXuo_WeoKAQ7kNvwEsj3-D&_nc_oc=Adp1xjmKAYvO0fBNigyJ6cbZRtNLuKPNrMOGDVM9VS6iOoDnX-hY4lV7EjPWiQqUfjg&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&se=-1&_nc_ht=instagram.fdac3-2.fna&_nc_gid=xZO29dFaZ4cHudcmmugatg&_nc_ss=7a32e&oh=00_AfzRW4rVQb3rQnC-5FwLesdf-smV_DsMyc3Gqvfui8j1Bg&oe=69D1BDBE" 
            alt="About J&A Detailing" 
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <div className="glass px-6 py-3 rounded-full inline-flex items-center gap-2 border-red-500/20">
              <CheckCircle2 className="w-5 h-5 text-red-500" />
              <span className="font-medium">Certified Installers</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Real correction. Real protection.</h2>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            J&A Detailing is built around one thing: restoring and protecting your vehicle properly. We don't do quick washes or temporary shine. We focus on meticulous paint correction and long-lasting ceramic coatings.
          </p>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Based in the Eastern Shore, MD, our certified team uses only the highest quality products and techniques to ensure your vehicle looks better than the day it left the showroom.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-3xl font-bold text-white mb-2"><AnimatedCounter from={0} to={5} suffix="+" /></h4>
              <p className="text-gray-500 text-sm uppercase tracking-widest">Years Experience</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white mb-2"><AnimatedCounter from={0} to={100} suffix="%" /></h4>
              <p className="text-gray-500 text-sm uppercase tracking-widest">Satisfaction</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Animated Counter ---
function AnimatedCounter({ from, to, suffix = "" }: { from: number, to: number, suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = from;
      const duration = 2000;
      const increment = (to - from) / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [inView, from, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// --- Services ---
function Services() {
  const services = [
    {
      title: "Paint Correction",
      desc: "Remove swirl marks, scratches, and oxidation to restore a flawless, mirror-like finish.",
      img: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=1000",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-2"
    },
    {
      title: "Ceramic Coatings",
      desc: "Professional-grade protection that lasts years, not weeks.",
      img: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&q=80&w=1000",
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1"
    },
    {
      title: "Maintenance Plans",
      desc: "Scheduled upkeep to keep your vehicle consistently pristine.",
      img: "https://images.unsplash.com/photo-1605810730444-65123984042d?auto=format&fit=crop&q=80&w=1000",
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1"
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Our Services</h2>
        <p className="text-gray-400 text-lg max-w-2xl">We don't do quick washes. We focus on real correction and long-term protection.</p>
      </motion.div>

      {/* Desktop Grid / Mobile Carousel */}
      <div className="flex md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative rounded-3xl overflow-hidden min-w-[85vw] md:min-w-0 snap-center h-[400px] md:h-full md:min-h-[300px] ${service.colSpan} ${service.rowSpan} hoverable`}
          >
            <img 
              src={service.img} 
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- Process ---
function Process() {
  const steps = [
    {
      number: "01",
      title: "Assessment & Prep",
      desc: "We thoroughly inspect your vehicle's condition and perform a deep decontamination wash to prepare the surface."
    },
    {
      number: "02",
      title: "Precision Correction",
      desc: "Using advanced techniques, we remove imperfections, swirl marks, and scratches to restore a flawless finish."
    },
    {
      number: "03",
      title: "Ceramic Protection",
      desc: "We apply a professional-grade ceramic coating to lock in the shine and provide years of durable protection."
    },
    {
      number: "04",
      title: "Final Inspection",
      desc: "Every inch is scrutinized under specialized lighting before we hand the keys back to you."
    }
  ];

  return (
    <section id="process" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Our Process</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">A systematic approach to achieving and preserving automotive perfection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full glass flex items-center justify-center text-3xl font-bold mb-6 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.15)] border-red-500/20">
              {step.number}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-gray-400 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- Parallax Break ---
function ParallaxBreak() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
        <img 
          src="https://instagram.fdac3-1.fna.fbcdn.net/v/t51.71878-15/648728758_908922648408102_5812371977320261707_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=109&ig_cache_key=Mzg0NzcyMzg0NzAwNTM2NzU2MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=UlSoHY3dnj0Q7kNvwHa92JA&_nc_oc=AdoLTmPTdohDUiz9j5aGERrBZ1dknXEXpSYb_KVnZBSSP9zvs6Pxk9EQyyQ_yaIGMuM&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&se=-1&_nc_ht=instagram.fdac3-1.fna&_nc_gid=xZO29dFaZ4cHudcmmugatg&_nc_ss=7a32e&oh=00_AfxRSdU7z8GeUxbIXxohWmEi3I6PnXSOeZvLUzwmcvnOUg&oe=69D19806" 
          alt="Sleek Car" 
          className="w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-glow">Perfection is in the details.</h2>
        <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 active:scale-95 transition-transform hoverable">
          Get a Quote
        </a>
      </div>
    </section>
  );
}

// --- Gallery ---
const galleryImages = [
  "https://instagram.fdac3-2.fna.fbcdn.net/v/t51.82787-15/521687654_17929564638081640_8436266431148389372_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=104&ig_cache_key=MzY3OTAxMzIyNDI3MzM5MDE5MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzMjB4MjM0Ny5zZHIuQzMifQ%3D%3D&_nc_ohc=SSRglYEcJlkQ7kNvwF-yix7&_nc_oc=AdoVYqqDyszMjQwMbFb6iSQ5JUtjG70UG583r7TfnJsS7mlGiBjVY0Q4KN1OlYek-to&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=GEdszlutJ8YwC7bjDNpKlQ&_nc_ss=7a32e&oh=00_Afxwg1T9Pgfl9lzPXPOPklUsYn79nPPhZIRmQe-fl6G6IA&oe=69D1AD6C",
  "https://instagram.fdac3-1.fna.fbcdn.net/v/t51.75761-15/511423860_17927040966081640_3913456039271314752_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=109&ig_cache_key=MzY2MjgzODM2NjY3MjczMzM5MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxOC5oZHIuQzMifQ%3D%3D&_nc_ohc=ji_98z4CxX0Q7kNvwEvdO3e&_nc_oc=Adrc55V0Em3H3s8Z81G3GZRMhrnOBxhkR8hLanRvmznKL6xhQ7ZLaDmw0WS4xWUsJf0&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=91melbEftU-Nj_O0DlFVlA&_nc_ss=7a32e&oh=00_AfycnVVteFFmua96qYr-vOQsOY6QpW0SFJQxTnXCXLpFgg&oe=69D1B595",
  "https://instagram.fdac3-2.fna.fbcdn.net/v/t51.82787-15/504060227_17927183628081640_3477749694500664335_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=104&ig_cache_key=MzY2Mzc0OTU0ODExMjk5NDczNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5oZHIuQzMifQ%3D%3D&_nc_ohc=6vSwYtN7j68Q7kNvwF0Wroh&_nc_oc=AdolL3orunSB7ze3CBu0Zd_vK8SgVhkmGzylcQAQX-Z0rKlT1wwnlL1vf1fZkrKIZwE&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=91melbEftU-Nj_O0DlFVlA&_nc_ss=7a32e&oh=00_Afxosyt9E2BzNmwNJzYoig0Ieqp6mg2Aha4y_-KrNmftFg&oe=69D19FA0",
  "https://instagram.fdac3-2.fna.fbcdn.net/v/t51.71878-15/504086869_2425695684484422_3713930682629755922_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=100&ig_cache_key=MzY0ODU0NDAwMTM5OTAzNjUzMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=tDXPWxuCnUkQ7kNvwEgopqE&_nc_oc=AdocEypJ-bVHy7bHdEtCbtxy2fcuanP7qcyUHG7UMd4bKJ5Id4tMO-8jv8gJ-0GY3pw&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=hJGWbdQ7J79TNvZ43mNxSw&_nc_ss=7a32e&oh=00_Afwdkl2kQRTHlo_cqaxkoq4kL9h5CkQrFzSPNsw3lma3Dg&oe=69D196F6",
  "https://instagram.fdac3-2.fna.fbcdn.net/v/t51.75761-15/494920278_17920913208081640_4497548817651998327_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=106&ig_cache_key=MzYyNTI0ODE5MDc2NjUxODA1Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5oZHIuQzMifQ%3D%3D&_nc_ohc=X7AniXjegE0Q7kNvwFVBxiq&_nc_oc=AdruVLkf3ek5Arj5U-ARXSYVZ0p5sNIOYi5RvRTI6hP-nQVIkE10ynwbpyruGLVnjuI&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=hJGWbdQ7J79TNvZ43mNxSw&_nc_ss=7a32e&oh=00_AfwrmgzcszJZb9DhduL10renJDx3anAuYV70tUtl3JAETA&oe=69D1BCB6",
  "https://instagram.fdac3-1.fna.fbcdn.net/v/t51.75761-15/491445336_17920321614081640_2007328908974586042_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=108&ig_cache_key=MzYyMTQ0NzYwMjc2OTY1NDM4Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5oZHIuQzMifQ%3D%3D&_nc_ohc=-U2tzF3juGsQ7kNvwGqR-RV&_nc_oc=AdoTmT1PulJvWqzbCb_dH8ahew7Slerc0LM891RDuT3T6v0f16HG896ZUnJ2fOAeJpI&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=ES0l84FzISVxDCowvZFGsg&_nc_ss=7a32e&oh=00_Afz4f2oz2n2zgYiVgf0_pCym0lrLAW9ekhIzJUAJs3AslQ&oe=69D1995D",
  "https://instagram.fdac3-2.fna.fbcdn.net/v/t51.75761-15/491443471_17919800490081640_1686012235005261076_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=104&ig_cache_key=MzYxNzk4MDEwOTI1MDAzMTAzNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5oZHIuQzMifQ%3D%3D&_nc_ohc=X9EXGHAXQMAQ7kNvwHsMUWv&_nc_oc=AdpAkoCtJyD3JcHuo0tyEth08meu64KfnuE3s9qrSnJD8cRb9dExjz7ycATyZ-91kZs&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=ES0l84FzISVxDCowvZFGsg&_nc_ss=7a32e&oh=00_AfySam-5OE1VgoubG6ZzE5kE2MOWqPSCdsbte-40_5UD3w&oe=69D1943A",
  "https://instagram.fdac3-1.fna.fbcdn.net/v/t51.71878-15/574866999_671758565762080_5655871916929396497_n.jpg?stp=dst-jpegr_e15_tt6&_nc_cat=108&ig_cache_key=Mzc1ODA1MTQxNzI2MTg5NzAwNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2Lmhkci5DMyJ9&_nc_ohc=0O7TjtvMQvAQ7kNvwHNcqtr&_nc_oc=Adq6JKp0iJHdYHuiyvLoDSac4HimWsXNC-Sa205hjEGWsJtUmOlG1fCJgH7PAJMaoXM&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&se=-1&_nc_ht=instagram.fdac3-1.fna&_nc_gid=xZO29dFaZ4cHudcmmugatg&_nc_ss=7a32e&oh=00_AfyJxP3AUjKeYrWATp2IJM_2Nhow1FNZCYHCU0S3FRprIA&oe=69D1A8B8"
];

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveToEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  useEffect(() => {
    const timer = setInterval(moveToEnd, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    if (Math.abs(info.offset.x) > 50) {
      moveToEnd();
    }
  };

  return (
    <section id="gallery" className="py-24 md:py-32 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Project Gallery</h2>
        <p className="text-gray-400 text-lg">Swipe to explore our recent detailing projects.</p>
      </div>

      <div className="relative h-[450px] md:h-[600px] w-full flex justify-center items-center perspective-1000">
        {galleryImages.map((src, i) => {
          let relativeIndex = i - currentIndex;
          if (relativeIndex < 0) relativeIndex += galleryImages.length;
          
          const isTop = relativeIndex === 0;
          const zIndex = galleryImages.length - relativeIndex;
          const scale = 1 - relativeIndex * 0.05;
          const yOffset = relativeIndex * 20;
          const opacity = relativeIndex < 4 ? 1 - relativeIndex * 0.2 : 0;
          
          return (
            <motion.div
              key={src}
              initial={false}
              animate={{ 
                opacity, 
                scale, 
                y: yOffset,
                zIndex
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute w-full max-w-sm md:max-w-md h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ${isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
              style={{ transformOrigin: "top center" }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={isTop ? handleDragEnd : undefined}
            >
              <img src={src} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover pointer-events-none" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// --- Testimonials ---
function Testimonials() {
  const reviews = [
    { name: "Michael T.", text: "Absolutely incredible work. The ceramic coating makes my car look better than the day I bought it." },
    { name: "Sarah J.", text: "They removed scratches I thought were permanent. True professionals who care about the details." },
    { name: "David R.", text: "The maintenance plan is a lifesaver. My truck is always spotless without me lifting a finger." }
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-white/5 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-16 text-center">Client Experiences</h2>
        
        <div className="flex md:grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl min-w-[85vw] md:min-w-0 snap-center"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-red-500 text-red-500" />)}
              </div>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <span className="font-medium">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact ---
function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Ready for perfection?</h2>
          <p className="text-gray-400 text-lg mb-12">Fill out the form to request a quote or book your appointment. We'll get back to you within 24 hours.</p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-medium mb-1">Call or Text</p>
                <a href="tel:4104768030" className="text-xl font-medium hover:text-gray-300 transition-colors hoverable">(410) 476-8030</a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-medium mb-1">Service Area</p>
                <p className="text-xl font-medium">Eastern Shore, MD</p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-12 rounded-2xl overflow-hidden h-[250px] relative glass">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198359.62681533256!2d-76.19639534999999!3d38.96971915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b8433b91612405%3A0x637f90e0c0303866!2sEastern%20Shore%20of%20Maryland%2C%20MD!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(100%) contrast(120%)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Area Map"
            ></iframe>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-3xl"
        >
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input type="text" id="name" required className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-transparent" placeholder="Name" />
              <label htmlFor="name" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white pointer-events-none">Full Name</label>
            </div>
            <div className="relative">
              <input type="tel" id="phone" required className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-transparent" placeholder="Phone" />
              <label htmlFor="phone" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white pointer-events-none">Phone Number</label>
            </div>
            <div className="relative">
              <input type="text" id="vehicle" required className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-transparent" placeholder="Vehicle" />
              <label htmlFor="vehicle" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white pointer-events-none">Vehicle Make & Model</label>
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-xl font-bold mt-4 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all hoverable shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              Submit Request
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 text-center text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} J&A Detailing. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/jadetailingofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hoverable">Instagram</a>
          <a href="#" className="hover:text-white transition-colors hoverable">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

// --- Mobile CTA ---
function MobileCTA() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setVisible(latest > 300);
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 w-full p-4 z-50 md:hidden"
        >
          <div className="glass rounded-2xl p-2 flex gap-2 shadow-2xl shadow-black">
            <a href="tel:4104768030" className="flex-1 bg-white text-black py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <Phone className="w-4 h-4" /> Call
            </a>
            <a href="sms:4104768030" className="flex-1 bg-[#25D366] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <MessageCircle className="w-4 h-4" /> Text
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


