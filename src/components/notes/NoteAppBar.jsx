import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment'

export const NoteAppBar = () => {
    

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)
    const fecha = moment(active.date).format('MMM Do YY');

    const handleSave = () => {
        
        dispatch(startSaveNote(active));
        
    }


    const handlePicture = () => {
        document.querySelector('#fileSelector').click();
    }


    const handleFileChange = ( { target } ) => {
        const file = target.files;

        if (file) {
            dispatch(startUploading(file[0]))
        }
    }
    
    return (
        <div className="notes__appbar" >
            <span>{fecha}</span>

            <input 
                type="file" 
                name="" 
                id="fileSelector" 
                style={{ display:'none' }} 
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn" 
                    onClick={ handlePicture }
                > 
                    Picture
                </button>

                <button 
                    className="btn" 
                    onClick={ handleSave }
                > 
                    Save
                </button>
            </div>
        </div>
    )
}
