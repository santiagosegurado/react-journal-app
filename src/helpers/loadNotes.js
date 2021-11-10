import { collection, getDocs, query } from "@firebase/firestore"
import { db } from "../firebase/firebase-config"




export const loadNotes = async(uid) => {

    const noteSnap =  await getDocs(query(collection(db, `${ uid }/journal/notes`)));

    const note = [];


    noteSnap.forEach(snapHijo => {
        note.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });



    return note;
}