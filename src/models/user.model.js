import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// const UserSchema = new Schema({
//   firstName: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
//   email: {
//     type: String,
//     unique: true,
//     trim: true,
//     required: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error('Please fill in the proper email');
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   jobRole: {
//     type: String,
//     required: true,
//   },
//   department: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   Date: {
//     type: Date,
//     default: Date.now(),
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },
// });

const User = mongoose.model('User', userSchema);
export default User;
