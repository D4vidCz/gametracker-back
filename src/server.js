import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { Game } from "./models/game.js";
import { Review } from "./models/review.js";
import gameRoutes from "./routes/gameRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import cors from "cors";




dotenv.config();
const app = express();

connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors());

app.use(express.json()); // Para leer JSON
app.use("/api/stats", statsRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("GameTracker API lista 🚀");
});

Game.find()
  .then(() => console.log("✅ Modelos de Game cargados correctamente"))
  .catch(err => console.log("❌ Error al cargar modelo:", err));

  
Review.find()
  .then(() => console.log("✅ Modelo Review cargado correctamente"))
  .catch(err => console.log("❌ Error al cargar modelo Review:", err));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
