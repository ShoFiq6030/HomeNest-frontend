import React, { useState, useEffect } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useApi } from "../../hooks/useApi";
import UserRow from "./UserRow";

export default function UserTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: users,
    loading,
    error,
    refetch,
  } = useApi({
    url: "/api/users/all-users",
    method: "GET",
  });

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (users) {
      setUsersData(users.users);
    }
  }, [users]);

  const handleActionComplete = () => {
    // Refresh the user data when an action is completed
    refetch();
  };
  console.log(usersData);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };


  const handleViewUser = (userId) => {
    window.location.href = `/user-profile/${userId}`;
  };

  const filteredUsers = usersData?.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.phone?.toLowerCase().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || user.isBanned === (statusFilter === "banned");

    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">Error loading users: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          User Management
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleStatusFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => handleStatusFilter("active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "active"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active ({usersData?.filter((u) => !u.isBanned)?.length || 0})
            </button>
            <button
              onClick={() => handleStatusFilter("banned")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "banned"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Banned ({usersData?.filter((u) => u.isBanned)?.length || 0})
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                User
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Properties
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.length > 0 ? (
              currentUsers.map((user) => (
                <UserRow 
                  key={user._id}
                  user={user}
                  onActionComplete={handleActionComplete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500">
                  {searchTerm || statusFilter !== "all"
                    ? "No users found matching your criteria."
                    : "No users available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {usersData?.length > itemsPerPage && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, usersData?.length)} of{" "}
            {usersData?.length} users
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
