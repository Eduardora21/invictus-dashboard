const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/jugadoresController');

// Ruta para obtener la lista (GET /api/jugadores)
router.get('/', jugadoresController.obtenerJugadores);
//Ruta para registrar un jugador (POST /api/jugadores)
router.post('/', jugadoresController.crearJugador);
//Rutas para el CRUD completo (ocupan el :id en la URL)
router.put('/:id', jugadoresController.actualizarJugador);
router.delete('/:id', jugadoresController.eliminarJugador);


module.exports = router;