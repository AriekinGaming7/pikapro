import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });

  const [screenWidth, setScreenWidth] = useState(1920);
  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isMobile = screenWidth < 768;

  // --- Planet offsets ---
  let planetBgPos = "-100px 40px";
  if (screenWidth < 500) planetBgPos = "-220px 40px";
  else if (screenWidth < 768) planetBgPos = "-160px 40px";
  else if (screenWidth < 1024) planetBgPos = "-120px 40px";

  // --- Scroll parallax ---
  const mountain3Y = useTransform(x, [0, 0.5], [0, isMobile ? 100 : 380]);
  const planetsScrollX = useTransform(x, [0, 0.5], [0, isMobile ? -60 : -240]);
  const mountain2Y = useTransform(x, [0, 0.5], [0, isMobile ? 60 : 200]);
  const mountain1Y = useTransform(x, [0, 0.5], [0, 120]);

  // --- Idle sway ---
  const idle = useMotionValue(0);
  useAnimationFrame((t) => {
    idle.set(Math.sin(t / 2000) * 20);
  });

  const skyX = useTransform(idle, (v) => v * 0.3);
  const planetsX = useTransform([planetsScrollX, idle], ([scroll, v]) => scroll + v * 0.6);
  const m2X = useTransform(idle, (v) => v * 0.4);
  const m3X = useTransform(idle, (v) => v * 0.6);
  const m1X = useTransform(idle, (v) => v * 1.2);

  return (
    <section className="absolute inset-0 overflow-x-hidden">
      <div className="relative h-screen overflow-hidden isolate">
        {/* Base black */}
        <div className="absolute inset-0 z-0 bg-black" />

        {/* SKY */}
        <motion.div
          className="absolute inset-0 z-10 will-change-transform"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.75) contrast(1.05) saturate(1.05)",
            x: skyX,
            scale: 1.2, // overscale to remove side/top bars
          }}
        />

        {/* MOUNTAIN 3 */}
        <motion.div
          className="absolute inset-0 z-60 will-change-transform"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: isMobile ? "center bottom" : "680px 200px",
            backgroundSize: isMobile ? "1000px" : "1600px",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.85) contrast(1.05) saturate(1.05)",
            x: m3X,
            y: mountain3Y,
            scale: 1.25, // overscale
          }}
        />

        {/* PLANETS */}
        <motion.div
          className="absolute inset-0 z-50 will-change-transform"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: planetBgPos,
            backgroundSize: isMobile ? "1000px" : "1500px",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.8) contrast(1.06) saturate(1.05)",
            x: planetsX,
            scale: 1.15, // overscale
          }}
        />

        {/* MOUNTAIN 2 */}
        <motion.div
          className="absolute inset-0 z-40 will-change-transform"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: isMobile ? "center bottom" : "-400px -100px",
            backgroundSize: isMobile ? "900px" : "1400px",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.85) contrast(1.05) saturate(1.05)",
            x: m2X,
            y: mountain2Y,
            scale: 1.2, // overscale
          }}
        />

        {/* MOUNTAIN 1 */}
        <motion.div
          className="absolute inset-0 z-50 will-change-transform"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: isMobile ? "center bottom" : "0px 150px",
            backgroundSize: isMobile ? "1200px" : "2000px",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.9) contrast(1.06) saturate(1.05)",
            x: m1X,
            y: mountain1Y,
            scale: 1.25, // overscale
          }}
        />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 z-60 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default ParallaxBackground;
