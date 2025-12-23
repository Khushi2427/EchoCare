import Resource from "../models/Resource.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

/**
 * @desc    Create new resource
 * @route   POST /api/resources
 * @access  Admin / Counsellor
 */


export const createResource = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("File:", req.file);

    const {
      title,
      description,
      type,
      category,
      tags,
      content,
    } = req.body;

    let fileUrl = null;

    // Upload file if exists
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file,
        "mental_health_resources"
      );
      fileUrl = result.secure_url;
    }

    // ✅ CREATE resource ONLY ONCE
    const resource = await Resource.create({
      title,
      description,
      type,
      category,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      content: type === "article" ? content : "",
      fileUrl,
      createdBy: req.user._id,
      creatorRole: req.user.role,
    });

    res.status(201).json(resource);

  } catch (error) {
    console.error("❌ Resource Creation Error:", error);
    res.status(500).json({
      message: "Failed to create resource",
      error: error.message,
    });
  }
};


/**
 * @desc    Get all resources
 * @route   GET /api/resources
 * @access  Student / Admin / Counsellor
 */
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();

    console.log("📦 Resources from DB:", resources); // 👈 ADD THIS

    res.status(200).json(resources);
  } catch (error) {
    console.error("❌ Fetch Resources Error:", error);
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};


/**
 * @desc    Get resource by ID
 * @route   GET /api/resources/:id
 * @access  Student / Admin / Counsellor
 */
export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate(
      "createdBy",
      "name role"
    );

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(200).json(resource);
  } catch (error) {
    console.error("❌ Fetch Resource Error:", error);
    res.status(500).json({
      message: "Failed to fetch resource",
    });
  }
};

/**
 * @desc    Delete resource
 * @route   DELETE /api/resources/:id
 * @access  Admin
 */
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    await resource.deleteOne();

    res.status(200).json({
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Resource Error:", error);
    res.status(500).json({
      message: "Failed to delete resource",
    });
  }
};
