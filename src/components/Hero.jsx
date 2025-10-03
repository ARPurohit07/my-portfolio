import React from "react";
import Galaxy from "./Galaxy"; 

const HeroTop = () => (
  <div className="hero-top">
    <h1>Software Engineer</h1>
  </div>
);

const HeroBottom = () => (
  <div className="hero-bottom">
    <p>
      A dedicated engineer turning complex problems into elegant software
      solutions.
    </p>
    <button
      onClick={() => document.getElementById("projects")?.scrollIntoView()}
      className="hero-button"
    >
      Explore My Work
    </button>
  </div>
);

const Hero = () => (
  <section id="hero" className="hero">
    <Galaxy /> {/* The spiral galaxy now lives exclusively here */}
    <HeroTop />
    <HeroBottom />
  </section>
);

export default Hero;
