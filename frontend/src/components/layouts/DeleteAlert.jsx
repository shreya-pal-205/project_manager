import React from 'react';

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="text-center">
      <p className="text-gray-800 text-sm mb-4">{content}</p>
      <button
        type="button"
        onClick={onDelete}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteAlert;

