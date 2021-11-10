import React from 'react'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({
    loggedIn,
    component: Component,
    ...rest }) => {
    
    return (
        
        <Route 
            { ...rest }
            component={ (props) => (
                (loggedIn)
                    ? (<Redirect to="/" />)
                    : (<Component { ...props } />)
            )}
        />
    
    )
}

