import mongoose from "mongoose";
import Review from "./ReviewModel.js";
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isDoctor: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

  

    seenNotifications: {
      type: Array,
      default: [],
    },

    unseenNotifications: {
      type: Array,
      default: [],
    },

    ProfileImage: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Review,
      },
    ],
  },

  {
    timestamps: true,
  }

  
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("users", userSchema);

export default Users