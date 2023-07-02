import React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider"
import { getOrder } from "../../apis"


export default function OrderView() {
    const {id} = useParams()
    
    const [loading, setLoading] = useState(false) 
    const [order, setOrder] = useState({
        id : null,
        waybill : null,
        customer_address : '',
        customer_name : ''
    })
    
    if(id){
        useEffect(() => {
            setLoading(true)
            getOrder(id)
            .then((response) => {
                setLoading(false)
                setOrder(response.data.order)
            })
            .catch(() => {
                setLoading(false)
            })
        },[])
    }

    return (
        <div>
            {id && 
                <h1>Order {order.waybill}</h1>
            }
            
            <div className="card animated fadeDown">
                {loading && ( 
                    <div className="text-center"> Loading.... </div>
                )}

                {!loading &&
                    <div className="text-left"> 
                        <div className="inline-view">
                            <h4>Waybill: </h4> <span>{order.waybill}</span>
                        </div>

                        <div className="inline-view">
                            <h4>Customer Name: </h4> <span>{order.customer_name}</span>
                        </div>

                        <div className="inline-view">
                            <h4>Customer Address: </h4> <span>{order.customer_address}</span>
                        </div>


                    </div>
                    
                }
               
            </div>
        </div>
    )
}