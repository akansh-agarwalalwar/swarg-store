import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SubAdminActivity from './SubAdminActivity';
import AllPostedIDs from './AllPostedIDs';
import Card from '../components/Card';
import ManageSubadmins from './ManageSubadmins';
import MyPostedIDs from './MyPostedIDs';
import YouTubeVideos from '../components/YouTubeVideos';

function AdminPanel() {
  const [section, setSection] = useState('subadmins');
  const navigate = useNavigate();
  // Dummy data for sub admins
  const [subAdmins, setSubAdmins] = useState([
    { id: 1, username: 'subadmin1', name: 'Sub Admin 1', email: 'sub1@example.com' },
    { id: 2, username: 'subadmin2', name: 'Sub Admin 2', email: 'sub2@example.com' },
  ]);
  const [newSubAdmin, setNewSubAdmin] = useState({ username: '', name: '', email: '', password: '' });
  const [bgmiForm, setBgmiForm] = useState({ title: '', price: '', description: '', media: null });

  // CRUD handlers for sub admins
  const addSubAdmin = () => {
    if (!newSubAdmin.username || !newSubAdmin.name || !newSubAdmin.email || !newSubAdmin.password) return;
    setSubAdmins([...subAdmins, { ...newSubAdmin, id: Date.now() }]);
    setNewSubAdmin({ username: '', name: '', email: '', password: '' });
  };
  const deleteSubAdmin = (id) => setSubAdmins(subAdmins.filter(sa => sa.id !== id));

  // BGMI ID form handler
  const handleBgmiChange = (e) => {
    const { name, value, files } = e.target;
    setBgmiForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex min-h-[80vh] gap-8">
      <Sidebar current={section} onSectionChange={setSection} />
      <div className="flex-1 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow hover:scale-105 transition text-base sm:text-lg"
          >
            Logout
          </button>
        </div>
        {section === 'subadmins' && <SubAdminActivity />}
        {section === 'create' && (
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
              <button type="button" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold shadow hover:scale-105 transition text-lg">Create</button>
            </form>
          </Card>
        )}
        {section === 'all' && <AllPostedIDs />}
        {section === 'manageSubadmins' && (
          <ManageSubadmins
            subAdmins={subAdmins}
            setSubAdmins={setSubAdmins}
            newSubAdmin={newSubAdmin}
            setNewSubAdmin={setNewSubAdmin}
            addSubAdmin={addSubAdmin}
            deleteSubAdmin={deleteSubAdmin}
          />
        )}
        {section === 'myPosted' && <MyPostedIDs />}
        {section === 'youtube' && <YouTubeVideos mode="admin" />}
      </div>
    </div>
  );
}

export default AdminPanel; 