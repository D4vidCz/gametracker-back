import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { Game } from "./models/game.js";
import { Review } from "./models/review.js";

dotenv.config();
const app = express();

connectDB();

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
