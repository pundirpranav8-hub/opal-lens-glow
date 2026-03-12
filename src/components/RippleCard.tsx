import { useState, useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";

interface RippleCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const RippleCard = ({ children, className = "", onClick }: RippleCardProps) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height);
      const id = Date.now();

      setRipples((prev) => [...prev, { id, x, y, size }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);

      if (onClick) {
        setTimeout(onClick, 150);
      }
    },
    [onClick]
  );

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer will-change-transform ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ boxShadow: "var(--shadow-card)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card)";
      }}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </motion.div>
  );
};

export default RippleCard;
