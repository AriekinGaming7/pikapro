import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = ["home", "about", "experiences", "contact"];

function Navigation({ onLinkClick = () => {}, vertical = false }) {
  const pillBase =
    "rounded-full text-white font-medium focus:outline-none select-none";

  return (
    <ul
      className={`flex ${vertical ? "flex-col gap-4" : "flex-row gap-6"} items-center`}
    >
      {LINKS.map((link) => (
        <li key={link}>
          <a
            href={`#${link}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(link);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              else if (link === "home") window.scrollTo({ top: 0, behavior: "smooth" });
              onLinkClick();
            }}
            className={`${pillBase} px-4 py-2 text-base bg-gradient-to-r from-purple-600 to-pink-500 shadow-sm hover:brightness-95 transition`}
            aria-label={link}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      setShowNavbar(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // lock body scroll while menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.header
          className="fixed inset-x-0 top-0 z-50 w-full bg-gradient-to-r from-purple-900/85 via-gray-900/85 to-pink-900/85 backdrop-blur-xl shadow"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {/* full-width row so links can go HARD RIGHT */}
          <div className="w-full px-4 sm:px-6">
            <div className="flex items-center gap-4 py-3">
              {/* left spacer so logo stays perfectly centered on mobile */}
              <div className="sm:hidden w-8" />

              {/* Logo — centered on mobile, hard-left on desktop */}
              <div className="flex-1 flex justify-center sm:justify-start">
                <motion.a
                  href="/"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative px-4 py-2 rounded-full overflow-hidden"
                  aria-label="Aryan's Portfolio"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl opacity-95"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, rgba(168,85,247,0.85) 0%, rgba(236,72,153,0.85) 45%, rgba(59,130,246,0.85) 100%)",
                      backgroundSize: "200% 200%",
                    }}
                  />
                  <span className="relative text-3xl sm:text-4xl font-extrabold italic text-white drop-shadow-md">
                    Aryan&apos;s Portfolio
                  </span>
                </motion.a>
              </div>

              {/* Desktop links — HARD RIGHT */}
              <nav className="hidden sm:flex items-center gap-6 ml-auto">
                <Navigation />
              </nav>

              {/* Mobile hamburger (right edge) */}
              <div className="sm:hidden">
                <button
                  onClick={() => setIsOpen((v) => !v)}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  className="p-1"
                >
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 6, backgroundColor: "#f472b6" } : { rotate: 0, y: 0, backgroundColor: "#fff" }}
                    className="block w-8 h-[2px] bg-white rounded"
                    transition={{ duration: 0.22 }}
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block w-8 h-[2px] bg-white rounded my-1"
                    transition={{ duration: 0.18 }}
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -6, backgroundColor: "#f472b6" } : { rotate: 0, y: 0, backgroundColor: "#fff" }}
                    className="block w-8 h-[2px] bg-white rounded"
                    transition={{ duration: 0.22 }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile overlay + drawer (animations intact) */}
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  className="fixed inset-0 z-40 bg-black/40 sm:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                />

                <motion.aside
                  className="fixed right-0 top-0 z-50 h-screen w-1/4 min-w-[160px] sm:hidden
                             bg-gray-900/95 backdrop-blur-md border-l border-pink-600/20 rounded-l-xl
                             shadow-[0_10px_30px_rgba(0,0,0,0.6)] p-4 flex items-center"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x > 80) setIsOpen(false);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="w-full">
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <Navigation onLinkClick={() => setIsOpen(false)} vertical />
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
