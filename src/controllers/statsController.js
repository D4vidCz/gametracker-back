import { Game } from "../models/game.js";
import { Review } from "../models/review.js";

export const getStats = async (req, res) => {
  try {
    const totalJuegos = await Game.countDocuments();
    const juegosCompletados = await Game.countDocuments({ completado: true });

    const totalHorasJugadas = await Review.aggregate([
      { $match: { juegoId: { $ne: null } } },
      { $group: { _id: null, total: { $sum: "$horasJugadas" } } }
    ]);

    const promedioPuntuacion = await Review.aggregate([
      { $match: { juegoId: { $ne: null } } },
      { $group: { _id: null, promedio: { $avg: "$puntuacion" } } }
    ]);

    res.json({
      totalJuegos,
      juegosCompletados,
      totalHorasJugadas: totalHorasJugadas[0]?.total || 0,
      promedioPuntuacion: Math.round((promedioPuntuacion[0]?.promedio || 0) * 10) / 10
    });
  } catch (error) {
    console.error("❌ Error al calcular estadísticas:", error);
    res.status(500).json({ message: "Error al calcular estadísticas" });
  }
};
