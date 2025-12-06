import React from "react";
import Progress from "../layouts/Progress";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Process":
        return "bg-cyan-100 text-cyan-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-indigo-100 text-indigo-700";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "low":
        return "bg-emerald-100 text-emerald-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-rose-100 text-rose-700";
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case "In Process":
        return "border-cyan-400";
      case "Completed":
        return "border-green-400";
      default:
        return "border-indigo-400";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-gradient-to-br from-[#0b1121] to-[#1b2a4b] 
  text-gray-100 shadow-lg border ${getBorderColor()} border-l-[5px] rounded-2xl 
  p-5 w-full max-w-[420px]
  cursor-pointer transform transition-all duration-300 ease-out 
  hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400 hover:scale-[1.03]`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-[11px] px-3 py-[3px] rounded-full font-semibold ${getStatusTagColor()}`}
          >
            {status}
          </span>
          <span
            className={`text-[11px] px-3 py-[3px] rounded-full font-semibold ${getPriorityTagColor()}`}
          >
            {priority} Priority
          </span>
        </div>

        {attachmentCount > 0 && (
          <div className="flex items-center text-gray-300 gap-1 text-sm">
            <LuPaperclip />
            <span>{attachmentCount}</span>
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-300 mt-2 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-2">
          Task Done:{" "}
          <span className="font-medium text-gray-200">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>
        <Progress progress={progress} status={status} />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mt-2">
        <div>
          <p className="font-medium opacity-70">Start Date</p>
          <p className="font-semibold text-gray-200">
            {moment(createdAt).format("Do MMM YYYY")}
          </p>
        </div>
        <div>
          <p className="font-medium opacity-70">Due Date</p>
          <p className="font-semibold text-gray-200">
            {moment(dueDate).format("Do MMM YYYY")}
          </p>
        </div>
      </div>

      {/* Assigned To */}
      {assignedTo && assignedTo.length > 0 && (
        <div className="absolute -bottom-3 right-5 bg-[#14223b] text-gray-300 text-xs px-3 py-1 rounded-full border border-blue-400 shadow-md flex flex-wrap gap-1">
          Assigned to:{" "}
          <span className="font-medium text-gray-100 ml-1">
            {assignedTo.map((person, index) => (
              <span key={person._id}>
                {person.name || person.email}
                {index < assignedTo.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
