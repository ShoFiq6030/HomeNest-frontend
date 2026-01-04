import React, { useState } from "react";
import { FaUsers, FaBuilding, FaChartBar, FaSearch } from "react-icons/fa";
import UserTable from "../components/admin/UserTable";
import AdminPropertyTable from "../components/admin/AdminPropertyTable";
import { useTheme } from "../hooks/useTheme";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const { theme } = useTheme();

  const tabs = [
    { id: "users", name: "User Management", icon: FaUsers },
    { id: "properties", name: "Property Management", icon: FaBuilding },
  ];

  return (
    <section className="px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users and properties with powerful admin tools</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">1,234</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaUsers className="text-blue-600 w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-800">567</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaBuilding className="text-green-600 w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-800">23</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FaChartBar className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 border-b pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-pink-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl shadow-md p-6`}>
          {activeTab === "users" && <UserTable />}
          {activeTab === "properties" && <AdminPropertyTable />}
        </div>
      </div>
    </section>
  );
}
