"use client";

import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "../logo";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white">
      {/* Logo pulse */}
      <m.div
        animate={{
          scale: [1, 0.9, 0.9, 1, 1],
          opacity: [1, 0.5, 0.5, 1, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="relative z-10"
      >
        <Logo className="w-[74px]" />
      </m.div>

      {/* Inner rotating square */}
      <m.div
        animate={{
          scale: [1.6, 1, 1, 1.6, 1.6],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{
          ease: "linear",
          duration: 3.2,
          repeat: Infinity,
        }}
        className="absolute w-[100px] h-[100px] border-[3px] border-primary/30"
      />

      {/* Outer rotating square */}
      <m.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{
          ease: "linear",
          duration: 3.2,
          repeat: Infinity,
        }}
        className="absolute w-[120px] h-[120px] border-[8px] border-primary/30"
      />
    </div>
  );
}
