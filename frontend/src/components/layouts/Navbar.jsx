import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleSideMenu = () => {
    setOpenSideMenu((prev) => !prev);
  };

  return (
    <>
      {/* ✅ Top Navbar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#36C2CE] via-[#478CCF] to-[#4535C1] text-white shadow-md relative z-50">
        {/* Hamburger - Mobile Only */}
        <button className="md:hidden text-white" onClick={toggleSideMenu}>
          {openSideMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Active Page Title */}
        <h1 className="text-xl font-bold">{activeMenu || "Dashboard"}</h1>

        {/* Right side icons placeholder */}
        <div className="flex gap-4">{/* Add icons if needed */}</div>
      </div>

      {/* ✅ Mobile Drawer + Overlay */}
      <div className="md:hidden">
        {/* Overlay (kept transparent so right pane stays white) */}
        {openSideMenu && (
          <div
            className="fixed inset-0 bg-transparent z-40"
            onClick={() => setOpenSideMenu(false)}
          ></div>
        )}

        {/* SideMenu Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#36C2CE] via-[#478CCF] to-[#4535C1] text-white shadow-lg transform transition-transform duration-300 z-50
          ${openSideMenu ? "translate-x-0" : "-translate-x-full"}`}
        >
          <SideMenu activeMenu={activeMenu} open={openSideMenu} />
        </div>
      </div>

      {/* ✅ Desktop SideMenu (always open on left) */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#36C2CE] via-[#478CCF] to-[#4535C1] text-white shadow-lg">
        <SideMenu activeMenu={activeMenu} open />
      </div>
    </>
  );
};

export default Navbar;
