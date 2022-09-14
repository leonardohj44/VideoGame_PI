import axios from 'axios';

export function setLoadig(){
    return{
        type: "SET_LOADING"
    }
};

export function getGames(){
    return async function(dispatch){
        dispatch(setLoadig())
        var result= await axios.get('http://localhost:3001/videogames', [])

        return dispatch({
            type:  'GET_VIDEOGAMES',
            payload: result.data
        })
    }
}

export function getByName(name){
    return async function(dispatch){
       try{
            var result = await axios.get(`http://localhost:3001/videogames?name=${name}`);

            return dispatch({
                type: 'GET_BY_NAME',
                payload: result.data
            })
        } catch(e) {
            alert("Videogame not exist")
        }
    }
};

export function getDetail(id){
    return async function(dispatch){
        try{
            let det = await axios.get("http://localhost:3001/videogame/" + id);
            return dispatch({
                type: 'GET_ID',
                payload: det.data
            })
        } catch (e){
            alert('Game not found')
        }
    }
}

export function selectData(data){
    return function (dispatch){
        dispatch( {
            type: 'SELECT_DATA',
            payload: data
        })
    }
}

export function getGenres(){
    return async function (dispatch){
        try{
            var theGenres = await axios.get("http://localhost:3001/genres")
            return dispatch({
                type: 'GET_GENRES',
                payload: theGenres.data
            })

        } catch(e){
            console.log(e)
        }
    }
}

export function resetPage(){
    return function(dispatch){
        dispatch({
            type: 'RESET_PAGE',
            payload: 1
        })
    }
}

export function sort_AZ_ZA (payload){
    return{
        type: 'SORT_AZ_ZA',
        payload
    }
}

export function sort_by_Rating (payload){
    return{
        type: 'SORT_BY_RATING',
        payload
    }
}

export function filterGenre(payload){
    return {
        type: 'FILTER_GENRE',
        payload
    }
}

export function resetDetails(){
    return{
        type: 'RESET_DETAIL',
        payload: []
    }
}