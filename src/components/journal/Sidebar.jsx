import React, { useState } from 'react'
import { JournalEtries } from './JournalEtries'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { useSelector } from 'react-redux'
import { startNewNote } from '../../actions/notes'
import 'animate.css';

export const Sidebar = () => {
    
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleAddNew = () => {
        dispatch( startNewNote() );
    }
    
    const { name } = useSelector(state => state.auth)


    const [activeMenu, setActiveMenu] = useState(false)

    const handleActive = () => {
        setActiveMenu(!activeMenu)
    }


    return ( activeMenu ) ? 
        
    
    (
        <aside className={ activeMenu ? "journal__sidebar active animate__animated animate__fadeInLeft" : "journal__sidebar animate__animated animate__fadeOutLeft " } >
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5" >
                    <i className="far fa-moon" ></i>
                    <span> { name } </span>
                </h3> 
                <button 
                    className="btn"
                    onClick= { handleLogout }
                >
                    Logout
                </button>
            </div>
            <div 
                className="journal__new-entry"
                onClick={ handleAddNew }
            >
                <i 
                    className="far fa-calendar-plus fa-5x"
                    onClick={handleActive}
                 ></i>
                <p className="mt-5" >New Entry</p>
            </div>

            <JournalEtries setActiveMenu={ setActiveMenu } activeMenu={ activeMenu }/>
        </aside>
    ) :

    (
        <i 
            className="fas fa-arrows-alt-h fa-2x"
            onClick={ handleActive }
        ></i>
    )
}
