import React, { useState } from 'react';

export default function YouTubeVideos({ mode }) {
  const [links, setLinks] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    // Basic YouTube URL validation
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    if (!ytRegex.test(input.trim())) {
      setError('Please enter a valid YouTube link.');
      return;
    }
    setLinks(prev => [...prev, input.trim()]);
    setInput('');
    setError('');
  };

  const handleRemove = idx => {
    setLinks(links => links.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">YouTube Videos ({mode === 'admin' ? 'Admin' : 'Subadmin'})</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 flex-1"
          placeholder="Paste YouTube video link"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full font-bold shadow hover:scale-105 transition"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul className="space-y-3">
        {links.map((link, idx) => (
          <li key={idx} className="flex items-center gap-3 bg-blue-50 rounded p-2">
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline flex-1 truncate">{link}</a>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold"
              onClick={() => handleRemove(idx)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {links.length === 0 && <div className="text-gray-400 text-center mt-4">No YouTube videos added yet.</div>}
    </div>
  );
} 