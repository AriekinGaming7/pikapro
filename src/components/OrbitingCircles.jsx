import { twMerge } from "tailwind-merge";
import React from "react";

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 40,
  speed = 1,
  glow = true,
  ...props
}) {
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="absolute inset-0 pointer-events-none size-full"
        >
          <defs>
            <linearGradient id="orbitPathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <circle
            className="stroke-[1.5] animate-pulse"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="url(#orbitPathGradient)"
          />
        </svg>
      )}

      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={{
              "--duration": calculatedDuration,
              "--radius": radius,
              "--angle": angle,
              "--icon-size": `${iconSize}px`,
            }}
            className={twMerge(
              `absolute flex items-center justify-center transform-gpu animate-orbit
               [width:var(--icon-size)] [height:var(--icon-size)]
               ${reverse ? "[animation-direction:reverse]" : ""}
              `,
              className
            )}
            {...props}
          >
            {/* Aura behind icon */}
            <div
              className={twMerge(
                "absolute inset-0 rounded-full blur-md",
                glow &&
                  "bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 opacity-70 animate-pulse"
              )}
            />

            {/* Icon itself */}
            <div
              className="relative flex items-center justify-center w-full h-full 
                         rounded-full bg-black/40 border border-white/10
                         hover:scale-110 transition-transform duration-300"
            >
              {child}
            </div>
          </div>
        );
      })}
    </>
  );
}
