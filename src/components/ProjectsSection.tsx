import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronDown, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import project1 from "@/assets/project-1-new.png";
import project4 from "@/assets/project-4.avif";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.avif";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.avif";
import project9 from "@/assets/project-9.avif";
import productKovey from "@/assets/product-kovey-statement.jpg";
import productKovey2 from "@/assets/product-kovey-statement-2.jpg";
import productKoveyWildflower from "@/assets/product-kovey-wildflower.jpg";

interface Project {
  src: string;
  alt: string;
  title: string;
  desc: string;
  gallery?: { src: string; alt: string }[];
}

const projects: Project[] = [
  {
    src: project1,
    alt: "Brand identity design",
    title: "Brand Identity",
    desc: "Complete visual identity for a luxury brand",
    gallery: [
      { src: project4, alt: "Brand identity creative direction" },
      { src: project5, alt: "Brand identity venue photography" },
      { src: project7, alt: "Romeo Lane event photography" },
      { src: project6, alt: "Venue branding" },
      { src: project8, alt: "Brand visual identity" },
      { src: project9, alt: "Featured brand work" },
    ],
  },
];

const productPhotos = [
  { src: productKovey, alt: "Kovey Statement parfum bottle held in hands", title: "Kovey · Statement" },
  { src: productKovey2, alt: "Kovey Statement parfum bottle warm cinematic light", title: "Kovey · Statement II" },
  { src: productKoveyWildflower, alt: "Woman holding Kovey Wildflower parfum bottle outdoors", title: "Kovey · Wildflower" },
];

const reels = [
  { src: "/videos/reel_1.mp4", title: "Reel 01" },
  { src: "/videos/reel_2.mp4", title: "Reel 02" },
  { src: "/videos/reel_3.mp4", title: "Reel 03" },
  { src: "/videos/reel_4.mp4", title: "Reel 04" },
  { src: "/videos/reel_5.mp4", title: "Reel 05" },
];

const ReelCard = ({
  src,
  title,
  index,
  onExpand,
}: {
  src: string;
  title: string;
  index: number;
  onExpand: () => void;
}) => {
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

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExpand();
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

      {/* Expand button */}
      <button
        onClick={handleExpand}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="View fullscreen"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

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
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // Image lightbox: a flat list of all gallery images across projects + product photos
  const allImages = [
    ...projects.flatMap((p) => p.gallery ?? []),
    ...productPhotos.map((p) => ({ src: p.src, alt: p.alt })),
  ];
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  const openImage = (i: number) => setImageIndex(i);
  const closeImage = () => setImageIndex(null);
  const nextImage = () =>
    setImageIndex((idx) => (idx === null ? idx : (idx + 1) % allImages.length));
  const prevImage = () =>
    setImageIndex((idx) =>
      idx === null ? idx : (idx - 1 + allImages.length) % allImages.length
    );

  // Reel lightbox
  const [reelIndex, setReelIndex] = useState<number | null>(null);
  const closeReel = () => setReelIndex(null);
  const nextReel = () =>
    setReelIndex((idx) => (idx === null ? idx : (idx + 1) % reels.length));
  const prevReel = () =>
    setReelIndex((idx) =>
      idx === null ? idx : (idx - 1 + reels.length) % reels.length
    );

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <div className="mb-16">
          <p className="text-ui text-primary mb-3">02</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Projects
          </h2>
          <div className="accent-line mt-6 max-w-xs" />
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="rounded-xl overflow-hidden bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className={`group ${project.gallery ? "cursor-pointer" : ""}`}
                onClick={() => project.gallery && setExpandedProject(expandedProject === i ? null : i)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.src}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground font-heading font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
                  </div>
                  {project.gallery && (
                    <motion.div
                      animate={{ rotate: expandedProject === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Expandable gallery */}
              <AnimatePresence>
                {project.gallery && expandedProject === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 grid grid-cols-2 gap-3">
                      {project.gallery.map((img, j) => {
                        // compute flat index
                        const flatIndex =
                          projects.slice(0, i).reduce((acc, p) => acc + (p.gallery?.length ?? 0), 0) + j;
                        return (
                          <motion.div
                            key={j}
                            className="relative group/img rounded-lg overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: j * 0.1, duration: 0.3 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openImage(flatIndex);
                            }}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover aspect-square rounded-lg group-hover/img:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-background/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize2 className="w-5 h-5 text-foreground" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Product Photography */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Product Photography</h3>
          <p className="text-muted-foreground text-sm">Crafted product stories & brand still life</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {productPhotos.map((photo, i) => {
            const flatIndex =
              projects.reduce((acc, p) => acc + (p.gallery?.length ?? 0), 0) + i;
            return (
              <motion.div
                key={photo.title}
                className="relative group cursor-pointer rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => openImage(flatIndex)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl glass-photo-card">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none water-drops opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 rounded-2xl glass-border" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/90 via-background/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-foreground font-heading font-bold text-sm">{photo.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">Click to view</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reels */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Reels</h3>
          <p className="text-muted-foreground text-sm">Short-form edits & highlights</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {reels.map((reel, i) => (
            <ReelCard
              key={reel.src}
              src={reel.src}
              title={reel.title}
              index={i}
              onExpand={() => setReelIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {imageIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeImage}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              onClick={closeImage}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div
              key={imageIndex}
              className="relative max-w-4xl max-h-[85vh] mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden lightbox-glass">
                <img
                  src={allImages[imageIndex].src}
                  alt={allImages[imageIndex].alt}
                  className="max-h-[80vh] w-auto rounded-2xl object-contain"
                />
                <div className="absolute inset-0 rounded-2xl glass-border" />
              </div>
              <div className="text-center mt-4">
                <p className="text-muted-foreground text-sm">{imageIndex + 1} / {allImages.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reel Lightbox */}
      <AnimatePresence>
        {reelIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeReel}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              onClick={closeReel}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevReel(); }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextReel(); }}
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div
              key={reelIndex}
              className="relative mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden lightbox-glass bg-black">
                <video
                  src={reels[reelIndex].src}
                  className="max-h-[85vh] w-auto rounded-2xl"
                  controls
                  autoPlay
                  playsInline
                />
                <div className="absolute inset-0 rounded-2xl glass-border pointer-events-none" />
              </div>
              <div className="text-center mt-4">
                <p className="text-foreground font-heading font-bold text-lg">{reels[reelIndex].title}</p>
                <p className="text-muted-foreground text-sm">{reelIndex + 1} / {reels.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
