import React  from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';

const GuestLayout = (props)=>{
    const {user,token} = useStateContext()

    if(token){
        return <Navigate to="/dashboard" />
    }

    return ( 
        <div>
            {/* //the outlet is for rendering child elments */}
            <Outlet/>
        </div>
    );


}
export default GuestLayout;