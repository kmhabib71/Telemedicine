// User Schema
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    medicalHistory: { type: Array, default: [] }, // For patients
    pastConsultations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
    specialization: { type: String }, // For doctors
    availability: [
      {
        day: { type: String },
        slots: [{ start: { type: String }, end: { type: String } }],
      },
    ], // Doctor's schedule
    credentials: { type: String }, // For doctors
    profilePicture: { type: String },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dateOfBirth: { type: Date },
    address: { type: String },
    profession: { type: String },
    height: {
      feet: { type: Number },
      inch: { type: Number },
    },
    weight: { type: Number }, // in kg
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
