import { Review } from "../models/review.js";

// Obtener todas las reseñas
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("game");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas" });
  }
};

// Crear una nueva reseña
export const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la reseña" });
  }
};

// Eliminar una reseña
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar la reseña" });
  }
};
