import { Review } from "../models/review.js";
import mongoose from "mongoose";

// Obtener todas las reseñas
export const getReviews = async (req, res) => {
  try {
    const reseñas = await Review.find().populate("juegoId", "titulo genero plataforma");
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las reseñas" });
  }
};

// Obtener reseñas de un juego específico
export const getReviewsByGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const reviews = await Review.find({ juegoId: gameId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas del juego" });
  }
};

export const getReviewStatsByGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    const totalReviews = await Review.countDocuments({ juegoId: gameId });

    const promedioPuntuacion = await Review.aggregate([
      { $match: { juegoId: new mongoose.Types.ObjectId(gameId) } },
      { $group: { _id: null, promedio: { $avg: "$puntuacion" } } }
    ]);

    const totalHoras = await Review.aggregate([
      { $match: { juegoId: new mongoose.Types.ObjectId(gameId) } },
      { $group: { _id: null, total: { $sum: "$horasJugadas" } } }
    ]);

    const recomendados = await Review.countDocuments({ juegoId: gameId, recomendaria: true });

    res.json({
      totalReviews,
      promedioPuntuacion: promedioPuntuacion[0]?.promedio || 0,
      totalHorasJugadas: totalHoras[0]?.total || 0,
      recomendados
    });
  } catch (error) {
    console.error("❌ Error al obtener estadísticas del juego:", error);
    res.status(500).json({ message: "Error al obtener estadísticas del juego" });
  }
};



// Crear una nueva reseña
export const createReview = async (req, res) => {
  try {
    const nuevaReseña = new Review(req.body);
    await nuevaReseña.save();
    res.status(201).json(nuevaReseña);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear la reseña" });
  }
};

// Actualizar una reseña
export const updateReview = async (req, res) => {
  try {
    const reseñaActualizada = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reseñaActualizada) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }
    res.json(reseñaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la reseña" });
  }
};

// Eliminar una reseña
export const deleteReview = async (req, res) => {
  try {
    const reseñaEliminada = await Review.findByIdAndDelete(req.params.id);
    if (!reseñaEliminada) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }
    res.json({ mensaje: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar la reseña" });
  }
};
