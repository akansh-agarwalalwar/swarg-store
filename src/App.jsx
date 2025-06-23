import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminPanel from './admin/AdminPanel'
import SubAdminPanel from './subadmin/SubAdminPanel'
import UserPanel from './user/UserPanel'

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-10 drop-shadow">Welcome to Swarg Store</h1>
      <div className="flex flex-col sm:flex-row gap-8">
        <button
          onClick={() => navigate('/admin')}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-10 py-6 rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transition border-4 border-white hover:border-blue-200"
        >
          Go to Admin Panel
        </button>
        <button
          onClick={() => navigate('/subadmin')}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-6 rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transition border-4 border-white hover:border-green-200"
        >
          Go to Subadmin Panel
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-6 rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transition border-4 border-white hover:border-purple-200"
        >
          Go to User Panel
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/subadmin" element={<SubAdminPanel />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
