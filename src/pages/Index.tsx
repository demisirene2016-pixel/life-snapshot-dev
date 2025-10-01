import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AwardsSection from "@/components/sections/AwardsSection";
import ContactSection from "@/components/sections/ContactSection";
import portfolioDataJson from "@/data/portfolio.json";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [logoClicks, setLogoClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const navigate = useNavigate();

  // Load portfolio data from localStorage or use default JSON
  const portfolioData = (() => {
    const saved = localStorage.getItem("portfolioData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
    // Save default data to localStorage on first load
    localStorage.setItem("portfolioData", JSON.stringify(portfolioDataJson));
    return portfolioDataJson;
  })();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogoClick = () => {
    const now = Date.now();
    const timeDiff = now - lastClickTime;

    // Reset counter if more than 1 second between clicks
    if (timeDiff > 1000) {
      setLogoClicks(1);
    } else {
      setLogoClicks((prev) => prev + 1);
    }

    setLastClickTime(now);

    // Navigate to admin after 5 clicks
    if (logoClicks + 1 >= 5) {
      navigate("/admin");
      setLogoClicks(0);
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navigation onLogoClick={handleLogoClick} />
          <HomeSection data={portfolioData.home} />
          <AboutSection data={portfolioData.about} />
          <ExperienceSection data={portfolioData.experience} />
          <SkillsSection data={portfolioData.skills} />
          <ProjectsSection data={portfolioData.projects} />
          <AwardsSection data={portfolioData.awards} />
          <ContactSection data={portfolioData.contact} />
        </motion.div>
      )}
    </div>
  );
};

export default Index;
