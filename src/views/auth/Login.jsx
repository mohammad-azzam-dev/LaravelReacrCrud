import React, { useRef, useState }  from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import { login as loginAction } from '../../apis';


export default (props)=>{

    let referenceEmail = useRef()
    let referencePassword = useRef()
    

    const {setUser, setToken, errorMessage} = useStateContext()
    const [errors, setErrors] = useState(null); 
    const [error, setError] = useState(null); 
   

    const login = (event) =>{
        resetStateMangments()
        event.preventDefault();
        let payload = {
            email: referenceEmail.current.value,
            password: referencePassword.current.value,
        }
        loginAction(payload).then(({data}) => {
            setToken(data.token)
            setUser(data.user)
        }).catch(error => {
            const response = error.response
            if(response && response.status === 422){
                setErrors(response.data.errors)
                return;
            }
            if(response && response.status === 500){
                setError(response.data.message ? response.data.message : errorMessage)
                return;
            }
        })
        

    } 

    function resetStateMangments(){
        setErrors(null)
        setError(null)
    }


    return ( 
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={login}>
                    <h4>login into your account</h4>
                    {
                        errors && 
                            <div className='alert'>
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                            </div>
                    }

                    {
                        error && 
                            <div className='alert'>
                                <p>{error}</p>
                            </div>
                    }
                    <input ref={referenceEmail} type='emmail' placeholder='email'/>
                    <input ref={referencePassword} type='password' placeholder='password'/>
                    <button className='btn btn-block'>Login</button>
                    <p className='message'>
                        New User? <Link to='/signup'>Create a new account </Link>
                    </p>
                </form>
            </div>
        </div>
    );


}