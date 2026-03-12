import { motion } from "framer-motion";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  { src: project1, alt: "Brand identity design", title: "Brand Identity", desc: "Complete visual identity for a luxury brand" },
  { src: project2, alt: "Social media content", title: "Digital Campaign", desc: "Social media content strategy & design" },
  { src: project3, alt: "Video editing suite", title: "Post-Production", desc: "Color grading & editorial for feature film" },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <div className="mb-16">
          <p className="text-ui text-primary mb-3">03</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Projects
          </h2>
          <div className="accent-line mt-6 max-w-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group rounded-xl overflow-hidden bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-foreground font-heading font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
