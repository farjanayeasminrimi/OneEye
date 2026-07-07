"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button, Input, Textarea } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Shield,
  Gavel,
  Briefcase,
  Users,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Settings,
  ArrowRight,
  Star,
  CheckCircle,
  Award,
  Globe,
  Plus,
  X,
  FileText,
  Building,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check
} from "lucide-react";

// Practice areas details
const practiceAreas = [
  {
    title: "Personal Injury",
    icon: <Award size={24} />,
    desc: "Representing victims in accident claims, negligence cases, compensation disputes, and injury-related litigation.",
    focus: ["Accident Claims", "Negligence", "Compensation"],
    slug: "personal-injury"
  },
  {
    title: "Criminal Defense",
    icon: <Gavel size={24} />,
    desc: "Defending clients against criminal charges, investigations, court proceedings, and legal advocacy.",
    focus: ["Criminal Defense", "Investigations", "Advocacy"],
    slug: "criminal-defense"
  },
  {
    title: "Family Law",
    icon: <Users size={24} />,
    desc: "Handling divorce matters, child custody disputes, alimony arrangements, and confidential family settlements.",
    focus: ["Divorce & Custody", "Alimony", "Settlements"],
    slug: "family-law"
  },
  {
    title: "Employment Law",
    icon: <Briefcase size={24} />,
    desc: "Advising on workplace disputes, contract negotiations, wrongful termination, and labor compliance issues.",
    focus: ["Workplace Disputes", "Contracts", "Labor Compliance"],
    slug: "employment-law"
  },
  {
    title: "Real Estate Law",
    icon: <Building size={24} />,
    desc: "Managing property transactions, lease agreements, land disputes, and real estate legal documentation.",
    focus: ["Property Transactions", "Leases", "Land Disputes"],
    slug: "real-estate-law"
  },
  {
    title: "Corporate Law",
    icon: <Scale size={24} />,
    desc: "Supporting business formation, shareholder agreements, mergers, acquisitions, and regulatory compliance.",
    focus: ["Business Formation", "M&As", "Governance"],
    slug: "corporate-law"
  }
];

// Case studies
const caseStudies = [
  {
    title: "Johnson vs. Metro Transit",
    desc: "Pedestrian Injury Settlement",
    result: "$1.2M Settlement",
    type: "Personal Injury",
    bgGradient: "from-amber-500/10 to-amber-600/5"
  },
  {
    title: "State vs. Ramirez",
    desc: "Successful Criminal Defense Strategy",
    result: "Charges Acquitted",
    type: "Criminal Defense",
    bgGradient: "from-amber-600/10 to-amber-700/5"
  },
  {
    title: "Williams Divorce Settlement",
    desc: "High Asset Family Dispute",
    result: "Assets Secured",
    type: "Family Law",
    bgGradient: "from-amber-500/10 to-amber-600/5"
  },
  {
    title: "Anderson vs. TechCorp",
    desc: "Workplace Discrimination Claim",
    result: "$450k Settlement",
    type: "Employment Law",
    bgGradient: "from-amber-600/10 to-amber-700/5"
  },
  {
    title: "Greenfield Plaza Acquisition",
    desc: "Commercial Property Transaction",
    result: "Closed successfully",
    type: "Real Estate Law",
    bgGradient: "from-amber-500/10 to-amber-600/5"
  },
  {
    title: "FusionTech Corporate Structuring",
    desc: "Seed Funding Compliance",
    result: "$15M Series A Raised",
    type: "Corporate Law",
    bgGradient: "from-amber-600/10 to-amber-700/5"
  }
];

// Team expert profiles
const teamMembers = [
  {
    name: "Thomas Bennett",
    role: "Senior Partner",
    specialty: "Corporate & Business Law",
    initials: "TB"
  },
  {
    name: "Elizabeth Vance",
    role: "Managing Partner",
    specialty: "Criminal Defense & Trial Advocacy",
    initials: "EV"
  },
  {
    name: "Marcus Chang",
    role: "Senior Partner",
    specialty: "Intellectual Property & Tech Law",
    initials: "MC"
  },
  {
    name: "Rebecca Martinez",
    role: "Partner",
    specialty: "Family Law & Estate Planning",
    initials: "RM"
  }
];

// Hero slides text contents
const heroSlides = [
  {
    badge: "WELCOME TO REGALIS LAW FIRM",
    title: (
      <>
        Transforming Equity <br />
        <span className="text-regalis-gold font-serif">With Precision.</span>
      </>
    ),
    desc: "We provide trusted legal representation with a strategic approach, delivering clear guidance, strong advocacy, and reliable solutions for individuals and businesses seeking justice, protection, and long-term legal confidence."
  },
  {
    badge: "BOARD-CERTIFIED ADVOCACY",
    title: (
      <>
        Fierce Trial Defense, <br />
        <span className="text-regalis-gold font-serif">When it Matters.</span>
      </>
    ),
    desc: "Our attorneys bring extensive courtroom experience and deep legal expertise to protect your rights, conduct investigations, and guide you through complex trials."
  },
  {
    badge: "CORPORATE & COMPLIANCE STRENGTH",
    title: (
      <>
        Strategic Structuring, <br />
        <span className="text-regalis-gold font-serif">Secure Transactions.</span>
      </>
    ),
    desc: "From startup founders to enterprise leaders, we support regulatory clearances, mergers, intellectual property protections, and corporate litigation with transparency."
  }
];

// FAQ Accordion lists
const faqList = [
  {
    q: "What legal services do you provide?",
    a: "We offer comprehensive legal representation across major practice areas including Personal Injury claims, Criminal Defense, Family Law, Employment disputes, Real Estate transactions, and Corporate Law governance."
  },
  {
    q: "How do I schedule a consultation?",
    a: "You can schedule a consultation by clicking the 'Book Appointment' button at the top of the page, filling out the booking form at the bottom, or calling our helpline directly at +1 (800) REGALIS-LAW."
  },
  {
    q: "Do you represent individual and business clients?",
    a: "Yes. Our team represents individual clients seeking personal justice (such as injury compensation or divorce settlements) as well as corporations requiring ongoing legal counsel, business structuring, or M&A support."
  },
  {
    q: "How are legal fees calculated?",
    a: "We offer transparent fee structures depending on the case type. Personal injury cases are generally taken on a contingency fee basis (no fee unless we win), while criminal defense and corporate counsel use flat retainer rates or detailed hourly billings."
  },
  {
    q: "Can I request a detailed cost breakdown?",
    a: "Absolutely. We pride ourselves on transparent billing. We provide all clients with detailed monthly statements and cost breakdowns. You will always know where your budget is being allocated."
  },
  {
    q: "Do you offer retainer or corporate packages?",
    a: "Yes. We offer standard corporate retainer packages that provide businesses with prioritized 24/7 advisory, contract vetting, labor compliance auditing, and emergency defense counsel."
  }
];

export default function Home() {
  // Hero Carousel State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [heroAutoplay, setHeroAutoplay] = useState(true);

  // Case Studies Carousel State
  const [activeCaseSlide, setActiveCaseSlide] = useState(0);
  const [caseSlidesToShow, setCaseSlidesToShow] = useState(3);
  const caseAutoplayRef = useRef(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    practice: "corporate-law",
    date: "",
    message: ""
  });
  const [isBooked, setIsBooked] = useState(false);

  // Demo Auth Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [demoLogin, setDemoLogin] = useState(true);
  const [demoRole, setDemoRole] = useState("lawyer");

  // Sync state on mount
  useEffect(() => {
    // Load initial states
    const storedLogin = localStorage.getItem("oneeye-logged-in");
    const storedRole = localStorage.getItem("oneeye-role");
    if (storedLogin !== null) setDemoLogin(storedLogin === "true");
    if (storedRole !== null) setDemoRole(storedRole);

    // Responsive slides calculator for case studies carousel
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCaseSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setCaseSlidesToShow(2);
      } else {
        setCaseSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Custom Event Listener to sync state from Navbar
    const handleAuthChange = () => {
      const currentLogin = localStorage.getItem("oneeye-logged-in") === "true";
      const currentRole = localStorage.getItem("oneeye-role") || "lawyer";
      setDemoLogin(currentLogin);
      setDemoRole(currentRole);
    };
    window.addEventListener("oneeye-auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("oneeye-auth-change", handleAuthChange);
    };
  }, []);

  // Hero Autoplay effect
  useEffect(() => {
    if (!heroAutoplay) return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroAutoplay]);

  // Case Studies Autoplay handler
  useEffect(() => {
    startCaseAutoplay();
    return () => stopCaseAutoplay();
  }, [caseSlidesToShow, activeCaseSlide]);

  const startCaseAutoplay = () => {
    stopCaseAutoplay();
    caseAutoplayRef.current = setInterval(() => {
      nextCaseSlide();
    }, 5000);
  };

  const stopCaseAutoplay = () => {
    if (caseAutoplayRef.current) {
      clearInterval(caseAutoplayRef.current);
    }
  };

  const nextCaseSlide = () => {
    setActiveCaseSlide((prev) => {
      const maxIndex = caseStudies.length - caseSlidesToShow;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevCaseSlide = () => {
    setActiveCaseSlide((prev) => {
      const maxIndex = caseStudies.length - caseSlidesToShow;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // Demo configuration updates
  const toggleDemoLogin = () => {
    const newState = !demoLogin;
    setDemoLogin(newState);
    localStorage.setItem("oneeye-logged-in", String(newState));
    window.dispatchEvent(new Event("oneeye-auth-change"));
  };

  const changeDemoRole = (role) => {
    setDemoRole(role);
    localStorage.setItem("oneeye-role", role);
    window.dispatchEvent(new Event("oneeye-auth-change"));
  };

  // Booking Form Submission Handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.date) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        practice: "corporate-law",
        date: "",
        message: ""
      });
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-regalis-bg-dark text-slate-900 dark:text-slate-200 overflow-hidden pb-16 transition-colors duration-300">
      
      {/* 1. HERO CAROUSEL SECTION */}
      <section 
        className="relative pt-32 md:pt-40 pb-20 md:pb-28 bg-regalis-navy text-white z-10 overflow-hidden"
        onMouseEnter={() => setHeroAutoplay(false)}
        onMouseLeave={() => setHeroAutoplay(true)}
      >
        {/* Background Grid Pattern & Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-regalis-gold/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-regalis-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-regalis-gold uppercase">
                    <Sparkles size={14} className="text-regalis-gold" />
                    <span>{heroSlides[currentHeroSlide].badge}</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
                    {heroSlides[currentHeroSlide].title}
                  </h1>
                  
                  <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                    {heroSlides[currentHeroSlide].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Button
                  as={Link}
                  href="/#contact"
                  radius="sm"
                  className="w-full sm:w-auto font-bold text-sm bg-regalis-gold hover:bg-regalis-gold-hover text-white px-8 h-12 shadow-lg shadow-regalis-gold/25 transition duration-300 cursor-pointer"
                  endContent={<ArrowRight size={16} />}
                >
                  Book Appointment
                </Button>
                <Button
                  as={Link}
                  href="/#practice-areas"
                  radius="sm"
                  variant="bordered"
                  className="w-full sm:w-auto font-bold text-sm border-white/20 text-white hover:bg-white/5 h-12 px-8 transition duration-300 cursor-pointer"
                >
                  Explore Specialties
                </Button>
              </div>

              {/* Stats Banner */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-regalis-gold">99.4%</p>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Case Success</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-regalis-gold">150+</p>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Expert Lawyers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-regalis-gold">15k+</p>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Cases Solved</p>
                </div>
              </div>
            </div>

            {/* Hero Right Visual (Glassmorphic Counsel Registry & Shield) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-2xl glass-effect p-8 flex flex-col justify-between overflow-hidden shadow-2xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-b from-regalis-gold/5 via-transparent to-transparent opacity-60"></div>
                
                {/* Header */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-regalis-gold/15 border border-regalis-gold/25 text-regalis-gold">
                    <Scale size={24} />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-regalis-gold flex items-center gap-1.5 uppercase tracking-wider">
                    <Star size={11} className="fill-regalis-gold text-regalis-gold" />
                    <span>Premier Legal Rating</span>
                  </div>
                </div>

                {/* Center Crest Visual */}
                <div className="my-auto flex flex-col items-center justify-center text-center relative z-10 py-6">
                  <div className="relative mb-4">
                    <div className="absolute -inset-1 rounded-full opacity-20 bg-regalis-gold blur-md animate-pulse"></div>
                    <div className="relative h-20 w-20 rounded-full bg-slate-900 border border-regalis-gold/20 flex items-center justify-center">
                      <Shield className="animate-pulse duration-1000 text-regalis-gold" size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold tracking-tight text-white">
                    Transforming Equity
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-[260px] font-sans leading-relaxed">
                    Connecting businesses and individuals with strategic advocates, delivering precision counseling.
                  </p>
                </div>

                {/* Footer info */}
                <div className="flex justify-between items-center border-t border-white/10 pt-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
                    <span className="text-[10px] font-bold tracking-wide uppercase text-slate-400">
                      Counsel Registry Active
                    </span>
                  </div>
                  <span className="text-[10px] text-regalis-gold font-bold tracking-widest uppercase">
                    REGALIS v2.0
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Carousel Navigation */}
          <div className="flex items-center justify-between mt-12 max-w-7xl mx-auto z-20 relative">
            <div className="flex gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentHeroSlide === idx ? "w-8 bg-regalis-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentHeroSlide((prev) => (prev <= 0 ? heroSlides.length - 1 : prev - 1))}
                className="h-10 w-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                className="h-10 w-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INFO HIGHLIGHTS RIBBON */}
      <section className="relative bg-regalis-bg-light dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/80 transition-colors py-8 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Highlight Item 1 */}
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-regalis-bg-dark/40 transition-colors duration-300">
              <div className="h-12 w-12 rounded-lg bg-regalis-gold/10 text-regalis-gold flex items-center justify-center flex-shrink-0 border border-regalis-gold/15">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">Need Our Services?</p>
                <p className="text-sm font-serif font-bold text-regalis-navy dark:text-white mt-0.5">Call Us: +1 (800) REGALIS-LAW</p>
              </div>
            </div>

            {/* Highlight Item 2 */}
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-regalis-bg-dark/40 transition-colors duration-300">
              <div className="h-12 w-12 rounded-lg bg-regalis-gold/10 text-regalis-gold flex items-center justify-center flex-shrink-0 border border-regalis-gold/15">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">Opening Hours</p>
                <p className="text-sm font-serif font-bold text-regalis-navy dark:text-white mt-0.5">Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Highlight Item 3 */}
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-regalis-bg-dark/40 transition-colors duration-300">
              <div className="h-12 w-12 rounded-lg bg-regalis-gold/10 text-regalis-gold flex items-center justify-center flex-shrink-0 border border-regalis-gold/15">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">Email Us</p>
                <p className="text-sm font-serif font-bold text-regalis-navy dark:text-white mt-0.5">contact@regalislegal.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRACTICE AREAS GRID SECTION */}
      <section id="practice-areas" className="relative py-20 md:py-28 max-w-7xl mx-auto px-6 z-10">
        
        {/* Glow */}
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-regalis-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-center md:text-left">
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-regalis-gold uppercase block">Our Specialization</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-regalis-navy dark:text-white leading-tight">
              Experienced Lawyers Protecting Your Rights
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl font-sans">
              We offer comprehensive representation across key legal disciplines, ensuring a strategic approach for every case.
            </p>
          </div>
          <Button
            as={Link}
            href="/#contact"
            radius="sm"
            className="mt-6 md:mt-0 font-bold text-xs bg-regalis-gold hover:bg-regalis-gold-hover text-white px-6 h-10 transition duration-300 cursor-pointer shadow-md shadow-regalis-gold/10"
          >
            All Practice Areas
          </Button>
        </div>

        {/* Practice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, idx) => (
            <div
              key={idx}
              className="group relative bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-8 hover:-translate-y-2 hover:shadow-2xl hover:shadow-regalis-gold/5 hover:border-regalis-gold/25 transition-all duration-300 cursor-pointer glass-effect-light"
            >
              {/* Gold Top Border Hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-xl bg-gradient-to-r from-regalis-gold to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Icon Box */}
              <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center text-regalis-navy dark:text-slate-300 group-hover:text-regalis-gold group-hover:border-regalis-gold/20 transition-all duration-300 mb-6">
                {area.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-bold text-regalis-navy dark:text-white mb-3 group-hover:text-regalis-gold transition-colors duration-300">
                {area.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-6">
                {area.desc}
              </p>

              {/* Fields */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-150 dark:border-slate-850">
                {area.focus.map((item, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-[9px] font-bold uppercase tracking-wide bg-regalis-gold/5 dark:bg-regalis-gold/10 text-regalis-gold px-2.5 py-0.5 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. CASE STUDIES CAROUSEL SECTION */}
      <section id="case-studies" className="relative py-20 bg-regalis-bg-light/60 dark:bg-slate-900/30 border-t border-b border-slate-200/50 dark:border-slate-800/60 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-[10px] font-bold tracking-widest text-regalis-gold uppercase block">Success Track Record</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-regalis-navy dark:text-white leading-tight">
                Proven Legal Success Case Studies
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                Read how our attorneys resolve intricate civil claims, defend felony charges, and draft complex assets protection trusts.
              </p>
            </div>
            
            {/* Arrows */}
            <div className="flex justify-center gap-3 mt-6 md:mt-0">
              <button
                onClick={prevCaseSlide}
                className="h-11 w-11 rounded-lg border border-slate-250 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-sm"
                aria-label="Previous Case Slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextCaseSlide}
                className="h-11 w-11 rounded-lg border border-slate-250 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-sm"
                aria-label="Next Case Slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel Viewport */}
          <div className="overflow-hidden relative px-1 py-4">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(calc(-${activeCaseSlide} * (100% + 24px) / ${caseSlidesToShow}))`
              }}
            >
              {caseStudies.map((caseItem, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  onMouseEnter={stopCaseAutoplay}
                  onMouseLeave={startCaseAutoplay}
                >
                  <div className="group relative h-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    
                    {/* Top Accent Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${caseItem.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none`}></div>

                    {/* Badge */}
                    <div className="flex justify-between items-center mb-6 relative z-10">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-regalis-navy/5 dark:bg-white/5 border border-slate-200/50 dark:border-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded">
                        {caseItem.type}
                      </span>
                      <div className="h-2 w-2 rounded-full bg-regalis-gold"></div>
                    </div>

                    {/* Text content */}
                    <div className="relative z-10 space-y-4">
                      <h3 className="text-xl font-serif font-bold text-regalis-navy dark:text-white group-hover:text-regalis-gold transition-colors duration-300">
                        {caseItem.title}
                      </h3>
                      <p className="text-xs text-slate-450 dark:text-slate-400 font-sans leading-relaxed">
                        {caseItem.desc}
                      </p>
                      
                      {/* Settlement Value Box */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Result</span>
                        <span className="text-sm font-serif font-bold text-regalis-gold">{caseItem.result}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: caseStudies.length - caseSlidesToShow + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCaseSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeCaseSlide === idx ? "w-6 bg-regalis-gold" : "w-1.5 bg-slate-300 dark:bg-slate-800 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </section>

      {/* 5. MEET OUR EXPERIENCED LEGAL EXPERT TEAM */}
      <section id="about" className="relative py-20 md:py-28 max-w-7xl mx-auto px-6 z-10">
        
        {/* Glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-regalis-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-regalis-gold uppercase block">Our Attorneys</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-regalis-navy dark:text-white leading-tight">
            Meet Our Experienced Legal Expert Team
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans max-w-2xl mx-auto">
            Our lawyers combine courtroom excellence, negotiation prowess, and deep regulatory expertise to protect your interests.
          </p>
        </div>

        {/* Attorneys Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              {/* Premium Initials Badge in Place of Image */}
              <div className="relative h-64 w-full bg-gradient-to-br from-regalis-navy to-slate-900 dark:from-regalis-navy/60 dark:to-slate-950 flex flex-col items-center justify-center overflow-hidden border-b border-slate-250 dark:border-slate-850">
                {/* Background scales grid effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-regalis-gold/10 via-transparent to-transparent opacity-60"></div>
                <div className="absolute text-[120px] font-serif font-bold text-white/[0.02] tracking-tighter pointer-events-none select-none">
                  {member.initials}
                </div>
                
                {/* Visual Circle Monogram */}
                <div className="relative h-28 w-28 rounded-full bg-slate-900/60 dark:bg-slate-950/60 border border-regalis-gold/20 flex items-center justify-center text-3xl font-serif font-bold text-regalis-gold shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  {member.initials}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-8 w-8 rounded bg-slate-900/90 border border-regalis-gold/25 flex items-center justify-center text-regalis-gold hover:bg-regalis-gold hover:text-white transition duration-200 cursor-pointer text-xs font-bold">In</div>
                  <div className="h-8 w-8 rounded bg-slate-900/90 border border-regalis-gold/25 flex items-center justify-center text-regalis-gold hover:bg-regalis-gold hover:text-white transition duration-200 cursor-pointer text-xs font-bold">Tw</div>
                </div>
              </div>

              {/* Text Meta Info */}
              <div className="p-6 text-center space-y-1 relative z-10 bg-white dark:bg-slate-900">
                <h4 className="text-lg font-serif font-bold text-regalis-navy dark:text-white group-hover:text-regalis-gold transition-colors duration-300">
                  {member.name}
                </h4>
                <p className="text-xs text-regalis-gold font-bold uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                  {member.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. PROVEN APPROACH TO LEGAL SUCCESS (Workflow) */}
      <section className="relative py-20 bg-regalis-bg-light/60 dark:bg-slate-900/30 border-t border-b border-slate-200/50 dark:border-slate-800/60 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-regalis-gold uppercase block">Our Methodology</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-regalis-navy dark:text-white leading-tight">
              Proven Approach to Legal Success
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
              We employ a structured, three-step methodology to guide your case from initial evaluation to positive resolution.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Step 1 */}
            <div className="text-center space-y-4 relative group">
              <div className="relative h-20 w-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center mx-auto text-regalis-gold font-serif text-3xl font-bold shadow-md group-hover:border-regalis-gold/40 group-hover:shadow-regalis-gold/5 transition-all duration-300">
                01
              </div>
              <h3 className="text-xl font-serif font-bold text-regalis-navy dark:text-white">
                Case Evaluation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-sans max-w-xs mx-auto">
                Detailed gathering of case facts, records discovery, legal research, and initial assessment of all viable defense or settlement options.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4 relative group">
              <div className="relative h-20 w-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center mx-auto text-regalis-gold font-serif text-3xl font-bold shadow-md group-hover:border-regalis-gold/40 group-hover:shadow-regalis-gold/5 transition-all duration-300">
                02
              </div>
              <h3 className="text-xl font-serif font-bold text-regalis-navy dark:text-white">
                Strategy Development
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-sans max-w-xs mx-auto">
                Crafting a highly customized defense or litigation plan, selecting specialized expert witnesses, and mapping arguments with precision.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4 relative group">
              <div className="relative h-20 w-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center mx-auto text-regalis-gold font-serif text-3xl font-bold shadow-md group-hover:border-regalis-gold/40 group-hover:shadow-regalis-gold/5 transition-all duration-300">
                03
              </div>
              <h3 className="text-xl font-serif font-bold text-regalis-navy dark:text-white">
                Case Resolution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-sans max-w-xs mx-auto">
                Fierce representation in litigation, strategic settlement negotiations in mediation, or final administrative case closure.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED LEGAL QUESTIONS (FAQ Accordion) */}
      <section id="faqs" className="relative py-20 md:py-28 max-w-7xl mx-auto px-6 z-10">
        
        {/* Glow */}
        <div className="absolute top-1/3 right-10 w-90 h-90 bg-regalis-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* FAQ Left Block */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <span className="text-[10px] font-bold tracking-widest text-regalis-gold uppercase block">Got Questions?</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-regalis-navy dark:text-white leading-tight">
              Frequently Asked Legal Questions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-450 font-sans leading-relaxed">
              Find answers to general inquiries regarding representation, consultation scheduling, pricing disclosures, and retainer plans.
            </p>
            <div className="p-6 bg-regalis-bg-light dark:bg-slate-900/50 rounded-xl border border-slate-200/50 dark:border-slate-800 inline-block text-left w-full">
              <p className="text-xs font-bold text-regalis-navy dark:text-white">Still need assistance?</p>
              <p className="text-xs text-slate-500 mt-1">Get custom responses on your files instantly.</p>
              <Button
                as={Link}
                href="/#contact"
                radius="sm"
                className="mt-4 font-bold text-xs bg-regalis-navy text-white hover:bg-slate-800 dark:bg-regalis-gold dark:hover:bg-regalis-gold-hover w-full h-9 transition cursor-pointer"
              >
                Send Us Message
              </Button>
            </div>
          </div>

          {/* Accordion Right Block */}
          <div className="lg:col-span-8 space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900/40 border border-slate-200/55 dark:border-slate-800/80 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-base font-serif font-bold text-regalis-navy dark:text-white hover:text-regalis-gold transition-colors focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-regalis-gold">0{idx+1}</span>
                      <span>{faq.q}</span>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <div className="h-6 w-6 rounded bg-regalis-gold/10 text-regalis-gold flex items-center justify-center">-</div>
                      ) : (
                        <div className="h-6 w-6 rounded bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center">+</div>
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-850 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* 8. CONFIDENTIAL CONSULTATION FORM SECTION */}
      <section id="contact" className="relative py-20 md:py-28 bg-regalis-bg-light/40 dark:bg-slate-900/20 border-t border-slate-200/50 dark:border-slate-850/60 transition-colors duration-300 z-10">
        
        {/* Glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-regalis-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl p-8 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-regalis-gold/5 to-transparent rounded-tr-2xl pointer-events-none"></div>
            
            {/* Header */}
            <div className="text-center space-y-2 mb-10">
              <span className="text-[10px] font-bold tracking-widest text-regalis-gold uppercase block">Book Appointment</span>
              <h2 className="text-3xl font-serif font-bold text-regalis-navy dark:text-white">
                Schedule a Free Confidential Consultation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-sans">
                Fill out the secure intake form below. An intake manager will review your submission and connect you with a specialized partner.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  required
                  placeholder="Enter name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  radius="sm"
                  classNames={{
                    inputWrapper: "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus-within:border-regalis-gold/40 text-slate-900 dark:text-white",
                    label: "text-slate-500 dark:text-slate-400 font-sans text-xs"
                  }}
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  placeholder="Enter email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  radius="sm"
                  classNames={{
                    inputWrapper: "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus-within:border-regalis-gold/40 text-slate-900 dark:text-white",
                    label: "text-slate-500 dark:text-slate-400 font-sans text-xs"
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  required
                  placeholder="Enter phone"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  radius="sm"
                  classNames={{
                    inputWrapper: "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus-within:border-regalis-gold/40 text-slate-900 dark:text-white",
                    label: "text-slate-500 dark:text-slate-400 font-sans text-xs"
                  }}
                />
                
                {/* Custom dropdown since @heroui/select might be tricky */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 dark:text-slate-400 font-sans text-[11px] font-semibold pl-0.5">
                    Practice Specialty
                  </label>
                  <select
                    className="h-10 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs focus:outline-none focus:border-regalis-gold/40 transition-colors"
                    value={bookingForm.practice}
                    onChange={(e) => setBookingForm({ ...bookingForm, practice: e.target.value })}
                  >
                    <option value="corporate-law">Corporate Law</option>
                    <option value="criminal-defense">Criminal Defense</option>
                    <option value="family-law">Family Law</option>
                    <option value="personal-injury">Personal Injury</option>
                    <option value="employment-law">Employment Law</option>
                    <option value="real-estate-law">Real Estate Law</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Input
                  label="Preferred Date"
                  type="date"
                  required
                  placeholder="Select Date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  radius="sm"
                  classNames={{
                    inputWrapper: "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus-within:border-regalis-gold/40 text-slate-900 dark:text-white",
                    label: "text-slate-500 dark:text-slate-400 font-sans text-xs"
                  }}
                />
                <Textarea
                  label="Intake Details / Message"
                  placeholder="Provide brief details about your legal matter..."
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  radius="sm"
                  rows={4}
                  classNames={{
                    inputWrapper: "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus-within:border-regalis-gold/40 text-slate-900 dark:text-white",
                    label: "text-slate-500 dark:text-slate-400 font-sans text-xs"
                  }}
                />
              </div>

              {isBooked ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-center text-xs font-bold animate-pulse flex items-center justify-center gap-2">
                  <Check size={16} />
                  <span>Success! Appointment request secure. An intake coordinator will contact you in 24 hours.</span>
                </div>
              ) : (
                <Button
                  type="submit"
                  radius="sm"
                  className="w-full font-bold text-sm bg-regalis-gold hover:bg-regalis-gold-hover text-white h-12 shadow-lg shadow-regalis-gold/25 transition duration-300 cursor-pointer"
                >
                  Submit Secure Consultation Request
                </Button>
              )}
            </form>

          </div>
        </div>
      </section>

      {/* 9. FLOATING INTERACTIVE DEMO CONTROL DRAWER */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Toggle Button */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`h-12 w-12 rounded-lg bg-regalis-navy text-regalis-gold hover:bg-slate-850 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 border border-regalis-gold/20 ${
            isDrawerOpen ? "rotate-90 bg-rose-500 text-white border-none" : ""
          }`}
          title="Open Live Demo Settings"
        >
          {isDrawerOpen ? <X size={20} /> : <Settings className="animate-spin duration-1000" size={20} />}
        </button>

        {/* Settings Card */}
        {isDrawerOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-slate-950 shadow-2xl p-5 z-50 border border-slate-200 dark:border-slate-850 animate-in fade-in slide-in-from-bottom-5 duration-300 rounded-xl">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3 mb-4">
              <Sparkles size={16} className="text-regalis-gold" />
              <h4 className="text-sm font-bold text-regalis-navy dark:text-white font-serif">Live Demo Settings</h4>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-sans">
              Use these simulated inputs to test Navbar dashboard menus and roles (Client, Lawyer, Admin) sync.
            </p>

            <div className="space-y-4">
              {/* Auth Toggle */}
              <div className="flex items-center justify-between bg-slate-55/60 dark:bg-slate-900/60 p-2.5 rounded border border-slate-150 dark:border-slate-850">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Session Status</span>
                <Button
                  size="sm"
                  color={demoLogin ? "success" : "default"}
                  radius="sm"
                  className="font-bold text-[10px] h-7"
                  onClick={toggleDemoLogin}
                >
                  {demoLogin ? "Signed In" : "Signed Out"}
                </Button>
              </div>

              {/* Role Selection */}
              {demoLogin && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 pl-1 block">
                    Choose Active Role
                  </span>
                  <div className="grid grid-cols-3 gap-2 bg-slate-55/60 dark:bg-slate-900/60 p-1.5 rounded border border-slate-150 dark:border-slate-850">
                    {["client", "lawyer", "admin"].map((r) => (
                      <button
                        key={r}
                        onClick={() => changeDemoRole(r)}
                        className={`text-[10px] font-bold py-1.5 px-2 rounded capitalize transition cursor-pointer ${
                          demoRole === r
                            ? "bg-regalis-gold text-white shadow-md"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[10px] text-slate-450 dark:text-slate-500 italic pl-1 font-sans">
                * Syncing auth states across modules in real-time.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
