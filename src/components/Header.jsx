import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // This function ensures the menu closes when a navigation link is clicked.
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="#hero" className="header-logo" onClick={handleLinkClick}>
            Rohan Purohit
          </a>

          {/* --- Desktop Navigation --- */}
          <nav className="nav">
            <a href="#timeline">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href="/Rohan_Purohit_CV.pdf" download className="cv-button">
              Download CV
            </a>
          </nav>

          {/* --- Mobile Hamburger Button --- */}
          <button
            className="hamburger-button"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              // Close Icon (X) - This will be styled to be more prominent
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* --- Mobile Navigation Overlay --- */}
      <div className={`mobile-nav-overlay ${isMenuOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <a href="#timeline" onClick={handleLinkClick}>
            Experience
          </a>
          <a href="#skills" onClick={handleLinkClick}>
            Skills
          </a>
          <a href="#projects" onClick={handleLinkClick}>
            Projects
          </a>
          <a href="#contact" onClick={handleLinkClick}>
            Contact
          </a>
          <a href="/Rohan_Purohit_CV.pdf" download className="cv-button-mobile">
            Download CV
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;
