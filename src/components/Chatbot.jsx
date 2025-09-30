import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm Rohan's AI assistant. Ask me about his skills, projects, or education.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(null);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    fetch("/chatbot_model.json")
      .then((response) => response.json())
      .then((data) => setModel(data))
      .catch((error) => console.error("Failed to load chatbot model:", error));
  }, []);

  // This hook listens for the custom event from the header button
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chatbot", handleOpenChat);
    return () => {
      window.removeEventListener("open-chatbot", handleOpenChat);
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getResponse = (userInput) => {
    if (!model)
      return "Sorry, my brain isn't loaded yet. Please try again in a moment.";

    const lowerInput = userInput
      .toLowerCase()
      .trim()
      .replace(/[?.,!]/g, "");

    const allKeywords = new Set();
    model.intents.forEach((intent) => {
      intent.patterns.forEach((pattern) => {
        pattern.split(" ").forEach((word) => allKeywords.add(word));
      });
    });

    const inputWords = lowerInput.split(" ");
    const hasKnownKeyword = inputWords.some((word) => allKeywords.has(word));

    for (const intent of model.intents) {
      for (const pattern of intent.patterns) {
        if (pattern.includes(lowerInput)) {
          return intent.response;
        }
      }
    }

    if (hasKnownKeyword) {
      return "That's a great question! For more specific details, I'd recommend reaching out to Rohan directly via the contact form.";
    } else {
      return "I'm sorry, I don't understand that. Please try asking a question about Rohan's skills, projects, or education.";
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    const question = inputValue;
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      let answer;
      if (model) {
        answer = getResponse(question);
      } else {
        answer =
          "My knowledge base is still loading. Please try again shortly.";
      }
      const botMessage = { sender: "bot", text: answer };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return ReactDOM.createPortal(
    <>
      <button
        className="chatbot-fab"
        onClick={toggleChat}
        aria-label="Open Chatbot"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </button>

      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h3>Rohan's AI Assistant</h3>
          <button className="chatbot-close-button" onClick={toggleChat}>
            &times;
          </button>
        </div>
        <div className="chatbot-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
        <form className="chatbot-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about my skills..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading} aria-label="Send Message">
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
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </>,
    document.getElementById("chatbot-portal")
  );
};

export default Chatbot;
