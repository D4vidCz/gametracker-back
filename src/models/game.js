import mongoose from "mongoose";
import { Review } from "./review.js";

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: true, unique: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  añoLanzamiento: { type: Number, required: true },
  desarrollador: { type: String },
  imagenPortada: { type: String },
  descripcion: { type: String },
  completado: { type: Boolean, default: false }
});

// 🧩 Middleware para eliminar reseñas asociadas al borrar un juego
gameSchema.pre("findOneAndDelete", async function (next) {
  try {
    const game = await this.model.findOne(this.getFilter());
    if (game) {
      await Review.deleteMany({ juegoId: game._id });
      console.log(`🗑️ Reseñas eliminadas para el juego: ${game.titulo}`);
    }
    next();
  } catch (error) {
    console.error("❌ Error al eliminar reseñas asociadas:", error);
    next(error);
  }
});

export const Game = mongoose.model("Game", gameSchema);
