const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Cliente basado en Promesas

// 📅 OBTENER TODOS LOS PARTIDOS (Usando async/await)
router.get('/', async (req, res) => {
    const query = `
        SELECT id, rival, lugar, resultado,
               DATE_FORMAT(fecha_partido, '%d/%m/%Y %h:%i %p') AS fecha_partido
        FROM partidos 
        ORDER BY fecha_partido DESC
    `;
    
    try {
        const [results] = await db.query(query);
        res.json({ success: true, data: results });
    } catch (err) {
        console.error('Error al jalar partidos:', err);
        res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
    }
});

// ➕ REGISTRAR UN NUEVO PARTIDO
router.post('/', async (req, res) => {
    const { rival, fecha_partido, lugar } = req.body;

    if (!rival || !fecha_partido || !lugar) {
        return res.status(400).json({ success: false, mensaje: 'Faltan campos requeridos' });
    }

    const query = 'INSERT INTO partidos (rival, fecha_partido, lugar) VALUES (?, ?, ?)';
    try {
        const [result] = await db.query(query, [rival, fecha_partido, lugar]);
        res.json({ success: true, mensaje: 'Partido agendado con éxito', id: result.insertId });
    } catch (err) {
        console.error('Error al crear partido:', err);
        res.status(500).json({ success: false, mensaje: 'Error al registrar el partido' });
    }
});

// ⚽ OBTENER LA ALINEACIÓN TÁCTICA DE UN PARTIDO
router.get('/:id/alineacion', async (req, res) => {
    const partidoId = req.params.id;
    const query = 'SELECT jugador_id, es_titular, posicion_x, posicion_y, posicion_nombre FROM alineaciones WHERE partido_id = ?';

    try {
        const [results] = await db.query(query, [partidoId]);
        res.json({ success: true, data: results });
    } catch (err) {
        console.error('Error al jalar alineación:', err);
        res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
    }
});

// 💾 GUARDAR O ACTUALIZAR ALINEACIÓN TÁCTICA (Transacciones con Promesas)
router.post('/:id/alineacion', async (req, res) => {
    const partidoId = req.params.id;
    const { jugadores } = req.body;

    if (!Array.isArray(jugadores)) {
        return res.status(400).json({ success: false, mensaje: 'Formato de datos no válido' });
    }

    // Obtenemos una conexión única del pool para manejar la transacción de forma segura
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Limpiar alineación previa de este partido
        await connection.query('DELETE FROM alineaciones WHERE partido_id = ?', [partidoId]);

        // Si mandaron jugadores, hacemos el insert masivo
        if (jugadores.length > 0) {
            const valores = jugadores.map(j => [
                partidoId, 
                j.jugador_id, 
                j.es_titular !== undefined ? j.es_titular : 1, 
                j.posicion_x, 
                j.posicion_y, 
                j.posicion_nombre || 'Posicionado'
            ]);

            const queryInsert = 'INSERT INTO alineaciones (partido_id, jugador_id, es_titular, posicion_x, posicion_y, posicion_nombre) VALUES ?';
            await connection.query(queryInsert, [valores]);
        }

        await connection.commit();
        res.json({ success: true, mensaje: '¡Estrategia guardada en la base de datos!' });

    } catch (err) {
        await connection.rollback();
        console.error('Error en la transacción de alineación:', err);
        res.status(500).json({ success: false, mensaje: 'Error al guardar posiciones masivas' });
    } finally {
        connection.release(); // Obligatorio liberar la conexión de vuelta al pool
    }
});

// ELIMINAR UN PARTIDO
router.delete('/:id', async (req, res) => {
    const partidoId = req.params.id;
    const query = 'DELETE FROM partidos WHERE id = ?';

    try {
        // Al tener ON DELETE CASCADE en la BD, se borran automáticamente sus alineaciones
        await db.query(query, [partidoId]);
        res.json({ success: true, mensaje: 'Partido eliminado con éxito' });
    } catch (err) {
        console.error('Error al eliminar partido:', err);
        res.status(500).json({ success: false, mensaje: 'Error al eliminar el partido' });
    }
});

// ACTUALIZAR EL RESULTADO DE UN PARTIDO
router.put('/:id/resultado', async (req, res) => {
    const partidoId = req.params.id;
    const { resultado } = req.body; // 'Ganado', 'Perdido', 'Empatado', 'Por jugar'

    const query = 'UPDATE partidos SET resultado = ? WHERE id = ?';

    try {
        await db.query(query, [resultado, partidoId]);
        res.json({ success: true, mensaje: 'Resultado actualizado con éxito' });
    } catch (err) {
        console.error('Error al actualizar resultado:', err);
        res.status(500).json({ success: false, mensaje: 'Error al actualizar el resultado' });
    }
});

module.exports = router;