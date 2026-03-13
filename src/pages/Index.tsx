import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import HeroSection from "@/components/HeroSection";
import LiquidGlass from "@/components/LiquidGlass";
import PortfolioCards from "@/components/PortfolioCards";
import PhotographySection from "@/components/PhotographySection";
import VideographySection from "@/components/VideographySection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SparkleTrail from "@/components/SparkleTrail";

import WizardBroom from "@/components/WizardBroom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SparkleTrail />
      <WizardBroom />
      <Navbar />
      <ThemeToggle />
      <HeroSection />
      <LiquidGlass />

      {/* Interactive Cards Section */}
      <section className="section-padding -mt-12">
        <div className="container-max">
          <PortfolioCards />
        </div>
      </section>

      <PhotographySection />
      <VideographySection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
