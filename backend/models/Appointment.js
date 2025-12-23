import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    counsellorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Counsellor",
      required: true,
    },
    date: {
      type: String, // "2025-01-20"
      required: true,
    },
    timeSlot: {
      type: String, // "10:00"
      required: true,
    },
    meetingType: {
      type: String,
      enum: ["call", "video"],
      default: "call",
    },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
