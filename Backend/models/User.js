import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },

  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: undefined
    }
  },

  lastLocationUpdate: {
    type: Date,
    default: Date.now
  },

  isOnline: {
    type: Boolean,
    default: false
  },

  refreshToken: String,
  profileImage: String
});

// REQUIRED for geo queries
userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);
export default User;
