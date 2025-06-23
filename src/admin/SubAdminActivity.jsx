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
          { type: 'image', url: 'https://placehold.co/60x60' },
          { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ],
        price: 1200,
        status: 'sold',
      },
      {
        id: 'BGMI-002',
        title: 'BGMI Starter ID',
        media: [
          { type: 'image', url: 'https://placehold.co/60x60' },
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
          { type: 'image', url: 'https://placehold.co/60x60' },
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
        <Card key={idx} header={<span>{sub.name} <span className="text-xs text-gray-400">({sub.email})</span></span>}>
          <Table
            columns={[
              { label: 'ID', accessor: 'id' },
              { label: 'Title', accessor: 'title' },
              { label: 'Media', accessor: 'media', render: (row) => (
                <div className="flex gap-2">
                  {row.media.map((m, i) => m.type === 'image' ? (
                    <img key={i} src={m.url} alt="media" className="w-10 h-10 rounded object-cover border" />
                  ) : (
                    <video key={i} src={m.url} className="w-10 h-10 rounded border" controls />
                  ))}
                </div>
              ) },
              { label: 'Price', accessor: 'price', render: (row) => `₹${row.price}` },
              { label: 'Status', accessor: 'status', render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === 'sold' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>{row.status === 'sold' ? 'Sold' : 'Available'}</span>
              ) },
            ]}
            data={sub.games}
          />
        </Card>
      ))}
    </div>
  );
} 