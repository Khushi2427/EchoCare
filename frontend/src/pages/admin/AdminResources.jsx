import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

const AdminResources = () => {
  const { token, user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      const res = await axios.get("/resources");
      setResources(res.data);
      console.log("📡 API response:", res.data);
    } catch (error) {
      console.error("Failed to fetch resources", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/resources/${id}`);
      setResources(resources.filter((r) => r._id !== id));
    } catch (error) {
      alert("Failed to delete resource");
      console.error(error);
    }
  };

  if (loading) return <p className="p-6">Loading resources...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Resources</h1>

      {resources.length === 0 ? (
        <p>No resources available</p>
      ) : (
        <div className="grid gap-6">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{resource.title}</h2>
                <p className="text-gray-600 text-sm">
                  {resource.type} • {resource.category}
                </p>
                {resource.fileUrl && (
                  <a
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 text-sm underline"
                  >
                    View File
                  </a>
                )}
              </div>

              {(user.role === "admin" || user.role === "counsellor") && (
                <button
                  onClick={() => handleDelete(resource._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminResources;
