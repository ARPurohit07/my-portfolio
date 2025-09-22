import React, { useEffect } from "react";

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

        <div className="project-modal-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-modal-section">
          <h3 className="project-modal-subtitle">About This Project</h3>
          <p>{project.longDescription}</p>
        </div>

        <div className="project-modal-section">
          <h3 className="project-modal-subtitle">Key Challenges</h3>
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
