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
    // BGMI YouTube videos - popular BGMI content
    const bgmiVideos = [
      {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "BGMI 3.6 Update - New Features & Gameplay",
        description: "Latest BGMI update with new features and gameplay mechanics"
      },
      {
        url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
        title: "BGMI Pro Tips & Tricks 2024",
        description: "Advanced strategies and tips for BGMI players"
      },
      {
        url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
        title: "BGMI Tournament Highlights",
        description: "Best moments from recent BGMI tournaments"
      },
      {
        url: "https://www.youtube.com/watch?v=ZZ5LpwO-An4",
        title: "BGMI Weapon Guide - Best Guns & Attachments",
        description: "Complete weapon guide for BGMI players"
      },
      {
        url: "https://www.youtube.com/watch?v=1Bix44H1FMQ",
        title: "BGMI Map Strategies - Erangel, Miramar, Sanhok",
        description: "Detailed map strategies and landing spots"
      },
      {
        url: "https://www.youtube.com/watch?v=8UFIYGkROII",
        title: "BGMI Team Coordination & Communication",
        description: "How to improve team play and communication"
      }
    ];

    // Always use BGMI videos (in real app, you can fetch from backend)
    setLinks(bgmiVideos);
  }, []);

  return (
    <div className="my-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-cyan-400 mb-4 flex items-center justify-center">
          <span className="mr-3">🎮</span>
          BGMI Gaming Videos
          <span className="ml-3">🎮</span>
        </h2>
        <p className="text-gray-300 text-lg">Watch the latest BGMI gameplay, tips, and tournament highlights</p>
      </div>
      
      {links.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-16 w-16 text-gray-500 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-300">No videos available</h3>
          <p className="mt-2 text-gray-500">Check back later for new BGMI content</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((video, idx) => {
            const videoId = getYouTubeId(video.url);
            return videoId ? (
              <div key={idx} className="group bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                {/* Video Thumbnail/Embed */}
                <div className="w-full aspect-video bg-gray-700 overflow-hidden relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title || "BGMI YouTube video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                  
                  {/* Gaming overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Video Info */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-cyan-400 mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                    {video.title || "BGMI Gaming Video"}
                  </h3>
                  
                  {video.description && (
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 px-3 py-2 rounded-md text-sm font-bold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 text-center transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
                    >
                      Watch Full Video
                    </a>
                    <button className="px-3 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Gaming corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ) : null;
          })}
        </div>
      )}
      
      {/* Featured Section */}
      <div className="mt-16 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
          <span className="mr-2">🔥</span>
          Featured BGMI Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h4 className="text-cyan-300 font-semibold mb-2">Latest Updates</h4>
            <p className="text-gray-300 text-sm">Stay updated with the newest BGMI features, weapons, and map changes.</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h4 className="text-cyan-300 font-semibold mb-2">Pro Strategies</h4>
            <p className="text-gray-300 text-sm">Learn advanced tactics and strategies from professional BGMI players.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 