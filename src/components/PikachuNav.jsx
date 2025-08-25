import { useState, useEffect, useRef } from "react";
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

// Pikachu button (animated sprite + phrases)
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
    "Fun fact: My cheeks could power your phone 🔋⚡",
    "Basically a yellow mouse with WiFi signal 🐭📶",
    "Pokéball? Nah, I live rent-free here 😏",
    "Don’t touch my tail unless you like *spicy static* 🌩️",
    "Thunderbolt solves 99% of life’s problems ⚡",
    "If cute was a crime, I’d be on the Most Wanted list 👮‍♂️",
    "Scrolling again? Get a hobby! 😂",
    "I could light up an entire rave party 🎉⚡",
    "Ash still hasn’t given me vacation days 😤",
    "Powered by memes and electricity ⚡🤣",
    "I bite. And by bite, I mean electrocute 💥",
    "Running on 100% caffeine and lightning ☕⚡",
    "Shockingly good vibes only ✨⚡",
    "Peek-a-Pika! …yeah, I’m not sorry 😎",
    "You scroll, I judge. That’s the deal 🤨",
    "Zap first, ask questions never ⚡💛",
    "Don’t worry, I’m house-trained… mostly 🐭",
    "If you’re reading this, you owe me Poké-snacks 🍪",
    "Warning: may cause spontaneous dance parties 🕺⚡",
    "I’m like Alexa, but cuter and more dangerous 🤖⚡",
    "Static cling? Yeah, that was me 😏",
    "Ash chose me, so you should too 🐭⚡",
    "Battery low? Borrow my cheeks 🔋⚡",
    "I only shock people I like… so click wisely 😏",
    "Pokémon Center says I need therapy… nah ⚡😂",
    "Pikachu used Thunderbolt! It’s super effective… against boredom 🎉",
    "No one: … Me: *PIKA PIKA* 🔊",
    "Careful, I’ve been known to fry routers 📡⚡",
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
    <div className="relative cursor-pointer" onClick={toggle}>
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute bottom-[150%] left-1/2 -translate-x-1/2 
                       bg-white text-black px-4 py-2 rounded-2xl shadow-lg 
                       border border-gray-300 text-sm max-w-[180px]"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
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
          className="absolute bottom-24 right-8 sm:right-40 z-40 max-w-[90vw]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          <div className="relative bg-gradient-to-br from-pink-400/70 to-blue-400/70 
                          backdrop-blur-md border-4 border-blue-800 rounded-[50%] 
                          p-6 sm:p-8 shadow-2xl text-center">
            <Navigation onLinkClick={onClose} />
          </div>

          <div className="absolute -right-5 bottom-6 w-6 h-6 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 border-2 border-blue-700" />
          <div className="absolute -right-10 bottom-2 w-4 h-4 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 border-2 border-blue-700" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PikachuNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <div className="relative">
        <PikachuSprite
          isActive={menuOpen}
          toggle={() => setMenuOpen((v) => !v)}
        />
        <ThoughtBubbleMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </div>
    </div>
  );
}
