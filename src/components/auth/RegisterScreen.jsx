import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    
    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);

    
    const [ inputValue, handleInputChange ] = useForm({
        name:'',
        email:'',
        password: null,
        password2:null
    });

    const { name, email, password, password2 } = inputValue;

    const handleRegister = (e) => {

        e.preventDefault();

        if ( isFormValid() ) {
            
            dispatch( startRegisterWithEmailPasswordName(email, password, name) )

        }
    }

    const isFormValid = () => {
        
        if (name.trim().length === 0) {
            
            dispatch(setError("Ingrese un Nombre"));
            return false
        
        }else if ( !validator.isEmail( email )) {
            
            dispatch(setError('Email no valido'));
            return false
        
        }else if (password !== password2 || password.length < 5 ) {

            dispatch(setError('Contraseña no coincide o tiene menos de 6 caracteres'));
            return false
        }       
        
        dispatch(removeError());
        return true
    }
    
    return (
        <div>
            <h3 className="auth__title mb-5">Register</h3>

            {
                msgError && (

                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                )
            }


            <form onSubmit={ handleRegister }>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
                <Link
                    to="/auth/login"
                    className="links "
                >
                    Already registered?
                </Link>
            </form>
        </div>
    )
}
