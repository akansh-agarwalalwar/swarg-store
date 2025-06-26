import Card from '../components/Card';

const allIDs = [
  {
    id: 'BGMI-001',
    title: 'BGMI Pro ID',
    postedBy: 'Sub Admin 1',
    role: 'Sub Admin',
    media: [
      { type: 'image', url: 'https://placehold.co/200x200' },
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
      { type: 'image', url: 'https://placehold.co/200x200' },
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
      { type: 'image', url: 'https://placehold.co/200x200' },
    ],
    price: 1500,
    status: 'available',
  },
];

export default function AllPostedIDs({ search = '', status = 'all', role = 'all', price = [0, 2000] }) {
  const filtered = allIDs.filter(
    (id) =>
      (id.title.toLowerCase().includes(search.toLowerCase()) ||
        id.postedBy.toLowerCase().includes(search.toLowerCase())) &&
      (status === 'all' || id.status === status) &&
      (role === 'all' || id.role === role) &&
      id.price >= price[0] && id.price <= price[1]
  );
  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-8 text-blue-700">All Posted IDs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-400">No products found.</div>
        )}
        {filtered.map((row, i) => (
          <Card key={i} className="p-4 sm:p-6 overflow-hidden flex flex-col h-full">
            <div className="relative bg-gray-100 flex items-center justify-center h-40 sm:h-48 mb-4 rounded-xl">
              {row.media[0].type === 'image' ? (
                <img src={row.media[0].url} alt="media" className="object-contain h-full w-full rounded-xl" />
              ) : (
                <video src={row.media[0].url} className="object-contain h-full w-full rounded-xl" controls />
              )}
              {row.status === 'sold' && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">SOLD</span>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="font-bold text-base sm:text-lg mb-1 text-blue-800">{row.title}</div>
              <div className="text-gray-500 text-xs sm:text-sm mb-2">ID: {row.id}</div>
              <div className="text-green-600 font-bold text-lg sm:text-xl mb-2">₹{row.price}</div>
              <div className="mt-auto flex gap-2 mb-4">
                {row.media.length > 1 && row.media.slice(1).map((m, idx) => m.type === 'image' ? (
                  <img key={idx} src={m.url} alt="media" className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover border" />
                ) : (
                  <video key={idx} src={m.url} className="w-8 h-8 sm:w-10 sm:h-10 rounded border" controls />
                ))}
              </div>
            </div>
            <div>
              <button
                className={`w-full py-2 rounded-full font-bold text-white transition text-sm sm:text-base ${row.status === 'sold' ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105'}`}
                disabled={row.status === 'sold'}
              >
                {row.status === 'sold' ? 'Sold Out' : 'Buy Now'}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 