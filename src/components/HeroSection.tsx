import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Photographer at golden hour"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.p
          className="text-ui text-primary mb-6 tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          OPAL Media
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-foreground mb-6 glow-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Crafting Stories Through{" "}
          <span className="text-primary">Lens & Edit</span>
        </motion.h1>

        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          I'm Pranav Pundir, a freelance director and editor. OPAL Media is my studio — 
          a commitment to transforming ideas into resonant visual narratives.
        </motion.p>

        <motion.a
          href="#photography"
          className="inline-block text-ui bg-primary text-primary-foreground px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5"
          style={{ boxShadow: "var(--shadow-button)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-button-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-button)";
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#photography")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore the Work
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
