import { getAuth, onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";
import { JouernalScreen } from "../components/journal/JouernalScreen";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    
    const dispatch = useDispatch();

    const [checkin, setCheckin] = useState(true);

    const [loggedIn, setLoggedIn] = useState(false)
    
    
    useEffect(() => {
        
        const auth = getAuth();

        onAuthStateChanged(auth, async(user)=>{

            if (user?.uid) {
                //Login en el store
                dispatch( login(user.uid, user.displayName) )
                setLoggedIn(true)

                //Notas en el Store
                dispatch(startLoadingNotes(user.uid))
            
            }else {
                
                setLoggedIn(false)
            }


            setCheckin(false)

        })
        
    }, [dispatch])

    if ( checkin ) {
        return (
            <h1>...Espere</h1>
        ) 
    }
    
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter } 
                        loggedIn= { loggedIn }
                    />

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ JouernalScreen } 
                        loggedIn= { loggedIn }
                    />

                    <Redirect to='/auth/login' />
                </Switch>
            </div>
                
        </Router>
    );
};
