import axiosClient from "./axios-client"



export const getAuthUser = () => {
    return axiosClient.get('dashboard/user')
}

export const logout = () => {
    return axiosClient.post('dashboard/logout');
}

export const login = (payload) => {
    return axiosClient.post('/login',payload)
}

export const register = (payload) => {
    return axiosClient.post('/register',payload);
}


//orders
export const fetchOrders = (page = 1) => {
    return axiosClient.get(`dashboard/orders?page=${page}`)
}

export const getOrder = (id) => {
    return axiosClient.get(`/dashboard/orders/${id}`);
}

export const deleteOrder = (id) => {
    return axiosClient.delete(`dashboard/orders/${id}`);
}

export const updateOrder = (id, order) => {
    return axiosClient.patch(`dashboard/orders/${id}`, order)
}

export const saveOrder = (order) => {
    return axiosClient.post(`dashboard/orders/`, order);
}

