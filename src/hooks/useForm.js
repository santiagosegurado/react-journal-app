import { useState } from "react"



//Al usarlo le paso como parametro al useForm un objeto donde voy a almacenarlo que por defecto esta vacio 
export const useForm = ( initialState ={} ) => {
    
    //El estado
    const [value, setValue] = useState(initialState)

    //Reseteo
    const reset = (newState = initialState) =>{
        setValue(newState)
    }

    //Desestruyctura el "e" y le saca el target
    const hadleInputChange = ({ target }) =>{

        //El setValue guarda un nuevo objeto con el objeto anterior + el nuevo
        setValue({
            ...value,
            [target.name]: target.value
        });

    }

    //Returna el estado y la funcion 
    return [ value, hadleInputChange, reset]
}