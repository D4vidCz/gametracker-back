import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título del juego es obligatorio"],
  },
  genre: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
}, {
  timestamps: true
});

export const Game = mongoose.model("Game", gameSchema);
