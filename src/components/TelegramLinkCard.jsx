import { useState } from 'react';
import Card from './Card';

export default function TelegramLinkCard({ panelMode }) {
  // Use localStorage for persistence in demo
  const storageKey = `telegramLink_${panelMode}`;
  const [link, setLink] = useState(() => localStorage.getItem(storageKey) || '');
  const [input, setInput] = useState(link);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setLink(input);
    localStorage.setItem(storageKey, input);
    setEditing(false);
    setMessage('Telegram link saved!');
    setTimeout(() => setMessage(''), 1500);
  };

  const handleDelete = () => {
    setLink('');
    setInput('');
    localStorage.removeItem(storageKey);
    setEditing(false);
    setMessage('Telegram link deleted.');
    setTimeout(() => setMessage(''), 1500);
  };

  return (
    <Card className="max-w-xl mx-auto mt-8 bg-gray-900 border border-cyan-700 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2 neon-text">
          <span>📢</span> Telegram Link
        </h2>
        <p className="text-gray-400 text-sm mt-1">Share your official Telegram group or channel for users to join.</p>
      </div>
      {link && !editing ? (
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline font-semibold hover:text-cyan-400 transition"
            >
              {link}
            </a>
            <button
              className="px-3 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 font-bold shadow hover:from-cyan-600 hover:to-blue-700 ml-2"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 rounded-md bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow hover:from-pink-600 hover:to-red-600 ml-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <input
            type="url"
            placeholder="https://t.me/yourchannel"
            className="w-full px-4 py-2 rounded-md border-2 border-cyan-700 bg-gray-800 text-cyan-200 focus:ring-2 focus:ring-cyan-400 outline-none transition mb-2"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 font-bold shadow hover:from-cyan-600 hover:to-blue-700"
              onClick={handleSave}
              disabled={!input}
            >
              Save
            </button>
            {link && (
              <button
                className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 font-bold shadow hover:bg-gray-600"
                onClick={() => { setEditing(false); setInput(link); }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
      {message && <div className="text-green-400 font-semibold text-sm mt-2">{message}</div>}
    </Card>
  );
} 