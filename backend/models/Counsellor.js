import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const counsellorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // for login
    password: { type: String, required: true }, // hashed password
    specialization: { type: [String], required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    availability: [
      {
        day: { type: String, required: true },
        slots: { type: [String], required: true },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
counsellorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("Counsellor", counsellorSchema);
