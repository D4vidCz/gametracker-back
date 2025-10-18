import express from "express";
import { getReviews, createReview, deleteReview, updateReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", createReview);
router.put("/:id", updateReview);   // ← ✨ nueva ruta
router.delete("/:id", deleteReview);

export default router;
