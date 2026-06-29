require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors'); 
const path = require('path'); 

const app = express();

// ==========================================
// MIDDLEWARES 
// ==========================================
app.use(cors());          
app.use(express.json());  

// Servir los archivos del frontend de forma estática (HTML, CSS, Imágenes)
app.use(express.static(path.join(__dirname, '../invictus-frontend'))); 

// ==========================================
// ROUTERS (IMPORTACIÓN)
// ==========================================
const jugadoresRouter = require('./routes/jugadores');
const pagosRouter = require('./routes/pagos');
const inventarioRouter = require('./routes/inventario'); 
const partidosRouter = require('./routes/partidos');     

// ==========================================
// INYECTAR ENDPOINTS DE LA API
// ==========================================
app.use('/api/jugadores', jugadoresRouter);
app.use('/api/pagos', pagosRouter);
app.use('/api/inventario', inventarioRouter);
app.use('/api/partidos', partidosRouter);

// Endpoint base de la API
app.get('/api', (req, res) => {
    res.json({ mensaje: "¡Bienvenido a la API oficial de Invictus Riverside! 🇨🇷⚽" });
});

// Redirección comodín: 
app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, '../invictus-frontend/index.html'));
});
// ==========================================
// LEVANTAR EL SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`============= INVICTUS RIVERSIDE =============`);
    console.log(`Servidor corriendo con éxito en el puerto ${PORT}`);
    console.log(`==============================================`);
});