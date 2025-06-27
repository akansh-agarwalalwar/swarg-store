import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AllPostedIDs from './AllPostedId';
import YouTubeVideoGallery from '../components/YouTubeVideoGallery';
// import logo from './assets/react.svg'; // Replace with your brand logo if available

function UserPanel() {
  const [section, setSection] = useState('home');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [role, setRole] = useState('all');
  const [price, setPrice] = useState([0, 2000]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Gaming-style Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
                  <span className="text-red-500">SWARG</span> STORE
                </h1>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setSection('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  section === 'home' 
                    ? 'text-cyan-400 bg-gray-700 shadow-lg shadow-cyan-400/20' 
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setSection('all')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  section === 'all' 
                    ? 'text-cyan-400 bg-gray-700 shadow-lg shadow-cyan-400/20' 
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setSection('videos')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  section === 'videos' 
                    ? 'text-cyan-400 bg-gray-700 shadow-lg shadow-cyan-400/20' 
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                }`}
              >
                Videos
              </button>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-cyan-400 transition-colors">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-cyan-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-700 py-4">
              <div className="space-y-1">
                <button
                  onClick={() => { setSection('home'); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    section === 'home' 
                      ? 'text-cyan-400 bg-gray-700 shadow-lg shadow-cyan-400/20' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => { setSection('all'); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    section === 'all' 
                      ? 'text-cyan-400 bg-gray-700 shadow-lg shadow-cyan-400/20' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                  }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => { setSection('videos'); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    section === 'videos' 
                      ? 'text-cyan-400 bg-gray-700 shadow-lg shadow-cyan-400/20' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                  }`}
                >
                  Videos
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {section === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center relative">
              {/* Gaming background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-3xl"></div>
              <div className="relative z-10">
                <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    PREMIUM BGMI IDs
                  </span>
                  <span className="block text-red-400 mt-2">READY TO PLAY</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Discover the best BGMI accounts with rare skins, high ranks, and exclusive items. 
                  <span className="text-cyan-400 font-semibold"> Start dominating the battlefield today.</span>
                </p>
                <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
                  <div className="rounded-md shadow-lg shadow-cyan-400/25">
                    <button
                      onClick={() => setSection('all')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
                    >
                      Browse All Products
                    </button>
                  </div>
                  <div className="mt-3 rounded-md shadow-lg shadow-purple-400/25 sm:mt-0 sm:ml-3">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-cyan-400 text-base font-medium rounded-md text-cyan-400 bg-transparent hover:bg-cyan-400 hover:text-gray-900 md:py-4 md:text-lg md:px-10 transition-all duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Products */}
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-8 flex items-center">
                <span className="mr-3">🎮</span>
                Featured Products
              </h2>
              <AllPostedIDs search={search} />
            </div>
          </div>
        )}

        {section === 'all' && (
          <div className="space-y-8">
            {/* Page Header */}
            <div className="border-b border-gray-700 pb-8">
              <h1 className="text-3xl font-bold text-cyan-400">All Products</h1>
              <p className="mt-2 text-gray-300">Browse our complete collection of premium BGMI accounts</p>
            </div>

            {/* Filters */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                      value={price[0]}
                      onChange={e => setPrice([+e.target.value, price[1]])}
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                      value={price[1]}
                      onChange={e => setPrice([price[0], +e.target.value])}
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 px-4 py-2 rounded-md hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 font-medium">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <AllPostedIDs search={search} status={status} role={role} price={price} />
          </div>
        )}

        {section === 'videos' && (
          <div className="space-y-8">
            <div className="border-b border-gray-700 pb-8">
              <h1 className="text-3xl font-bold text-cyan-400">YouTube Videos</h1>
              <p className="mt-2 text-gray-300">Watch gameplay and tutorials</p>
            </div>
            <YouTubeVideoGallery />
          </div>
        )}
      </main>
    </div>
  );
}

export default UserPanel;