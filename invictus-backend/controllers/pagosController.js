const db = require('../config/db'); // Ajusta la ruta según tu estructura de base de datos

// Obtener todos los pagos con el nombre del jugador (GET)
exports.obtenerPagos = async (req, res) => {
    try {
        const query = `
            SELECT p.id, p.monto, p.fecha_pago, p.concepto, p.estado, j.nombre AS jugador_nombre 
            FROM pagos p
            INNER JOIN jugadores j ON p.jugador_id = j.id
            ORDER BY p.fecha_pago DESC
        `;
        const [pagos] = await db.query(query);
        
        res.json({
            success: true,
            data: pagos
        });
    } catch (error) {
        console.error('Error al obtener pagos:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor al traer los pagos' });
    }
};

// Registrar un nuevo pago (POST)
exports.crearPago = async (req, res) => {
    try {
        const { jugador_id, monto, fecha_pago, concepto, estado } = req.body;

        // Validación básica
        if (!jugador_id || !monto || !fecha_pago || !concepto) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        const query = 'INSERT INTO pagos (jugador_id, monto, fecha_pago, concepto, estado) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [jugador_id, monto, fecha_pago, concepto, estado || 'Pendiente']);

        res.json({ success: true, mensaje: '¡Pago registrado con éxito!' });
    } catch (error) {
        console.error('Error al registrar pago:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor al registrar el pago' });
    }
};

// Actualizar un pago (PUT)
exports.actualizarPago = async (req, res) => {
    try {
        const { id } = req.params;
        const { jugador_id, monto, fecha_pago, concepto, estado } = req.body;

        const query = 'UPDATE pagos SET jugador_id = ?, monto = ?, fecha_pago = ?, concepto = ?, estado = ? WHERE id = ?';
        await db.query(query, [jugador_id, monto, fecha_pago, concepto, estado, id]);

        res.json({ success: true, mensaje: '¡Pago actualizado con éxito!' });
    } catch (error) {
        console.error('Error al actualizar el pago:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar en el servidor financiero' });
    }
};

// Eliminar un pago (DELETE)
exports.eliminarPago = async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM pagos WHERE id = ?';
        await db.query(query, [id]);

        res.json({ success: true, mensaje: '¡Pago eliminado con éxito!' });
    } catch (error) {
        console.error('Error al eliminar el pago:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar en el servidor financiero' });
    }
};