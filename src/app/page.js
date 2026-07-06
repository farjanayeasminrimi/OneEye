"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
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
  Eye,
  Star,
  CheckCircle,
  Award,
  Globe,
  Plus,
  X
} from "lucide-react";

// Specialties data for the carousel
const specialties = [
  {
    title: "Criminal Defense",
    icon: <Gavel size={24} />,
    desc: "Robust protection of rights under criminal investigations, trials, white collar cases, or appeals.",
    focus: ["Trial Advocacy", "White Collar", "Appellate Law"],
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
  },
  {
    title: "Corporate & Tech",
    icon: <Briefcase size={24} />,
    desc: "Strategic corporate counseling, transactional due diligence, M&As, compliance, and venture funding.",
    focus: ["Mergers & Acquisitions", "Startups & VC", "Compliance"],
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
  },
  {
    title: "Intellectual Property",
    icon: <Shield size={24} />,
    desc: "Securing global patent prosecution, trademark registration, copy protection, and licensing deals.",
    focus: ["Patent Filings", "IP Litigation", "Licensing"],
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
  },
  {
    title: "Family & Estate Law",
    icon: <Users size={24} />,
    desc: "Compassionate advice on estate planning, custody agreements, wills, trusts, and marriage contracts.",
    focus: ["Wills & Trusts", "Guardianship", "Asset Divestment"],
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
  },
  {
    title: "Cyber & Data Privacy",
    icon: <Lock size={24} />,
    desc: "Expert guidelines on GDPR, CCPA compliances, breach response strategies, and security auditing.",
    focus: ["GDPR Audits", "Data Breach", "Liability Ins."],
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
  },
  {
    title: "Maritime & Trade",
    icon: <Globe size={24} />,
    desc: "Advising on cargo disputes, international waters regulation, border clearances, and tariffs.",
    focus: ["Admiralty Claims", "Customs", "Supply Chain"],
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
  }
];

const heroSlides = [
  {
    badge: "THE PREMIER LEGAL PROTECTION PORTAL",
    title: (
      <>
        Elite Corporate Law, <br />
        <span className="bg-gradient-to-r from-indigo-550 via-indigo-650 to-violet-650 dark:from-indigo-400 dark:via-indigo-500 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-sm">
          Made Transparent.
        </span>
      </>
    ),
    desc: "OneEye links startup founders and enterprise leaders directly with verified business attorneys. Secure contracts, compliance audits, and tech licensing trials.",
    primaryBtn: "Browse Tech Lawyers",
    primaryHref: "/lawyers?specialty=corporate",
    secondaryBtn: "Schedule Consultation",
    stats: [
      { value: "99.4%", label: "Case Success" },
      { value: "500+", label: "Elite Lawyers" },
      { value: "10k+", label: "Consults Held" }
    ],
    rightCard: {
      accentColor: "indigo",
      icon: <Briefcase className="text-white" size={28} />,
      badge: "M&A Verified Score",
      title: "Strategic Security",
      desc: "Instant metrics tracking of contract negotiations and IP compliance.",
      statusText: "72 Tech Counsels Active",
      stageText: "STAGE v3.1"
    }
  },
  {
    badge: "24/7 CRIMINAL RIGHTS ADVOCACY",
    title: (
      <>
        Top Criminal Defense, <br />
        <span className="bg-gradient-to-r from-indigo-550 via-indigo-650 to-violet-650 dark:from-indigo-400 dark:via-indigo-500 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-sm">
          When It Matters Most.
        </span>
      </>
    ),
    desc: "Robust rights protection during trials, government investigations, or white-collar disputes. Connect directly with board-certified courtroom defense specialists.",
    primaryBtn: "Browse Trial Lawyers",
    primaryHref: "/lawyers?specialty=criminal",
    secondaryBtn: "Emergency Consult",
    stats: [
      { value: "98.7%", label: "Trial Rating" },
      { value: "150+", label: "Trial Advocates" },
      { value: "5k+", label: "Hearings Won" }
    ],
    rightCard: {
      accentColor: "indigo",
      icon: <Gavel className="text-white" size={28} />,
      badge: "Courtroom Verified",
      title: "Absolute Protection",
      desc: "Instant access to criminal defense hotlines and real-time trial briefs.",
      statusText: "48 Defense Lawyers Active",
      stageText: "STAGE v3.1"
    }
  },
  {
    badge: "GLOBAL INTELLECTUAL PROPERTY SHIELD",
    title: (
      <>
        Secure Global Patents & <br />
        <span className="bg-gradient-to-r from-indigo-550 via-indigo-650 to-violet-650 dark:from-indigo-400 dark:via-indigo-500 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-sm">
          Trademarks Instantly.
        </span>
      </>
    ),
    desc: "Protecting proprietary algorithms, designs, and brands globally. Direct access to patent prosecutors and litigation teams with transparent escrow pricing.",
    primaryBtn: "Browse IP Lawyers",
    primaryHref: "/lawyers?specialty=ip",
    secondaryBtn: "Check Trademark",
    stats: [
      { value: "99.9%", label: "Patent Approval" },
      { value: "200+", label: "IP Specialists" },
      { value: "15k+", label: "Audited Filings" }
    ],
    rightCard: {
      accentColor: "indigo",
      icon: <Shield className="text-white" size={28} />,
      badge: "USPTO Registry Verified",
      title: "Proprietary Defense",
      desc: "Real-time monitoring of brand infringements and active patent actions.",
      statusText: "56 Patent Advocates Active",
      stageText: "STAGE v3.1"
    }
  }
];

export default function Home() {
  // Hero Carousel State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [heroAutoplay, setHeroAutoplay] = useState(true);

  // Specialties Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const specialtiesAutoplayRef = useRef(null);

  // Demo Auth Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [demoLogin, setDemoLogin] = useState(true);
  const [demoRole, setDemoRole] = useState("lawyer");

  // Sync State on mount
  useEffect(() => {
    // Load initial states
    const storedLogin = localStorage.getItem("oneeye-logged-in");
    const storedRole = localStorage.getItem("oneeye-role");
    if (storedLogin !== null) setDemoLogin(storedLogin === "true");
    if (storedRole !== null) setDemoRole(storedRole);

    // Responsive slides calculator for specialties carousel
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Custom Event Listener to sync state from elsewhere if modified
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

  // Specialties Autoplay handler
  useEffect(() => {
    startSpecialtiesAutoplay();
    return () => stopSpecialtiesAutoplay();
  }, [slidesToShow, activeSlide]);

  const startSpecialtiesAutoplay = () => {
    stopSpecialtiesAutoplay();
    specialtiesAutoplayRef.current = setInterval(() => {
      nextSpecialtySlide();
    }, 5000);
  };

  const stopSpecialtiesAutoplay = () => {
    if (specialtiesAutoplayRef.current) {
      clearInterval(specialtiesAutoplayRef.current);
    }
  };

  const nextSpecialtySlide = () => {
    setActiveSlide((prev) => {
      const maxIndex = specialties.length - slidesToShow;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSpecialtySlide = () => {
    setActiveSlide((prev) => {
      const maxIndex = specialties.length - slidesToShow;
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

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden pb-16 transition-colors duration-300">
      
      {/* GLOWING AMBIENT BACKGROUNDS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/10 to-violet-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[40vh] right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-violet-500/5 to-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      {/* 1. HERO BANNER SECTION (Carousel with Autoplay) */}
      <section 
        className="relative pt-36 md:pt-44 pb-16 md:pb-24 max-w-7xl mx-auto px-6 z-10"
        onMouseEnter={() => setHeroAutoplay(false)}
        onMouseLeave={() => setHeroAutoplay(true)}
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.05] text-xs font-bold tracking-wide text-indigo-650 dark:text-indigo-400">
                  <Sparkles size={14} className="animate-spin duration-300" />
                  <span>{heroSlides[currentHeroSlide].badge}</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  {heroSlides[currentHeroSlide].title}
                </h1>
                
                <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {heroSlides[currentHeroSlide].desc}
                </p>
                
                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Button
                    as={Link}
                    href={heroSlides[currentHeroSlide].primaryHref}
                    radius="full"
                    className="w-full sm:w-auto font-bold text-sm bg-indigo-600 hover:bg-indigo-550 text-white px-8 h-12 shadow-lg shadow-indigo-500/20 transition duration-300"
                    endContent={<ArrowRight size={16} />}
                  >
                    {heroSlides[currentHeroSlide].primaryBtn}
                  </Button>
                  <Button
                    radius="full"
                    variant="bordered"
                    className="w-full sm:w-auto font-bold text-sm border-slate-350 dark:border-slate-800/80 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 h-12 px-8 transition duration-300"
                  >
                    {heroSlides[currentHeroSlide].secondaryBtn}
                  </Button>
                </div>

                {/* Stats Banner */}
                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-slate-900/80 max-w-lg mx-auto lg:mx-0">
                  {heroSlides[currentHeroSlide].stats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Right Visual Glass Dashboard (Unified Minimalist Theme) */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-3xl glass-effect-light dark:glass-effect p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                  
                  {/* Outer decorative ring depending on accent color */}
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start relative z-10">
                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg bg-indigo-650 shadow-indigo-500/10">
                      {heroSlides[currentHeroSlide].rightCard.icon}
                    </div>
                    <div className="bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Star size={12} className="fill-indigo-500 text-indigo-500" />
                      <span>{heroSlides[currentHeroSlide].rightCard.badge}</span>
                    </div>
                  </div>

                  {/* Center Crest Visual */}
                  <div className="my-auto flex flex-col items-center justify-center text-center relative z-10 py-6">
                    <div className="relative mb-4">
                      <div className="absolute -inset-1 rounded-full opacity-30 bg-indigo-500 blur-md animate-pulse"></div>
                      <div className="relative h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center">
                        <Eye className="animate-pulse duration-1000 text-indigo-500" size={32} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {heroSlides[currentHeroSlide].rightCard.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[250px]">
                      {heroSlides[currentHeroSlide].rightCard.desc}
                    </p>
                  </div>

                  {/* Card Footer info */}
                  <div className="flex justify-between items-center border-t border-slate-250 dark:border-slate-800/80 pt-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {heroSlides[currentHeroSlide].rightCard.statusText}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                      {heroSlides[currentHeroSlide].rightCard.stageText}
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Hero Carousel Slide Controls */}
          <div className="flex items-center justify-between mt-10 max-w-7xl mx-auto z-20 relative">
            <div className="flex gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentHeroSlide === idx ? "w-8 bg-indigo-650" : "w-2 bg-slate-355 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentHeroSlide((prev) => (prev <= 0 ? heroSlides.length - 1 : prev - 1))}
                className="h-10 w-10 rounded-full border border-slate-250 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                className="h-10 w-10 rounded-full border border-slate-250 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANNER / SPECIALTIES CAROUSEL SECTION */}
      <section className="relative py-20 bg-slate-100/50 dark:bg-slate-950/40 border-t border-b border-slate-250 dark:border-slate-900 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Our Legal Focus Specialties
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl">
                Browse elite defense teams and counselors organized by domains of international and domestic laws.
              </p>
            </div>
            
            {/* Arrows */}
            <div className="flex justify-center gap-3 mt-6 md:mt-0">
              <button
                onClick={prevSpecialtySlide}
                className="h-11 w-11 rounded-full border border-slate-250 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSpecialtySlide}
                className="h-11 w-11 rounded-full border border-slate-250 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Next slide"
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
                transform: `translateX(calc(-${activeSlide} * (100% + 24px) / ${slidesToShow}))`
              }}
            >
              {specialties.map((spec, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  onMouseEnter={stopSpecialtiesAutoplay}
                  onMouseLeave={startSpecialtiesAutoplay}
                >
                  <div className="group relative h-full glass-effect-light dark:glass-effect rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer">
                    
                    {/* Corner Highlight */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-tr-2xl pointer-events-none"></div>

                    {/* Icon Box */}
                    <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center text-indigo-650 dark:text-indigo-400 group-hover:text-indigo-550 group-hover:border-indigo-500/30 transition duration-350 mb-6">
                      {spec.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {spec.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                      {spec.desc}
                    </p>

                    {/* Focus Points List */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-200/65 dark:border-slate-800/60">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
                        Primary Fields
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {spec.focus.map((item, keyIdx) => (
                          <span
                            key={keyIdx}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${spec.badgeColor}`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: specialties.length - slidesToShow + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx ? "w-6 bg-indigo-600" : "w-1.5 bg-slate-350 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. ADDITIONAL TRUST & CREDIBILITY SECTIONS */}
      <section className="py-20 max-w-7xl mx-auto px-6 z-10 relative">
        <div className="glass-effect-light dark:glass-effect rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Our Guarantee of Professional Excellence
              </h2>
              <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                Before admitting a legal expert to the OneEye network, our compliance board verifies credentials, history of malpractice claims, board certifications, and billing ethics. Only the top 5% of applicants are verified.
              </p>
              
              <ul className="space-y-3.5">
                {[
                  "Mandatory 10-year background audits",
                  "Verified trial record analytics & success metrics",
                  "Fixed fee pricing model & hourly escrow transparency",
                  "Encrypted multi-party communication portal"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-indigo-650 dark:text-indigo-400 flex-shrink-0" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 text-center">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                  <Award size={20} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Top Rating</h4>
                <p className="text-xs text-slate-500 mt-1">Superlawyers certified advocates</p>
              </div>

              <div className="bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 text-center">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                  <Lock size={20} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Encrypted</h4>
                <p className="text-xs text-slate-500 mt-1">Attorney-client privilege secured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLOATING INTERACTIVE DEMO CONTROL DRAWER */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Toggle Button */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`h-12 w-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ${
            isDrawerOpen ? "rotate-90 bg-rose-500 text-white" : ""
          }`}
          title="Open Live Demo Settings"
        >
          {isDrawerOpen ? <X size={20} /> : <Settings className="animate-spin duration-1000" size={20} />}
        </button>

        {/* Settings Card */}
        {isDrawerOpen && (
          <div className="absolute bottom-16 right-0 w-80 glass-effect-light dark:glass-effect shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 rounded-2xl">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
              <Sparkles size={16} className="text-indigo-550 dark:text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Live Demo Configuration</h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Use these switches to instantly test how the transparent Navbar adapts to user sessions and roles.
            </p>

            <div className="space-y-4">
              {/* Auth Toggle */}
              <div className="flex items-center justify-between bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/80">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">User Session</span>
                <Button
                  size="sm"
                  color={demoLogin ? "success" : "default"}
                  radius="lg"
                  className="font-bold text-[10px] h-7"
                  onClick={toggleDemoLogin}
                >
                  {demoLogin ? "Signed In" : "Signed Out"}
                </Button>
              </div>

              {/* Role Selection */}
              {demoLogin && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-550 dark:text-slate-400 pl-1 block">
                    Choose Role Menu
                  </span>
                  <div className="grid grid-cols-3 gap-2 bg-slate-100/50 dark:bg-slate-950/60 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/80">
                    {["client", "lawyer", "admin"].map((r) => (
                      <button
                        key={r}
                        onClick={() => changeDemoRole(r)}
                        className={`text-[10px] font-bold py-1.5 px-2 rounded-lg capitalize transition cursor-pointer ${
                          demoRole === r
                            ? "bg-indigo-650 text-white shadow-md"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[10px] text-slate-550 italic pl-1">
                * Simulated states sync across Navbar instantly.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
