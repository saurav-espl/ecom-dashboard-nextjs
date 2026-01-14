// Layout.js

import React, { useState } from "react";
import Dasheader from "./component/header";
import Sidebar from "./component/sideheader";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarOpenedByHeader, setIsSidebarOpenedByHeader] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSidebarOpenedByHeader(false);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setIsSidebarOpenedByHeader(false);
  };

  const handleHeaderToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSidebarOpenedByHeader(true);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} handleCloseSidebar={handleCloseSidebar} />
      <main className="main-content">
        <Dasheader
          toggleSidebar={
            isSidebarOpenedByHeader
              ? handleCloseSidebar
              : handleHeaderToggleSidebar
          }
          isSidebarOpen={isSidebarOpen}
        />
        {children}
      </main>
    </>
  );
};

export default Layout;
