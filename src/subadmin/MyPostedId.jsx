import Card from '../components/Card';
import React from 'react';

// Dummy data for demonstration
const initialIDs = [
  {
    id: 'BGMI-010',
    title: 'My Pro BGMI ID',
    media: [
      { type: 'image', url: 'https://placehold.co/100x100' },
    ],
    price: 2000,
    status: 'available',
  },
  {
    id: 'BGMI-011',
    title: 'Elite BGMI ID',
    media: [
      { type: 'image', url: 'https://placehold.co/100x100' },
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    price: 3500,
    status: 'sold',
  },
];

export default function MyPostedIDs({ myIDs, setMyIDs }) {
  const handleStatusChange = (idx, newStatus) => {
    setMyIDs(ids => ids.map((id, i) => i === idx ? { ...id, status: newStatus } : id));
  };

  return (
    <Card header="My Posted IDs" className="max-w-4xl mx-auto mb-8 shadow-lg">
      {myIDs.length === 0 ? (
        <div className="text-center text-gray-400 py-12">You have not posted any IDs yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg bg-white shadow text-sm sm:text-base">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Media</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {myIDs.map((row, i) => (
                <tr key={i} className="border-t hover:bg-blue-50 transition">
                  <td className="p-3 font-mono">{row.id}</td>
                  <td className="p-3">{row.title}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      {row.media && row.media.map((m, idx) => m.type === 'image' ? (
                        <img key={idx} src={m.url} alt="media" className="w-10 h-10 rounded object-cover border" />
                      ) : (
                        <video key={idx} src={m.url} className="w-10 h-10 rounded border" controls />
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-bold text-green-700">₹{row.price}</td>
                  <td className="p-3">
                    <select
                      value={row.status}
                      onChange={e => handleStatusChange(i, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border focus:ring-2 focus:ring-blue-400 outline-none transition
                        ${row.status === 'sold' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}
                    >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
} 