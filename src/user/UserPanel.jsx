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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar current={section} onSectionChange={setSection} mode="user" />
      <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8 overflow-y-auto h-screen">
        {section === 'home' && (
          <div className="max-w-screen-lg mx-auto flex flex-col items-center">
            {/* <img src={logo} alt="Brand Logo" className="w-20 h-20 sm:w-24 sm:h-24 mb-6 drop-shadow-lg" /> */}
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-blue-700 tracking-tight text-center">Swarg Store Marketplace</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-10 text-center">Find and buy the best BGMI IDs.</p>
            <div className="w-full mb-10">
              <input
                type="text"
                placeholder="Search"
                className="w-full border-2 border-blue-200 rounded-xl px-4 sm:px-6 py-3 sm:py-4 focus:ring-2 focus:ring-blue-400 outline-none transition text-base sm:text-lg shadow"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <AllPostedIDs search={search} />
          </div>
        )}
        {section === 'all' && (
          <div className="max-w-screen-lg mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-8 text-blue-700">All Products</h2>
            <div className="mb-8 bg-white rounded-2xl shadow p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <input
                type="text"
                placeholder="Search by title or admin..."
                className="border border-blue-200 rounded px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-400 outline-none transition text-base sm:text-lg w-full sm:w-1/3"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-base w-full sm:w-40"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
              {/* <select
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-base w-full sm:w-40"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Sub Admin">Sub Admin</option>
              </select> */}
              <div className="flex flex-col items-center w-full sm:w-56">
                <label className="text-xs text-blue-700 font-semibold mb-1">Price Range</label>
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="range"
                    min={0}
                    max={2000}
                    value={price[0]}
                    onChange={e => setPrice([+e.target.value, price[1]])}
                    className="w-1/2 accent-blue-600"
                  />
                  <input
                    type="range"
                    min={0}
                    max={2000}
                    value={price[1]}
                    onChange={e => setPrice([price[0], +e.target.value])}
                    className="w-1/2 accent-blue-600"
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">₹{price[0]} - ₹{price[1]}</div>
              </div>
            </div>
            <AllPostedIDs search={search} status={status} role={role} price={price} />
          </div>
        )}
        <YouTubeVideoGallery />
      </div>
    </div>
  );
}

export default UserPanel; 