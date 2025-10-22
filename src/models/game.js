import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  añoLanzamiento: { type: Number, required: true },
  desarrollador: { type: String },
  imagenPortada: { type: String },
  descripcion: { type: String },
  completado: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
});

export const Game = mongoose.model("Game", gameSchema);
