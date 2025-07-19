import React, { useEffect, useState } from 'react';
import { fetchUsers } from "@/api/userAPI";
import { MdDelete } from "react-icons/md";

import ConfirmModal from "@/components/Modal/ConfirmModal";
import SuccessPopup from "@/components/Popup/SuccessPopup";

export default function ManageUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  const confirmDelete = (userId) => {
    setDeleteId(userId);
    setShowConfirm(true);
  };

  const handleDeleteUser = () => {
    setUsers((prev) => prev.filter((user) => user.id !== deleteId));
    setShowConfirm(false);
    setSuccessMessage(`User ${deleteId} has been successfully deleted!`);
    setShowSuccessPopup(true);
    setDeleteId(null);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] bg-blue-50/50 rounded-xl shadow-inner border border-blue-100 animate-pulse text-blue-600 text-xl font-semibold">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] bg-red-50/50 rounded-xl shadow-inner border border-red-100 text-red-600 text-xl font-semibold">
        Error loading users: {error.message}. Please try again.
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] px-0 py-0 overflow-y-auto font-sans bg-gray-50">
      <div className="bg-blue-100/70 backdrop-blur-md px-6 py-4 rounded-b-3xl shadow-xl shadow-blue-200/50 sticky top-0 z-10 border-b border-blue-200 flex justify-between items-center">
      </div>

      <div className="p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-100/50 border border-blue-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Avatar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm flex-shrink-0">
                          <img
                            src={user.image}
                            alt={user.firstName}
                            className="w-full h-full object-cover transition-opacity duration-300"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">
                        {user.fullname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => confirmDelete(user.id)}
                            className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                            title="Delete User"
                          >
                            <MdDelete className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-blue-500 text-lg">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete user ${deleteId}? This action cannot be undone.`}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeleteUser}
        confirmButtonText="Yes, Delete"
        cancelButtonText="Cancel"
      />

      {showSuccessPopup && (
        <SuccessPopup
          message={successMessage}
          onClose={handleCloseSuccessPopup}
        />
      )}
    </div>
  );
}