import React, { useState } from 'react';

const adminNavItems = [
  { key: 'subadmins', label: 'Sub Admins', icon: '👥' },
  { key: 'create', label: "Create ID's", icon: '➕' },
  { key: 'all', label: 'All Posted IDs', icon: '📋' },
  { key: 'manageSubadmins', label: 'Manage Subadmins', icon: '🛠️' },
  { key: 'myPosted', label: 'My Posted IDs', icon: '🗂️' },
  { key: 'telegram', label: 'Telegram Link', icon: '📢' },
  { key: 'youtube', label: 'YouTube Videos', icon: '🎥' },
];

const userNavItems = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'all', label: 'All Products', icon: '🛒' },
  { key: 'videos', label: 'Videos', icon: '🛒' },
];

const subAdminNavItems = [
  { key: 'all', label: 'Home', icon: '🏠' },
  { key: 'bgmi', label: 'Add BGMI', icon: '🛒' },
  { key: 'valo', label: 'Add Valorent', icon: '🛒' },
  { key: 'telegram', label: 'Telegram Link', icon: '📢' },
  { key: 'youtube', label: 'YouTube Videos', icon: '🎥' },
];

export default function Sidebar({ current, onSectionChange, mode = 'admin' }) {
  const navItems = mode === 'user' ? userNavItems : mode === 'subadmin' ? subAdminNavItems : adminNavItems;
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-cyan-500 text-gray-900 p-2 rounded-full shadow-lg focus:outline-none border-2 border-cyan-400 animate-pulse-glow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      {/* Sidebar */}
      <aside
        className={`
          h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-cyan-200 flex flex-col shadow-2xl fixed left-0 top-0 z-20
          border-r-2 border-cyan-700
          transition-transform duration-300
          md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:static md:flex md:translate-x-0
        `}
        style={{ minWidth: '16rem' }}
      >
        <div className="mb-10 text-2xl font-extrabold tracking-wider text-center select-none mt-6 neon-text">
          {mode === 'user' ? 'User Panel' : mode === 'subadmin' ? 'SubAdmin Panel' : 'Admin Panel'}
        </div>
        <nav className="flex flex-col gap-2 w-full px-4">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { onSectionChange(item.key); setOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 w-full text-left relative
                ${current === item.key
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-700 text-gray-900 shadow-lg neon-glow border-l-4 border-cyan-400 scale-105'
                  : 'hover:bg-gray-800 hover:text-cyan-300 hover:scale-105'}
              `}
              style={{ boxShadow: current === item.key ? '0 0 16px 2px #22d3ee' : undefined }}
            >
              <span className="text-2xl drop-shadow-lg">{item.icon}</span>
              <span className="truncate">{item.label}</span>
              {current === item.key && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow"></span>
              )}
            </button>
          ))}
        </nav>
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-cyan-400 text-2xl focus:outline-none"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </aside>
      {/* Overlay for mobile */}
      {open && <div className="fixed inset-0 bg-black bg-opacity-60 z-10 md:hidden" onClick={() => setOpen(false)}></div>}
    </>
  );
}


