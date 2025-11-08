import mongoose from "mongoose";
import { Review } from "./review.js";

const gameSchema = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: [true, "El título del juego es obligatorio."],
    unique: true,
    minlength: [3, "El título debe tener al menos 3 caracteres."],
    maxlength: [100, "El título no puede tener más de 100 caracteres."]
  },
  genero: { 
    type: String, 
    required: [true, "El género del juego es obligatorio."] 
  },
  plataforma: { 
    type: String, 
    required: [true, "La plataforma es obligatoria."]
  },
  añoLanzamiento: { 
    type: Number, 
    required: [true, "El año de lanzamiento es obligatorio."],
    min: [1970, "El año de lanzamiento no puede ser anterior a 1970."],
    max: [new Date().getFullYear(), "El año de lanzamiento no puede ser en el futuro."]
  },
  desarrollador: { 
    type: String, 
    trim: true 
  },
imagenPortada: { 
  type: String,
  validate: {
    validator: function(v) {
      // Permite URL http/https o cadenas base64
      return (
        !v ||
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v) ||
        /^data:image\/(png|jpg|jpeg|gif|webp);base64,/.test(v)
      );
    },
    message: "La imagen de portada debe ser una URL o una cadena base64 válida."
  }
}
,
  descripcion: { 
    type: String, 
    maxlength: [500, "La descripción no puede superar los 500 caracteres."] 
  },
  completado: { 
    type: Boolean, 
    default: false 
  }
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
