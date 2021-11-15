import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEtries = ({ setActiveMenu, activeMenu }) => {
    
    const { notes } = useSelector(state => state.notes)
    

    return (
        <div className="journal__entries" >
            {
                notes.map(note =>(
                    
                    <JournalEntry 
                        key={ note.id }
                        { ...note }
                        setActiveMenu={ setActiveMenu }
                        activeMenu={ activeMenu } 
                    />
                ))
            }
        </div>
    )
}
