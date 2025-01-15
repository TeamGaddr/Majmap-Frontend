import { Outlet } from "react-router-dom";
import DashboardHeaderComponent from "./dashboard-header/dashboard-header.component";
import Sidebar from "./sidebar/sidebar.component";

export default function SidebarLayout() {
  return (
    <>
      {/* *~~*~~*~~ LAYOUT ~~*~~*~~* */}
      <div className="fixed w-full">
        <DashboardHeaderComponent />
      </div>
      <div className="flex h-screen pt-[64px]">
        <div id="sidebar" className="fixed h-full">
          <Sidebar />
        </div>
        <div className="flex-grow ml-[255px] overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
