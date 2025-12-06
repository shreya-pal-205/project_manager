import React from "react";
import moment from "moment";

const TaskListTable = ({ tableData = [] }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "inProgress":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      case "low":
        return "bg-green-100 text-green-700 border border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <table className="w-full text-left border-collapse">
        {/* Table Head */}
        <thead>
          <tr className="bg-[#f0f6ff] text-[#2c3e50]">
            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-tl-2xl">
              Task Name
            </th>
            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-tr-2xl">
              Created On
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-6 text-center text-gray-500 italic"
              >
                No tasks available
              </td>
            </tr>
          ) : (
            tableData.map((task, index) => (
              <tr
                key={task._id || index}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                  {task.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadgeColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {task.createdAt
                    ? moment(task.createdAt).format("Do MMM YYYY")
                    : "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
