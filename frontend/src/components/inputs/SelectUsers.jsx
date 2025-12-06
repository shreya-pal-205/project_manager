import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUser } from 'react-icons/lu';
import Modal from '../Modal';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  // Toggle selection in modal
  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  // Confirm selection
  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  // Map selected IDs to user objects
  const selectedUserObjects = allUsers.filter((user) => selectedUsers.includes(user._id));

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
  }, [selectedUsers]);

  return (
    <div className="space-y-2">
      {/* Button to open modal */}
      <button
        className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        <LuUser /> {selectedUsers.length === 0 ? 'Add Members' : 'Edit Members'}
      </button>

      {/* Display selected users */}
      {selectedUserObjects.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedUserObjects.map((user) => (
            <span
              key={user._id}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {user.name}
            </span>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select Users">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div key={user._id} className="flex justify-between items-center p-2 border-b">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={() => setIsModalOpen(false)}
          >
            CANCEL
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAssign}
          >
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
