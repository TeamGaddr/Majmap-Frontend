import { Outlet } from "react-router-dom";
import DashboardHeaderComponent from "./dashboard-header/dashboard-header.component";
import Sidebar from "./sidebar/sidebar.component";
import DashboardFooter from "./dashboard-footer/dashboard-footer.component";

export default function SidebarLayout() {
  return (
    <>
      {/* *~~*~~*~~ LAYOUT ~~*~~*~~* */}
      <div className="relative w-full h-screen">
      {/* Background with dot grid */}
      <div className="absolute w-full h-full bg-[#1b1b1b] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 viewBox=%220 0 400 400%22%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%2210%22 fill=%22%23ffffff%22 /%3E%3Ccircle cx=%22200%22 cy=%2220%22 r=%2210%22 fill=%22%23ffffff%22 /%3E%3Ccircle cx=%22200%22 cy=%22200%22 r=%2210%22 fill=%22%23ffffff%22 /%3E%3Ccircle cx=%2220%22 cy=%22200%22 r=%2210%22 fill=%22%23ffffff%22 /%3E%3C/svg%3E') center/50px 50px repeat"></div>

      {/* Header */}
      <div className="fixed w-full">
        <DashboardHeaderComponent />
      </div>

      {/* Main content */}
      <div className="flex h-screen pt-[64px]">
        <div id="sidebar" className="fixed h-full">
          <Sidebar />
        </div>
        <div className="flex-grow ml-[255px] overflow-auto pb-[80px]">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
    </>
  );
}
