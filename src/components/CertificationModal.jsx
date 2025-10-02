import React, { useEffect } from "react";

const CertificationModal = ({ certificate, onClose }) => {
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
        className="certification-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="project-modal-close-button" onClick={onClose}>
          &times;
        </button>
        <img
          src={certificate.image}
          alt={`${certificate.title} Certificate`}
          className="certification-modal-image"
        />
        <h3 className="certification-modal-title">{certificate.title}</h3>
        <p className="certification-modal-issuer">{certificate.issuer}</p>
      </div>
    </div>
  );
};

export default CertificationModal;