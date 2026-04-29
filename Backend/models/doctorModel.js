import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    speciality: { type: String, required: true },
    experience: { type: Number, required: true },
    image: { type: String },
    degree: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true, require: true },
    fees: { type: Number, required: true },
    address: { type: Object},
    date:{type:Number,required:true},
    slots_booked:{type:Object,default:{}}
  },
  { timestamps: true ,minimize:false}
);

const DoctorModel =mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default DoctorModel;