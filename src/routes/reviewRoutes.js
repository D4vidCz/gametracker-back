import express from "express";
import { getReviews, getReviewsByGame, createReview, updateReview, deleteReview } from "../controllers/reviewController.js";
import { getReviewStatsByGame } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/game/:gameId", getReviewsByGame);
router.get("/stats/:gameId", getReviewStatsByGame);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);


export default router;
