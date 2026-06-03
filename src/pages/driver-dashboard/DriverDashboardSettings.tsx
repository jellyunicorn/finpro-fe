import { useState } from "react";

export default function DriverDashboardSettings() {
  const [fullName, setFullName] = useState("Budi");
  const [email] = useState("budi@mail.com");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-8 font-dmsans w-full h-full">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">Settings</h1>
      <div className="flex flex-col md:flex-row bg-white shadow rounded-lg border border-[#BAD6F5] p-6 w-full">
        <div className="flex flex-col flex-1 pr-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-claundry-blue"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="text"
              value={email}
              readOnly
              className="w-full border rounded px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button className="px-4 py-2 bg-claundry-blue text-white rounded hover:bg-blue-700 text-sm self-start">
            Save Changes
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-1">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-[#BAD6F5] mb-3">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <label className="cursor-pointer px-3 py-1 bg-claundry-blue text-white rounded hover:bg-blue-700 text-sm">
            Upload Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
