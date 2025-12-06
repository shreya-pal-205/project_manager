import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
      setShowInput(false);
    }
  };

  const handleDeleteOption = (index) => {
    const updateArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updateArr);
  };

  return (
    <div className="space-y-4">
      {/* ✅ Task List */}
      <div className="space-y-2">
        {todoList.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="flex items-center gap-3 text-gray-800 font-medium">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm font-semibold">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>
              {item}
            </p>

            <button
              className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
              onClick={() => handleDeleteOption(index)}
            >
              <HiOutlineTrash size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* ➕ Add New Task Button */}
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <HiMiniPlus size={20} />
          Add Task
        </button>
      )}

      {/* 📝 Input Box for New Task */}
      {showInput && (
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm animate-fadeIn">
          <input
            type="text"
            placeholder="Enter task"
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

export default TodoListInput;
