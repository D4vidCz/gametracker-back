import { Review } from "../models/review.js";

// Obtener todas las reseñas
export const getReviews = async (req, res) => {
  try {
    const reseñas = await Review.find().populate("juegoId", "titulo genero plataforma");
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las reseñas" });
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
