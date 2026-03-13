import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AshParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  hue: number;
}

const WizardBroom = () => {
  const [pos, setPos] = useState({ x: 8, y: 12 });
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [flying, setFlying] = useState(false);
  const [burning, setBurning] = useState(false);
  const [visible, setVisible] = useState(true);
  const [facingLeft, setFacingLeft] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const ashCanvasRef = useRef<HTMLCanvasElement>(null);
  const ashParticles = useRef<AshParticle[]>([]);
  const ashAnimId = useRef<number>(0);
  const trailId = useRef(0);
  const respawnTimer = useRef<ReturnType<typeof setTimeout>>();

  // Ash burning effect
  const startBurning = useCallback((bx: number, by: number) => {
    setBurning(true);
    const canvas = ashCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Generate ash/ember particles from wizard position
    ashParticles.current = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: bx + 24 + (Math.random() - 0.5) * 20,
      y: by + 24 + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 3,
      vy: -Math.random() * 4 - 1,
      size: 2 + Math.random() * 5,
      life: 1,
      hue: 20 + Math.random() * 30,
    }));

    const drawAsh = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      let alive = false;

      ashParticles.current.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.vx *= 0.98;
        p.life -= 0.015;
        p.size *= 0.995;

        const alpha = Math.max(0, p.life);
        // Ember glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 60%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue - 10}, 90%, 40%, ${alpha * 0.7})`);
        grad.addColorStop(1, `hsla(0, 0%, 15%, ${alpha * 0.3})`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, ${alpha * 0.5})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (alive) {
        ashAnimId.current = requestAnimationFrame(drawAsh);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setBurning(false);
        setVisible(false);

        // Respawn after delay back at logo
        respawnTimer.current = setTimeout(() => {
          setPos({ x: 8, y: 12 });
          setVisible(true);
          setFlying(false);
        }, 3000);
      }
    };

    // Hide wizard, start ash
    setTimeout(() => {
      setVisible(false);
      drawAsh();
    }, 150);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["BUTTON", "A", "INPUT", "TEXTAREA", "VIDEO", "SELECT"].includes(tag)) return;
      if (!visible || burning) return;

      const tx = e.clientX - 24;
      const ty = e.clientY - 24;
      setFacingLeft(tx < pos.x);
      setTarget({ x: tx, y: ty });
      setFlying(true);

      // Trail particles
      const dx = tx - pos.x;
      const dy = ty - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(Math.floor(dist / 35), 10);
      const newTrail: typeof trail = [];
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const arcH = Math.min(dist * 0.3, 80);
        newTrail.push({
          x: pos.x + dx * t + (Math.random() - 0.5) * 20,
          y: pos.y + dy * t - Math.sin(t * Math.PI) * arcH,
          id: trailId.current++,
        });
      }
      setTrail((p) => [...p, ...newTrail]);
      setTimeout(() => setTrail((p) => p.filter((pt) => !newTrail.find((n) => n.id === pt.id))), 700);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [pos, visible, burning]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(ashAnimId.current);
      if (respawnTimer.current) clearTimeout(respawnTimer.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Ash canvas */}
      <canvas
        ref={ashCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Trail */}
      {trail.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: 6, height: 6 }}
          initial={{ x: p.x, y: p.y, opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: p.y + 15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-full h-full rounded-full" style={{
            background: "radial-gradient(circle, hsl(45 100% 70% / 0.8), hsl(30 100% 50% / 0.3) 60%, transparent)",
            boxShadow: "0 0 6px hsl(45 100% 50% / 0.4)",
          }} />
        </motion.div>
      ))}

      {/* Wizard */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute"
            style={{ width: 48, height: 48 }}
            initial={{ x: 8, y: 12, opacity: 1 }}
            animate={{
              x: target ? target.x : pos.x,
              y: target ? target.y : pos.y,
              opacity: burning ? 0 : 1,
              scale: burning ? 0.3 : 1,
              filter: burning ? "brightness(3) saturate(2)" : "brightness(1)",
            }}
            transition={{
              x: { type: "spring", stiffness: 90, damping: 15 },
              y: { type: "spring", stiffness: 90, damping: 15 },
              opacity: { duration: 0.15 },
              scale: { duration: 0.2 },
              filter: { duration: 0.15 },
            }}
            onUpdate={(latest) => {
              if (typeof latest.x === "number" && typeof latest.y === "number") {
                setPos({ x: latest.x, y: latest.y });
              }
            }}
            onAnimationComplete={() => {
              if (flying && target) {
                setFlying(false);
                startBurning(target.x, target.y);
                setTarget(null);
              }
            }}
          >
            {/* Glow */}
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: 28, height: 5,
                background: "radial-gradient(ellipse, hsl(45 100% 50% / 0.25), transparent 70%)",
                filter: "blur(2px)",
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Wizard SVG */}
            <motion.div
              animate={
                flying
                  ? { rotate: [0, facingLeft ? 15 : -15, 0], y: [0, -6, 0] }
                  : { y: [0, -4, 0], rotate: [0, 1.5, -1.5, 0] }
              }
              transition={
                flying
                  ? { duration: 0.4, ease: "easeInOut" }
                  : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              style={{ transform: facingLeft ? "scaleX(-1)" : "scaleX(1)" }}
            >
              <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
                <path d="M24 28L32 6L40 28H24Z" fill="hsl(260, 40%, 25%)" stroke="hsl(45, 100%, 50%)" strokeWidth="1" />
                <path d="M30 12L34 10L32 16Z" fill="hsl(45, 100%, 50%)" opacity="0.6" />
                <ellipse cx="32" cy="28" rx="14" ry="3" fill="hsl(260, 40%, 22%)" stroke="hsl(45, 100%, 50%)" strokeWidth="0.8" />
                <circle cx="32" cy="33" r="6" fill="hsl(30, 50%, 75%)" />
                <circle cx="30" cy="32" r="1" fill="hsl(220, 60%, 20%)" />
                <circle cx="34" cy="32" r="1" fill="hsl(220, 60%, 20%)" />
                <path d="M30 35Q32 37 34 35" stroke="hsl(0, 60%, 45%)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                <path d="M26 38C26 38 28 44 32 44C36 44 38 38 38 38" fill="hsl(260, 50%, 30%)" stroke="hsl(260, 40%, 20%)" strokeWidth="0.5" />
                <path d="M32 40L33 42L35 42L33.5 43.5L34 45.5L32 44L30 45.5L30.5 43.5L29 42L31 42Z" fill="hsl(45, 100%, 50%)" opacity="0.8" />
                <line x1="18" y1="46" x2="50" y2="44" stroke="hsl(30, 50%, 35%)" strokeWidth="2" strokeLinecap="round" />
                <path d="M48 44C50 42 54 41 56 43C54 44 54 46 56 47C54 48 50 47 48 44Z" fill="hsl(35, 60%, 45%)" stroke="hsl(30, 40%, 30%)" strokeWidth="0.5" />
                <motion.circle cx="22" cy="42" r="1.5" fill="hsl(45, 100%, 70%)"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WizardBroom;
