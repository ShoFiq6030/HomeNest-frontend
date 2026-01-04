import React, { useState, useEffect, useRef } from "react";
import {
  FaBan,
  FaCheckCircle,
  FaUserShield,
  FaEllipsisV,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

export default function UserRow({ user, onActionComplete }) {
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [suspendReason, setSuspendReason] = useState("");
  const [updateRole, setUpdateRole] = useState(user.role || "user");

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActionMenuOpen(false);
      }
    }

    if (actionMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [actionMenuOpen]);

  const handleAction = async () => {
    try {
      const actionData = {};

      if (selectedAction === "suspend" || selectedAction === "activate") {
        actionData.action = selectedAction;
        if (selectedAction === "suspend") {
          actionData.reason = suspendReason;
        }
      } else if (selectedAction === "updateRole") {
        actionData.action = "updateRole";
        actionData.newRole = updateRole;
      }

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${user._id}/action`,
        actionData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      let successMessage;
      if (selectedAction === "suspend") {
        successMessage = "User suspended successfully!";
      } else if (selectedAction === "activate") {
        successMessage = "User activated successfully!";
      } else if (selectedAction === "updateRole") {
        successMessage = `User role updated to ${updateRole} successfully!`;
      }

      toast.success(successMessage);
      setActionModalOpen(false);
      setSelectedAction("");
      setSuspendReason("");
      setUpdateRole("user");
      
      // Trigger callback to refresh parent component data
      if (onActionComplete) {
        onActionComplete();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user.");
    }
  };

  const getUserStatus = () => {
    if (user.isBanned) return "suspended";
    return "active";
  };

  const getCurrentRole = () => {
    return user.role || "user";
  };

  const renderActionModal = () => {
    if (!actionModalOpen) return null;

    const closeModal = () => {
      setActionModalOpen(false);
      setSelectedAction("");
      setSuspendReason("");
      setUpdateRole("user");
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {selectedAction === "suspend" && "Suspend User"}
            {selectedAction === "activate" && "Activate User"}
            {selectedAction === "updateRole" && "Update User Role"}
          </h3>

          {selectedAction === "suspend" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suspension Reason
              </label>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Enter reason for suspension..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                rows={4}
              />
            </div>
          )}

          {selectedAction === "updateRole" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <select
                value={updateRole}
                onChange={(e) => setUpdateRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAction}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
            >
              {selectedAction === "suspend" && "Suspend User"}
              {selectedAction === "activate" && "Activate User"}
              {selectedAction === "updateRole" && "Update Role"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-50 transition-colors">
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-gray-800">{user.name}</div>
              <div className="text-sm text-gray-500">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="text-sm text-gray-600">{user.email}</div>
        </td>
        <td className="py-3 px-4">
          <div className="text-sm text-gray-600">{user.role || "user"}</div>
        </td>
        <td className="py-3 px-4">
          <div
            className={`flex items-center gap-2 ${
              user.status !=="active" ? "text-red-600" : "text-green-600"
            }`}
          >
            {user.status !=="active"? (
              <>
                <FaBan className="w-4 h-4" />
                <span className="font-medium">suspended</span>
              </>
            ) : (
              <>
                <MdVerified className="w-4 h-4" />
                <span className="font-medium">Active</span>
              </>
            )}
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="text-sm font-medium text-pink-600">
            {user.properties?.length || 0}
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="relative">
            <button
              onClick={() => setActionMenuOpen(!actionMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Actions"
            >
              <FaEllipsisV className="w-5 h-5" />
            </button>

            {actionMenuOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
              >
                <div className="py-1">
                  {user.status === "active" ? (
                    <button
                      onClick={() => {
                        setSelectedAction("suspend");
                        setActionModalOpen(true);
                        setActionMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaBan className="w-4 h-4" />
                      Suspend User
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedAction("activate");
                        setActionModalOpen(true);
                        setActionMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaCheckCircle className="w-4 h-4" />
                      Activate User
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedAction("updateRole");
                      setActionModalOpen(true);
                      setActionMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FaUserShield className="w-4 h-4" />
                    Update Role
                  </button>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
      {renderActionModal()}
    </>
  );
}
