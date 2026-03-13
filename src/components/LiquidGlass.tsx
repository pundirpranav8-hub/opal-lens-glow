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
      {/* Opal shimmer canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* Hourglass frosted glass shape */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Left glass taper */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, 
                hsl(var(--background)) 0%, 
                transparent 15%, 
                transparent 85%, 
                hsl(var(--background)) 100%
              )`,
            }}
          />

          {/* Top frosted edge */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "40%",
              background: `linear-gradient(180deg, 
                hsl(var(--background) / 0.8) 0%, 
                transparent 100%
              )`,
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              maskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
            }}
          />

          {/* Bottom frosted edge */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "40%",
              background: `linear-gradient(0deg, 
                hsl(var(--background) / 0.8) 0%, 
                transparent 100%
              )`,
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              maskImage: "linear-gradient(0deg, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(0deg, black 0%, transparent 100%)",
            }}
          />

          {/* Central hourglass pinch — frosted glass */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `radial-gradient(ellipse 50% 100% at 50% 50%, 
                  hsl(var(--primary) / 0.06) 0%, 
                  hsl(var(--primary) / 0.02) 40%,
                  transparent 70%
                )`,
                backdropFilter: "blur(12px) saturate(1.4)",
                WebkitBackdropFilter: "blur(12px) saturate(1.4)",
                maskImage: `radial-gradient(ellipse 80% 100% at 50% 50%, 
                  black 0%, 
                  black 20%, 
                  transparent 70%
                )`,
                WebkitMaskImage: `radial-gradient(ellipse 80% 100% at 50% 50%, 
                  black 0%, 
                  black 20%, 
                  transparent 70%
                )`,
              }}
            />
          </div>

          {/* Iridescent highlight line */}
          <div
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
            style={{
              height: "1px",
              background: `linear-gradient(90deg, 
                transparent 5%,
                hsl(45 100% 70% / 0.3) 20%,
                hsl(200 80% 70% / 0.4) 35%,
                hsl(320 70% 70% / 0.3) 50%,
                hsl(45 100% 70% / 0.4) 65%,
                hsl(170 80% 70% / 0.3) 80%,
                transparent 95%
              )`,
            }}
          />

          {/* Secondary highlight */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: "30%",
              height: "1px",
              opacity: 0.4,
              background: `linear-gradient(90deg, 
                transparent 10%,
                hsl(var(--primary) / 0.2) 30%,
                hsl(var(--primary) / 0.1) 70%,
                transparent 90%
              )`,
            }}
          />
          <div
            className="absolute left-0 right-0"
            style={{
              top: "70%",
              height: "1px",
              opacity: 0.4,
              background: `linear-gradient(90deg, 
                transparent 10%,
                hsl(var(--primary) / 0.2) 30%,
                hsl(var(--primary) / 0.1) 70%,
                transparent 90%
              )`,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LiquidGlass;
