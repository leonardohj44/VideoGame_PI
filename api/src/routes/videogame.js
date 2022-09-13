require('dotenv').config();
const axios = require('axios')
const { Router } = require('express');
const { API_KEY } = process.env
const { Videogame, Genre } = require('../db');

const router = Router();

//ejm:  localhost:PORT/videogame/....1....
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (id.length > 8) {
            const theGame = await Videogame.findByPk(
                id, {
                include: [Genre]
            })
            return res.status(200).send(theGame)
        }
        const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        //console.log(gameApi.data);
        const result = {
            id: gameApi.data.id,                                    // id 
            name: gameApi.data.name,                                // nombre del juego
            img: gameApi.data.background_image,                     // imagen
            genres: gameApi.data.genres.map(g => { return { id: g.id, name: g.name } }),  // generos del videojuego
            description: gameApi.data.description,                  // descripcion
            released: gameApi.data.released,                        // fecha de lanzamiento
            rating: gameApi.data.rating_top,                        // clasificación
            platforms: gameApi.data.parent_platforms.map(p => { return { id: p.platform.id, name: p.platform.name } })  // plataformas donde se ejecuta el videojuego
        }
        //console.log(result);
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

router.post('/', async (req, res) => {
    const { name, description, released, genres, rating, platforms, img } = req.body;
    //const { name, description, released, genres, rating, platforms, img, createdAt} = req.body;
    try {
        const createdGame = await Videogame.create({
            name, description, released, rating, platforms, img
            //name, description, released, rating, platforms, img, createdAt
        });

        const generos = genres?.map(async g => {
            const gbyGame = await Genre.findByPk(g);
            createdGame.addGenres(gbyGame);
        });
        // let generos = await Genre.findAll({ where: { name: genres } })
        // createdGame.addGenres(generos)

        //console.log(generos)
        await Promise.all(generos)
        res.send('Your videogame has been created successfully')
    } catch (e) {
        console.log(e)
    }

})

module.exports = router;