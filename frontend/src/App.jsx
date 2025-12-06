// src/App.jsx
import React, { useContext } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageTasks from "./pages/admin/ManageTasks.jsx";
import CreateTask from "./pages/admin/CreateTask.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import MyTasks from "./pages/user/MyTasks.jsx";
import ViewTaskDetails from "./pages/user/ViewTaskDetails.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

import EmailGenerator from "./pages/admin/EmailGenerator.jsx";
import ExcelSummarizer from "./pages/admin/ExcelSummarizer.jsx";
import MeetingScheduler from "./pages/admin/MeetingScheduler.jsx";
import UserProvider from "./context/UserContext.jsx";
import { UserContext } from "./context/UserContext.jsx"

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/email-generator" element={<EmailGenerator />} />
            <Route path="/admin/summarize" element={<ExcelSummarizer />} />
            <Route path="/admin/meeting" element={<MeetingScheduler />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
          </Route>

          <Route path="/" element={<Root />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
