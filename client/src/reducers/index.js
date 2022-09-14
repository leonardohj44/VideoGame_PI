const initialState={
allGames:[],   // videoGames
oneGames: [],  // videoGame
Genres: [],    // Genero
detail: [],    // detalle del videoGame
loading:false,
data: ""
};

function rootReducer(state = initialState, action){ // action={type,payload}
    switch(action.type){
        case 'SET_LOADING':
            return{
                ...state,
                loading:true
            };
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                loading:false,
                allGames: action.payload,
                oneGames: action.payload
              
            };
        case 'GET_BY_NAME':
            return{
                ...state,
                oneGames: action.payload
            }
        case 'GET_ID':{
            return{
                ...state,
                detail: action.payload,
                loading: false
            }
        }
        case 'GET_GENRES':{
            return{
                ...state,
                stateGenres:action.payload
            }
        }
        case 'SELECT_DATA':{
            return{
                ...state,
                data: action.payload
            }
        }

        case 'SORT_AZ_ZA': {
            if (action.payload === "az") return { ...state, oneGames: [...state.oneGames].sort((game1, game2) => game1.name > game2.name ? 1 : -1) }
            return { ...state, oneGames: [...state.oneGames].sort((game1, game2) => game1.name > game2.name ? -1 : 1) }
        }

        case 'SORT_BY_RATING':{
                if (action.payload === 'high') return {...state, oneGames: [...state.oneGames].sort((a, b) => a.rating > b.rating ? -1 : 1)}
                return {...state, oneGames: [...state.oneGames].sort((a, b) => a.rating > b.rating ? 1 : -1)}
        }

        case 'FILTER_GENRE':{
            let TotalGames = state.allGames;
            const maping = TotalGames.map( g => {
                return {...g, genres: g.genres.map( e => e.name)}
            })
            const filtro = action.payload === 'All' ? TotalGames : maping.filter( e => {
                return e.genres.includes(action.payload) // filtro x  c/genero
            })
            return {
                ...state,
                oneGames: filtro
            }
        }

        case 'RESET_DETAIL':{
            return {
                ...state,
                detail: action.payload
            }
        }
        default:
            return state
    };
};

export default rootReducer;