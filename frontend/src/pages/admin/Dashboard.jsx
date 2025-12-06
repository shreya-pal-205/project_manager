import React, { useContext, useEffect, useState } from "react";
import { UserAuth } from "../../hooks/UserAuth";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import helper from "../../utils/helper";
import InfoCard from "../../components/cards/InfoCard";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/charts/CustomPieChart";
import CustomBarChart from "../../components/charts/CustomBarChart";


const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"]

const Dashboard = () => {
  UserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);


  //Prepare Chart Data
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributioData = [
      {status: "Pending", count: taskDistribution?.pending || 0},
      {status: "In Progress", count: taskDistribution?.inProgress || 0},
      {status: "Completed", count: taskDistribution?.completed || 0},
    ];

    setPieChartData(taskDistributioData);


    const PriorityLevelData = [
      {priority: "low", count: taskPriorityLevels?.low || 0},
      {priority: "medium", count: taskPriorityLevels?.medium || 0},
      {priority: "high", count: taskPriorityLevels?.high || 0},
    ];

    setBarChartData(PriorityLevelData);
  }






  // Fetch dashboard data
  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null)
      }
    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
    }
  };


  const onSeeMore = () => {
    navigate('/admin/tasks');
  }
 

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">  
      <div className="flex flex-col gap-6">
        {/* Greeting Section */}
        <div className="bg-gradient-to-r from-[#36C2CE] via-[#478CCF] to-[#4535C1] text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold">Good morning, {user?.name}</h2>
          <p className="text-sm md:text-base opacity-90 mt-1">
            {moment().format("dddd, Do MMMM YYYY")}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            label="Total Tasks"
            value={helper.addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="from-[#36C2CE] to-[#478CCF]"
          />

          <InfoCard
            label="Pending Tasks"
            value={helper.addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.pending || 0
            )}
            color="from-[#FF8C00] to-[#FFB347]"
          />

          <InfoCard
            label="In-progress Tasks"
            value={helper.addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.["in-progress"] || 0
            )}
            color="from-[#FFD700] to-[#FFA500]"
          />

          <InfoCard
            label="Completed Tasks"
            value={helper.addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.completed || 0
            )}
            color="from-[#32CD32] to-[#228B22]"
          />
        </div>
        



{/* 📊 Task Distribution Section - Side by Side Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Pie Chart Card */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#E0F7FF] via-[#CFE7FF] to-[#E4ECFF] text-[#2C3E50]">
      <h5 className="text-lg font-semibold tracking-wide">Task Distribution (Pie)</h5>
    </div>

    {/* Pie Chart */}
    <div className="p-6">
      <CustomPieChart data={pieChartData} colors={COLORS} />
    </div>
  </div>




  

  {/* Bar Chart Card */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#E0F7FF] via-[#CFE7FF] to-[#E4ECFF] text-[#2C3E50]">
      <h5 className="text-lg font-semibold tracking-wide">Task Distribution (Bar)</h5>
    </div>

    {/* Bar Chart */}
    <div className="p-6">
      <CustomBarChart data={barChartData} />
    </div>
  </div>
</div>















{/* 📝 Recent Tasks Section */}
<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#d0e8ff] via-[#b6d8ff] to-[#9fc4ff] text-[#1e3a5f]">
    <h5 className="text-lg font-semibold tracking-wide">Recent Tasks</h5>
    <button
      onClick={onSeeMore}
      className="flex items-center gap-2 text-sm font-medium bg-white text-[#2c4d7a] px-4 py-2 rounded-full shadow-sm hover:bg-[#f0f0f0] transition"
    >
      See All
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>

  {/* Table */}
  <div className="p-4">
    <TaskListTable tableData={dashboardData?.recentTasks || []} />
  </div>
</div>












      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
