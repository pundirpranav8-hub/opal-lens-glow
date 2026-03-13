import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LiquidGlass = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Opal shimmer orbs
    const orbs = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 8 + Math.random() * 20,
      speed: 0.2 + Math.random() * 0.5,
      hueOffset: Math.random() * 360,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.008;

      // Draw flowing opal orbs behind
      orbs.forEach((orb) => {
        const x = ((orb.x * w + orb.speed * t * 60) % (w + 60)) - 30;
        const y = orb.y * h + Math.sin(t * 2 + orb.phase) * 12;
        const hue = (45 + orb.hueOffset * 0.4 + t * 30) % 360;
        const alpha = 0.25 + 0.15 * Math.sin(t * 3 + orb.phase);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
        grad.addColorStop(0, `hsla(${hue}, 80%, 70%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(${(hue + 40) % 360}, 60%, 60%, ${alpha * 0.5})`);
        grad.addColorStop(1, `hsla(${(hue + 80) % 360}, 50%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "120px" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* Scrolling marquee text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-10">
        <div className="marquee-strip flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-heading text-lg md:text-xl tracking-widest uppercase"
              style={{
                color: "hsl(var(--foreground) / 0.15)",
                textShadow: "0 0 20px hsl(var(--primary) / 0.2)",
              }}
            >
              OPAL Media &nbsp;·&nbsp; By Pranav Pundir &nbsp;&nbsp;✦&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Frosted glass overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute inset-0" style={{
            background: `linear-gradient(90deg, hsl(var(--background)) 0%, transparent 15%, transparent 85%, hsl(var(--background)) 100%)`,
          }} />
          <div className="absolute top-0 left-0 right-0" style={{
            height: "40%",
            background: `linear-gradient(180deg, hsl(var(--background) / 0.8) 0%, transparent 100%)`,
          }} />
          <div className="absolute bottom-0 left-0 right-0" style={{
            height: "40%",
            background: `linear-gradient(0deg, hsl(var(--background) / 0.8) 0%, transparent 100%)`,
          }} />
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2" style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent 5%, hsl(45 100% 70% / 0.3) 20%, hsl(200 80% 70% / 0.4) 35%, hsl(320 70% 70% / 0.3) 50%, hsl(45 100% 70% / 0.4) 65%, hsl(170 80% 70% / 0.3) 80%, transparent 95%)`,
          }} />
        </motion.div>
      </div>
    </div>
  );
};

export default LiquidGlass;
