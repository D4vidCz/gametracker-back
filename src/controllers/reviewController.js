import { Review } from "../models/review.js";
import mongoose from "mongoose";

// ✅ Obtener todas las reseñas
export const getReviews = async (req, res) => {
  try {
    const reseñas = await Review.find().populate("juegoId", "titulo genero plataforma");
    res.json(reseñas);
  } catch (error) {
    console.error("❌ Error al obtener las reseñas:", error);
    res.status(500).json({ mensaje: "Error al obtener las reseñas" });
  }
};

// ✅ Obtener reseñas de un juego específico
export const getReviewsByGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ mensaje: "ID de juego inválido" });
    }

    const reviews = await Review.find({ juegoId: gameId });
    res.json(reviews);
  } catch (error) {
    console.error("❌ Error al obtener reseñas del juego:", error);
    res.status(500).json({ message: "Error al obtener reseñas del juego" });
  }
};

// ✅ Obtener estadísticas del juego
export const getReviewStatsByGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ mensaje: "ID de juego inválido" });
    }

    const totalReviews = await Review.countDocuments({ juegoId: gameId });

    const [promedioPuntuacion] = await Review.aggregate([
      { $match: { juegoId: new mongoose.Types.ObjectId(gameId) } },
      { $group: { _id: null, promedio: { $avg: "$puntuacion" } } }
    ]);

    const [totalHoras] = await Review.aggregate([
      { $match: { juegoId: new mongoose.Types.ObjectId(gameId) } },
      { $group: { _id: null, total: { $sum: "$horasJugadas" } } }
    ]);

    const recomendados = await Review.countDocuments({ juegoId: gameId, recomendaria: true });

    res.json({
      totalReviews,
      promedioPuntuacion: promedioPuntuacion?.promedio || 0,
      totalHorasJugadas: totalHoras?.total || 0,
      recomendados
    });
  } catch (error) {
    console.error("❌ Error al obtener estadísticas del juego:", error);
    res.status(500).json({ message: "Error al obtener estadísticas del juego" });
  }
};

// ✅ Crear una nueva reseña (con manejo de errores detallado)
export const createReview = async (req, res) => {
  try {
    const nuevaReseña = new Review(req.body);
    await nuevaReseña.save();
    res.status(201).json(nuevaReseña);
  } catch (error) {
    console.error("❌ Error al crear reseña:", error);

    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errores: mensajes });
    }

    res.status(500).json({ mensaje: "Error al crear la reseña" });
  }
};

// ✅ Actualizar una reseña
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID de reseña inválido" });
    }

    const reseñaActualizada = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!reseñaActualizada) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }

    res.json(reseñaActualizada);
  } catch (error) {
    console.error("❌ Error al actualizar reseña:", error);

    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errores: mensajes });
    }

    res.status(500).json({ mensaje: "Error al actualizar la reseña" });
  }
};

// ✅ Eliminar una reseña
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID de reseña inválido" });
    }

    const reseñaEliminada = await Review.findByIdAndDelete(id);
    if (!reseñaEliminada) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }

    res.json({ mensaje: "Reseña eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar reseña:", error);
    res.status(500).json({ mensaje: "Error al eliminar la reseña" });
  }
};
