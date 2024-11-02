// src/App.js
import React, { useState } from 'react';
import Menu from './Menu';
const users = [
  { id: 1, username: 'Alice', tagline: 'Yoga Instructor', image: './assets/alice.png' },
  { id: 2, username: 'Bob', tagline: 'Meditator', image: './assets/bob.png' },
  { id: 3, username: 'Charlie', tagline: 'Psychologist', image: './assets/charlie.png' },
];

const photos = [
  { id: 1, image: './assets/img1.png', description: 'Beautiful Sunset' },
  { id: 2, image: './assets/photo2.png', description: 'Mountain Hike' },
  { id: 3, image: './assets/photo3.png', description: 'City Lights' },
  { id: 4, image: './assets/photo4.png', description: 'Beach Day' },
];

function Communityelement() {
  const [currentUser, setCurrentUser] = useState(1); 
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [likedPhotos, setLikedPhotos] = useState(new Set());

  const followUser = (followedId) => {
    const newFollowedUsers = new Set(followedUsers);
    if (newFollowedUsers.has(followedId)) {
      newFollowedUsers.delete(followedId);
    } else {
      newFollowedUsers.add(followedId);
    }
    setFollowedUsers(newFollowedUsers);
  };

  const startChat = (receiverId) => {
    setActiveChat(receiverId);  
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const message = { senderId: currentUser, receiverId: activeChat, content: newMessage };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const toggleLikePhoto = (photoId) => {
    const newLikedPhotos = new Set(likedPhotos);
    if (newLikedPhotos.has(photoId)) {
      newLikedPhotos.delete(photoId);
    } else {
      newLikedPhotos.add(photoId);
    }
    setLikedPhotos(newLikedPhotos);
  };

  const chatMessages = messages.filter(
    (msg) => (msg.senderId === currentUser && msg.receiverId === activeChat) ||
             (msg.senderId === activeChat && msg.receiverId === currentUser)
  );

  const recipient = users.find(user => user.id === activeChat);

  return (
    <div className="App">
      {!activeChat ? (
        <div className="people-container">
          <h1>People You Might Know</h1>
          <div className="people-list">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <img src={user.image} alt={user.username} className="user-image" />
                <div className="user-info">
                  <strong>{user.username}</strong>
                  <p>{user.tagline}</p>
                </div> 
                <div className="buttons">
                  <button
                    className={`follow-button ${followedUsers.has(user.id) ? 'following' : ''}`}
                    onClick={() => followUser(user.id)}
                  >
                    {followedUsers.has(user.id) ? 'Following' : 'Follow'}
                  </button>
                  {followedUsers.has(user.id) && (
                    <button
                      className="message-button"
                      onClick={() => startChat(user.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="message-icon"
                      >
                        <path d="M21 3L9 14.6 3 13l1 6 6-1L21 3z"></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <h2>Photo Gallery</h2>
          <div className="photo-gallery">
            {photos.map(photo => (
              <div key={photo.id} className="photo-card">
                <img src={photo.image} alt={photo.description} className="photo-image" />
                <p>{photo.description}</p>
                <button
                  className={`like-button ${likedPhotos.has(photo.id) ? 'liked' : ''}`}
                  onClick={() => toggleLikePhoto(photo.id)}
                >
                  {likedPhotos.has(photo.id) ? 'Liked' : 'Like'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <button className="back-button" onClick={() => setActiveChat(null)}>←</button>
            <h2>{recipient.username}</h2>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.senderId === currentUser ? 'sent' : 'received'}`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <button className="send-button" onClick={handleSendMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="send-icon"
              >
                <path d="M22 2L11 13l-4-4L2 22l20-8-4-4 4-8z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      <style>
        {`
          .App {
            font-family: Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
          }
          .people-container {
            display: flex;
            flex-direction: column;
            padding: 20px;
            flex: 1;
            justify-content: center;
            align-items: center;
          }
          h1, h2 {
            color: #333;
            margin-bottom: 20px;
            text-align: center;
          }
          .people-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            overflow-x: auto;
            padding: 10px 0;
            width: 100%; 
            max-width: 1200px;
          }
          .user-card {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 180px;
            min-width: 180px;
            text-align: center;
            box-sizing: border-box;
          }
          .user-image {
            border-radius: 50%;
            width: 70px;
            height: 70px;
            object-fit: cover;
            margin-bottom: 10px;
          }
          .user-info {
            margin-bottom: 10px;
          }
          .user-info strong {
            display: block;
            font-size: 16px;
            color: #333;
          }
          .user-info p {
            color: #666;
            font-size: 14px;
            margin: 5px 0 0;
          }
          .buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
          .follow-button {
            background: #0095f6;
            border: none;
            color: #fff;
            border-radius: 4px;
            padding: 8px 16px;
            margin-bottom: 5px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s;
          }
          .follow-button:hover {
            background: #0077cc;
          }
          .follow-button.following {
            background: #d9534f;
          }
          .message-button {
            background: #fff;
            border: 2px solid #0095f6;
            border-radius: 4px;
            padding: 8px;
            cursor: pointer;
            transition: background 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .message-button:hover {
            background: #f0f0f0;
          }
          .message-icon {
            width: 16px;
            height: 16px;
            fill: #0095f6;
          }
          .photo-gallery {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            width: 100%;
            max-width: 1200px;
          }
          .photo-card {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 200px;
            text-align: center;
            box-sizing: border-box;
          }
          .photo-image {
            border-radius: 10px;
            width: 100%;
            height: 120px;
            object-fit: cover;
            margin-bottom: 10px;
          }
          .like-button {
            background: #ff4d4f;
            border: none;
            color: #fff;
            border-radius: 4px;
            padding: 8px 16px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s;
          }
          .like-button:hover {
            background: #e60000;
          }
          .like-button.liked {
            background: #d9534f;
          }
          .chat-window {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100vh;
            padding: 20px;
            background: #f7f7f7;
            box-sizing: border-box;
          }
          .chat-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }
          .back-button {
            background: none;
            border: none;
            color: #0095f6;
            font-size: 20px;
            cursor: pointer;
            margin-right: 10px;
          }
          .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding-right: 10px;
          }
          .message {
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 10px;
            max-width: 70%;
          }
          .message.sent {
            background: #0095f6;
            color: #fff;
            align-self: flex-end;
          }
          .message.received {
            background: #ececec;
            align-self: flex-start;
          }
          .chat-input {
            display: flex;
            align-items: center;
          }
          .chat-input input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 20px;
            margin-right: 10px;
          }
          .send-button {
            background: none;
            border: none;
            cursor: pointer;
          }
          .send-icon {
            width: 24px;
            height: 24px;
            stroke: #0095f6;
          }
        `}
      </style>
    </div>
  );
}



export default function Community() {
  return (
    <>
    <video autoPlay loop muted id="background-video">
        <source src="/sun.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <div className='menubar'>
        <Menu/>
    </div>
    <div className='main'>
        <Communityelement/>
    </div></>
  )
}
