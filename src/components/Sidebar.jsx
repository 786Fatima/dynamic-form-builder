import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiEdit3,
  FiFileText,
  FiMessageSquare,
  FiMenu,
  FiLogOut,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import useStore from "../services/store";
import clsx from "clsx";
import { ROUTE_LIST } from "../utils/routes";

const { DASHBOARD, FORM_LIST, CREATE_FORM, LOGIN } = ROUTE_LIST;

export default function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useStore();

  const navigation = [
    { name: "Dashboard", href: DASHBOARD, icon: FiHome },
    { name: "Create Form", href: CREATE_FORM, icon: FiEdit3 },
    { name: "My Forms", href: FORM_LIST, icon: FiFileText },
  ];

  return (
    <aside
      className={clsx(
        "bg-white shadow-lg transition-all duration-300 flex flex-col min-h-screen",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          "border-b border-gray-200",
          sidebarCollapsed ? "p-2" : "p-4"
        )}
      >
        <div
          className={clsx(
            "flex items-center",
            sidebarCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  <FiHome />
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                Dynamic Form Builder
              </span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className={clsx(
              "p-2 rounded-md hover:bg-gray-100 transition-colors",
              sidebarCollapsed && "w-full flex justify-center"
            )}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FiMenu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={clsx("flex-1", sidebarCollapsed ? "p-2" : "p-4")}>
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={clsx(
                    "flex items-center rounded-md text-sm font-medium transition-colors group relative",
                    sidebarCollapsed ? "p-3 justify-center" : "px-3 py-2",
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  title={sidebarCollapsed ? item.name : ""}
                >
                  <item.icon
                    className={clsx(
                      "w-5 h-5 flex-shrink-0",
                      !sidebarCollapsed && "mr-3"
                    )}
                  />
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                  {isActive && !sidebarCollapsed && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary-600 rounded-l"></div>
                  )}
                  {isActive && sidebarCollapsed && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary-600 rounded-l"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
