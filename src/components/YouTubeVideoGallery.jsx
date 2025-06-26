import React, { useEffect, useState } from 'react';

function getYouTubeId(url) {
  // Extracts the video ID from a YouTube URL
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}

export default function YouTubeVideoGallery() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // For demo, fetch from localStorage (should be from backend in real app)
    const stored = JSON.parse(localStorage.getItem('youtubeLinks') || '[]');
    setLinks(stored);
  }, []);

  return (
    <div className="my-10">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center drop-shadow">Featured YouTube Videos</h2>
      {links.length === 0 ? (
        <div className="text-gray-400 text-center text-lg">No YouTube videos available yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {links.map((link, idx) => {
            const videoId = getYouTubeId(link);
            return videoId ? (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition">
                <div className="w-full aspect-video mb-3 rounded-xl overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  ></iframe>
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold text-lg hover:underline truncate w-full text-center">
                  Watch on YouTube
                </a>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
} 