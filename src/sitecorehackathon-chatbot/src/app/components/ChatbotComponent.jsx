'use client'
import { useState, useEffect } from 'react';
import faqData from '../chatbotcontent/queries.json';

const ChatbotComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [faqDataLoaded, setFaqDataLoaded] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(true); // Track chatbot visibility

  // Fetch and set FAQ data on component load
  useEffect(() => {
    setFaqDataLoaded(faqData); // Set your FAQ data
  }, []);

  // Handle sending messages
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user's message to the chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: userInput, sender: 'user' },
    ]);

    // Check if input matches any FAQ question
    const faqMatch = faqDataLoaded
      .flatMap((item) => item.faqs)
      .find((faq) => faq.question.toLowerCase().includes(userInput.toLowerCase()));

    let botResponse = "Good question! Unfortunately, my crystal ball knowledge is cloudy on this one. Check the official Sitecore Hackathon page https://sitecorehackathon.org/ for enlightenment!";

    if (faqMatch) {
      botResponse = faqMatch.answer;
    }

    // Add bot's response to the chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: botResponse, sender: 'bot' },
    ]);

    // Clear user input after sending message
    setUserInput('');
  };

  // Handle closing the chatbot
  const handleCloseChat = () => {
    setIsChatVisible(false); // Hide the chatbot when the close button is clicked
  };

  if (!isChatVisible) return null; // Return null if chatbot is hidden

  return (
    <div className="chatbot">
      <div className="chat-header">
        <span>Chatbot</span>
        <button className="close-btn" onClick={handleCloseChat}>X</button>
      </div>
      <div className="chat-content">
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div key={index} className={msg.sender}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="user-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotComponent;
