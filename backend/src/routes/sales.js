import express from "express";
import salesController from "../controllers/salesController.js";

const router = express.Router();

router.route("/").post(salesController.insertSales);

router.route("/category").get(salesController.salesByCategory);
router.route("/best-products").get(salesController.bestSellingProducts);
router.route("/frequent-customers").get(salesController.frecuentCustomers);
router.route("/total-earnings").get(salesController.totalEarnings);

export default router;