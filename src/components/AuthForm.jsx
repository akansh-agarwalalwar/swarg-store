import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ role }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/${role}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      if (data.role === 'admin') navigate('/admin');
      else if (data.role === 'subadmin') navigate('/subadmin');
      else navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">{role === 'admin' ? 'Admin' : 'Subadmin'} Login</h2>
        {error && <div className="text-red-500 text-center font-semibold">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          className="border rounded px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-full font-bold shadow hover:scale-105 transition text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
} 