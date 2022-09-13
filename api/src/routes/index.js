const { Router } = require('express');
const videogame = require('./videogame')
const videogames = require('./videogames')
const genre = require('./genre')
// Importar todos los routers;

const router = Router();

// Configurar los routers
//// router va usar cuando llegue una solicitud a: '/xxx' va usar el archivo respectivo
router.use('/videogame', videogame) 
router.use('/videogames', videogames)
router.use('/genres', genre)

module.exports = router;

// \----- Aqui llegan todas las solicitudes de front
//        redirigidas a:  genre.js, videogame.js, videogames.js