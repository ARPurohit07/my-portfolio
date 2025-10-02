import React, { useEffect } from "react";

// --- Reusable Icon Components ---
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);
const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const ProjectModal = ({ project, onClose }) => {
  // Effect to handle closing the modal with the Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div
        className="project-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="project-modal-close-button" onClick={onClose}>
          &times;
        </button>

        <h2 className="project-modal-title">{project.title}</h2>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-modal-section">
          <h3 className="project-modal-subtitle">
            <InfoIcon />
            <span>About This Project</span>
          </h3>
          <p>{project.longDescription}</p>
        </div>

        <div className="project-modal-section">
          <h3 className="project-modal-subtitle">
            <TargetIcon />
            <span>Key Challenges</span>
          </h3>
          <p>{project.challenges}</p>
        </div>

        <div className="project-modal-links">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
          >
            View Code on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
