import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLoginWithEmailPassword, startLoginWithGoogle } from '../../actions/auth'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const LoginScreen = () => {

  //Para hacer un dispatch de una action que afecta al Store
  const dispatch = useDispatch()
  
  const { loading } = useSelector(state => state.ui);
  
  
  const [ formValue, handleInputChange ] = useForm({
    email:'',
    password: ''

  });

  const { email, password } = formValue;
  
  
  const handleGoogleLogin = () => {
    
    dispatch( startLoginWithGoogle() );
  }


  const handleLogin = (e) =>{

    e.preventDefault();

    dispatch( startLoginWithEmailPassword(password, email) );
  }

  return (
      <div>
        <h3 className="auth__title mb-5">Login</h3>

        <form onSubmit={ handleLogin }>
          <input 
            type="email" 
            name="email" 
            value={ email }
            onChange= { handleInputChange }
            placeholder="Email"
            className="auth__input"
            autoComplete="off" 
            />

          <input 
            type="password" 
            name="password" 
            value={ password }
            onChange= { handleInputChange }
            placeholder="Password" 
            className="auth__input"
            />

            <button
                disabled={ loading }
                type="submit"
                className="btn btn-primary btn-block"
            >
                Login
            </button>

          <div className="auth__social-networks">
            <p>Login with social networks</p>
            <div className="google-btn">
              <div className="google-icon-wrapper">
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="google button"
                />
              </div>
              <p 
                className="btn-text"
                onClick={ handleGoogleLogin }
              >
                <b>Sign in with google</b>
              </p>
            </div>
          </div>
            <Link 
                to="/auth/register"
                className="links"
            >
            Create new account
          </Link>
        </form>
      </div>
    );
}
