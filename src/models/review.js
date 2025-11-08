import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: [true, "El ID del juego es obligatorio."]
  },
  puntuacion: {
    type: Number,
    min: [1, "La puntuación mínima es 1."],
    max: [5, "La puntuación máxima es 5."],
    required: [true, "Debes asignar una puntuación al juego."]
  },
  textoReseña: {
    type: String,
    required: [true, "La reseña no puede estar vacía."],
    minlength: [10, "La reseña debe tener al menos 10 caracteres."],
    maxlength: [500, "La reseña no puede superar los 500 caracteres."]
  },
  horasJugadas: {
    type: Number,
    default: 0,
    min: [0, "Las horas jugadas no pueden ser negativas."]
  },
  dificultad: {
    type: String,
    enum: {
      values: ["Fácil", "Normal", "Difícil"],
      message: "La dificultad debe ser Fácil, Normal o Difícil."
    },
    default: "Normal"
  },
  recomendaria: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
});

export const Review = mongoose.model("Review", reviewSchema);