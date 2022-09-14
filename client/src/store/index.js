import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk"; // para poder hacer acciones con promesas

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore (
    rootReducer, composeEnhancer(applyMiddleware(thunk))   // trunk se usa para hacer pedidos asincronos, un pedido a nuestro back
)

//export default store