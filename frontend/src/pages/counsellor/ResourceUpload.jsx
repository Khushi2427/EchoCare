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
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Prevent multiple uploads
    if (loading) return;

    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));

      // Only append file if type is not article
      if (form.type !== "article" && file) {
        data.append("file", file);
      }

      // Basic check for required file for non-article types
      if (form.type !== "article" && !file) {
        alert("Please select a file for this resource type.");
        setLoading(false);
        return;
      }

      await uploadResource(data);
      alert("Resource uploaded successfully");

      // Reset form
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
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Upload Resource</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="input"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="input"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="input"
        >
          <option value="article">Article</option>
          <option value="pdf">PDF</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>

        <input
          name="category"
          placeholder="Category (stress, anxiety...)"
          value={form.category}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="input"
        />

        {form.type === "article" ? (
          <textarea
            name="content"
            placeholder="Article content"
            value={form.content}
            onChange={handleChange}
            className="input h-32"
          />
        ) : (
          <input
            type="file"
            onChange={handleFileChange}
            className="input"
            accept={
              form.type === "pdf"
                ? "application/pdf"
                : form.type === "audio"
                ? "audio/*"
                : "video/*"
            }
            required
          />
        )}

        <button
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default ResourceUpload;
