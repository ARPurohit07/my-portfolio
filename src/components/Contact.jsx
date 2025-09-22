import React, { useState, useEffect } from "react";

// --- Reusable Social Icons Component ---
const SocialLinks = () => (
  <div className="social-links">
    <a
      href="https://github.com/ARPurohit07"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub Profile"
    >
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
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    </a>
    <a
      href="https://linkedin.com/in/rohan-purohit-b65062277"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn Profile"
    >
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
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </a>
  </div>
);

const Contact = () => {
  const [status, setStatus] = useState("");

  // This useEffect handles the auto-hiding of the status message
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        setStatus("");
      }, 3500); // Message will disappear after 3.5 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    setStatus("sending");

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <h2 className="section-title">Get In Touch</h2>
      <p>
        I'm always open to discussing new projects, creative ideas, or
        opportunities. Feel free to send me a message.
      </p>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        action="https://formspree.io/f/xldprlgr"
        method="POST"
      >
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your Name"
          />
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Your Email"
          />
        </div>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          placeholder="Your Message"
        ></textarea>

        <button
          type="submit"
          className="hero-button"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Conditionally render the status message based on the status state */}
      {status && (
        <p
          className={`form-status ${
            status === "success" ? "success" : "error"
          }`}
        >
          {status === "success"
            ? "Thanks for your message! I'll get back to you soon."
            : "Something went wrong. Please try again."}
        </p>
      )}

      <SocialLinks />
    </section>
  );
};

export default Contact;
