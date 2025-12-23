import React, { useState } from "react";
import { uploadResource } from "../../services/resourceService";

const ResourceUpload = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "article",
    category: "general",
    tags: "",
    content: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        data.append(key, value)
      );

      if (form.type !== "article" && file) {
        data.append("file", file);
      }

      if (form.type !== "article" && !file) {
        alert("Please select a file for this resource type.");
        setLoading(false);
        return;
      }

      await uploadResource(data);
      alert("Resource uploaded successfully");

      setForm({
        title: "",
        description: "",
        type: "article",
        category: "general",
        tags: "",
        content: "",
      });
      setFile(null);
    } catch (err) {
      console.error("Upload Error:", err);
      alert(
        err.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 border">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📤 Upload New Resource
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter resource title"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Type & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Resource Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="article">Article</option>
                <option value="pdf">PDF</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Category
              </label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="stress, anxiety, motivation"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tags
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="comma separated tags"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Content or File */}
          {form.type === "article" ? (
            <div>
              <label className="block text-sm font-medium mb-1">
                Article Content
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write article content here..."
                className="w-full border rounded-lg px-4 py-2 h-36 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload File
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                accept={
                  form.type === "pdf"
                    ? "application/pdf"
                    : form.type === "audio"
                    ? "audio/*"
                    : "video/*"
                }
                required
              />
            </div>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-lg text-white font-semibold transition
              ${
                loading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
          >
            {loading ? "Uploading..." : "Upload Resource"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResourceUpload;
