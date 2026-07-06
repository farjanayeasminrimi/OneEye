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
    { name: "About Us", href: "/about" },
    { name: "Browse Lawyers", href: "/lawyers" },
    { name: "Contact & Support", href: "/contact" },
    { name: "Legal Advisory Board", href: "/advisory" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Preferences", href: "/cookies" },
    { name: "Disclaimers", href: "/disclaimers" },
  ];

  return (
    <footer className="relative bg-slate-100/70 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/[0.05] pt-16 pb-8 transition-colors duration-300 backdrop-blur-md">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
        
        {/* COLUMN 1: BRAND */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl border border-slate-200 dark:border-white/10 bg-white/10 dark:bg-slate-900/40 flex items-center justify-center text-slate-800 dark:text-white backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
              <Scale size={18} className="text-indigo-650 dark:text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white transition-colors">
                One<span className="font-semibold text-indigo-650 dark:text-indigo-400">Eye</span>
              </span>
              <span className="text-[8px] tracking-widest font-bold uppercase text-slate-400 dark:text-slate-500 -mt-1 transition-colors">
                Legal Hub
              </span>
            </div>
          </Link>
          <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed pt-2">
            Empowering citizens and corporates with state-of-the-art legal solutions. Connecting you with elite legal advocates and legal protection tools.
          </p>
          {/* Socials - Unified monochromatic hover */}
          <div className="flex items-center gap-3 pt-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-350 flex items-center justify-center border border-slate-300/40 dark:border-slate-800/60 hover:bg-slate-300/60 dark:hover:bg-slate-800/80 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS */}
        <div className="space-y-4">
          <h3 className="text-slate-900 dark:text-white font-bold tracking-wide text-base transition-colors">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/50 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-455 scale-0 group-hover:scale-100 transition-all duration-300"></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3: LEGAL POLICIES */}
        <div className="space-y-4">
          <h3 className="text-slate-900 dark:text-white font-bold tracking-wide text-base transition-colors">Legal Info</h3>
          <ul className="space-y-2.5 text-sm">
            {legalLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/50 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-455 scale-0 group-hover:scale-100 transition-all duration-300"></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 4: NEWSLETTER & CONTACT */}
        <div className="space-y-4">
          <h3 className="text-slate-900 dark:text-white font-bold tracking-wide text-base transition-colors">Stay Updated</h3>
          <p className="text-sm text-slate-550 dark:text-slate-400">
            Subscribe to our legal bulletins and analysis reports.
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
                  radius="lg"
                  className="w-full"
                  classNames={{
                    inputWrapper: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-200",
                    input: "placeholder:text-slate-400 dark:placeholder:text-slate-550 text-xs"
                  }}
                />
                <Button
                  isIconOnly
                  type="submit"
                  size="sm"
                  radius="lg"
                  className="absolute right-1.5 bg-indigo-600 text-white hover:bg-indigo-550 transition duration-200 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send size={14} />
                </Button>
              </div>
              
              {errorMsg && (
                <p className="text-rose-500 text-xs font-medium pl-1 animate-pulse">
                  {errorMsg}
                </p>
              )}
            </div>
          </form>

          {isSubscribed && (
            <div className="flex items-center gap-2 bg-emerald-550/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-2.5 rounded-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CheckCircle size={16} />
              <span>Thank you! Subscribed successfully.</span>
            </div>
          )}

          <div className="pt-2 text-xs space-y-2 border-t border-slate-200 dark:border-slate-900 text-slate-450 dark:text-slate-550">
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-indigo-500/75 dark:text-indigo-400/75" />
              <span>contact@oneeyelegal.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-indigo-500/75 dark:text-indigo-400/75" />
              <span>+1 (800) ONE-EYE-99</span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 dark:border-slate-900 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 relative z-10">
        <p>© {new Date().getFullYear()} OneEye. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div className="flex items-center gap-1.5">
            <Shield size={14} className="text-indigo-500/70" />
            <span>Secure SSL Encryption</span>
          </div>
          <span>Disclaimer: OneEye is a connection portal, not a law firm.</span>
        </div>
      </div>
    </footer>
  );
}
