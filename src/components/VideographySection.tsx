import { motion } from "framer-motion";
import { Play } from "lucide-react";
import video1 from "@/assets/video-1.jpg";
import video2 from "@/assets/video-2.jpg";
import video3 from "@/assets/video-3.jpg";

const videos = [
  { src: video1, alt: "Behind the scenes film production", title: "Behind the Lens", desc: "Documentary short film" },
  { src: video2, alt: "Aerial desert highway", title: "Horizon Drive", desc: "Brand commercial" },
  { src: video3, alt: "Concert stage performance", title: "Stage Light", desc: "Music video production" },
];

const VideographySection = () => {
  return (
    <section id="videography" className="section-padding">
      <div className="container-max">
        <div className="mb-16">
          <p className="text-ui text-primary mb-3">02</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Videography
          </h2>
          <div className="accent-line mt-6 max-w-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <motion.div
              key={video.title}
              className="relative group rounded-xl overflow-hidden aspect-video bg-card cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img
                src={video.src}
                alt={video.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-background/60 transition-colors duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 text-primary ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-foreground font-heading font-bold text-lg">{video.title}</h3>
                <p className="text-muted-foreground text-sm">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideographySection;
