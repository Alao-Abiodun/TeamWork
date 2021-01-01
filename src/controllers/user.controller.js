import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const { sendMail } = require("../helpers/email");

const { JWT_SECRET } = process.env;

class UserController {
  async signUp(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jobRole,
      department,
      address,
    } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({
          message: "User already exist, please signIn.",
        });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
        gender,
        jobRole,
        department,
        address,
        // token,
      });
      const config = {
        subject: "Login details",
        to: email,
        html: `<h1>Login Details</h1>
        <p>email ${email}</p>
        <p>password: ${password}</p>`,
      };
      await sendMail(config);
      const createdUser = await user.save();
      const token = await jwt.sign({ id: createdUser._id }, JWT_SECRET, {
        expiresIn: "2h",
      });
      // user.token = token

      return res.status(201).json({
        status: "success",
        data: {
          message: "User successfully created",
          token,
          userId: createdUser._id,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: error,
        data: {
          message: "Server Error",
        },
      });
    }
  }

  async Login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          // status: error,
          error: "This email does not exist",
        });
      } else {
        const confirmPassword = await bcrypt.compare(password, user.password);
        if (!confirmPassword) {
          return res.status(400).json({
            status: "error",
            data: {
              message: "User password is incorrect",
            },
          });
        } else {
          const token = await jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "2h",
          });
          return res.status(200).json({
            status: "success",
            data: {
              token,
              userId: user._id,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: error,
        error: new Error("Server Error"),
      });
    }
  }
}

export default new UserController();
