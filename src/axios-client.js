
import React from "react";
import axios from "axios";




const axiosClient = axios.create({
    baseURL : `${process.env.REACT_APP_BASE_URL}/api`,
    
})

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_KEY)
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use(
    //on resolve
    (response) => {
        return response;
    }, 
    //on rejected
    (error) => {
        const {response} = error
        if(response.status === 401){
            localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN_KEY)
        }
        if(response.status === 404){
            window.location.href = '/not-found'
        }
        if(response.status === 403){
            window.location.href = '/not-authorized'
        }

        if(process.env.REACT_APP_MODE != 'development'){
            if(response.status === 500){
                window.location.href = '/error'
            }
        }

        throw error
    })

export default axiosClient