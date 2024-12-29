import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { updateUserProfile } from "../api/userApi";
import Header from "../components/common/Header";

const ProfileUpdate = () => {
  const { user } = useAuth();
  const userData = user?.data || {}; // Use an empty object as fallback
console.log("userData",userData);
const [formData, setFormData] = useState({
  id: userData._id || "",
  profilePicture: userData.profilePicture || "/default-profile.png", // Default profile picture
  name: userData.name || "",
  phone: userData.phone || "", // Default to empty if missing
  gender: userData.gender || "", // Default to empty if missing
  dateOfBirth: userData.dateOfBirth
    ? {
        year: new Date(userData.dateOfBirth).getFullYear(),
        month: new Date(userData.dateOfBirth).getMonth() + 1,
        day: new Date(userData.dateOfBirth).getDate(),
      }
    : { year: "", month: "", day: "" },
  address: userData.address || "", // Default to empty if missing
  email: userData.email || "",
  profession: userData.profession || "",
  height: userData.height || { feet: "", inch: "" },
  weight: userData.weight || "",
  bloodGroup: userData.bloodGroup || "",
});
  const [hasChanged, setHasChanged] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "profilePicture") {
      setFormData((prev) => ({
        ...prev,
        profilePicture: e.target.files[0],
      }));
    } else if (["year", "month", "day"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: { ...prev.dateOfBirth, [name]: value },
      }));
    } else if (["feet", "inch"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        height: { ...prev.height, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setHasChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    try {
      const data = new FormData();
      
      // Prepare `dateOfBirth` as a valid Date or null
      const { year, month, day } = formData.dateOfBirth;
      const finalDateOfBirth =
        year && month && day ? new Date(year, month - 1, day).toISOString() : null;
  
      // Append fields to FormData
      for (const key in formData) {
        if (key === "height") {
          // Append height as a properly serialized JSON string
          data.append(key, JSON.stringify(formData[key]));
        } else if (key === "profilePicture" && formData[key] instanceof File) {
          data.append(key, formData[key]);
        } else if (key === "dateOfBirth") {
          data.append(key, finalDateOfBirth); // Append the formatted date or null
        } else if (typeof formData[key] === "object") {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
  
      console.log("Data being sent to the backend:", data);
      const updatedUser = await updateUserProfile(data);
      setSuccessMessage("Profile updated successfully.");
      setHasChanged(false);
      console.log("Updated user:", updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };
  
  

  if (!user?.data) {
    return <p>Loading user data...</p>;
  }


  return (
    <div>
      <Header hideSearch={true} />
      <div className="max-w-6xl mx-auto px-6 py-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <button className="mr-4 text-blue-500 hover:text-blue-700">
            &larr; {/* Back Arrow */}
          </button>
          Update Profile
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div>
              <div className="flex flex-col items-center mb-6">
                <img
                  src={
                    formData.profilePicture instanceof File
                      ? URL.createObjectURL(formData.profilePicture)
                      : formData.profilePicture || "/default-profile.png"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
                  Upload Photo
                  <input
                    type="file"
                    name="profilePicture"
                    className="hidden"
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Gender *</label>
                <div className="flex items-center gap-4">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Date of Birth *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={formData.dateOfBirth.year}
                    onChange={handleInputChange}
                    className="w-1/3 p-3 border rounded-md"
                  />
                  <input
                    type="number"
                    name="month"
                    placeholder="Month"
                    value={formData.dateOfBirth.month}
                    onChange={handleInputChange}
                    className="w-1/3 p-3 border rounded-md"
                  />
                  <input
                    type="number"
                    name="day"
                    placeholder="Day"
                    value={formData.dateOfBirth.day}
                    onChange={handleInputChange}
                    className="w-1/3 p-3 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Height</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="feet"
                    placeholder="Feet"
                    value={formData.height.feet}
                    onChange={handleInputChange}
                    className="w-1/2 p-3 border rounded-md"
                  />
                  <input
                    type="number"
                    name="inch"
                    placeholder="Inch"
                    value={formData.height.inch}
                    onChange={handleInputChange}
                    className="w-1/2 p-3 border rounded-md"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Blood Group</label>
                <div className="flex gap-4 flex-wrap">
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (group) => (
                      <label key={group} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="bloodGroup"
                          value={group}
                          checked={formData.bloodGroup === group}
                          onChange={handleInputChange}
                        />
                        {group}
                      </label>
                    )
                  )}
                </div>
                <div className="mt-6">
            <button
              type="submit"
              disabled={!hasChanged}
              className={`w-full py-3 rounded-md ${
                hasChanged
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Update Profile
            </button>
          </div>
              </div>
            </div>
          </div>

          
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
