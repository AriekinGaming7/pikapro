import { FlipWords } from "./FlipWords";
import { motion } from "framer-motion";

const HeroText = () => {
  const words = ["Game Developer", "Esports Player", "Youtuber", "Web Developer"];

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative flex items-end justify-start min-h-screen px-6 sm:px-12 md:px-40 lg:px-60 pb-28 font-[Cinzel_Decorative] italic">
      {/* Text container */}
      <div className="z-10 text-left max-w-[90%]">
        {/* Desktop View */}
        <div className="hidden md:flex flex-col space-y-10">
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold tracking-wide text-white [text-shadow:2px_2px_8px_rgba(0,0,0,0.9)]"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            HELLO, I AM{" "}
            {/* ARYAN pill — semi-transparent dark capsule with red outline, text with moving glowing outline */}
            <span className="inline-flex items-center justify-center px-6 py-2 rounded-full 
                             bg-gradient-to-r from-[rgba(24,24,27,0.75)] via-[rgba(17,24,39,0.75)] to-[rgba(0,0,0,0.75)]
                             ring-2 ring-red-500/50
                             shadow-[0_0_24px_rgba(255,0,0,0.15)]">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 antialiased
                               animate-[glowing-amber_3s_ease-in-out_infinite]">
                ARYAN
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="text-6xl font-semibold text-neutral-100 [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)]"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1, duration: 0.6 }}
          >
            A GAMER <br /> AND
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <FlipWords
              words={words}
              className="relative inline-flex items-center justify-center 
                         bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 
                         text-white px-10 py-5 rounded-full 
                         text-7xl md:text-8xl font-extrabold shadow-xl
                         [text-shadow:1px_1px_6px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          <motion.p
            className="text-5xl font-medium text-neutral-100 [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)]"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            Also a{" "}
            {/* Video Editor pill — semi-transparent dark capsule with red outline, text with moving glowing outline */}
            <span className="inline-flex items-center justify-center px-6 py-2 rounded-full 
                             bg-gradient-to-r from-[rgba(24,24,27,0.75)] via-[rgba(17,24,39,0.75)] to-[rgba(0,0,0,0.75)]
                             ring-2 ring-red-500/50
                             shadow-[0_0_24px_rgba(255,0,0,0.15)]">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-600 antialiased
                               animate-[glowing-cyan_3s_ease-in-out_infinite]">
                Video Editor
              </span>
            </span>
          </motion.p>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col space-y-6 md:hidden">
          <motion.h1
            className="text-5xl font-extrabold tracking-wide text-white [text-shadow:2px_2px_8px_rgba(0,0,0,0.9)]"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            HELLO, I AM{" "}
            <span className="inline-flex items-center justify-center px-4 py-1 rounded-full 
                             bg-gradient-to-r from-[rgba(24,24,27,0.75)] via-[rgba(17,24,39,0.75)] to-[rgba(0,0,0,0.75)]
                             ring-2 ring-red-500/50
                             shadow-[0_0_24px_rgba(255,0,0,0.15)]">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 antialiased
                               animate-[glowing-amber_3s_ease-in-out_infinite]">
                ARYAN
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="text-4xl font-semibold text-neutral-100 [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)]"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1, duration: 0.6 }}
          >
            A GAMER AND
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <FlipWords
              words={words}
              className="inline-flex items-center justify-center
                         bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 
                         text-white px-6 py-3 rounded-full
                         font-extrabold text-5xl sm:text-6xl shadow-lg
                         [text-shadow:1px_1px_6px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          <motion.p
            className="text-3xl font-medium text-neutral-100 [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)]"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            Also a{" "}
            <span className="inline-flex items-center justify-center px-4 py-1 rounded-full 
                             bg-gradient-to-r from-[rgba(24,24,27,0.75)] via-[rgba(17,24,39,0.75)] to-[rgba(0,0,0,0.75)]
                             ring-2 ring-red-500/50
                             shadow-[0_0_24px_rgba(255,0,0,0.15)]">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-600 antialiased
                               animate-[glowing-cyan_3s_ease-in-out_infinite]">
                Video Editor
              </span>
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroText;