import React, { useState, useEffect } from 'react';
import { Gamepad2, Youtube, PlusCircle, Trash2 } from 'lucide-react';

export default function YouTubeVideos({ mode }) {
  const [links, setLinks] = useState([]);
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all videos on mount
  useEffect(() => {
    fetch('https://swarg-store-backend.onrender.com/api/youtube-videos')
      .then(res => res.json())
      .then(data => setLinks(Array.isArray(data) ? data : []))
      .catch(() => setLinks([]));
  }, []);

  const handleAdd = async () => {
    setError('');
    setSuccess('');
    if (!input.trim() || !title.trim()) {
      setError('YouTube link and title are required.');
      return;
    }
    // Basic YouTube URL validation
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    if (!ytRegex.test(input.trim())) {
      setError('Please enter a valid YouTube link.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://swarg-store-backend.onrender.com/api/youtube-videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: input.trim(), title: title.trim(), description: description.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add video');
      setLinks(prev => [...prev, data]);
      setInput('');
      setTitle('');
      setDescription('');
      setSuccess('Video added successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async idx => {
    setError('');
    setSuccess('');
    const video = links[idx];
    if (!video || !video._id) return setError('Invalid video');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://swarg-store-backend.onrender.com/api/youtube-videos/${video._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete video');
      setLinks(links => links.filter((_, i) => i !== idx));
      setSuccess('Video removed successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-3xl shadow-2xl p-8 border-4 border-transparent bg-clip-padding relative overflow-hidden mt-8">
      {/* Neon border effect */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-purple-700/40 animate-pulse blur-sm"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Gamepad2 className="w-8 h-8 text-white drop-shadow-glow animate-bounce" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 tracking-wide select-none flex items-center gap-2">
            YouTube Videos
            <Youtube className="w-7 h-7 text-red-500 animate-pulse" />
            <span className="text-base font-bold ml-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-md uppercase tracking-widest">
              {mode === 'admin' ? 'Admin' : 'Subadmin'}
            </span>
          </h2>
        </div>
        {(mode === 'admin' || mode === 'subadmin') && (
          <div className="flex flex-col gap-3 mb-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-purple-700/40 shadow-lg">
            <input
              type="text"
              className="border-2 border-purple-700 bg-black text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono text-lg shadow-inner transition-all duration-200"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
            />
            <textarea
              className="border-2 border-purple-700 bg-black text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-base shadow-inner transition-all duration-200"
              placeholder="Description (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={loading}
              rows={2}
            />
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="border-2 border-pink-700 bg-black text-white rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-base shadow-inner transition-all duration-200"
                placeholder="Paste YouTube video link"
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
              />
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-700 text-white px-6 py-2 rounded-xl font-extrabold shadow-lg hover:from-pink-700 hover:to-purple-800 hover:scale-105 transition-all text-lg tracking-wider border-2 border-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                onClick={handleAdd}
                disabled={loading}
              >
                <PlusCircle className="w-5 h-5" />
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </div>
        )}
        {error && <div className="text-pink-400 mb-2 font-semibold text-center animate-pulse">{error}</div>}
        {success && <div className="text-green-400 mb-2 font-semibold text-center animate-pulse">{success}</div>}
        <ul className="space-y-5">
          {(Array.isArray(links) ? links : []).map((video, idx) => (
            <li key={video._id || idx} className="flex flex-col gap-2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-5 border border-purple-700/30 shadow-lg group hover:border-pink-500 transition-all duration-200">
              <div className="flex items-center gap-4">
                <Youtube className="w-8 h-8 text-red-500 drop-shadow-glow" />
                <div className="flex-1 min-w-0">
                  <a href={video.url || video} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-400 underline hover:text-pink-400 transition-colors duration-200 truncate">
                    {video.title || video.url || video}
                  </a>
                  {video.description && <div className="text-gray-300 text-sm mt-1 truncate">{video.description}</div>}
                </div>
                {(mode === 'admin' || mode === 'subadmin') && video._id && (
                  <button
                    className="bg-gradient-to-r from-pink-600 to-purple-700 text-white px-3 py-1 rounded-lg font-semibold shadow hover:from-pink-700 hover:to-purple-800 hover:scale-110 transition-all border-2 border-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    onClick={() => handleRemove(idx)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        {links.length === 0 && <div className="text-gray-500 text-center mt-8 font-mono text-lg">No YouTube videos added yet.</div>}
      </div>
    </div>
  );
} 