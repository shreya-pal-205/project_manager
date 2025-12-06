import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

const SideMenu = ({ activeMenu, open }) => {
  const { user, clearUser } = useContext(UserContext);
  const [SideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <div
      className={`
        fixed md:static top-0 left-0 h-full md:h-screen w-64
        bg-gradient-to-b from-[#4535C1] via-[#478CCF] to-[#36C2CE]
        text-white shadow-lg transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 z-50
      `}
    >
      {/* User Section */}
      <div className="p-6 border-b border-white/20">
        <h2 className="text-xl font-bold tracking-wide">Team Manager</h2>
        {user?.role === "admin" && (
          <span className="text-xs bg-white/20 px-2 py-1 rounded mt-1 inline-block">
            Admin
          </span>
        )}
        <div className="mt-4">
          <h5 className="text-lg font-semibold">{user?.name || ""}</h5>
          <p className="text-sm opacity-80 break-all">{user?.email || ""}</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex flex-col p-4 gap-2">
        {SideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-[15px] transition-all duration-200
              ${
                activeMenu === item.label
                  ? "bg-white text-[#4535C1] font-semibold"
                  : "hover:bg-white/20"
              }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
