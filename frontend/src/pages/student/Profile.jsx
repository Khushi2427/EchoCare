import React from "react";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then((res) => {
      setForm(res.data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({
      name: form.name,
      phone: form.phone,
    });
    alert("Profile updated successfully");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-3"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          className="border p-2 w-full mb-3 bg-gray-100"
          value={form.email}
          disabled
        />

        <input
          className="border p-2 w-full mb-3"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <button className="bg-blue-600 text-white px-4 py-2 w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
