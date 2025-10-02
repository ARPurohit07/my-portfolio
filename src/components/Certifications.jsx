import React, { useState } from "react";
import CertificationModal from "./CertificationModal"; // Import the new modal component

// Import the certificate images
import codingNinjasLogo from "../assets/dsa-logo.png";
import courseraLogo from "../assets/nlp-logo.png";

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificationsData = [
    {
      title: "Data Structures in C++",
      issuer: "Coding Ninjas",
      date: "Completed: Oct 2023",
      image: codingNinjasLogo,
    },
    {
      title:
        "Natural Language Processing with Classification and Vector Spaces",
      issuer: "DeepLearning.AI & Coursera",
      date: "Completed: May 2025",
      image: courseraLogo,
    },
  ];

  return (
    <>
      <section id="certifications" className="section">
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-container">
          {certificationsData.map((cert, index) => (
            <div
              key={index}
              className="certification-item"
              onClick={() => setSelectedCert(cert)} // Set the selected certificate on click
            >
              <img
                src={cert.image}
                alt={`${cert.issuer} logo`}
                className="certification-thumbnail"
              />
              <div className="certification-details">
                <h3 className="certification-title">{cert.title}</h3>
                <p className="certification-issuer">{cert.issuer}</p>
                <p className="certification-date">{cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditionally render the modal when a certificate is selected */}
      {selectedCert && (
        <CertificationModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </>
  );
};

export default Certifications;
