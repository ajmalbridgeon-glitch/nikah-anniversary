import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Elegant micro-interaction: Spawns 3-5 tiny golden hearts
 * that float gently upward and fade out quickly.
 */
export function useHeartBurst() {
  const [hearts, setHearts] = useState([]);

  const triggerHeartBurst = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const originY = rect ? rect.top : window.innerHeight / 2;

    const newHearts = Array.from({ length: 4 }).map((_, i) => ({
      id: `${Date.now()}-${i}-${Math.random()}`,
      x: originX + (Math.random() - 0.5) * 60,
      y: originY,
      size: Math.random() * 12 + 10,
      rotation: (Math.random() - 0.5) * 35,
      driftX: (Math.random() - 0.5) * 45,
      driftY: -(Math.random() * 70 + 60),
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1800);
  };

  return { hearts, triggerHeartBurst };
}

export function HeartBurstRenderer({ hearts }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              x: h.x,
              y: h.y,
              rotate: h.rotation,
            }}
            animate={{
              opacity: [0, 0.9, 0.7, 0],
              scale: [0.3, 1, 0.8],
              x: h.x + h.driftX,
              y: h.y + h.driftY,
              rotate: h.rotation * 1.5,
            }}
            transition={{
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute text-gold-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
            style={{ fontSize: `${h.size}px` }}
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
