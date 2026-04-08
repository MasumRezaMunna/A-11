import React, { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import api from "../api/axios";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const { user, updateUserProfile } = useContext(AuthContext);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    try {
      await updateUserProfile(name, photo);

      const res = await api.patch("/users/update-profile", { name, photo });

      if (res.data.status === "success") {
        toast.success("Profile Updated Successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              name="photo"
              type="text"
              defaultValue={user?.photoURL}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
