import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("chatbot-history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse chat history:", e);
      }
    }
    return [
      {
        sender: "bot",
        text: "Hello! I'm Rohan's AI assistant. How can I help you explore his portfolio?",
        suggestions: ["View Projects", "Key Skills", "Contact Him"],
        timestamp: new Date().toISOString(),
      },
    ];
  });
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [conversationContext, setConversationContext] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);

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

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatbot-history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    const initialMessage = {
      sender: "bot",
      text: "Chat cleared! How can I help you?",
      suggestions: ["View Projects", "Key Skills", "Contact Him"],
      timestamp: new Date().toISOString(),
    };
    setMessages([initialMessage]);
    setConversationContext([]);
    localStorage.removeItem("chatbot-history");
  };

  // Levenshtein distance for fuzzy matching
  const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  // Calculate TF-IDF similarity
  const calculateTFIDF = (userInput, intent) => {
    const allPatterns = intent.patterns.join(" ").toLowerCase();
    const userWords = userInput.toLowerCase().split(" ");
    const patternWords = allPatterns.split(" ");
    
    let score = 0;
    userWords.forEach((word) => {
      // Exact match
      if (patternWords.includes(word)) {
        score += 2;
      } else {
        // Fuzzy match
        patternWords.forEach((pWord) => {
          const distance = levenshteinDistance(word, pWord);
          const maxLen = Math.max(word.length, pWord.length);
          if (distance <= 2 && maxLen > 3) {
            score += 1 - distance / maxLen;
          }
        });
      }
    });
    
    // Boost score if context matches
    if (conversationContext.length > 0) {
      const lastContext = conversationContext[conversationContext.length - 1];
      if (intent.tag.includes(lastContext) || lastContext.includes(intent.tag)) {
        score *= 1.3;
      }
    }
    
    return score;
  };

  const getResponse = (userInput) => {
    if (!model)
      return {
        response:
          "Sorry, my brain isn't loaded yet. Please try again in a moment.",
      };
    
    const lowerInput = userInput.toLowerCase().trim();
    if (!lowerInput) return null;

    let bestMatch = { score: 0, intent: null };
    
    for (const intent of model.intents) {
      const score = calculateTFIDF(lowerInput, intent);
      if (score > bestMatch.score) {
        bestMatch = { score, intent };
      }
    }

    // Track analytics
    if (bestMatch.intent) {
      setAnalytics((prev) => ({
        ...prev,
        [bestMatch.intent.tag]: (prev[bestMatch.intent.tag] || 0) + 1,
      }));
    }

    // Require minimum confidence threshold
    if (bestMatch.score > 1.5) {
      return bestMatch.intent;
    }

    return {
      response:
        "I'm not quite sure about that. Could you rephrase? You can also try asking about Rohan's skills, projects, or experience.",
      suggestions: ["Show me projects", "What are his skills?", "Contact info"],
    };
  };

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    const userMessage = { 
      sender: "user", 
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate more realistic typing delay based on response length
    const intent = getResponse(text);
    const delay = intent ? Math.min(800 + intent.response.length * 10, 2000) : 1000;
    
    setTimeout(() => {
      if (intent) {
        const botMessage = {
          sender: "bot",
          text: intent.response,
          suggestions: intent.suggestions || null,
          tag: intent.tag,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMessage]);
        
        // Update conversation context
        if (intent.tag) {
          setConversationContext((prev) => [...prev.slice(-2), intent.tag]);
        }
      }
      setIsLoading(false);
    }, delay);
  }, [model, conversationContext]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
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
          <div>
            <h3>Rohan's AI Assistant</h3>
            <span className="chatbot-status">Online</span>
          </div>
          <div className="chatbot-header-actions">
            <button 
              className="chatbot-clear-button" 
              onClick={clearChat}
              title="Clear chat"
              aria-label="Clear chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
            </button>
            <button className="chatbot-close-button" onClick={toggleChat}>
              &times;
            </button>
          </div>
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
                  <div className="message-content">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    {msg.timestamp && (
                      <span className="message-timestamp">
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    )}
                  </div>
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
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about my skills..."
            disabled={isLoading}
            aria-label="Chat input"
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
