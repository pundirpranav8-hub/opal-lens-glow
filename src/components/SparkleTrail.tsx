import { useEffect, useRef, useCallback } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

const SparkleTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  const spawnSparkles = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 16) return;
    lastSpawnRef.current = now;

    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 0.5;
      sparklesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 1,
        maxLife: Math.random() * 40 + 20,
        size: Math.random() * 3 + 1,
        hue: Math.random() > 0.5 ? 45 : 30 + Math.random() * 30,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      spawnSparkles(e.clientX, e.clientY);
    };

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        spawnSparkles(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparklesRef.current = sparklesRef.current.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.03;
        s.life -= 1 / s.maxLife;

        if (s.life <= 0) return false;

        const alpha = s.life;
        const size = s.size * s.life;

        // Main glow
        ctx.save();
        ctx.globalAlpha = alpha * 0.8;
        ctx.fillStyle = `hsl(${s.hue}, 100%, 70%)`;
        ctx.shadowColor = `hsl(${s.hue}, 100%, 50%)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${s.hue}, 100%, 90%)`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Star cross effect
        if (size > 1.5) {
          ctx.globalAlpha = alpha * 0.4;
          ctx.strokeStyle = `hsl(${s.hue}, 100%, 80%)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - size * 2, s.y);
          ctx.lineTo(s.x + size * 2, s.y);
          ctx.moveTo(s.x, s.y - size * 2);
          ctx.lineTo(s.x, s.y + size * 2);
          ctx.stroke();
        }

        ctx.restore();
        return true;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [spawnSparkles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default SparkleTrail;
