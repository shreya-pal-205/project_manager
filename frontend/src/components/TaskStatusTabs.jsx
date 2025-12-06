import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center items-center w-full mt-4 mb-6">
      <div className="flex bg-blue-50 border border-blue-200 rounded-full shadow-sm p-1">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
              ${
                activeTab === tab.label
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md scale-105"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors duration-300
                ${
                  activeTab === tab.label
                    ? "bg-white text-blue-600"
                    : "bg-blue-200 text-blue-700"
                }`}
            >
              {tab.count}
            </span>
            {activeTab === tab.label && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
