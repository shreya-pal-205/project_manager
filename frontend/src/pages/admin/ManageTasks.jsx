import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/cards/TaskCard";
import { motion } from "framer-motion";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      const statusSummary = response.data?.statusSummary || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "pending", count: statusSummary.pendingTasks || 0 },
        { label: "inProgress", count: statusSummary.inProgressTasks || 0 },
        { label: "completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {};

  useEffect(() => {
    getAllTasks(filterStatus);
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="p-6 w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-fadeIn">

        {/* HEADER BOX */}
        <div className="w-full mb-8 p-5 bg-white rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

            <div>
              <h2 className="text-3xl font-bold text-gray-800">Manage Tasks</h2>
              <p className="text-gray-500 text-sm mt-1">
                View, update & organize all tasks efficiently
              </p>
            </div>

            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 
              text-white px-5 py-2 rounded-lg shadow-md transition-all"
            >
              <LuFileSpreadsheet size={20} /> Download Report
            </button>
          </div>

          {/* TASK STATUS TABS */}
          {tabs?.length > 0 && (
            <div className="mt-5">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
            </div>
          )}
        </div>

        {/* TASKS SECTION HEADER */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          All Tasks
        </h2>

        {/* TASK GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
        >
          {allTasks?.map((item, index) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="hover:scale-[1.02] transition-transform"
            >
              <TaskCard
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || []}
                onClick={() => handleClick(item)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* NO TASKS FOUND */}
        {allTasks.length === 0 && (
          <div className="text-center text-gray-600 text-lg mt-10">
            No tasks found.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
