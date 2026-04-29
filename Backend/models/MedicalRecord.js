import mongoose from "mongoose";

const MedicalRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
      required: true,
    },

    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },

    symptoms: { type: String, required: true },
   
    medicalTests_and_X_rays: { type: [String], default: [] },
    Chronic_illnesses_or_previous_surgeries: { type: String },
    diagnosis: { type: String, required: true },
    treatment: { type: String, required: true },
  },
  { timestamps: true },
);

const MedicalRecord = mongoose.model("MedicalRecord", MedicalRecordSchema);

export default MedicalRecord;
