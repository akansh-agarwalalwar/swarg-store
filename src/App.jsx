import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminPanel from './admin/AdminPanel'
import SubAdminPanel from './subadmin/SubAdminPanel'
import UserPanel from './user/UserPanel'
import AuthForm from './components/AuthForm'

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-teal-100">
      <h1 className="text-4xl font-extrabold text-orange-700 mb-10 drop-shadow">Welcome to Swarg Store</h1>
      <div className="flex flex-col sm:flex-row gap-8">
        <button
          onClick={() => navigate('/login/admin')}
          className="bg-gradient-to-r from-orange-500 to-teal-500 text-white px-10 py-6 rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transition border-4 border-white hover:border-orange-200"
        >
          Go to Admin Panel
        </button>
        <button
          onClick={() => navigate('/login/subadmin')}
          className="bg-gradient-to-r from-teal-500 to-orange-500 text-white px-10 py-6 rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transition border-4 border-white hover:border-teal-200"
        >
          Go to Subadmin Panel
        </button>
        <button
          onClick={() => navigate('/user')}
          className="bg-gradient-to-r from-slate-500 to-orange-500 text-white px-10 py-6 rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transition border-4 border-white hover:border-slate-200"
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
        <Route path="/user" element={<UserPanel />} />
        <Route path="/login/admin" element={<AuthForm role="admin" />} />
        <Route path="/login/subadmin" element={<AuthForm role="subadmin" />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
