const db = require('../config/db');

// Obtener todos los jugadores
exports.obtenerJugadores = async (req, res) => {
    try {
        // Hacemos la consulta usando la promesa del pool
        const [rows] = await db.query('SELECT * FROM jugadores');
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error al obtener los jugadores:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error en el servidor al obtener la plantilla'
        });
    }
};

//Crear un nuevo jugador en la base de datos
exports.crearJugador = async (req, res) => {
    try {
        // Desestructuramos las variables que vienen en el req.body del formulario
        const { nombre, numero_camisa, posicion, estado } = req.body;

        // Consulta SQL preparada para evitar Inyección SQL
        const query = 'INSERT INTO jugadores (nombre, numero_camisa, posicion, estado) VALUES (?, ?, ?, ?)';
        
        // Ejecutamos la inserción usando await
        const [result] = await db.query(query, [nombre, numero_camisa, posicion, estado]);

        // Respondemos al frontend con el formato exacto que espera (success: true)
        res.status(201).json({
            success: true,
            mensaje: '¡Jugador registrado con éxito!',
            id: result.insertId 
        });

    } catch (error) {
        console.error('Error al guardar el jugador:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor al guardar el jugador'
        });
    }  
};

// Actualizar un jugador (PUT)
exports.actualizarJugador = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, numero_camisa, posicion, estado } = req.body;

        const query = 'UPDATE jugadores SET nombre = ?, numero_camisa = ?, posicion = ?, estado = ? WHERE id = ?';
        await db.query(query, [nombre, numero_camisa, posicion, estado, id]);

        res.json({ success: true, mensaje: '¡Jugador actualizado con éxito!' });
    } catch (error) {
        console.error('Error al actualizar el jugador:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar en el servidor' });
    }
};

// Eliminar un jugador (DELETE)
exports.eliminarJugador = async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM jugadores WHERE id = ?';
        await db.query(query, [id]);

        res.json({ success: true, mensaje: '¡Jugador eliminado con éxito!' });
    } catch (error) {
        console.error('Error al eliminar el jugador:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar en el servidor' });
    }
};