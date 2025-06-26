import React, { useState } from 'react';
import Card from '../components/Card';
import SubAdminForm from '../components/SubAdminForm';

export default function ManageSubadmins({ subAdmins, setSubAdmins, deleteSubAdmin }) {
  const [showModal, setShowModal] = useState(false);

  // Optionally, fetch subadmins from backend after adding
  const handleSubAdminAdded = async (form) => {
    setShowModal(false);
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/subadmin/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    // Optionally, refresh subadmin list here
  };

  return (
    <Card header="Manage Sub Admins" className="max-w-3xl mx-auto mb-8 shadow-lg">
      <div className="flex justify-end mb-4">
        <button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow hover:scale-105 transition text-base sm:text-lg"
          onClick={() => setShowModal(true)}
        >
          Add Subadmin
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg bg-white shadow text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="p-2 sm:p-3 text-left">Username</th>
              <th className="p-2 sm:p-3 text-left">Email</th>
              <th className="p-2 sm:p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subAdmins.map(sa => (
              <tr key={sa.id} className="border-t hover:bg-blue-50 transition">
                <td className="p-2 sm:p-3">{sa.username}</td>
                <td className="p-2 sm:p-3">{sa.email}</td>
                <td className="p-2 sm:p-3 flex flex-col sm:flex-row gap-2">
                  <button className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold w-full sm:w-auto" onClick={() => deleteSubAdmin(sa.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for Add Subadmin */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-blue-200 p-0 w-full max-w-lg mx-2 relative animate-scale-in">
            <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-blue-100 rounded-t-3xl">
              <h2 className="text-2xl font-extrabold text-blue-700">Add Subadmin</h2>
              <button
                className="text-3xl text-gray-400 hover:text-red-500 focus:outline-none font-bold transition"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="px-6 py-6">
              <SubAdminForm onSuccess={handleSubAdminAdded} onClose={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
