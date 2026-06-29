const db = require('../config/db');

// Obtener todo el inventario (GET)
exports.obtenerInventario = async (req, res) => {
    try {
        const query = 'SELECT * FROM inventario ORDER BY articulo ASC';
        const [articulos] = await db.query(query);
        res.json({ success: true, data: articulos });
    } catch (error) {
        console.error('Error al obtener inventario:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor al traer el inventario' });
    }
};
 
// Registrar un nuevo artículo (POST)
exports.crearArticulo = async (req, res) => {
    try {
        const { articulo, cantidad_total, cantidad_buen_estado, notas } = req.body;

        if (!articulo || cantidad_total === undefined || cantidad_buen_estado === undefined) {
            return res.status(400).json({ success: false, message: 'El nombre del artículo, cantidad total y en buen estado son obligatorios.' });
        }

        const query = 'INSERT INTO inventario (articulo, cantidad_total, cantidad_buen_estado, notas) VALUES (?, ?, ?, ?)';
        await db.query(query, [articulo, cantidad_total, cantidad_buen_estado, notas || null]);

        res.json({ success: true, mensaje: '¡Artículo agregado al inventario con éxito!' });
    } catch (error) {
        console.error('Error al crear artículo:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor al guardar el artículo' });
    }
};

// Actualizar un artículo (PUT)
exports.actualizarArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const { articulo, cantidad_total, cantidad_buen_estado, notas } = req.body;

        const query = 'UPDATE inventario SET articulo = ?, cantidad_total = ?, cantidad_buen_estado = ?, notas = ? WHERE id = ?';
        await db.query(query, [articulo, cantidad_total, cantidad_buen_estado, notas, id]);

        res.json({ success: true, mensaje: '¡Inventario actualizado con éxito!' });
    } catch (error) {
        console.error('Error al actualizar artículo:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar en el servidor' });
    }
};

// Eliminar un artículo (DELETE)
exports.eliminarArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM inventario WHERE id = ?';
        await db.query(query, [id]);

        res.json({ success: true, mensaje: '¡Artículo removido del inventario!' });
    } catch (error) {
        console.error('Error al eliminar artículo:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar en el servidor' });
    }
};