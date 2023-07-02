import React, { useRef, useState }  from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import { register } from '../../apis';

const Signup = ()=>{

    //whay did we use ref over state mangmanet?
    // refers areused to fetch datas from the input while stste managments are used to fetch adata and in we also need to handle the data and view it agian

    let referenceName = useRef()
    let referenceEmail = useRef()
    let referencePassword = useRef()
    let referencePasswordConfirmation = useRef()
    
    const {setUser, setToken, errorMessage} = useStateContext()
    const [errors, setErrors] = useState(null); 
    const [error, setError] = useState(null); 
    
    const signup = (event) => {
        event.preventDefault();
        resetStateMangments()
        let payload = {
            name: referenceName.current.value,
            email: referenceEmail.current.value,
            password: referencePassword.current.value,
            password_confirmation: referencePasswordConfirmation.current.value,
        }
        register(payload).then(({data}) => {
            setToken(data.token)
            setUser(data.user)
        }).catch(error => {
            const response = error.response
            if(response && response.status === 422){
                setErrors(response.data.errors)
                return
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
                <form>
                    <h4>Sign-Up</h4>
                    {
                    errors && 
                        <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                        </div>
                    }
                    <p className='slug'>Elevate, Excel, Exceed.</p>
                    <input ref={referenceName} placeholder='Full Name'/>
                    <input ref={referenceEmail} type='email' placeholder='email'/>
                    <input ref={referencePassword} type='password' placeholder='password'/>
                    <input ref={referencePasswordConfirmation} type='password' placeholder='password confirmation'/>
                    <button onClick={signup} className='btn btn-block'>SignUp :)</button>
                    <p className='message'>
                        Already have an account? <Link to='/login'>Login </Link>
                    </p>
                </form>
            </div>
        </div>
    );

}

export default Signup;