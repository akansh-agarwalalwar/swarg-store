import Table from '../components/Table';
import Card from '../components/Card';

const dummyData = [
  {
    name: 'Sub Admin 1',
    email: 'sub1@example.com',
    games: [
      {
        id: 'BGMI-001',
        title: 'BGMI Pro ID',
        media: [
          { type: 'image', url: 'https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp' },
        ],
        price: 1200,
        status: 'sold',
      },
      {
        id: 'BGMI-002',
        title: 'BGMI Starter ID',
        media: [
          { type: 'image', url: 'https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp' },
        ],
        price: 800,
        status: 'available',
      },
    ],
  },
  {
    name: 'Sub Admin 2',
    email: 'sub2@example.com',
    games: [
      {
        id: 'BGMI-003',
        title: 'BGMI Elite ID',
        media: [
          { type: 'image', url: 'https://prod.assets.earlygamecdn.com/images/BGMI-3.5-Update.png?transform=Article+Webp' },
        ],
        price: 1500,
        status: 'available',
      },
    ],
  },
];

export default function SubAdminActivity() {
  return (
    <div className="space-y-8">
      {dummyData.map((sub, idx) => (
        <Card key={idx} header={<span className="text-cyan-400 font-bold text-lg neon-text">{sub.name} <span className="text-xs text-gray-400 font-normal">({sub.email})</span></span>} className="bg-gray-900 border border-cyan-700">
          <Table
            columns={[
              { label: 'ID', accessor: 'id' },
              { label: 'Title', accessor: 'title' },
              { label: 'Media', accessor: 'media', render: (row) => (
                <div className="flex gap-2">
                  {row.media.map((m, i) => m.type === 'image' ? (
                    <img key={i} src={m.url} alt="media" className="w-12 h-12 rounded-lg object-cover border-2 border-gray-700 shadow hover:border-cyan-400 transition-colors" />
                  ) : (
                    <video key={i} src={m.url} className="w-12 h-12 rounded-lg border-2 border-gray-700 shadow" controls />
                  ))}
                </div>
              ) },
              { label: 'Price', accessor: 'price', render: (row) => <span className="text-green-400 font-bold">₹{row.price}</span> },
              { label: 'Status', accessor: 'status', render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg border-2 ${row.status === 'sold' ? 'bg-red-900/60 text-red-300 border-red-600' : 'bg-green-900/60 text-green-300 border-green-600'}`}>{row.status === 'sold' ? 'Sold' : 'Available'}</span>
              ) },
            ]}
            data={sub.games}
          />
        </Card>
      ))}
    </div>
  );
} 