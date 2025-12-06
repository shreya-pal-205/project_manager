import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-[#1b2a4b] dark:via-[#162038] dark:to-[#0f172a] rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 w-full border border-gray-200 dark:border-gray-700">

      {/* User Info */}
      <div className="mb-4 text-center">
        <p className="text-gray-900 dark:text-gray-100 font-bold text-lg tracking-wide">
          {userInfo?.name}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {userInfo?.email}
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4">
        <StatCard label="Pending" count={userInfo?.pendingTasks || 0} status="pending" />
        <StatCard label="In Progress" count={userInfo?.inProgressTasks || 0} status="in-progress" />
        <StatCard label="Completed" count={userInfo?.completedTasks || 0} status="completed" />
      </div>
    </div>
  );
};

export default UserCard;

// Stat Card Component
const StatCard = ({ label, count, status }) => {
  const getColorStyles = () => {
    switch (status) {
      case "in-progress":
        return "from-cyan-200 to-cyan-400 text-cyan-900 border-cyan-300";
      case "completed":
        return "from-green-200 to-green-400 text-green-900 border-green-300";
      default:
        return "from-indigo-200 to-indigo-400 text-indigo-900 border-indigo-300";
    }
  };

  return (
    <div
      className={`bg-gradient-to-br ${getColorStyles()} rounded-md px-3 py-2 font-semibold text-center shadow-sm border`}
    >
      <p className="text-xl font-extrabold leading-none">{count}</p>
      <p className="text-[10px] uppercase tracking-wide mt-1">{label}</p>
    </div>
  );
};