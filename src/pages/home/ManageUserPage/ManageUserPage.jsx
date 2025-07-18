// src/pages/ManageUserPage/ManageUserPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Menggunakan data dummy dari dummyjson.com/users
        const response = await fetch('https://dummyjson.com/users?limit=10');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    alert("Add User functionality coming soon!");
    // navigate('/management/user/add'); // Jika nanti ada halaman tambah user
  };

  const handleEditUser = (userId) => {
    alert(`Edit User ${userId} functionality coming soon!`);
    // navigate(`/management/user/${userId}`); // Jika nanti ada halaman edit user
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm(`Are you sure you want to delete user ${userId} with all your heart?`)) {
      alert(`User ${userId} deleted with love! (Dummy Action)`);
      // Ini hanya dummy, di aplikasi nyata Anda akan memanggil API DELETE
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] bg-pink-50/50 rounded-xl shadow-inner border border-pink-100 animate-pulse text-pink-600 text-xl font-semibold">
        Loading lovely users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] bg-red-50/50 rounded-xl shadow-inner border border-red-100 text-red-600 text-xl font-semibold">
        Error loading users: {error.message}. Please try again with a sweet smile!
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] px- py-0 overflow-y-auto">
      {/* Header Section */}
      <div className="bg-pink-100/70 backdrop-blur-md px-6 py-4 rounded-b-3xl shadow-xl shadow-pink-200/50 sticky top-0 z-10 border-b border-pink-200 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-pink-700 font-['Pacifico', cursive]">Manage Sweet Users</h2>
        {/* <button
          onClick={handleAddUser}
          className="bg-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow-md shadow-pink-300/50 hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <span className="text-xl">➕</span> Add Lovely User
        </button> */}
      </div>

      {/* User List Table */}
      <div className="p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-pink-100/50 border border-pink-100 overflow-hidden">
          <table className="min-w-full divide-y divide-pink-200">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-pink-600 uppercase tracking-wider">
                  Avatar
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pink-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pink-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pink-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pink-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-pink-100">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-pink-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-pink-200"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-800">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-700">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-full transition-colors duration-200"
                          title="Delete User"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-pink-500 text-lg">
                    No lovely users found. Time to make some friends!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}