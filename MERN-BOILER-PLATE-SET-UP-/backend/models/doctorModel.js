import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    }, 
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    
    },
    clinicLocation: {
      type: String,
    
    },

    clinicName: {
      type: String,
    
    },


    website: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    feePerCunsultation: {
      type: Number,
      required: true,
    },
    timings: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },

    cimage: {
      type: String,
      required: true,
      
    },
    image: {
      type: String,
      required: true,

      
    },

  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctors", doctorSchema);

export default doctorModel