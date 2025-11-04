import { Game } from "../models/game.js";
import { Review } from "../models/review.js"; // 👈 Importa el modelo de reseñas

// Obtener todos los juegos
export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};

// Obtener un juego por ID
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener el juego", error });
  }
};

// Crear un nuevo juego
export const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el juego" });
  }
};

// Actualizar un juego
export const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el juego" });
  }
};

// ✅ Eliminar un juego y sus reseñas asociadas
export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el juego exista
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    // 🧹 Eliminar reseñas relacionadas con este juego
    await Review.deleteMany({ juegoId: id });

    // 🕹️ Eliminar el juego
    await Game.findByIdAndDelete(id);

    res.json({ message: "Juego y reseñas eliminados correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el juego:", error);
    res.status(400).json({ message: "Error al eliminar el juego" });
  }

  
};

// Actualizar solo el campo "completado"
export const toggleCompletado = async (req, res) => {
  try {
    const { id } = req.params;
    const { completado } = req.body;
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { completado },
      { new: true }
    );
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar estado de completado" });
  }
};

