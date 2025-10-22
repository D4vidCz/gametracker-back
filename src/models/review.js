import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  textoReseña: { type: String, required: true },
  horasJugadas: { type: Number, default: 0 },
  dificultad: { type: String, enum: ["Fácil", "Normal", "Difícil"], default: "Normal" },
  recomendaria: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
});

export const Review = mongoose.model("Review", reviewSchema);
