import { motion } from "framer-motion";
import aboutImg from "@/assets/about-portrait.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto md:mx-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <img
              src={aboutImg}
              alt="Pranav Pundir - Founder of OPAL Media"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-ui text-primary mb-3">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              The Eye Behind <span className="text-primary">OPAL</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-lg">
              <p>
                I'm Pranav Pundir — a freelance director, photographer, and editor based in India. 
                OPAL Media is my creative studio, born from a deep passion for visual storytelling.
              </p>
              <p>
                From intimate portraits to large-scale brand campaigns, I bring a cinematic eye 
                to every project. My work sits at the intersection of technical precision and 
                raw emotion — because great visuals aren't just seen, they're felt.
              </p>
              <p>
                Whether it's behind the lens or in the edit suite, I'm committed to crafting 
                narratives that resonate and visuals that endure.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
