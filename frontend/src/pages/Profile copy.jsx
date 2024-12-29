import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getUserProfile, updateUserProfile } from "../api/userApi";
import Header from "../components/common/Header";

const ProfilePage = () => {
  const { user, setUser } = useAuth(); // Access user and setter from context
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile();
        setProfile(userData.data);
      } catch (error) {
        setErrorMessage("Failed to load profile data.");
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      const updatedUser = await updateUserProfile(profile);
      setProfile(updatedUser); // Update local state with server response
      setUser(updatedUser); // Update user in context
      setSuccessMessage("Profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      setErrorMessage("Failed to update profile.");
    }
  };

  return (
    <div>
           <Header />
   
           <div className="container mx-auto mt-[150px]">
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    {/* Header Section */}
    <div className="bg-blue-500 text-white py-6 px-6 text-center">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <p className="mt-2 text-sm">Manage your account details and preferences</p>
    </div>

    {/* Content Section */}
    <div className="p-6 md:p-10">
      {/* Notifications */}
      {errorMessage && (
        <p className="text-red-500 bg-red-100 border border-red-300 px-4 py-2 rounded-md mb-6">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="text-green-500 bg-green-100 border border-green-300 px-4 py-2 rounded-md mb-6">
          {successMessage}
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-10">
        {/* Profile Picture */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <img
            src={profile.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover shadow-md"
          />
          {isEditing && (
            <input
              type="text"
              name="profilePicture"
              value={profile.profilePicture}
              onChange={handleInputChange}
              placeholder="Profile Picture URL"
              className="mt-4 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Profile Information */}
        <div className="w-full md:w-2/3">
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800">{profile.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800">{profile.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Phone
            </label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800">{profile.phone || "N/A"}</p>
            )}
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Role
            </label>
            <p className="text-gray-800 capitalize">{profile.role}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default ProfilePage;
