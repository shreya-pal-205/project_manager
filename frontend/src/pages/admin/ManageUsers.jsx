import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import UserCard from "../../components/cards/UserCard";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading user details:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="p-6 w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 animate-fadeIn">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 p-5 bg-white rounded-xl shadow-md border border-gray-200">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Team Members</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage all users, team members & profiles
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadReport}
            className="px-5 py-2 bg-orange-600 text-white rounded-lg shadow-lg hover:bg-orange-700 transition-all"
          >
            Download Report
          </motion.button>
        </div>

        {/* USERS GRID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {allUsers?.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:scale-[1.02] transition-transform"
            >
              <UserCard userInfo={user} />
            </motion.div>
          ))}
        </motion.div>

        {allUsers.length === 0 && (
          <div className="text-center text-gray-600 text-lg mt-10">
            No users found.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
