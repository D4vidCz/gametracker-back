# Game Tracker Back-end

**Gametracker** es una API RESTful desarrollada con **Node.js**, **Express** y **MongoDB** que permite gestionar una biblioteca de videojuegos: registrar, listar y evaluar juegos. Forma parte del **Proyecto Final 2025** del programa **JOVENÉS CREATIVOS - 2025**.

## Integrantes
- David Cruz
- Felipe santos

# Objetivos del proyecto

- Ofrecer una plataforma para organizar, reseñar y explorar videojuegos.
- La página debe permitir a los usuarios gestionar su biblioteca personal de videojuegos, agregar reseñas
y visualizar los juegos y reseñas disponibles.


## 🚀 Tecnologías Utilizadas

| Tecnología | Descripción |
|-------------|--------------|
| **Node.js** | Entorno de ejecución de JavaScript del lado del servidor |
| **Express.js** | Framework minimalista para crear APIs de forma rápida |
| **MongoDB Atlas** | Base de datos NoSQL en la nube |
| **Mongoose** | ODM para modelar objetos y esquemas de MongoDB |
| **Dotenv** | Manejo de variables de entorno |
| **Nodemon** | Recarga automática del servidor en desarrollo |
| **Git y GitHub** | Control de versiones y colaboración en equipo |

## 🧩 Sprint 1 - Backend funcional

**Estado:** ✅ Completado

### ✅ Avances
- Conexión con MongoDB Atlas estable.
- Modelos `Game` y `Review` creados y relacionados.
- Controladores y rutas CRUD operativas.
- Endpoints probados con Postman.
- Datos visibles en MongoDB Atlas.

### 💻 Endpoints principales
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/games` | Listar juegos |
| POST | `/api/games` | Crear juego |
| PUT | `/api/games/:id` | Actualizar juego |
| DELETE | `/api/games/:id` | Eliminar juego |
| GET | `/api/reviews` | Listar reseñas |
| POST | `/api/reviews` | Crear reseña |
| DELETE | `/api/reviews/:id` | Eliminar reseña |

