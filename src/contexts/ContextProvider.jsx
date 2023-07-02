import React, {createContext, useContext, useState } from "react";

const StateContext = createContext({
    user : null,
    token : null,
    errorMessage: 'Error occured please try again later!',
    setUser : () => {},
    setToken : () => {},
});


export const ContextProvider = ({children}) => { 
    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_KEY))
    
    
    const errorMessage = 'Error occured please try again later!'
    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN_KEY, token)
        }else{
            localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN_KEY)
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            errorMessage,
            setUser,
            setToken
        }}>
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)




