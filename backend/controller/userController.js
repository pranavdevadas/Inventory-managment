import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import Product from "../model/productModel.js";

const userController = {
  authUser: expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id);
        res.status(200).json({
          _id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
        });
      } else {
        res.status(400).json({ message: "Invalid Email or Password" });
      }
    } catch (error) {
      console.error(error);
    }
  }),
  registerUser: expressAsyncHandler(async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User Already Exists" });
      }

      const user = await User.create({
        name,
        email,
        phone,
        password,
      });

      if (user) {
        generateToken(res, user._id);
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.error(error);
    }
  }),
  logout: expressAsyncHandler(async (req, res) => {
    try {
      res.cookie("jwt", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "User logged out" });
    } catch (error) {
      console.error(error);
    }
  }),
  getProfile: expressAsyncHandler(async (req, res) => {
    try {
      const user = {
        _id: req.user._id,
        name: req.user.name,
        phone: req.user.phone,
        email: req.user.email,
      };
      res.json(200).json(user);
    } catch (error) {
      console.error(error);
    }
  }),
  updateProfile: expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        if (req.body.password) {
          user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          Phone: updatedUser.phone,
        });
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {
      console.error(error);
    }
  }),
  getProducts: expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.find({ isListed: true });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
    }
  }),
};

export default userController;
