import React from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import YouTubeSection from './sections/youtube';
import MusicToggle from "./sections/MusicToggle";
import PikachuNav from "./components/PikachuNav";

const App = () => {
  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div>
        <Hero />
        <About />
        <YouTubeSection />
        <Projects />
        <Experiences />
        <Testimonial />
        <Contact />
        <Footer />
        <MusicToggle />
        <PikachuNav onNavigate={handleNavigate} />
      </div>

     
    </>
  );
};

export default App;
