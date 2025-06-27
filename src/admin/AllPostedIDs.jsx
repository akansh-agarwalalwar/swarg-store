import { useState } from 'react';
import Card from '../components/Card';

const initialIDs = [
  {
    id: 'BGMI-001',
    title: 'BGMI Pro ID',
    postedBy: 'Sub Admin 1',
    role: 'Sub Admin',
    media: [
      { type: 'image', url: 'https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp' },
    ],
    price: 1200,
    status: 'sold',
  },
  {
    id: 'BGMI-002',
    title: 'BGMI Starter ID',
    postedBy: 'Admin',
    role: 'Admin',
    media: [
      { type: 'image', url: 'https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp' },
    ],
    price: 800,
    status: 'available',
  },
  {
    id: 'BGMI-003',
    title: 'BGMI Elite ID',
    postedBy: 'Sub Admin 2',
    role: 'Sub Admin',
    media: [
      { type: 'image', url: 'https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp' },
    ],
    price: 1500,
    status: 'available',
  },
];

// Temporary BGMI image placeholder
const bgmiPlaceholderImage = "https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp";

export default function AllPostedIDs({ search = '' }) {
  const [ids, setIds] = useState(initialIDs);
  const filtered = ids.filter(
    (id) =>
      id.title.toLowerCase().includes(search.toLowerCase()) ||
      id.postedBy.toLowerCase().includes(search.toLowerCase())
  );

  // Handler to toggle status
  const handleToggleStatus = (id) => {
    setIds((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'sold' ? 'available' : 'sold' }
          : item
      )
    );
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto h-16 w-16 text-gray-500 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300">No products found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
        {filtered.map((row, i) => {
          return (
            <div key={i} className="group relative bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
              {/* Product Image */}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-700 group-hover:opacity-90 transition-opacity relative">
                {row.media && row.media.length > 0 && row.media[0]?.type === 'image' ? (
                  <img 
                    src={row.media[0].url || bgmiPlaceholderImage} 
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
                  // Use BGMI placeholder image when no media is available
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
                {/* Seller Info */}
                <div className="text-xs text-gray-400 mb-3">
                  <span className="font-medium text-gray-300">Seller:</span> {row.postedBy} ({row.role})
                </div>
                {/* Additional Media Thumbnails */}
                {row.media && row.media.length > 1 && (
                  <div className="flex gap-1 mb-4">
                    {row.media.slice(1, 4).map((m, idx) =>
                      m.type === 'image' ? (
                        <img
                          key={idx}
                          src={m.url}
                          alt="media"
                          className="w-8 h-8 rounded object-cover border border-gray-600 hover:border-cyan-400 transition-colors"
                        />
                      ) : (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded border border-gray-600 bg-gray-700 flex items-center justify-center hover:border-cyan-400 transition-colors"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                          </svg>
                        </div>
                      )
                    )}
                    {row.media.length > 4 && (
                      <div className="w-8 h-8 rounded border border-gray-600 bg-gray-700 flex items-center justify-center">
                        <span className="text-xs text-gray-400">+{row.media.length - 4}</span>
                      </div>
                    )}
                  </div>
                )}
                {/* Action Button */}
                <button
                  className={`w-full py-2 px-4 rounded-md text-sm font-bold transition-all duration-200 transform hover:scale-105 ${
                    row.status === 'sold'
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg hover:shadow-cyan-400/25'
                  }`}
                  disabled={row.status === 'sold'}
                >
                  {row.status === 'sold' ? 'Sold Out' : 'Buy Now'}
                </button>
                {/* Admin status toggle button */}
                <button
                  className="w-full mt-2 py-2 px-4 rounded-md text-xs font-bold bg-gradient-to-r from-pink-500 to-cyan-500 text-gray-900 shadow-lg hover:from-pink-600 hover:to-cyan-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => handleToggleStatus(row.id)}
                >
                  Change Status to {row.status === 'sold' ? 'Available' : 'Sold'}
                </button>
              </div>
              {/* Gaming corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 