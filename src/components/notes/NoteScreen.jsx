import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDelete } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
    

    const { active: note } = useSelector(state => state.notes)
    const [formValue, hadleInputChange, reset] = useForm(note);
    const { title, body, id } = formValue;

    const activeId = useRef(note.id)

    const dispatch = useDispatch();

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id
        }
        
    }, [note, reset]);


    useEffect(() => {
        
        dispatch(activeNote( formValue.id, { ...formValue }))
        
    }, [formValue, dispatch])


    const handleDelete = () => {
        dispatch(startDelete(id))
    }
    
    return (
        <div className="notes__main-content" >
            
            <NoteAppBar/>

            <div className="notes__content" >
                <input 
                    type="text"
                    placeholder="Titulo"
                    className="notes__title-input" 
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ hadleInputChange }
                />

                <textarea 
                    placeholder="Que paso hoy?"
                    className="notes__textarea"
                    autoComplete="off"
                    name="body"
                    value={ body }
                    onChange={ hadleInputChange }
                ></textarea>
            </div>
            {
                note.url &&
                (<div className="notes__image">
                    <img 
                        src={ note.url }
                        alt="mandarina" 
                    />
                </div>)
            }

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Borrar
            </button>
        </div>
    )
}
