import expressAsyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";
import Order from "../model/orderModel.js";

const orderController = {
  createOrder: expressAsyncHandler(async (req, res) => {
    const { productId, userId, quantity } = req.body;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < quantity) {
        return res
          .status(400)
          .json({ message: "Insufficient stock available" });
      }

      const totalAmount = product.price * quantity;

      const newOrder = await Order.create({
        product: productId,
        user: userId,
        quantity,
        price: product.price,
        totalamount: totalAmount,
      });

      product.stock -= quantity;
      await product.save();

      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
    }
  }),
  getOrders: expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("user", "name")
        .populate("product", "name");
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
    }
  }),
};

export default orderController;
