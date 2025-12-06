import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/cards/TaskCard";

const MyTasks = () => {
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

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  useEffect(() => {
    getAllTasks(filterStatus);
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="p-6 w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-fadeIn">

        {/* HEADER BOX */}
        <div className="w-full mb-8 p-5 bg-white rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">My Tasks</h2>
              <p className="text-gray-500 text-sm mt-1">
                Track your assigned tasks and view progress in real-time.
              </p>
            </div>
          </div>

          {/* STATUS TABS */}
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

        {/* BODY TITLE */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Tasks Assigned to You
        </h2>

        {/* TASK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {allTasks?.map((item, index) => (
            <div key={item._id} className="hover:scale-[1.02] transition-transform">
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
                onClick={() => handleClick(item._id)}
              />
            </div>
          ))}
        </div>

        {/* NO TASKS MESSAGE */}
        {allTasks.length === 0 && (
          <div className="text-center mt-10 text-gray-600 text-lg">
            No tasks assigned yet.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;
