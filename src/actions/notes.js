import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { uploadFile } from "../helpers/uploadFile";
import { types } from "../types/types";




//Las tareas Asincronas empiezan con start

export const startNewNote = () => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote)

        dispatch(activeNote(doc.id, newNote))

        dispatch(addNewNote(doc.id, newNote))
    }

}


export const addNewNote = (id, note) => ( {
    type: types.notesAddNew,
    payload:{
        id, ...note
    }
})


export const activeNote = (id, note) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }

})


export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        
        const notes = await loadNotes(uid)
        
        dispatch( setNotes(notes) )
    }
}


export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes 

})



export const startSaveNote = (note) => {
    return async (dispatch, getState) =>{
        
        const { uid } = getState().auth;

        //Borro los campos que estan en undefined
        if (!note.url) {
            delete note.url
        }

        //Para no modificar el (note) que viene por argumento  
        const noteToFirebase = {...note};
        delete noteToFirebase.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
        await updateDoc(noteRef, noteToFirebase);

        dispatch(refreshNote(note.id, noteToFirebase))

        Swal.fire('Saved', note.title, 'success')
    }

}

//Para refrescar la nota y se cargue en en la barra laterla
export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        //Para asegurarme que venga con el id
        note: {
            id,
            ...note
        }
    }
})



export const startUploading = (file) => {
    return async(dispatch, getState) => {
        
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title:'Actualizando...',
            text: 'Espere...',
            allowOutsideClick:false,
            didOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await uploadFile(file);
        activeNote.url = fileUrl.url;

        dispatch(startSaveNote(activeNote))

        Swal.close();

    }
}


export const startDelete = (id) => {
    return async(dispatch, getState) => {
        
        const { uid } = getState().auth;
    
        const noteRef = doc(db, `${uid}/journal/notes/${id}`)
        await deleteDoc(noteRef);
 
        dispatch(deleteNote(id));
    
    }

}


export const deleteNote = (id) => ({
    type:types.notesDelete,
    payload: id

})


export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})