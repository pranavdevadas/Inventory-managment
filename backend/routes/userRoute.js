import express from "express";
import userController from "../controller/userController.js";
import orderController from '../controller/orderController.js'
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", userController.authUser);
router.post("/register", userController.registerUser);
router.post("/logout", userController.logout);
router
  .route("/profile")
  .get(protect, userController.getProfile)
  .put(protect, userController.updateProfile);
router.get('/get-products', protect, userController.getProducts)
router.post('/create-order', protect, orderController.createOrder)

export default router;
