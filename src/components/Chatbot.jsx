import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm Rohan's AI assistant. How can I help you explore his portfolio?",
      suggestions: ["View Projects", "Key Skills", "Contact Him"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(null);
  const chatBodyRef = useRef(null);

  const genericSuggestions = ["Projects", "Skills", "Career Goals"];

  useEffect(() => {
    fetch("/chatbot_model.json")
      .then((response) => response.json())
      .then((data) => setModel(data))
      .catch((error) => console.error("Failed to load chatbot model:", error));
  }, []);

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
      return {
        response:
          "Sorry, my brain isn't loaded yet. Please try again in a moment.",
      };
    const stopWords = new Set([
      "a",
      "an",
      "the",
      "is",
      "are",
      "was",
      "what",
      "who",
      "how",
      "when",
      "where",
      "his",
      "her",
      "tell",
      "me",
      "about",
      "can",
      "you",
      "give",
    ]);
    const lowerInput = userInput
      .toLowerCase()
      .trim()
      .replace(/[?.,!]/g, "");
    if (!lowerInput) return null;
    const inputWords = new Set(
      lowerInput.split(" ").filter((word) => !stopWords.has(word))
    );
    let bestMatch = { score: 0, intent: null };
    for (const intent of model.intents) {
      let currentScore = 0;
      const patternWords = new Set(intent.patterns.join(" ").split(" "));
      for (const word of inputWords) {
        if (patternWords.has(word)) {
          currentScore++;
        }
      }
      if (currentScore > bestMatch.score) {
        bestMatch = { score: currentScore, intent: intent };
      }
    }
    if (bestMatch.score > 0) {
      return bestMatch.intent;
    }
    return {
      response:
        "I'm sorry, I don't understand that. Please try asking a question about Rohan's skills or projects.",
    };
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setTimeout(() => {
      const intent = getResponse(text);
      if (intent) {
        const botMessage = {
          sender: "bot",
          text: intent.response,
          suggestions: intent.suggestions || null,
          tag: intent.tag,
        };
        setMessages((prev) => [...prev, botMessage]);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
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
          {messages.map((msg, index) => {
            const isLastBotMessage =
              index === messages.length - 1 &&
              msg.sender === "bot" &&
              !isLoading;
            const hasSpecificSuggestions =
              msg.suggestions && msg.suggestions.length > 0;
            const lastTag = msg.tag;

            return (
              <div key={index}>
                <div className={`chat-message ${msg.sender}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>

                {isLastBotMessage && (
                  <>
                    {hasSpecificSuggestions && (
                      <div className="suggestion-buttons">
                        {msg.suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestionClick(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                    {!hasSpecificSuggestions && (
                      <div className="follow-up-prompt">
                        <p>What else would you like to know?</p>
                        <div className="suggestion-buttons">
                          {genericSuggestions
                            .filter((s) => {
                              const suggestionAsTag = s
                                .toLowerCase()
                                .replace(/ /g, "_");
                              return !lastTag?.includes(suggestionAsTag);
                            })
                            .map((s, i) => (
                              <button
                                key={i}
                                onClick={() => handleSuggestionClick(s)}
                              >
                                {s}
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
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
        <form className="chatbot-input-form" onSubmit={handleFormSubmit}>
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
