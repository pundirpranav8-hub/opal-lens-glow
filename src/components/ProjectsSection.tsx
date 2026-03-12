import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  { src: project1, alt: "Brand identity design", title: "Brand Identity", desc: "Complete visual identity for a luxury brand" },
  { src: project2, alt: "Social media content", title: "Digital Campaign", desc: "Social media content strategy & design" },
  { src: project3, alt: "Video editing suite", title: "Post-Production", desc: "Color grading & editorial for feature film" },
];

const reels = [
  { src: "/videos/reel_1.mp4", title: "Reel 01" },
  { src: "/videos/reel_2.mp4", title: "Reel 02" },
  { src: "/videos/reel_3.mp4", title: "Reel 03" },
  { src: "/videos/reel_4.mp4", title: "Reel 04" },
  { src: "/videos/reel_5.mp4", title: "Reel 05" },
];

const ReelCard = ({ src, title, index }: { src: string; title: string; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <motion.div
      className="relative group rounded-xl overflow-hidden bg-card aspect-[9/16] cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ boxShadow: "var(--shadow-card)" }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        muted={muted}
        playsInline
        preload="metadata"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-background/30 flex items-center justify-center transition-opacity duration-300 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          {playing ? (
            <Pause className="w-5 h-5 text-primary" />
          ) : (
            <Play className="w-5 h-5 text-primary ml-0.5" />
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
        <div className="flex items-center justify-between">
          <p className="text-foreground font-heading font-bold text-sm">{title}</p>
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

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

        {/* Static project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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

        {/* Reels */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Reels</h3>
          <p className="text-muted-foreground text-sm">Short-form edits & highlights</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {reels.map((reel, i) => (
            <ReelCard key={reel.src} src={reel.src} title={reel.title} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
