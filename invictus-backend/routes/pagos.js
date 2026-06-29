const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosController');

// Rutas para el API de pagos
router.get('/', pagosController.obtenerPagos);
router.post('/', pagosController.crearPago);
router.put('/:id', pagosController.actualizarPago);
router.delete('/:id', pagosController.eliminarPago);

module.exports = router;