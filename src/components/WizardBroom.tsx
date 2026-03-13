import { useState, useEffect, useRef } from "react";
import { motion, useAnimatePresence } from "framer-motion";

const WizardBroom = () => {
  const [pos, setPos] = useState({ x: 120, y: 100 });
  const [target, setTarget] = useState({ x: 120, y: 100 });
  const [flying, setFlying] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [facingLeft, setFacingLeft] = useState(false);
  const trailId = useRef(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore clicks on interactive elements
      const tag = (e.target as HTMLElement).tagName;
      if (["BUTTON", "A", "INPUT", "TEXTAREA", "VIDEO", "SELECT"].includes(tag)) return;

      const newTarget = { x: e.clientX - 24, y: e.clientY - 24 };
      setFacingLeft(newTarget.x < pos.x);
      setTarget(newTarget);
      setFlying(true);

      // Generate trail particles
      const dx = newTarget.x - pos.x;
      const dy = newTarget.y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(Math.floor(dist / 30), 12);
      const newTrail: { x: number; y: number; id: number }[] = [];
      for (let i = 0; i < count; i++) {
        const t = i / count;
        // Exaggerated arc path
        const arcHeight = Math.min(dist * 0.4, 120);
        const mx = pos.x + dx * t + (Math.random() - 0.5) * 30;
        const my = pos.y + dy * t - Math.sin(t * Math.PI) * arcHeight + (Math.random() - 0.5) * 20;
        newTrail.push({ x: mx, y: my, id: trailId.current++ });
      }
      setTrail((prev) => [...prev, ...newTrail]);

      // Clean trail after animation
      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => !newTrail.find((n) => n.id === p.id)));
      }, 800);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [pos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Swoosh trail particles */}
      {trail.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: 8, height: 8 }}
          initial={{ x: p.x, y: p.y, opacity: 0.9, scale: 1.2 }}
          animate={{ opacity: 0, scale: 0, y: p.y + 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(45 100% 70% / 0.8), hsl(30 100% 50% / 0.4) 60%, transparent)",
              boxShadow: "0 0 8px hsl(45 100% 50% / 0.5)",
            }}
          />
        </motion.div>
      ))}

      {/* Wizard character */}
      <motion.div
        className="absolute"
        style={{ width: 48, height: 48 }}
        animate={{
          x: target.x,
          y: target.y,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 14,
          mass: 0.8,
        }}
        onUpdate={(latest) => {
          if (typeof latest.x === "number" && typeof latest.y === "number") {
            setPos({ x: latest.x as number, y: latest.y as number });
          }
        }}
        onAnimationComplete={() => setFlying(false)}
      >
        {/* Glow under wizard */}
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: 32,
            height: 6,
            background: "radial-gradient(ellipse, hsl(45 100% 50% / 0.3), transparent 70%)",
            filter: "blur(3px)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Wizard SVG */}
        <motion.div
          animate={
            flying
              ? { rotate: [0, facingLeft ? 15 : -15, 0], y: [0, -6, 0] }
              : { y: [0, -5, 0], rotate: [0, 2, -2, 0] }
          }
          transition={
            flying
              ? { duration: 0.5, ease: "easeInOut" }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ transform: facingLeft ? "scaleX(-1)" : "scaleX(1)" }}
        >
          <svg viewBox="0 0 64 64" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hat */}
            <path d="M24 28L32 6L40 28H24Z" fill="hsl(260, 40%, 25%)" stroke="hsl(45, 100%, 50%)" strokeWidth="1" />
            <path d="M30 12L34 10L32 16Z" fill="hsl(45, 100%, 50%)" opacity="0.6" />
            {/* Hat brim */}
            <ellipse cx="32" cy="28" rx="14" ry="3" fill="hsl(260, 40%, 22%)" stroke="hsl(45, 100%, 50%)" strokeWidth="0.8" />
            {/* Head */}
            <circle cx="32" cy="33" r="6" fill="hsl(30, 50%, 75%)" />
            {/* Eyes */}
            <circle cx="30" cy="32" r="1" fill="hsl(220, 60%, 20%)" />
            <circle cx="34" cy="32" r="1" fill="hsl(220, 60%, 20%)" />
            {/* Smile */}
            <path d="M30 35Q32 37 34 35" stroke="hsl(0, 60%, 45%)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            {/* Robe body */}
            <path d="M26 38C26 38 28 44 32 44C36 44 38 38 38 38" fill="hsl(260, 50%, 30%)" stroke="hsl(260, 40%, 20%)" strokeWidth="0.5" />
            {/* Star on robe */}
            <path d="M32 40L33 42L35 42L33.5 43.5L34 45.5L32 44L30 45.5L30.5 43.5L29 42L31 42Z" fill="hsl(45, 100%, 50%)" opacity="0.8" />
            {/* Broom stick */}
            <line x1="18" y1="46" x2="50" y2="44" stroke="hsl(30, 50%, 35%)" strokeWidth="2" strokeLinecap="round" />
            {/* Broom bristles */}
            <path d="M48 44C50 42 54 41 56 43C54 44 54 46 56 47C54 48 50 47 48 44Z" fill="hsl(35, 60%, 45%)" stroke="hsl(30, 40%, 30%)" strokeWidth="0.5" />
            {/* Sparkle near wand hand */}
            <motion.circle
              cx="22" cy="42" r="1.5"
              fill="hsl(45, 100%, 70%)"
              animate={{ opacity: [1, 0.2, 1], r: [1.5, 2, 1.5] as any }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WizardBroom;
