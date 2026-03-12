import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
  }, [isLight]);

  return (
    <button
      onClick={() => setIsLight(!isLight)}
      className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-card flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-button)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-button-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-button)";
      }}
      aria-label="Toggle theme"
    >
      {isLight ? (
        <Moon className="w-5 h-5 text-foreground" />
      ) : (
        <Sun className="w-5 h-5 text-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
