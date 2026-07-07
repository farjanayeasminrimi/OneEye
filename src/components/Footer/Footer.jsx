"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Send,
  CheckCircle,
  Scale,
  Shield,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Button, Input } from "@heroui/react";

// Custom inline SVG icons matching Lucide design style
const FacebookIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Please enter an email address.");
      return;
    }
    
    // Basic regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setIsSubscribed(true);
    setEmail("");
    
    // Auto reset success message after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  const socialLinks = [
    { icon: <FacebookIcon size={18} />, href: "https://facebook.com", name: "Facebook" },
    { icon: <TwitterIcon size={18} />, href: "https://twitter.com", name: "Twitter" },
    { icon: <InstagramIcon size={18} />, href: "https://instagram.com", name: "Instagram" },
    { icon: <LinkedinIcon size={18} />, href: "https://linkedin.com", name: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/#about" },
    { name: "Practice Areas", href: "/#practice-areas" },
    { name: "Case Studies", href: "/#case-studies" },
    { name: "FAQs", href: "/#faqs" },
  ];

  const practiceLinks = [
    { name: "Personal Injury", href: "/#practice-areas" },
    { name: "Criminal Defense", href: "/#practice-areas" },
    { name: "Family Law", href: "/#practice-areas" },
    { name: "Employment Law", href: "/#practice-areas" },
    { name: "Real Estate Law", href: "/#practice-areas" },
    { name: "Corporate Law", href: "/#practice-areas" },
  ];

  return (
    <footer className="relative bg-regalis-navy text-slate-300 border-t border-white/10 pt-16 pb-8 transition-colors duration-300">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-regalis-gold/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
        
        {/* COLUMN 1: BRAND */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl border border-regalis-gold/20 bg-white/10 dark:bg-slate-900/40 flex items-center justify-center text-regalis-gold backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
              <Scale size={20} className="text-regalis-gold" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-tight text-white transition-colors">
                Regalis
              </span>
              <span className="text-[9px] tracking-widest font-bold uppercase text-regalis-gold -mt-1 transition-colors">
                Law Firm
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed pt-2 font-sans">
            We provide trusted legal representation with a strategic approach, delivering clear guidance, strong advocacy, and reliable solutions for businesses and individuals seeking long-term legal confidence.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-3 pt-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="h-9 w-9 rounded-lg bg-white/5 text-slate-300 flex items-center justify-center border border-white/10 hover:bg-regalis-gold hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-regalis-gold/20"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS */}
        <div className="space-y-4">
          <h3 className="text-white font-serif font-bold tracking-wide text-base transition-colors">Quick Links</h3>
          <ul className="space-y-2.5 text-xs font-sans">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-regalis-gold transition-colors duration-200 flex items-center gap-1 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-regalis-gold/50 group-hover:bg-regalis-gold scale-0 group-hover:scale-100 transition-all duration-300"></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3: PRACTICE AREAS */}
        <div className="space-y-4">
          <h3 className="text-white font-serif font-bold tracking-wide text-base transition-colors">Practice Areas</h3>
          <ul className="space-y-2.5 text-xs font-sans">
            {practiceLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-regalis-gold transition-colors duration-200 flex items-center gap-1 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-regalis-gold/50 group-hover:bg-regalis-gold scale-0 group-hover:scale-100 transition-all duration-300"></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 4: NEWSLETTER & CONTACT */}
        <div className="space-y-4">
          <h3 className="text-white font-serif font-bold tracking-wide text-base transition-colors">Stay Updated</h3>
          <p className="text-xs text-slate-400 font-sans">
            Subscribe to our legal bulletins and practice analysis briefs.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
            <div className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="Enter email address"
                  size="sm"
                  radius="sm"
                  className="w-full"
                  classNames={{
                    inputWrapper: "bg-white/5 hover:bg-white/10 border border-white/10 text-white focus-within:border-regalis-gold/45",
                    input: "placeholder:text-slate-500 text-xs"
                  }}
                />
                <Button
                  isIconOnly
                  type="submit"
                  size="sm"
                  radius="sm"
                  className="absolute right-1.5 bg-regalis-gold text-white hover:bg-regalis-gold-hover transition duration-200 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send size={14} />
                </Button>
              </div>
              
              {errorMsg && (
                <p className="text-rose-400 text-[10px] font-medium pl-1 animate-pulse">
                  {errorMsg}
                </p>
              )}
            </div>
          </form>

          {isSubscribed && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-2.5 rounded text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CheckCircle size={16} />
              <span>Thank you! Subscribed successfully.</span>
            </div>
          )}

          <div className="pt-4 text-xs space-y-2.5 border-t border-white/10 text-slate-400 font-sans">
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-regalis-gold" />
              <span>contact@regalislegal.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-regalis-gold" />
              <span>+1 (800) REGALIS-LAW</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-regalis-gold" />
              <span>100 Law Firm Plaza, Suite 400, NY</span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-450 relative z-10 font-sans">
        <p>© {new Date().getFullYear()} Regalis Law Firm. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Shield size={14} className="text-regalis-gold" />
            <span>Secure Encryption</span>
          </div>
          <span>Disclaimer: Regalis is a professional legal partnership.</span>
        </div>
      </div>
    </footer>
  );
}
