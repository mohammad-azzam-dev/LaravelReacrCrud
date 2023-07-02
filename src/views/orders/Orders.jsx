import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { deleteOrder as deleteOrderAction, fetchOrders } from '../../apis';
import { errorToast, successToast, shorterString } from '../../Helper';



const Orders = (props) => {

    useEffect(() => {
        getOrders()
    }, [])


    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [meta, setMeta] = useState({})

    const deleteOrder = (order) => {
        Swal.fire({
            title: 'Are you sure you want to delete this order?',
            showCancelButton: true,
            icon : "info",
            confirmButtonText: 'Save',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                
                deleteOrderAction(order.id).then(() => {
                        getOrders(meta.current_page)
                        setLoading(false)
                        successToast('the order was deleted')

                    }).catch(() => {
                        setLoading(false)
                        errorToast('Order was not deleted')
                    })
            }
        })

        setLoading(true)

    }

    const getOrders = (page = 1) => {
        setLoading(true)
        
        fetchOrders().then((response) => {
                setLoading(true)
                setOrders(response.data.orders.data)
                setMeta(response.data.orders)
                setLoading(false)

            })
            .catch(() => {
                setLoading(false)
            })
    }

    const getPrevisePage = () => {
        let currentPage = meta.current_page
        getOrders(currentPage - 1 > 0 ? currentPage - 1 : 1)
    }

    const getNextPage = () => {
        let currentPage = meta.current_page
        let lastPage = meta.last_page
        getOrders(currentPage + 1 <= lastPage ? currentPage + 1 : currentPage)
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                <h1>Orders</h1>
                <Link className='btn-add' to={"/orderes/create"}>
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </div>

            <div className='card animated fadeInDown'>
                <div className='table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>waybill</th>
                                <th>customer name</th>
                                <th>customer address</th>
                                <th>created at</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading &&
                                <tr>
                                    <td colSpan="6" className='text-center'> Loading... </td>
                                </tr>
                            }
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.waybill}</td>
                                    <td>{order.customer_name}</td>
                                    <td>{shorterString(order.customer_address)}</td>
                                    <td>{order.created_at}</td>
                                    <td>
                                        <Link className="btn-edit" style={{ marginRight: "4%" }} to={`/orders/update/${order.id}`}>Edit</Link>
                                        <button style={{ marginRight: "4%" }} onClick={ev => deleteOrder(order)} className='btn-delete'>Delete</button>
                                        <Link style={{ marginRight: "4%" }} to={`/orders/view/${order.id}`} className='btn-show'>View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='pagination'>
                    <button onClick={getPrevisePage} className='btn-edit'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <span> {meta.current_page} / {meta.last_page} </span>
                    <button onClick={getNextPage} className='btn-edit'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
        </div>
    );


}
export default Orders;