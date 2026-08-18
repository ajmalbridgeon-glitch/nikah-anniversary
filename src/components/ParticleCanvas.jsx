import React, { useEffect, useRef } from 'react';

/**
 * Floating Light & Bokeh Effect
 * Extremely subtle warm glowing particles and dust-like bokeh lights
 * drifting slowly upward to mimic a cinematic wedding scene.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm golden palette
    const colors = [
      'rgba(212, 175, 55, ',   // Classic Gold
      'rgba(243, 227, 195, ',  // Pale Shimmer
      'rgba(197, 168, 128, ',  // Amber Brown
      'rgba(255, 235, 200, ',  // Soft Candlelight
    ];

    // Maintain a conservative number of particles for elegance & performance
    const particleCount = Math.min(36, Math.floor(window.innerWidth / 35));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.45 + 0.1,
        speedY: Math.random() * 0.35 + 0.12,
        speedX: (Math.random() - 0.5) * 0.15,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulseVal: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        // Wrap around smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal));

        // Soft glowing gradient for bokeh feel
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
        gradient.addColorStop(0, `${p.colorBase}${currentOpacity})`);
        gradient.addColorStop(0.4, `${p.colorBase}${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `${p.colorBase}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Tiny crisp core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
      aria-hidden="true"
    />
  );
}
