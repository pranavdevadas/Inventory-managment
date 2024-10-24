import expressAsyncHandler from "express-async-handler";
import adminGenerateToken from "../utils/adminGenerateToken.js";
import Product from "../model/productModel.js";
import mongoose from "mongoose";

const adminController = {
  authAdmin: expressAsyncHandler(async (req, res) => {
    try {
      const adminCredentials = {
        email: "admin@gmail.com",
        password: 123456,
      };
      const { email, password } = req.body;

      if (
        email === adminCredentials.email &&
        password == adminCredentials.password
      ) {
        adminGenerateToken(res, "123456");
        res.status(200).json({ message: "Login Success" });
      } else {
        res.status(400).json({ message: "Invalid Email or Password" });
      }
    } catch (error) {
      console.error(error);
    }
  }),
  logout: expressAsyncHandler(async (req, res) => {
    try {
      res.cookie("adminJwt", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Admin logged out" });
    } catch (error) {
      console.error(error);
    }
  }),
  addProduct: expressAsyncHandler(async (req, res) => {
    const { name, brand, price, description, stock } = req.body;
    try {
      const product = new Product({
        name,
        brand,
        price,
        description,
        stock,
      });

      await product.save();
      res.status(200).json({ message: "Product Added" });
    } catch (error) {
      console.error(error);
    }
  }),
  getProduct: expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
    }
  }),
  listUnlistProduct: expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { isListed } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await Product.findById(id);

      if (product) {
        product.isListed = isListed;

        const updatedProduct = await product.save();

        res.status(200).json({
          message: `Product ${isListed ? "listed" : "unlisted"} successfully`,
          product: updatedProduct,
        });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
    }
  }),
  editProduct: expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, brand, price, description, stock, isListed } = req.body;

    try {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.name = name;
      product.brand = brand;
      product.price = price;
      product.description = description;
      product.stock = stock;
      product.isListed = isListed;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
    }
  }),
};

export default adminController;
