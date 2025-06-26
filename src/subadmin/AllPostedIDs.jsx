import Card from '../components/Card';

const allIDs = [
  {
    id: 'BGMI-101',
    title: 'SubAdmin BGMI ID',
    postedBy: 'Sub Admin 1',
    role: 'Sub Admin',
    media: [
      { type: 'image', url: 'https://placehold.co/200x200' },
    ],
    price: 900,
    status: 'available',
  },
];

export default function AllPostedIDs() {
  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-8 text-blue-700">All Posted IDs (Sub Admin)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {allIDs.map((row, i) => (
          <Card key={i} className="p-4 sm:p-6 overflow-hidden flex flex-col h-full">
            <div className="relative bg-gray-100 flex items-center justify-center h-40 sm:h-48 mb-4 rounded-xl">
              {row.media[0].type === 'image' ? (
                <img src={row.media[0].url} alt="media" className="object-contain h-full w-full rounded-xl" />
              ) : null}
              {row.status === 'sold' && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">SOLD</span>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="font-bold text-base sm:text-lg mb-1 text-blue-800">{row.title}</div>
              <div className="text-gray-500 text-xs sm:text-sm mb-2">ID: {row.id}</div>
              <div className="text-green-600 font-bold text-lg sm:text-xl mb-2">₹{row.price}</div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{row.role}</span>
                <span className="text-xs text-gray-500">by {row.postedBy}</span>
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