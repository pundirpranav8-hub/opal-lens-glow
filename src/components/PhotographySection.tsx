import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import realPhoto1 from "@/assets/real-photo-1.webp";
import realPhoto2 from "@/assets/real-photo-2.jpg";
import realPhoto3 from "@/assets/real-photo-3.jpg";
import realPhoto4 from "@/assets/real-photo-4.jpg";
import realPhoto5 from "@/assets/real-photo-5.jpg";
import realPhoto6 from "@/assets/real-photo-6.jpg";
import realPhoto7 from "@/assets/real-photo-7.jpg";
import realPhoto8 from "@/assets/real-photo-8.jpg";
import realPhoto9 from "@/assets/real-photo-9.jpg";

const photos = [
{ src: realPhoto1, alt: "Food & lifestyle photography", title: "Culinary Vibes" },
{ src: realPhoto2, alt: "Event photography", title: "Night Energy" },
{ src: realPhoto3, alt: "Nature macro photography", title: "Bougainvillea Bloom" },
{ src: realPhoto4, alt: "Product photography", title: "Golden Spirit" },
{ src: realPhoto5, alt: "Neon signage photography", title: "Neon Nights" },
{ src: realPhoto6, alt: "Mountain biking adventure photography", title: "Trail Brotherhood" },
{ src: realPhoto7, alt: "DJ nightlife event photography", title: "Romeo Lane Nights" },
{ src: realPhoto8, alt: "Party portrait photography", title: "Dance & Lights" }];


const PhotographySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % photos.length);
  };
  const goPrev = () => {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <section id="photography" className="section-padding">
        <div className="container-max">
          <div className="mb-16">
            <p className="text-ui text-primary mb-3">01</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Photography
            </h2>
            <div className="accent-line mt-6 max-w-xs" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {photos.map((photo, i) =>
            <motion.div
              key={photo.title}
              className="relative group cursor-pointer rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => openLightbox(i)}>
              
                {/* Glass card container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl glass-photo-card">
                  {/* Image */}
                  <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy" />
                

                  {/* Glass overlay effect */}
                  

                  {/* Water droplet refraction spots */}
                  <div className="absolute inset-0 pointer-events-none water-drops opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* 3D glass border */}
                  <div className="absolute inset-0 rounded-2xl glass-border" />

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/90 via-background/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-foreground font-heading font-bold text-sm">
                      {photo.title}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">Click to view</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null &&
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeLightbox}>
          
            {/* Close button */}
            <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close">
            
              <X className="w-5 h-5" />
            </button>

            {/* Nav buttons */}
            <button
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
            onClick={(e) => {e.stopPropagation();goPrev();}}
            aria-label="Previous">
            
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
            onClick={(e) => {e.stopPropagation();goNext();}}
            aria-label="Next">
            
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
            key={selectedIndex}
            className="relative max-w-4xl max-h-[85vh] mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}>
            
              <div className="relative rounded-2xl overflow-hidden lightbox-glass">
                <img
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                className="max-h-[80vh] w-auto rounded-2xl object-contain" />
              
                <div className="absolute inset-0 rounded-2xl glass-border" />
              </div>
              <div className="text-center mt-4">
                <p className="text-foreground font-heading font-bold text-lg">{photos[selectedIndex].title}</p>
                <p className="text-muted-foreground text-sm">{selectedIndex + 1} / {photos.length}</p>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

};

export default PhotographySection;