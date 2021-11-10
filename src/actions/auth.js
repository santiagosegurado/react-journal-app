import { createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        signInWithPopup, 
        signOut, 
        updateProfile } from "@firebase/auth";

import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

import Swal from 'sweetalert2'
import { noteLogout } from "./notes";



//Accion Asincrona
//Login con Email y Password
export const startLoginWithEmailPassword = (password, email) => {

    return (dispatch) => {

        const auth = getAuth();

        dispatch(startLoading());

        signInWithEmailAndPassword(auth, email, password )
            .then(({ user }) => {
                
                dispatch( login(user.uid, user.displayName) )
                dispatch(finishLoading());
            })
            .catch(e =>{ 
                console.log(e)
                Swal.fire('Error', 'Usuario no encontrado' , 'error')
                dispatch(finishLoading())
            })
        
    }
    
}


//Register con email y password
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    
    return (dispatch) =>{

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then( async({user}) => {

                await updateProfile(auth.currentUser, { displayName: name });

                dispatch( login( user.uid, user.displayName ) )
            })
            .catch(e =>{  
                Swal.fire('Error', e.message , 'error')
                console.log(e)
            } )

    }
}



//Login con Google
export const startLoginWithGoogle = () => { 

    return (dispatch) =>{

        const auth = getAuth();

        signInWithPopup(auth ,googleAuthProvider)
            .then( ({user}) => {
                dispatch( login( user.uid, user.displayName ) )
            })
    }
}


//si solo devuelvo un objeto puedo encerrarlo entre parentesis envez de usar return
export const login = (uid, displayName) =>({

    type: types.login,
    payload:{
        uid: uid,
        displayName: displayName
    }
    
})


export const startLogout = () => {
    
    return (dispatch) => {

        const auth = getAuth();
        signOut(auth);

        dispatch(logout());

        //Purgar las notas cuando se hace Logout
        dispatch(noteLogout());
    }
}

const logout = () => ({

    type: types.logout
}) 