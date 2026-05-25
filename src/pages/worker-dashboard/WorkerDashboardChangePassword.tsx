import { useState } from "react";

export default function WorkerDashboardChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="p-8 font-dmsans w-full h-full">
      <h1 className="text-2xl font-semibold text-[#296FDA] mb-6">
        Change Password
      </h1>

      <div className="bg-white shadow rounded-lg border border-[#BAD6F5] p-6 w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full lg:w-[60%] border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#296FDA]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full lg:w-[60%] border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#296FDA]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full lg:w-[60%] border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#296FDA]"
          />
        </div>

        {/* Save Button */}
        <button className="px-4 py-2 bg-[#296FDA] text-white rounded hover:bg-blue-700 text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}
