import express from "express";
import {
  createResource,
  getAllResources,
  getResourceById,
  deleteResource,
} from "../controllers/resourceController.js";

import { protect } from "../middlewares/authMiddleware.js";
import roleMiddleware2 from "../middlewares/roleMiddleware.js";
import {upload} from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Student + Admin + Counsellor
router.get("/", protect, getAllResources);
router.get("/:id", protect, getResourceById);

// Admin + Counsellor
router.post(
  "/",
  protect,
  roleMiddleware2("admin", "counsellor"),
  upload.single("file"),
  createResource
);

// Admin only
router.delete(
  "/:id",
  protect,
  roleMiddleware2("admin"),
  deleteResource
);

export default router;
