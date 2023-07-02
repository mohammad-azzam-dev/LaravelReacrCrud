import React  from 'react';
import { useStateContext } from '../contexts/ContextProvider.jsx';

const Dashboard = (props)=>{
    const {user} = useStateContext()

    return ( 
        <div>
            Welcome {user.name}
        </div>
    );


}
export default Dashboard;