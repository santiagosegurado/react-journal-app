import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSeleted } from './NothingSeleted'

import { Sidebar } from './Sidebar'

export const JouernalScreen = () => {
    
    const { active } = useSelector(state => state.notes)
    
    return (
        <div className="journal__main-content">
            
            <Sidebar/>

            <main>
                
                {
                    (active)
                        ? ( <NoteScreen/> )
                        : ( <NothingSeleted /> )
                }


                
            </main>

        </div>
    )
}
