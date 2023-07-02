import React, { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import logoDesktop from '../assets/images/logo-desktop.png'
import logoMobile from '../assets/images/logo-mobile.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faBoxOpen, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { getAuthUser, logout } from '../apis.js';


const DefaultLayout = (props) => {
    const { user, token, setUser, setToken } = useStateContext()

    useEffect(() => {
        getAuthUser().then((response ) => setUser(response.data.user))     

    }, [])

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (event) => {
        event.preventDefault()
        logout()
            .then(() => {
                setUser({})
                setToken(null)
                setUser({})
            })
    }

    return (
        <div id='defaultLayout'>
            
            <aside>
                <div style={{ paddingBottom: "15px" }}>
                    <img src={logoDesktop} class="w-70 d-none d-sm-block" />
                    <img src={logoMobile} class="w-full d-sm-none" />
                </div>

                <Link to="/dashboard">
                    <FontAwesomeIcon icon={faGauge} />
                    <span>
                        Dashboard
                    </span>
                </Link>
                <Link to="/orders">
                    <FontAwesomeIcon icon={faBoxOpen} />
                    <span>
                        Orders
                    </span>
                </Link>
                <a href='#' onClick={onLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <span>
                        Logout
                    </span>
                </a>
            </aside>

            <div className='content'>
                <header>
                    <h3 >
                        Dashboard
                    </h3>
                    <div class="d-none d-md-block">
                        {user.name}
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

        </div>

    );


}
export default DefaultLayout;