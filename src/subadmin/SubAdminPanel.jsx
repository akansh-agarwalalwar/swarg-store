
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AllPostedIDs from '../admin/MyPostedIDs';
import Card from '../components/Card';
import YouTubeVideos from '../components/YouTubeVideos';

function SubAdminPanel() {
  const [section, setSection] = useState('all');
  const [bgmiForm, setBgmiForm] = useState({
    title: '',
    price: '',
    description: '',
    media: null, // single file, change to array if multiple files needed
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleBgmiChange = (e) => {
    const { name, value, files } = e.target;
    setBgmiForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!bgmiForm.title || !bgmiForm.price) {
      setError('Title and Price are required');
      setLoading(false);
      return;
    }
    if (!bgmiForm.media) {
      setError('Please upload at least one media file (image or video)');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', bgmiForm.title);
      formData.append('price', bgmiForm.price);
      formData.append('description', bgmiForm.description);
      
      // Detect media type for backend naming (image or video)
      if (bgmiForm.media.type.startsWith('image/')) {
        formData.append('image', bgmiForm.media);
      } else if (bgmiForm.media.type.startsWith('video/')) {
        formData.append('video', bgmiForm.media);
      } else {
        setError('Unsupported media file type');
        setLoading(false);
        return;
      }

      const res = await fetch('https://swarg-store-backend.onrender.com/api/ids/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // no Content-Type here, browser sets it automatically for multipart
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to post BGMI ID');
      }

      setSuccess('BGMI ID posted successfully!');
      setBgmiForm({ title: '', price: '', description: '', media: null });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] gap-8">
      <Sidebar current={section} onSectionChange={setSection} mode="subadmin" />
      <div className="flex-1 py-8">
        {section === 'bgmi' && (
          <Card header="Create BGMI ID to Sell" className="max-w-2xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="w-full border border-purple-200 rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none transition"
                  value={bgmiForm.title}
                  onChange={handleBgmiChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="w-full border border-purple-200 rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none transition"
                  value={bgmiForm.price}
                  onChange={handleBgmiChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  className="w-full border border-purple-200 rounded px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none transition"
                  value={bgmiForm.description}
                  onChange={handleBgmiChange}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="media">Photo/Video</label>
                <input
                  id="media"
                  type="file"
                  name="media"
                  accept="image/*,video/*"
                  className="w-full border border-purple-200 rounded px-3 py-2"
                  onChange={handleBgmiChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow hover:scale-105 transition text-lg"
              >
                {loading ? 'Posting...' : 'Create'}
              </button>

              {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
              {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
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
