import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  const sideMenuWidth = 250; // Adjust width as per your SideMenu

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1">
          {/* ✅ Fixed Side Menu */}
          <div className="hidden md:block fixed top-16 left-0 h-screen z-50" style={{ width: sideMenuWidth }}>
            <SideMenu activeMenu={activeMenu} open={true} />
          </div>

          {/* Page Content */}
          <div
            className="flex-1 p-4 bg-[#f5f7fa] min-h-screen overflow-auto"
            style={{ marginLeft: sideMenuWidth }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

