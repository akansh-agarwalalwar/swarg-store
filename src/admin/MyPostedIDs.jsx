import Card from '../components/Card';
import React, { useState } from 'react';

// Dummy data for demonstration
const initialIDs = [
  {
    id: 'BGMI-010',
    title: 'My Pro BGMI ID',
    media: [
      { type: 'image', url: 'https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp' },
    ],
    price: 2000,
    status: 'available',
  },
  {
    id: 'BGMI-011',
    title: 'Elite BGMI ID',
    media: [
      { type: 'image', url: 'https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp' },
    ],
    price: 3500,
    status: 'sold',
  },
];

const bgmiPlaceholderImage = "https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp";

export default function MyPostedIDs() {
  const [myIDs, setMyIDs] = useState(initialIDs);

  const handleStatusChange = (idx, newStatus) => {
    setMyIDs(ids => ids.map((id, i) => i === idx ? { ...id, status: newStatus } : id));
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-cyan-400 mb-8 neon-text">My Posted IDs</h2>
      {myIDs.length === 0 ? (
        <div className="text-center text-gray-400 py-12">You have not posted any IDs yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myIDs.map((row, i) => (
            <div key={i} className="group relative bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
              {/* Product Image */}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-700 group-hover:opacity-90 transition-opacity relative">
                {row.media && row.media.length > 0 && row.media[0]?.type === 'image' ? (
                  <img 
                    src={bgmiPlaceholderImage 
                      // || row.media[0].url
                      } 
                    alt={row.title}
                    className="h-48 w-full object-cover object-center" 
                  />
                ) : row.media && row.media.length > 0 && row.media[0]?.type === 'video' ? (
                  <video 
                    src={row.media[0].url || bgmiPlaceholderImage} 
                    className="h-48 w-full object-cover object-center" 
                    controls 
                  />
                ) : (
                  <img 
                    src={bgmiPlaceholderImage} 
                    alt="BGMI 3.6 Update"
                    className="h-48 w-full object-cover object-center" 
                  />
                )}
                {/* SOLD OUT badge at top right */}
                {row.status === 'sold' && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">
                    SOLD OUT
                  </span>
                )}
                {/* Gaming overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-cyan-400 mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                  {row.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">ID: {row.id.slice(-8)}</p>
                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg font-bold text-green-400">₹{row.price.toLocaleString()}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    row.status === 'sold' 
                      ? 'bg-red-900/50 text-red-300 border border-red-600' 
                      : 'bg-green-900/50 text-green-300 border border-green-600'
                  }`}>
                    {row.status === 'sold' ? 'Sold' : 'Available'}
                  </span>
                </div>
                {/* Status Selector */}
                <div className="mt-2">
                  <select
                    value={row.status}
                    onChange={e => handleStatusChange(i, e.target.value)}
                    className={`w-full px-3 py-2 rounded-md text-xs font-bold border-2 focus:ring-2 focus:ring-cyan-400 outline-none transition bg-gray-900 text-cyan-200 ${
                      row.status === 'sold' ? 'bg-red-900/40 text-red-300 border-red-600' : 'bg-green-900/40 text-green-300 border-green-600'
                    }`}
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
              {/* Gaming corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 