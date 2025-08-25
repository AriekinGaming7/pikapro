import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const Card = ({ style, text, image, containerRef }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotate card based on mouse position
  const rotateX = useTransform(y, [0, 150], [10, -10]);
  const rotateY = useTransform(x, [0, 150], [-10, 10]);

  // Reset tilt when not hovered
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px);
    y.set(py);
  };

  const commonProps = {
    style: { ...style, rotateX, rotateY },
    onMouseMove: handleMouseMove,
    onMouseLeave: () => {
      setIsHovered(false);
      x.set(75);
      y.set(75);
    },
    onMouseEnter: () => setIsHovered(true),
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    drag: true,
    dragConstraints: containerRef,
    dragElastic: 0.8,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  };

  return image && !text ? (
    // 🎴 Image Card
    <motion.img
      {...commonProps}
      className="absolute w-40 h-40 object-cover rounded-2xl shadow-lg cursor-grab border border-white/20
                 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
      src={image}
      alt="card"
    />
  ) : (
    // 📝 Text Card
    <motion.div
      {...commonProps}
      className="absolute px-6 py-4 text-lg text-center rounded-2xl 
                 bg-gradient-to-r from-purple-600/80 via-pink-500/70 to-red-500/80 
                 text-white font-medium backdrop-blur-md shadow-xl border border-white/10 
                 cursor-grab select-none"
    >
      {text}
    </motion.div>
  );
};

export default Card;
