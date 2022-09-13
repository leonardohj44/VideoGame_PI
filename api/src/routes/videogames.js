require('dotenv').config();
const axios = require('axios')
const {Router} = require('express');
const {API_KEY} = process.env
const {Videogame, Genre} = require('../db');
const {Op} = require('sequelize')

const router = Router()

// obtener toda la data de la API
const apiGames = async () => {
    const apiGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);

    let gamesArray = await mapGames(apiGames.data.results); //primeros 20 juegos (pagina 1)

    let next = apiGames.data.next; //puntero que cambia de pagina en la api

    while ( gamesArray.length < 100) {  // trae los 100 videojuegos
        const proxNext = await axios.get(next); // proximo puntero
        const sumArray = await mapGames(proxNext.data.results); //contiene la hoja siguiente con mas juegos
        gamesArray = [...gamesArray, ...sumArray];
        next = proxNext.data.next; //modifica el valor de next para cargar otra hoja de juegos 
    }
    //console.log("===========>",gamesArray.length)
    return gamesArray
};

const mapGames = async (arr) => {
    const aux= arr.map( a => {
        return {
            id: a.id,
            name: a.name,
            img: a.background_image,
            genres: a.genres.map( g => { return {id: g.id, name: g.name }}),
            //platforms: a.data.parent_platforms.map(p=>{ return { id: p.platform.id, name: p.platform.name } }),
            rating: a.rating_top,
            released: a.released    
        }
    })
    return aux;
};

// obtener toda la data de la DB
const dbGames = async () => {
    return await Videogame.findAll({
        include: Genre
    })
};

libraryGames= async () => {    // combina las 2 datas (de la DB y de la API)
    const fromApi= await apiGames();
    const fromDb= await dbGames();
    const allGames= fromDb.concat(fromApi);   //primero la data DB y luego data API
    return allGames;
} 

//ejm:  localhost:PORT/videogames
router.get('/', async (req, res) => {
    const {name}= req.query;

    if(name) { // si la consulta tiene un "name", aparece el videojuego indicado
        const reGames= await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        let arrGame = reGames.data.results.map( e => {
            return {
                id: e.id,
                name: e.name,
                img: e.background_image,
                genres: e.genres.map( g => g.name),
                rating: e.rating_top,
                platforms: e.parent_platforms.map( p => p.name),
                released: e.released
            }
        });
        let gameDb = await Videogame.findAll({
            where: {
                name: {[Op.like]: `%${name}%`}    // where like='%name%'
            },
            include: Genre
        });
        let allresult = gameDb.concat(arrGame).slice(0,15);
        if(allresult){
            res.status(200).send(allresult);
        } else {
            res.status(404).send('Video Game not exist');
        }
    } else {   //si no hay "name", aparece la lista entera de juegos
        const theGames= await libraryGames();
        // console.log(theGames, "-------console log the games")
        res.status(200).json(theGames);
    }
})

module.exports = router;