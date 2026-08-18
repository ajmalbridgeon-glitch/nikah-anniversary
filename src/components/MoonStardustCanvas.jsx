import React, { useEffect, useRef } from 'react';

/**
 * Hyper-Realistic Golden Crescent Moon with Cascading Stardust Stream
 * Matches the reference image with a delicate, razor-sharp, realistic slender crescent moon
 * and a luminous, twinkling cascade of golden stardust pouring into the horizon.
 */
export default function MoonStardustCanvas() {
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

    // Realistic Delicate Moon coordinates (slender, elegant, reduced size)
    const getMoonOrigin = () => {
      const radius = Math.max(22, Math.min(width, height) * 0.042);
      return {
        x: width * 0.54,
        y: Math.max(50, height * 0.12),
        radius: radius,
      };
    };

    // Stardust Particle Palette
    const goldPalette = [
      'rgba(255, 255, 255, ',   // Pure diamond white
      'rgba(255, 248, 220, ',   // Cornsilk starlight
      'rgba(247, 231, 186, ',   // Champagne shimmer
      'rgba(218, 185, 96, ',    // Warm imperial gold
      'rgba(202, 164, 88, ',    // Amber glow
    ];

    // High density micro-particles for realistic stardust mist
    const particleCount = Math.min(380, Math.floor((width * height) / 2600));
    const particles = [];

    class StarDustParticle {
      constructor(init = false) {
        this.reset(init);
      }

      reset(init = false) {
        const moon = getMoonOrigin();
        // Emitter origin precisely at the bottom tip of the crescent
        this.originX = moon.x - moon.radius * 0.25 + (Math.random() - 0.5) * 6;
        this.originY = moon.y + moon.radius * 0.85 + (Math.random() - 0.5) * 4;

        this.progress = init ? Math.random() : 0;
        this.speed = Math.random() * 0.0022 + 0.0012; // Gentle organic descent rate
        this.spreadFactor = (Math.random() - 0.5) * 2; // -1 to 1

        // Organic sinuous drift along stream
        this.driftSpeed = Math.random() * 2.5 + 1.2;
        this.driftPhase = Math.random() * Math.PI * 2;
        this.driftAmp = Math.random() * 18 + 6;

        // Realistic tiny size (micro dust)
        this.baseSize = Math.random() * 1.6 + 0.45;
        this.isDiamondGlint = Math.random() < 0.14; // High-shimmer star

        this.twinkleSpeed = Math.random() * 0.1 + 0.04;
        this.twinklePhase = Math.random() * Math.PI * 2;

        this.color = goldPalette[Math.floor(Math.random() * goldPalette.length)];
        this.maxOpacity = Math.random() * 0.6 + 0.4;
      }

      update() {
        this.progress += this.speed;
        this.twinklePhase += this.twinkleSpeed;

        if (this.progress >= 1) {
          this.reset(false);
        }
      }

      draw() {
        const moon = getMoonOrigin();
        const currentY = this.originY + (height - this.originY) * this.progress;

        // Realistic Stardust Column Spread (expands gracefully towards the bottom)
        const maxSpreadAtY = Math.pow(this.progress, 1.35) * (width * 0.24);
        const organicSway = Math.sin(this.progress * this.driftSpeed * Math.PI + this.driftPhase) * this.driftAmp;
        const currentX = moon.x - moon.radius * 0.2 + this.spreadFactor * maxSpreadAtY + organicSway;

        // Smooth fade-in at moon tip and fade-out near horizon
        let alpha = 1;
        if (this.progress < 0.06) {
          alpha = this.progress / 0.06;
        } else if (this.progress > 0.85) {
          alpha = (1 - this.progress) / 0.15;
        }

        const twinkle = (Math.sin(this.twinklePhase) + 1) * 0.5;
        const opacity = this.maxOpacity * alpha * (0.3 + 0.7 * twinkle);

        if (opacity <= 0.02) return;

        const size = this.baseSize * (0.85 + 0.45 * twinkle);

        // 1. Soft Warm Halo
        const glowGrad = ctx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, size * 3.2
        );
        glowGrad.addColorStop(0, `${this.color}${opacity})`);
        glowGrad.addColorStop(0.5, `${this.color}${opacity * 0.35})`);
        glowGrad.addColorStop(1, `${this.color}0)`);

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(currentX, currentY, size * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // 2. Crisp Micro Core
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, opacity * 1.4)})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, size * 0.65, 0, Math.PI * 2);
        ctx.fill();

        // 3. Delicate 4-Point Diamond Flare for glints
        if (this.isDiamondGlint && twinkle > 0.72) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;
          ctx.lineWidth = 0.65;
          const flareLen = size * 2.8;

          ctx.beginPath();
          ctx.moveTo(currentX - flareLen, currentY);
          ctx.lineTo(currentX + flareLen, currentY);
          ctx.moveTo(currentX, currentY - flareLen);
          ctx.lineTo(currentX, currentY + flareLen);
          ctx.stroke();
        }
      }
    }

    // Populate initial stardust
    for (let i = 0; i < particleCount; i++) {
      particles.push(new StarDustParticle(true));
    }

    // Draw Razor-Sharp, Realistic Golden Crescent Moon
    const drawRealisticCrescentMoon = (time) => {
      const moon = getMoonOrigin();
      const r = moon.radius;

      ctx.save();
      ctx.translate(moon.x, moon.y);

      // 1. Ambient Lunar Corona Glow
      const corona = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r * 3.2);
      const pulse = Math.sin(time * 0.0018) * 0.06 + 0.94;
      corona.addColorStop(0, `rgba(255, 245, 215, ${0.4 * pulse})`);
      corona.addColorStop(0.25, `rgba(218, 185, 96, ${0.2 * pulse})`);
      corona.addColorStop(0.65, `rgba(218, 185, 96, ${0.04 * pulse})`);
      corona.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(0, 0, r * 3.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Realistic Slender Crescent Path with pointed horns
      ctx.beginPath();
      // Outer arc
      ctx.arc(0, 0, r, -Math.PI * 0.72, Math.PI * 0.72, false);
      // Inner subtractive bezier curve to create a razor-sharp slender sickle
      ctx.bezierCurveTo(
        r * 0.28, r * 0.78,
        r * 0.05, -r * 0.78,
        -r * 0.31, -r * 0.69
      );
      ctx.closePath();

      // Golden Metallic Lunar Gradient
      const lunarGrad = ctx.createLinearGradient(-r * 0.6, -r, r, r);
      lunarGrad.addColorStop(0, '#FFFFFF');        // Diamond bright crest
      lunarGrad.addColorStop(0.25, '#FFF8DC');     // Warm starlight
      lunarGrad.addColorStop(0.65, '#E5C158');     // Rich gold
      lunarGrad.addColorStop(0.9, '#B88E28');      // Deep bronze shadow
      lunarGrad.addColorStop(1, '#6E5212');

      ctx.fillStyle = lunarGrad;
      ctx.shadowColor = 'rgba(255, 235, 175, 0.9)';
      ctx.shadowBlur = 18;
      ctx.fill();

      // Sharp luminous rim highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Subtle luminous tip sparkle
      const tipSparkle = (Math.sin(time * 0.004) + 1) * 0.5;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + 0.3 * tipSparkle})`;
      ctx.beginPath();
      ctx.arc(-r * 0.28, r * 0.69, 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw Realistic Luminous Horizon Pool Reflection
    const drawRealisticHorizonPool = (time) => {
      const moon = getMoonOrigin();
      const horizonY = height * 0.91;

      ctx.save();
      const poolGrad = ctx.createRadialGradient(
        moon.x - moon.radius * 0.2, horizonY, 0,
        moon.x - moon.radius * 0.2, horizonY, width * 0.28
      );
      const pulse = Math.sin(time * 0.0025) * 0.08 + 0.92;
      poolGrad.addColorStop(0, `rgba(255, 238, 190, ${0.5 * pulse})`);
      poolGrad.addColorStop(0.25, `rgba(218, 185, 96, ${0.25 * pulse})`);
      poolGrad.addColorStop(0.65, `rgba(218, 185, 96, ${0.05 * pulse})`);
      poolGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = poolGrad;
      ctx.beginPath();
      ctx.ellipse(moon.x - moon.radius * 0.2, horizonY, width * 0.3, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Fine shimmering specular water reflections
      for (let i = 0; i < 6; i++) {
        const lineY = horizonY + i * 4.5;
        const lineLen = (width * 0.2) * (1 - i * 0.14);
        const lineAlpha = (0.28 - i * 0.04) * pulse;

        ctx.strokeStyle = `rgba(255, 245, 210, ${lineAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(moon.x - moon.radius * 0.2 - lineLen / 2, lineY);
        ctx.lineTo(moon.x - moon.radius * 0.2 + lineLen / 2, lineY);
        ctx.stroke();
      }

      ctx.restore();
    };

    let startTime = performance.now();

    const render = (currentTime) => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = currentTime - startTime;

      // 1. Draw Falling Stardust Stream
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // 2. Draw Realistic Golden Crescent Moon
      drawRealisticCrescentMoon(elapsed);

      // 3. Draw Horizon Stardust Pool
      drawRealisticHorizonPool(elapsed);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
