import Appointment from "../models/Appointment.js";
import Counsellor from "../models/Counsellor.js";

/**
 * BOOK APPOINTMENT
 */
export const bookAppointment = async (req, res) => {
  try {
    const { counsellorId, date, timeSlot, meetingType } = req.body;
    const userId = req.user.id;

    const counsellor = await Counsellor.findById(counsellorId);
    if (!counsellor || !counsellor.isActive) {
      return res.status(404).json({ message: "Counsellor not available" });
    }

    const existing = await Appointment.findOne({
      counsellorId,
      date,
      timeSlot,
      status: "booked",
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "This slot is already booked" });
    }

    const appointment = await Appointment.create({
      userId,
      counsellorId,
      date,
      timeSlot,
      meetingType,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Appointment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET USER APPOINTMENTS
 */
export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.user.id,
    }).populate("counsellorId", "name phone specialization");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

/**
 * GET COUNSELLOR APPOINTMENTS
 */
export const getCounsellorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      counsellorId: req.params.id,
    }).populate("userId", "name email");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};
