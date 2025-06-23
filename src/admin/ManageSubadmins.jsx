import React, { useState } from 'react';
import Card from '../components/Card';

export default function ManageSubadmins({ subAdmins, setSubAdmins, newSubAdmin, setNewSubAdmin, addSubAdmin, deleteSubAdmin }) {
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addSubAdmin();
    setShowModal(false);
  };

  return (
    <Card header="Manage Sub Admins" className="max-w-3xl mx-auto mb-8 shadow-lg">
      <div className="flex justify-end mb-4">
        <button
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-full font-bold shadow hover:scale-105 transition text-base sm:text-lg"
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
              <th className="p-2 sm:p-3 text-left">Name</th>
              <th className="p-2 sm:p-3 text-left">Email</th>
              <th className="p-2 sm:p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subAdmins.map(sa => (
              <tr key={sa.id} className="border-t hover:bg-blue-50 transition">
                <td className="p-2 sm:p-3">{sa.editing ? (
                  <input
                    type="text"
                    value={sa.editUsername}
                    onChange={e => setSubAdmins(subAdmins.map(s => s.id === sa.id ? { ...s, editUsername: e.target.value } : s))}
                    className="border rounded px-2 py-1 w-full text-sm sm:text-base"
                  />
                ) : sa.username}</td>
                <td className="p-2 sm:p-3">{sa.editing ? (
                  <input
                    type="text"
                    value={sa.editName}
                    onChange={e => setSubAdmins(subAdmins.map(s => s.id === sa.id ? { ...s, editName: e.target.value } : s))}
                    className="border rounded px-2 py-1 w-full text-sm sm:text-base"
                  />
                ) : sa.name}</td>
                <td className="p-2 sm:p-3">{sa.editing ? (
                  <input
                    type="email"
                    value={sa.editEmail}
                    onChange={e => setSubAdmins(subAdmins.map(s => s.id === sa.id ? { ...s, editEmail: e.target.value } : s))}
                    className="border rounded px-2 py-1 w-full text-sm sm:text-base"
                  />
                ) : sa.email}</td>
                <td className="p-2 sm:p-3 flex flex-col sm:flex-row gap-2">
                  {sa.editing ? (
                    <>
                      <button className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold w-full sm:w-auto" onClick={() => {
                        setSubAdmins(subAdmins.map(s => s.id === sa.id ? { ...s, username: sa.editUsername, name: sa.editName, email: sa.editEmail, editing: false } : s));
                      }}>Save</button>
                      <button className="bg-gray-400 text-white px-3 py-1 rounded-full font-semibold w-full sm:w-auto" onClick={() => {
                        setSubAdmins(subAdmins.map(s => s.id === sa.id ? { ...s, editing: false } : s));
                      }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="bg-yellow-400 text-white px-3 py-1 rounded-full font-semibold w-full sm:w-auto" onClick={() => {
                        setSubAdmins(subAdmins.map(s => s.id === sa.id ? { ...s, editing: true, editUsername: sa.username, editName: sa.name, editEmail: sa.email } : s));
                      }}>Edit</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold w-full sm:w-auto" onClick={() => deleteSubAdmin(sa.id)}>Delete</button>
                    </>
                  )}
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
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 py-6" onSubmit={handleAdd}>
              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  className="border border-blue-200 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none transition text-sm sm:text-base bg-blue-50"
                  value={newSubAdmin.username}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-blue-200 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none transition text-sm sm:text-base bg-blue-50"
                  value={newSubAdmin.name}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-blue-200 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none transition text-sm sm:text-base bg-blue-50"
                  value={newSubAdmin.email}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-blue-200 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none transition text-sm sm:text-base bg-blue-50"
                  value={newSubAdmin.password}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, password: e.target.value })}
                  required
                />
              </div>
              <div className="sm:col-span-2 flex justify-end mt-2">
                <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-2 rounded-full font-bold shadow hover:scale-105 transition text-base sm:text-lg w-full sm:w-auto">Add Subadmin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
} 