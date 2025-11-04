import express from "express";
import { getGames, getGameById, createGame, updateGame, deleteGame, toggleCompletado } from "../controllers/gameController.js";

const router = express.Router();

router.get("/", getGames);
router.get("/:id", getGameById); // 👈 NUEVA RUTA
router.post("/", createGame);
router.put("/:id", updateGame);
router.patch("/:id/completado", toggleCompletado);
router.delete("/:id", deleteGame);

export default router;
