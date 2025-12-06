import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
      setShowInput(false);
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div className="space-y-4">
      {/* 📎 Attachment List */}
      <div className="space-y-2">
        {attachments.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 text-gray-800">
              <span className="text-blue-500">
                <LuPaperclip size={20} />
              </span>
              <p className="font-medium break-all">{item}</p>
            </div>

            <button
              onClick={() => handleDeleteOption(index)}
              className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
            >
              <HiOutlineTrash size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* ➕ Add Attachment Button */}
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <HiMiniPlus size={20} />
          Add Attachment
        </button>
      )}

      {/* 📝 Input Box for New Attachment */}
      {showInput && (
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm animate-fadeIn">
          <span className="text-blue-500">
            <LuPaperclip size={20} />
          </span>
          <input
            type="text"
            placeholder="Enter attachment link or name"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="flex-1 bg-transparent focus:outline-none text-gray-800 px-2"
          />
          <button
            onClick={handleAddOption}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="bg-gray-300 hover:bg-gray-400 text-white px-3 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAttachmentsInput;
