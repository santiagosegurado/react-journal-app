import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { noteReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

//No se puede mandar mas de un Reducer por defecto entonces uso el combineReducers

const reducers = combineReducers({
    auth: authReducer,
    ui:  uiReducer,
    notes: noteReducer
})


//Para poder usar Middlewares y la extencion de Redux para navegaro
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


//Despues lo importo en el punto mas alto de app
//Thunk = configuracion para trabajar acciones asincronas 
export const store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(thunk)
        )    
    ); 