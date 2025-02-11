import React, { useState } from "react";
import Menu from './Menu'
import "./Chatindex.css"; // For styling

function ChatAppelement() {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hello, how was your day!",
      sender: "ChatGPT",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const handleUserMessage = async () => {
    if (userMessage.trim() === "") return;

    const newUserMessage = {
      message: userMessage,
      sender: "user",
    };

    const updatedChatMessages = [...chatMessages, newUserMessage];
    setChatMessages(updatedChatMessages);
    setUserMessage("");
    setIsChatbotTyping(true);

    await processUserMessageToChatGPT(updatedChatMessages);
  };

  const processUserMessageToChatGPT = async (messages) => {
    try {
      const response = await fetch("https://easemindpython.onrender.com/get_answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: messages[messages.length - 1].message }),
      });
      
      const data = await response.json();
      console.log("Response from backend:", data); // Log the response for debugging
      
      const newChatMessage = {
        message: data.answer,
        sender: "Chatbot",
      };
      
      setChatMessages([...messages, newChatMessage]);
      setIsChatbotTyping(false);
    } catch (error) {
      console.error("Error:", error);
      setIsChatbotTyping(false);
    }
  };
  

  return (
    <>
    
    <div className="content"> 
      <h1>EaseMind - Mental Wellness Simplified</h1>
      <div className="chat-container">
        <div className="chat-box">
          <div className="message-list">
            {chatMessages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.message}
                </div>
              </div>
            ))} 
            {isChatbotTyping && <div className="typing-indicator">Ai is typing...</div>}
          </div>
          <div className="message-input">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button onClick={handleUserMessage}>Send</button>
          </div>
        </div>
      </div>
    </div></>
  );
}

export default function ChatApp() {
    return (
      <>
      <div className='menubar'>
          <Menu/>
      </div>
      <div className='main'>
          <ChatAppelement/>
      </div></>
    )
  }
