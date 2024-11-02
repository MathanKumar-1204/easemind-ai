import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './video.css'; // Ensure this file exists for styling

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Replace with your own API key and video IDs
    const apiKey = 'AIzaSyARI2GW4zyXKs69PR0sU-TRucML_8e_eCM';
    const videoIds = ['Z4QCtz7LZe8', 'vaMyYD_wt9s', '08kNhWM1cqc'];

    const fetchVideoDetails = async () => {
      const videoDetails = await Promise.all(
        videoIds.map(id =>
          axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
              part: 'snippet',
              id,
              key: apiKey
            }
          })
        )
      );

      setVideos(videoDetails.map(response => ({
        src: `https://www.youtube.com/embed/${response.data.items[0].id}`,
        title: response.data.items[0].snippet.title
      })));
    };

    fetchVideoDetails();
  }, []);

  return (
    <div className="video-gallery">
      {videos.map((video, index) => (
        <div key={index} className="video-container">
          <iframe
            width="300"
            height="200"
            src={video.src}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p>{video.title}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
