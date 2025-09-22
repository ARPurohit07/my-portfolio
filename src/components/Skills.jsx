import React from "react";

// --- SVG Icon Components for each category ---
const BrainIcon = () => (
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
    className="skill-icon"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2h3Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h3A2.5 2.5 0 0 0 20 19.5v-15A2.5 2.5 0 0 0 17.5 2h-3Z"></path>
  </svg>
);
const CodeIcon = () => (
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
    className="skill-icon"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);
const DatabaseIcon = () => (
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
    className="skill-icon"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const Skills = () => {
  // New, more strategic data structure
  const skillsData = [
    {
      category: "Core AI/ML Concepts",
      icon: <BrainIcon />,
      skillsList: [
        "Deep Learning frameworks",
        "Neural Networks",
        "Feature Engineering",
        "Model Evaluation",
      ],
    },
    {
      category: "Frameworks & Libraries",
      icon: <CodeIcon />,
      skillsList: [
        "TensorFlow",
        "Keras",
        "PyTorch",
        "OpenCV",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Matplotlib",
      ],
    },
    {
      category: "Languages & Development Tools",
      icon: <DatabaseIcon />,
      skillsList: [
        "Python",
        "JavaScript",
        "React",
        "C/C++",
        "C#/.NET",
        "SQL",
        "Git",
        "Docker",
        "Streamlit",
      ],
    },
  ];

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Technical Expertise</h2>
      <div className="skills-container">
        {skillsData.map((skillSet) => (
          <div key={skillSet.category} className="skill-item">
            <div className="skill-icon-container">{skillSet.icon}</div>
            <div className="skill-details">
              <h3 className="skill-category-title">{skillSet.category}</h3>
              <div className="skill-tags">
                {skillSet.skillsList.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
