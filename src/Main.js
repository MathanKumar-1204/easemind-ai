import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get the forwarded data
import GoalTracker from './goaltrack';
import VideoGallery from './VideoGallery';
import Article from './Article';
import Header from './Header';
import './menu.css';

export default function Main() {
  const location = useLocation(); // Use location to get the state
  const { prediction } = location.state || {}; // Destructure the prediction from location.state

  return (
    <>
      <video autoPlay loop muted id="background-video">
        <source src="/sun.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className='content'>
        {/* Pass prediction as prop to Header */}
        <Header prediction={prediction} /> 
        
        <h2>Articles for you</h2>
        <Article />
        
        <h2>Your watchlist</h2>
        <VideoGallery />
      </div>
    </>
  );
}
