import React, { useState } from "react";
import ProjectModal from "./ProjectModal"; // Import the new modal component

// --- Icon Components ---
const VisionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="project-icon"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const MedicalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="project-icon"
  >
    <path d="M21.5 12H19.5C18.4 12 17.5 12.9 17.5 14V19C17.5 20.1 18.4 21 19.5 21H21.5C22.6 21 23.5 20.1 23.5 19V14C23.5 12.9 22.6 12 21.5 12Z" />
    <path d="M15.5 12H13.5C12.4 12 11.5 12.9 11.5 14V19C11.5 20.1 12.4 21 13.5 21H15.5C16.6 21 17.5 20.1 17.5 19V14C17.5 12.9 16.6 12 15.5 12Z" />
    <path d="M9.5 12H7.5C6.4 12 5.5 12.9 5.5 14V19C5.5 20.1 6.4 21 7.5 21H9.5C10.6 21 11.5 20.1 11.5 19V14C11.5 12.9 10.6 12 9.5 12Z" />
    <path d="M3.5 12H1.5C0.4 12 -0.5 12.9 -0.5 14V19C-0.5 20.1 0.4 21 1.5 21H3.5C4.6 21 5.5 20.1 5.5 19V14C5.5 12.9 4.6 12 3.5 12Z" />
    <path d="M12 2L12 12" />
  </svg>
);
const ToolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="project-icon"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.7-3.7a1 1 0 0 0-1.4-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-3.7 3.7z"></path>
    <path d="m18 9.8-4.2 4.2"></path>
    <path d="m6.3 14.7-1.6 1.6a1 1 0 0 0 0 1.4l3.7 3.7a1 1 0 0 0 1.4-1.4l1.6-1.6"></path>
    <path d="m9.8 18-4.2-4.2"></path>
    <path d="m2 2 20 20"></path>
  </svg>
);
const WebIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="project-icon"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projectData = [
    // ... your projectData array remains exactly the same as before
    {
      title: "Military Drone Detection System",
      shortDescription:
        "Engineered a computer vision pipeline for real-time, multi-camera object detection and classification.",
      tags: ["Keras", "TensorFlow", "OpenCV", "Python"],
      icon: <VisionIcon />,
      githubUrl:
        "https://github.com/ARPurohit07/Military-Drone-Detection-System",
      longDescription:
        "This system provides a real-time solution for identifying and classifying military-grade drones from multiple video feeds. It utilizes a custom-trained CNN to distinguish between drone types, forming a critical component of a modern surveillance and defense apparatus.",
      challenges:
        "The primary challenge was maintaining high accuracy while minimizing false positives from objects like birds. Additionally, processing multiple high-resolution video streams in real-time required significant pipeline optimization to avoid latency.",
    },
    {
      title: "Pneumonia Detection from X-Rays",
      shortDescription:
        "Designed and trained a TensorFlow CNN on 5,000+ chest X-rays to improve diagnostic accuracy.",
      tags: ["TensorFlow", "CNN", "Healthcare"],
      icon: <MedicalIcon />,
      githubUrl: "https://github.com/ARPurohit07/Skin-Disease-Detection",
      longDescription:
        "An AI-powered diagnostic tool designed to assist medical professionals by classifying chest X-rays to detect pneumonia. The project involved training a deep learning model on a large, labeled dataset of medical images, achieving high accuracy through data augmentation and normalization techniques.",
      challenges:
        "The dataset was highly imbalanced, and the high visual similarity between healthy and infected lungs made classification difficult. Overcoming this required careful model tuning and data preprocessing to avoid overfitting.",
    },
    {
      title: "AI-Based Image Downloader",
      shortDescription:
        "Built a Streamlit application that uses the CLIP model for intelligent, content-based bulk image filtering and downloading.",
      tags: ["Streamlit", "CLIP", "Python", "AI APIs"],
      icon: <ToolIcon />,
      githubUrl: "https://github.com/ARPurohit07/Image-Downloader",
      longDescription:
        "A user-friendly Streamlit application that automates the process of finding and downloading images based on semantic content rather than just keywords. It leverages OpenAI's CLIP model to understand image context.",
      challenges:
        "Integrating the powerful but complex CLIP model into a lightweight Streamlit interface was a key challenge. Another hurdle was managing API requests efficiently and handling bulk downloads without crashing the application.",
    },
    {
      title: "Personal Portfolio Website",
      shortDescription:
        "A responsive personal portfolio built with React, featuring a custom AI chatbot to showcase projects and skills.",
      tags: ["React", "JavaScript", "CSS", "UI/UX"],
      icon: <WebIcon />,
      githubUrl: "https://github.com/ARPurohit07",
      longDescription:
        "This fully responsive website was created to serve as a central hub for my professional work. It's built from the ground up using React and modern CSS for a clean, performant user experience. The integrated AI chatbot is a key feature, demonstrating the ability to create interactive and intelligent user interfaces.",
      challenges:
        "A major challenge was ensuring the website and its complex animations were performant on all devices, especially mobile. Implementing the chatbot's logic, including the keyword-scoring algorithm and state management, required careful planning and iterative debugging.",
    },
  ];

  return (
    <>
      <section id="projects" className="section">
        <h2 className="section-title">Key Projects</h2>
        <div className="projects-container">
          {projectData.map((project, index) => (
            <div
              key={index}
              className="project-wrapper project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-item">
                <div className="project-icon-container">{project.icon}</div>
                <div className="project-details">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">
                    {project.shortDescription}
                  </p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Projects;
