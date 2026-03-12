import { motion } from "framer-motion";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import photo5 from "@/assets/photo-5.jpg";
import photo6 from "@/assets/photo-6.jpg";

const photos = [
  { src: photo1, alt: "Studio portrait session", title: "Editorial Portrait" },
  { src: photo2, alt: "Urban street photography", title: "City Nights" },
  { src: photo3, alt: "Landscape photography", title: "Dawn Peaks" },
  { src: photo4, alt: "Wedding photography", title: "Golden Hour Love" },
  { src: photo5, alt: "Food photography", title: "Culinary Art" },
  { src: photo6, alt: "Product photography", title: "Luxury Detail" },
];

const PhotographySection = () => {
  return (
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
          {photos.map((photo, i) => (
            <motion.div
              key={photo.title}
              className="relative group rounded-xl overflow-hidden aspect-[4/5] bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-foreground font-heading font-bold text-sm">
                  {photo.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographySection;
