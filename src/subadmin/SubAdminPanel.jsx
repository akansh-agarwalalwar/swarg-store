import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AllPostedIDs from '../admin/MyPostedIDs';
import Card from '../components/Card';
import YouTubeVideos from '../components/YouTubeVideos';

function SubAdminPanel() {
  const [section, setSection] = useState('home');
  const [bgmiForm, setBgmiForm] = useState({ title: '', price: '', description: '', media: null });
  const handleBgmiChange = (e) => {
    const { name, value, files } = e.target;
    setBgmiForm(prev => ({  
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return (
    <div className="flex min-h-[80vh] gap-8">
      <Sidebar current={section} onSectionChange={setSection} mode="subadmin" />
      <div className="flex-1 py-8">
        {section === 'home' && (
          <Card header="Create BGMI ID to Sell" className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Title</label>
                <input type="text" name="title" placeholder="Title" className="w-full border border-purple-200 rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none transition" value={bgmiForm.title} onChange={handleBgmiChange} />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Price</label>
                <input type="number" name="price" placeholder="Price" className="w-full border border-purple-200 rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none transition" value={bgmiForm.price} onChange={handleBgmiChange} />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Description</label>
                <textarea name="description" placeholder="Description" className="w-full border border-purple-200 rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none transition" value={bgmiForm.description} onChange={handleBgmiChange} />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Photo/Video</label>
                <input type="file" name="media" accept="image/*,video/*" className="w-full border border-purple-200 rounded px-3 py-2" onChange={handleBgmiChange} />
              </div>
              <button type="button" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow hover:scale-105 transition text-lg">Create</button>
            </form>
          </Card>
        )}
        {section === 'all' && <AllPostedIDs />}
        {section === 'youtube' && <YouTubeVideos mode="subadmin" />}
      </div>
    </div>
  );
}

export default SubAdminPanel; 