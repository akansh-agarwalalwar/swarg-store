import React, { useState } from 'react';

const adminNavItems = [
  { key: 'subadmins', label: 'Sub Admins', icon: '👥' },
  { key: 'create', label: "Create ID's", icon: '➕' },
  { key: 'all', label: 'All Posted IDs', icon: '📋' },
  { key: 'manageSubadmins', label: 'Manage Subadmins', icon: '🛠️' },
  { key: 'myPosted', label: 'My Posted IDs', icon: '🗂️' },
  { key: 'youtube', label: 'YouTube Videos', icon: '🎥' },
];

const userNavItems = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'all', label: 'All Products', icon: '🛒' },
  { key: 'videos', label: 'Videos', icon: '🛒' },
];

const subAdminNavItems = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'all', label: 'All Products', icon: '🛒' },
  { key: 'youtube', label: 'YouTube Videos', icon: '🎥' },
];

export default function Sidebar({ current, onSectionChange, mode = 'admin' }) {
  const navItems = mode === 'user' ? userNavItems : mode === 'subadmin' ? subAdminNavItems : adminNavItems;
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-blue-600 text-white p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      {/* Sidebar */}
      <aside
        className={`
          h-screen w-64 bg-gradient-to-b from-blue-600 to-indigo-600 text-white flex flex-col shadow-xl fixed left-0 top-0 z-20
          transition-transform duration-300
          md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:static md:flex md:translate-x-0
        `}
        style={{ minWidth: '16rem' }}
      >
        <div className="mb-10 text-2xl font-extrabold tracking-wide text-center select-none mt-4">
          {mode === 'user' ? 'User Panel' : 'Admin Panel'}
        </div>
        <nav className="flex flex-col gap-2 w-full px-4">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { onSectionChange(item.key); setOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition-all duration-150 w-full text-left ${current === item.key ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600 hover:text-white'}`}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-white text-2xl focus:outline-none"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </aside>
      {/* Overlay for mobile */}
      {open && <div className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden" onClick={() => setOpen(false)}></div>}
    </>
  );
}
