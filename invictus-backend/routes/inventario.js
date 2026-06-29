const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// Mapeo limpio de rutas hacia el controlador adaptado
router.get('/', inventarioController.obtenerInventario);
router.post('/', inventarioController.crearArticulo);
router.put('/:id', inventarioController.actualizarArticulo);
router.delete('/:id', inventarioController.eliminarArticulo);

module.exports = router;