import express from "express";
import { getReviews, createReview, updateReview, deleteReview, getReviewsByGame } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/game/:gameId", getReviewsByGame);

router.get("/", getReviews);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
