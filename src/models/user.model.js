import mongoose from 'mongoose';
import { isEmail } from 'validator';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error('Please fill in the proper email');
        }
      },
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'employee'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
