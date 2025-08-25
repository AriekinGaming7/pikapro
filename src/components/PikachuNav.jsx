import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = ["home", "about", "experiences", "contact"];

function Navigation({ onLinkClick = () => {} }) {
  return (
    <ul className="flex flex-col gap-3 items-center">
      {LINKS.map((link) => (
        <li key={link}>
          <a
            href={`#${link}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(link);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              else if (link === "home")
                window.scrollTo({ top: 0, behavior: "smooth" });
              onLinkClick();
            }}
            className="px-4 py-2 rounded-full text-white text-lg font-semibold 
                       bg-gradient-to-r from-pink-500 to-purple-600 
                       shadow-md hover:shadow-lg hover:scale-105 transition 
                       border border-white/30"
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
}

function PikachuSprite({ isActive, toggle }) {
  const [frame, setFrame] = useState(0);
  const [animation, setAnimation] = useState("idle");

  const [showText, setShowText] = useState(false);
  const [randomText, setRandomText] = useState("");

  const idleTimer = useRef(null);
  const phraseTimer = useRef(null);

  const phrases = [
    "Hi, I’m Pika ⚡ (your friendly zap rat)",
    "Click me or I shock you 😜",
    "Humans scroll too much… 🙄",
    "Thunderbolt solves 99% of life’s problems ⚡",
    "I could light up an entire rave party 🎉⚡",
    "Fun fact: My cheeks could power your phone 🔋⚡",
    "Basically a yellow mouse with WiFi signal 🐭📶",
    "Pokéball? Nah, I live rent-free here 😏",
    "Don’t touch my tail unless you like *spicy static* 🌩️",
    "If cute was a crime, I’d be on the Most Wanted list 👮‍♂️",
    "Ash still hasn’t given me vacation days 😤",
    "Battery low? Borrow my cheeks 🔋⚡",
    "I bite. And by bite, I mean electrocute 💥",
    "Zap first, ask questions never ⚡💛",
    "Static cling? Yeah, that was me 😏",
  ];

  const animations = {
    idle: {
      src: `${import.meta.env.BASE_URL}assets/idle.png`,
      frames: 15,
      fps: 8,
      w: 128,
      h: 132,
    },
    onclick: {
      src: `${import.meta.env.BASE_URL}assets/onclick.png`,
      frames: 8,
      fps: 10,
      w: 131,
      h: 152,
    },
    run: {
      src: `${import.meta.env.BASE_URL}assets/char_yellow.png`,
      frames: 16,
      fps: 12,
      w: 128,
      h: 141,
    },
  };

  useEffect(() => {
    if (isActive) {
      setAnimation("onclick");
      stopPhrases();
    } else {
      setAnimation("idle");
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) return;
    let scrollTimeout;
    const handleScroll = () => {
      setAnimation("run");
      stopPhrases();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setAnimation("idle"), 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isActive]);

  useEffect(() => {
    if (animation === "idle" && !isActive) {
      startPhrases();
    } else {
      stopPhrases();
    }
    return () => stopPhrases();
  }, [animation, isActive]);

  const startPhrases = () => {
    if (idleTimer.current || phraseTimer.current) return;
    idleTimer.current = setTimeout(() => {
      showRandomPhrase();
      phraseTimer.current = setInterval(showRandomPhrase, 8000);
      idleTimer.current = null;
    }, 5000);
  };

  const stopPhrases = () => {
    clearTimeout(idleTimer.current);
    clearInterval(phraseTimer.current);
    idleTimer.current = null;
    phraseTimer.current = null;
    setShowText(false);
  };

  const showRandomPhrase = () => {
    setRandomText(phrases[Math.floor(Math.random() * phrases.length)]);
    setShowText(true);
    setTimeout(() => setShowText(false), 4000);
  };

  const anim = animations[animation];
  useEffect(() => {
    const int = setInterval(
      () => setFrame((f) => (f + 1) % anim.frames),
      1000 / anim.fps
    );
    return () => clearInterval(int);
  }, [anim]);

  return (
    <div className="relative cursor-pointer">
      <AnimatePresence>
        {showText && (
          <motion.div
            className="
              absolute z-40 
              bottom-[130%] left-1/2 -translate-x-1/2 
              sm:bottom-[150%] sm:left-1/2 sm:-translate-x-1/2
              bg-white text-black px-4 py-2 rounded-2xl shadow-lg 
              border border-gray-300 text-sm max-w-[85vw] sm:max-w-[260px]"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            {randomText}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          width: `${anim.w}px`,
          height: `${anim.h}px`,
          backgroundImage: `url(${anim.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: `-${frame * anim.w}px 0px`,
          backgroundSize: `${anim.frames * anim.w}px ${anim.h}px`,
          filter:
            "drop-shadow(0 0 4px rgba(255,215,0,0.4)) drop-shadow(0 0 8px rgba(255,223,0,0.6))",
        }}
      />
    </div>
  );
}

function ThoughtBubbleMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
            absolute z-40
            bottom-[130px] left-1/2 -translate-x-1/2
            sm:bottom-24 sm:left-auto sm:right-10 sm:translate-x-0
            max-w-[90vw]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          <div className="relative bg-gradient-to-br from-pink-400/70 to-blue-400/70 
                          backdrop-blur-md border-4 border-blue-800 rounded-[40px] 
                          p-5 sm:p-8 shadow-2xl text-center">
            <Navigation onLinkClick={onClose} />
          </div>

          {/* Bubbles/tail — keep inside width */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-6 h-6 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 border-2 border-blue-700" />
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-4 h-4 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 border-2 border-blue-700" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PikachuNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Render into body to avoid transformed-parent issues on mobile
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="
        fixed z-50 
        max-w-[100vw] pointer-events-none
        sm:bottom-6 sm:right-6
        bottom-4 right-4"
      style={{
        right: "calc(env(safe-area-inset-right, 0px) + 16px)",
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
      }}
    >
      <div className="relative pointer-events-auto origin-bottom-right scale-90 sm:scale-100">
        <div onClick={() => setMenuOpen((v) => !v)}>
          <PikachuSprite isActive={menuOpen} toggle={() => {}} />
        </div>
        <ThoughtBubbleMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </div>,
    document.body
  );
}
