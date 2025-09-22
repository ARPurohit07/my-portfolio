import React from "react";

// --- SVG Icons for Timeline Items ---
const WorkIcon = () => (
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
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);
const EducationIcon = () => (
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
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c0 5 6 5 6 5s6 0 6-5v-5"></path>
  </svg>
);

const Timeline = () => {
  const timelineData = [
    {
      type: "Work",
      title: "Intern - Bharat Electronics Limited (BEL)",
      date: "Jun 2025 - Jul 2025",
      description:
        "Engineered a defence-grade object detection pipeline (YOLO/Faster R-CNN) for real-time drone tracking and reduced false positives by 30% through multi-perspective fusion.",
      icon: <WorkIcon />,
    },
    {
      type: "Work",
      title: "Intern - Pan India Consultants Pvt. Ltd.",
      date: "Jun 2024",
      description:
        "Built a C#/.NET serial port communication tool for industrial hardware and integrated PostgreSQL with applications, improving data access speed by 20%.",
      icon: <WorkIcon />,
    },
    {
      type: "Education",
      title: "B.E. Computer Science Engineering",
      date: "2022 - Present",
      description: "Thapar Institute of Engineering & Technology, Patiala.",
      icon: <EducationIcon />,
    },
  ];

  return (
    <section id="timeline" className="section">
      <h2 className="section-title">Experience & Education</h2>
      <div className="timeline-container">
        {timelineData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-icon-container">{item.icon}</div>
            <div className="timeline-content">
              <span className="timeline-date">{item.date}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
