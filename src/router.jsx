import React from "react";

import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/auth/Login.jsx";
import Signup from "./views/auth/Signup.jsx";
import Orders from "./views/orders/Orders.jsx";
import NotFound from "./views/errors/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import OrderForm from "./views/orders/OrderForm.jsx";
import NotAuthorised from "./views/errors/NotAuthorised.jsx";
import Error from "./views/errors/Error.jsx";
import OrderView from "./views/orders/OrderView.jsx";


const router = createBrowserRouter([
    {
        path : '/',
        element : <DefaultLayout/>,
        children:[
            {
                path : '/',
                element : <Navigate to="/orders" />
            },
            {
                path : '/dashboard',
                element : <Dashboard/>
            },
            {
                path : '/orders',
                element : <Orders/>
            },
            {
                path : '/orderes/create',
                element : <OrderForm key="orderCreate"/>
            },
            {
                path : '/orders/:id',
                element : <OrderForm key="orderView"/>
            },
            {
                path : '/orders/update/:id',
                element : <OrderForm key="orderUpdate"/>
            },
            {
                path : '/orders/view/:id',
                element : <OrderView key="viewOrder"/>
            },
        ]
    },

    {
        path : '/',
        element : <GuestLayout/>,
        children : [
            {
                path : '/login',
                element : <Login/>
            },
            {
                path : '/signup',
                element : <Signup/>
            },
        ]
    },

    {
        path : '/not-found',
        element : <NotFound/>
    },

    {
        path : '/not-authorized',
        element : <NotAuthorised/>
    },
    {
        path : '/500',
        element : <Error/>
    }


])


export default router;