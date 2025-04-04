import express from "express";

// Router() nos ayuda a colocar los metodos que tendra mi ruta
const router = express.Router();

router.route("/").post();
router.route("/verifyCodeEmail").post();

export default router;