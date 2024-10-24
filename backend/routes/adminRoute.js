import express from "express";
import adminController from "../controller/adminController.js";
import orderController from "../controller/orderController.js";
const router = express.Router();

router.post("/admin-login", adminController.authAdmin);
router.post("/logout", adminController.logout);
router.post("/admin-addproduct", adminController.addProduct);
router.get("/admin-get-products", adminController.getProduct);
router.patch("/:id/listunlist-status", adminController.listUnlistProduct);
router.patch("/:id/editproduct", adminController.editProduct);
router.get("/admin-get-orders", orderController.getOrders);


export default router;