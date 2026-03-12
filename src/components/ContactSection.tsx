import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            
            <p className="text-ui text-primary mb-3">Get In Touch</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let's Create Together
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Discover how OPAL Media transforms ideas into visuals. 
              Ready to start your next project? Reach out.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}>
            
            <a
              href="mailto:pundirpranav8@gmail.com"
              className="flex items-center justify-center gap-3 text-foreground hover:text-primary transition-colors duration-200">
              
              <Mail className="w-5 h-5 text-primary" />
              pundirpranav8@gmail.com
            </a>
            <a
              href="tel:+91"
              className="flex items-center justify-center gap-3 text-foreground hover:text-primary transition-colors duration-200">+91 7906981533

              <Phone className="w-5 h-5 text-primary" />
              +91 XXXX-XXX-XXX
            </a>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            
            {[
            { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" }].
            map(({ icon: Icon, href, label }) =>
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-card)" }}
              aria-label={label}>
              
                <Icon className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>);

};

export default ContactSection;