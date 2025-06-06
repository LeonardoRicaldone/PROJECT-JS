import express from "express";
import faqsController from "../controllers/faqsController.js";
import router from "./products.js";

const faqsRoutes = express.Router();

// Get all FAQs
router
.route("/")
.get(faqsController.getAllFaqs)
.post(faqsController.insertFaqs);

router
.route("/:id")
.put(faqsController.updateFaqs)
.delete(faqsController.deleteFaqs);

export default faqsRoutes;