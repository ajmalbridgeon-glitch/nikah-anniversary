import React, { useEffect, useRef } from 'react';

export default function GalaxyCanvas() {
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

    const galaxyRadius = Math.max(width, height) * 0.75;
    const starCount = Math.min(550, Math.floor((width * height) / 1800));
    const armCount = 3;
    const armSpread = 0.45;
    const diskTilt = 0.65;

    const starPalettes = [
      'rgba(255, 255, 255, ',
      'rgba(255, 245, 215, ',
      'rgba(240, 210, 145, ',
      'rgba(215, 175, 110, ',
      'rgba(235, 190, 210, ',
    ];

    class GalaxyStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.dist = Math.pow(Math.random(), 1.8) * galaxyRadius;
        const armIndex = Math.floor(Math.random() * armCount);
        const armBaseAngle = (armIndex * 2 * Math.PI) / armCount;
        const spiralTwist = this.dist * 0.0055;
        const armNoise = (Math.random() - 0.5) * armSpread * (1 + this.dist / galaxyRadius);
        this.angle = armBaseAngle + spiralTwist + armNoise;

        const distRatio = this.dist / galaxyRadius;
        this.orbitSpeed = (0.0018 + (1 - distRatio) * 0.0035) * (Math.random() * 0.3 + 0.85);
        this.zOffset = (Math.random() - 0.5) * 45 * (1 - distRatio * 0.5);

        this.baseRadius = Math.random() * 1.4 + 0.4;
        this.color = starPalettes[Math.floor(Math.random() * starPalettes.length)];
        this.twinkleSpeed = Math.random() * 0.06 + 0.02;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.isMajorStar = Math.random() < 0.06 && this.dist > 40;
      }

      update() {
        this.angle += this.orbitSpeed;
        this.twinklePhase += this.twinkleSpeed;
      }

      draw(centerX, centerY, globalAngle) {
        const totalAngle = this.angle + globalAngle;
        const rawX = Math.cos(totalAngle) * this.dist;
        const rawY = Math.sin(totalAngle) * this.dist;

        const screenX = centerX + rawX;
        const screenY = centerY + rawY * diskTilt + this.zOffset;

        if (screenX < -30 || screenX > width + 30 || screenY < -30 || screenY > height + 30) {
          return;
        }

        const distFactor = 1 - this.dist / galaxyRadius;
        const twinkle = (Math.sin(this.twinklePhase) + 1) * 0.5;
        const opacity = Math.min(1, (0.35 + distFactor * 0.55) * (0.5 + 0.5 * twinkle));
        const r = this.baseRadius * (0.8 + 0.5 * distFactor) * (0.85 + 0.3 * twinkle);

        const glowRadius = r * (this.isMajorStar ? 4.5 : 2.5);
        const glow = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowRadius);
        glow.addColorStop(0, `${this.color}${opacity})`);
        glow.addColorStop(0.4, `${this.color}${opacity * 0.35})`);
        glow.addColorStop(1, `${this.color}0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(screenX, screenY, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, opacity * 1.3)})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, r * 0.65, 0, Math.PI * 2);
        ctx.fill();

        if (this.isMajorStar && twinkle > 0.6) {
          const flareLen = r * 4.0 * (0.7 + 0.3 * twinkle);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
          ctx.lineWidth = 0.7;

          ctx.beginPath();
          ctx.moveTo(screenX - flareLen, screenY);
          ctx.lineTo(screenX + flareLen, screenY);
          ctx.moveTo(screenX, screenY - flareLen);
          ctx.lineTo(screenX, screenY + flareLen);
          ctx.stroke();
        }
      }
    }

    class SwirlingNebula {
      constructor(index, count) {
        this.index = index;
        this.baseAngle = (index / count) * Math.PI * 2;
        this.dist = Math.random() * (galaxyRadius * 0.55) + 60;
        this.radius = Math.random() * 200 + 160;
        this.rotSpeed = 0.0006 + (1 - this.dist / galaxyRadius) * 0.0008;
        this.color = index % 2 === 0 ? 'rgba(212, 175, 55, ' : 'rgba(175, 120, 85, ';
      }

      draw(centerX, centerY, globalAngle, time) {
        const currentAngle = this.baseAngle + globalAngle * 0.8;
        const cx = centerX + Math.cos(currentAngle) * this.dist;
        const cy = centerY + Math.sin(currentAngle) * (this.dist * diskTilt);

        const pulse = Math.sin(time * 0.0012 + this.index) * 0.02 + 0.06;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, this.radius);
        grad.addColorStop(0, `${this.color}${pulse * 1.1})`);
        grad.addColorStop(0.5, `${this.color}${pulse * 0.35})`);
        grad.addColorStop(1, `${this.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const stars = Array.from({ length: starCount }, () => new GalaxyStar());
    const nebulae = Array.from({ length: 5 }, (_, i) => new SwirlingNebula(i, 5));

    let globalRotation = 0;
    let startTime = performance.now();

    const render = (currentTime) => {
      ctx.fillStyle = '#040303';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const elapsed = currentTime - startTime;

      globalRotation += 0.0004;

      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, galaxyRadius * 0.45);
      coreGlow.addColorStop(0, 'rgba(255, 235, 185, 0.16)');
      coreGlow.addColorStop(0.25, 'rgba(212, 175, 55, 0.08)');
      coreGlow.addColorStop(0.6, 'rgba(140, 90, 160, 0.03)');
      coreGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, galaxyRadius * 0.45, 0, Math.PI * 2);
      ctx.fill();

      nebulae.forEach((n) => n.draw(centerX, centerY, globalRotation, elapsed));

      stars.forEach((s) => {
        s.update();
        s.draw(centerX, centerY, globalRotation);
      });

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
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}