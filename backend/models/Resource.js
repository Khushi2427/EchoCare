import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["article", "pdf", "audio", "video"],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "stress",
        "anxiety",
        "depression",
        "sleep",
        "mindfulness",
        "general",
      ],
      default: "general",
    },

    tags: [
      {
        type: String,
      },
    ],

    // For PDFs, Audio, Video (Cloudinary / Firebase URL)
    fileUrl: {
      type: String,
    },

    // For articles (rich text / markdown)
    content: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    creatorRole: {
      type: String,
      enum: ["admin", "counsellor"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
