"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { Button, Input } from "@heroui/react";
import {
  Menu,
  X,
  Search,
  Scale,
  ChevronDown,
  Sun,
  Moon,
  ShieldAlert
} from "lucide-react";

// Mock lawyers database for simulated search autocomplete matching page.js
const mockLawyers = [
  { name: "Sarah Jenkins", specialty: "Criminal Defense", rating: "4.9", area: "New York" },
  { name: "David Vance", specialty: "Corporate Law", rating: "4.8", area: "San Francisco" },
  { name: "Michael Chang", specialty: "Intellectual Property", rating: "5.0", area: "Seattle" },
  { name: "Rebecca Martinez", specialty: "Family Law", rating: "4.7", area: "Miami" },
  { name: "James Wilson", specialty: "Real Estate Law", rating: "4.9", area: "Austin" },
  { name: "Elena Rostova", specialty: "International Law", rating: "4.8", area: "Boston" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Simulated Auth and Role States
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [role, setRole] = useState("lawyer"); // client | lawyer | admin

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Custom Dropdown State
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync state with localStorage/custom events for interactive demo
  useEffect(() => {
    setMounted(true);

    const loadAuthState = () => {
      if (typeof window !== "undefined") {
        const storedLogin = localStorage.getItem("oneeye-logged-in");
        const storedRole = localStorage.getItem("oneeye-role");
        
        if (storedLogin !== null) {
          setIsLoggedIn(storedLogin === "true");
        }
        if (storedRole !== null) {
          setRole(storedRole);
        }
      }
    };

    loadAuthState();

    const handleAuthChange = () => {
      loadAuthState();
    };

    window.addEventListener("oneeye-auth-change", handleAuthChange);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    // Close autocomplete & dropdown on click outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("oneeye-auth-change", handleAuthChange);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle simulated search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = mockLawyers.filter(
      (lawyer) =>
        lawyer.name.toLowerCase().includes(query) ||
        lawyer.specialty.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  // Auth Toggle actions
  const handleAuthToggle = () => {
    const newState = !isLoggedIn;
    setIsLoggedIn(newState);
    localStorage.setItem("oneeye-logged-in", String(newState));
    window.dispatchEvent(new Event("oneeye-auth-change"));
  };

  // Define Dashboard links based on role
  const dashboardMenus = {
    client: [
      { name: "My Bookings", href: "/dashboard/bookings", desc: "Manage consultations" },
      { name: "Saved Lawyers", href: "/dashboard/saved", desc: "Your favorite advocates" },
      { name: "Profile Settings", href: "/dashboard/profile", desc: "Personal settings" },
    ],
    lawyer: [
      { name: "Appointments", href: "/dashboard/appointments", desc: "Client meetings calendar" },
      { name: "My Services", href: "/dashboard/services", desc: "Customize legal packages" },
      { name: "Earnings & Wallet", href: "/dashboard/wallet", desc: "View payments" },
    ],
    admin: [
      { name: "Platform Stats", href: "/dashboard/stats", desc: "User & income insights" },
      { name: "Manage Users", href: "/dashboard/users", desc: "Control accounts" },
      { name: "Pending Approvals", href: "/dashboard/approvals", desc: "Verify new lawyers" },
    ],
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Practice Areas", href: "/#practice-areas" },
    { name: "Case Studies", href: "/#case-studies" },
    { name: "About Us", href: "/#about" },
    { name: "FAQs", href: "/#faqs" },
  ];

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-regalis-bg-dark/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/[0.05] shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl border border-regalis-gold/20 bg-white/10 dark:bg-slate-900/40 flex items-center justify-center text-regalis-gold backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
            <Scale size={20} className="text-regalis-gold" />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-serif font-bold tracking-tight transition-colors duration-300 ${
              scrolled 
                ? "text-regalis-navy dark:text-white" 
                : "text-white"
            }`}>
              Regalis
            </span>
            <span className="text-[9px] tracking-widest font-bold uppercase text-regalis-gold -mt-1 transition-colors">
              Law Firm
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-sans font-medium tracking-wide transition-all duration-300 py-1 ${
                  active 
                    ? "text-regalis-gold" 
                    : scrolled 
                      ? "text-regalis-navy dark:text-slate-300 hover:text-regalis-gold dark:hover:text-regalis-gold" 
                      : "text-slate-200 hover:text-regalis-gold"
                }`}
              >
                {item.name}
                {active && (
                  <span className="absolute left-0 bottom-0 w-full h-[2px] rounded-full bg-regalis-gold animate-pulse"></span>
                )}
              </Link>
            );
          })}

          {/* Role-Based Dashboard Dropdown */}
          {isLoggedIn && (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 text-sm font-sans font-medium tracking-wide transition-all duration-300 py-1 focus:outline-none cursor-pointer ${
                  pathname.startsWith("/dashboard")
                    ? "text-regalis-gold"
                    : scrolled
                      ? "text-regalis-navy dark:text-slate-300 hover:text-regalis-gold dark:hover:text-regalis-gold"
                      : "text-slate-200 hover:text-regalis-gold"
                }`}
              >
                Dashboard
                <ChevronDown size={15} className={`mt-0.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Custom Glass Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-3 w-64 rounded-2xl glass-effect-light dark:glass-effect shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-1">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-regalis-gold animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Logged in as: {role}
                    </span>
                  </div>
                  {dashboardMenus[role].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-250 hover:bg-regalis-bg-light dark:hover:bg-slate-800/40 hover:text-regalis-gold dark:hover:text-regalis-gold transition-all duration-205 flex flex-col text-left group"
                    >
                      <span className="text-xs font-semibold">{item.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-regalis-gold/80 transition-colors">
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* RIGHT SIDE SECTION (Search, Segmented Theme Switcher, Auth Buttons) */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Autocomplete Search Bar */}
          <div ref={searchRef} className="relative w-64 flex justify-end">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search lawyers..."
              startContent={<Search size={15} className="text-slate-400 dark:text-slate-500" />}
              radius="full"
              size="sm"
              className={`w-48 transition-all duration-500 ${
                isSearchFocused ? "w-full" : ""
              }`}
              classNames={{
                inputWrapper: scrolled
                  ? "bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 hover:border-regalis-gold/30 dark:hover:border-regalis-gold/30"
                  : "bg-white/10 dark:bg-slate-950/30 border border-white/10 backdrop-blur-md text-white hover:bg-white/20",
                input: scrolled ? "text-slate-900 dark:text-white" : "text-white placeholder:text-slate-300",
              }}
            />

            {/* Simulated Search Dropdown */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute top-12 right-0 w-80 glass-effect-light dark:glass-effect shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider mb-2">
                  Matching Lawyers ({searchResults.length})
                </p>
                {searchResults.length > 0 ? (
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {searchResults.map((lawyer, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/40 cursor-pointer flex items-center justify-between transition-colors duration-200"
                        onClick={() => {
                          setSearchQuery(lawyer.name);
                          setIsSearchFocused(false);
                        }}
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {lawyer.name}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            {lawyer.specialty} • {lawyer.area}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold bg-regalis-gold/10 text-regalis-gold px-2 py-0.5 rounded-full">
                          ★ {lawyer.rating}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <ShieldAlert size={24} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">No lawyers found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Segmented Theme Selector */}
          <div className="flex items-center gap-0.5 bg-slate-100/80 dark:bg-slate-900/60 p-0.5 rounded-full border border-slate-200/50 dark:border-slate-800/85 backdrop-blur-md">
            <button
              onClick={() => setTheme("light")}
              className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                theme === "light"
                  ? "bg-white text-regalis-gold shadow-sm"
                  : scrolled
                    ? "text-slate-500 hover:text-slate-800"
                    : "text-slate-400 hover:text-white"
              }`}
              title="Light Theme"
              aria-label="Light Theme"
            >
              <Sun size={13} />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-950 text-regalis-gold shadow-sm"
                  : scrolled
                    ? "text-slate-500 hover:text-slate-850"
                    : "text-slate-400 hover:text-white"
              }`}
              title="Dark Theme"
              aria-label="Dark Theme"
            >
              <Moon size={13} />
            </button>
          </div>

          {/* Authentication & Booking Button */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button
                as={Link}
                href="/#contact"
                radius="full"
                className="font-bold text-xs px-5 h-9 bg-regalis-gold hover:bg-regalis-gold-hover text-white shadow-md shadow-regalis-gold/20 transition-all duration-300 cursor-pointer"
              >
                Book Appointment
              </Button>
              <Button
                radius="full"
                className="font-semibold text-xs px-4 h-9 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer"
                onClick={handleAuthToggle}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleAuthToggle}
                className={`font-semibold text-xs px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                  scrolled 
                    ? "text-slate-700 dark:text-slate-350 hover:text-regalis-gold" 
                    : "text-slate-200 hover:text-regalis-gold"
                }`}
              >
                Login
              </button>
              <Button
                radius="full"
                className="font-bold text-xs px-5 h-9 bg-regalis-gold hover:bg-regalis-gold-hover text-white shadow-lg shadow-regalis-gold/20 transition duration-300 cursor-pointer"
                onClick={handleAuthToggle}
              >
                Book Appointment
              </Button>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-1 focus:outline-none transition-colors duration-300 ${
            scrolled || menuOpen ? "text-slate-800 dark:text-white" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* MOBILE DRAWER MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white/98 dark:bg-regalis-bg-dark/98 backdrop-blur-xl border-slate-200/50 dark:border-white/[0.05] ${
          menuOpen ? "max-h-[100vh] border-b opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 space-y-6">
          {/* Mobile Search */}
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lawyers..."
              startContent={<Search size={16} className="text-slate-400" />}
              radius="full"
              size="md"
              classNames={{
                inputWrapper: "bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50",
              }}
            />
            {searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 max-h-48 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((lawyer, i) => (
                    <div
                      key={i}
                      className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between items-center text-xs"
                      onClick={() => {
                        setSearchQuery(lawyer.name);
                        setMenuOpen(false);
                      }}
                    >
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">{lawyer.name}</p>
                        <p className="text-[10px] text-slate-400">{lawyer.specialty}</p>
                      </div>
                      <span className="text-[10px] text-regalis-gold">★ {lawyer.rating}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-2">No matches found</p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest">
              Navigation
            </p>
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-serif font-bold transition-colors duration-250 ${
                  pathname === item.href
                    ? "text-regalis-gold"
                    : "text-slate-700 dark:text-slate-300 hover:text-regalis-gold"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Role & Dashboard Option in Mobile */}
          {isLoggedIn && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-t border-b border-slate-100 dark:border-slate-900 py-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest">
                  Dashboard ({role})
                </span>
                <span className="text-[10px] bg-regalis-gold/10 text-regalis-gold px-2 py-0.5 rounded-full font-bold">
                  Active
                </span>
              </div>
              <div className="flex flex-col gap-3 pl-2">
                {dashboardMenus[role].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-regalis-gold transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Utility Operations (Mobile Segmented Switcher) */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-900">
            <span className="text-sm text-slate-500 dark:text-slate-400">Theme Preference</span>
            <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-900 p-0.5 rounded-full border border-slate-250 dark:border-slate-800">
              <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-full transition ${
                  theme === "light"
                    ? "bg-white text-regalis-gold shadow-sm"
                    : "text-slate-500"
                }`}
              >
                <Sun size={13} />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-full transition ${
                  theme === "dark"
                    ? "bg-slate-950 text-regalis-gold shadow-sm"
                    : "text-slate-550"
                }`}
              >
                <Moon size={13} />
              </button>
            </div>
          </div>

          {/* Mobile Auth/Booking Button */}
          {isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <Button
                as={Link}
                href="/#contact"
                radius="full"
                className="w-full font-bold text-sm h-11 bg-regalis-gold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Book Appointment
              </Button>
              <Button
                radius="full"
                className="w-full font-bold text-sm h-11 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-350"
                onClick={() => {
                  handleAuthToggle();
                  setMenuOpen(false);
                }}
              >
                Logout from Regalis
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              <Button
                radius="full"
                variant="bordered"
                className="w-full font-bold text-sm h-11 border-slate-250 text-slate-700 dark:text-slate-300"
                onClick={() => {
                  handleAuthToggle();
                  setMenuOpen(false);
                }}
              >
                Log In
              </Button>
              <Button
                radius="full"
                className="w-full font-bold text-sm h-11 bg-regalis-gold text-white hover:bg-regalis-gold-hover"
                onClick={() => {
                  handleAuthToggle();
                  setMenuOpen(false);
                }}
              >
                Book Appointment
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
