import React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider"
import { getOrder, saveOrder, updateOrder } from "../../apis"
import { errorToast, successToast } from "../../Helper"


export default function OrderForm() {
    const {id} = useParams()
    const {errorMessage} = useStateContext()
    
    const [loading, setLoading] = useState(false) 
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        id : null,
        waybill : null,
        customer_address : '',
        customer_name : ''
    })

    const [errors, setErrors] = useState(null); 
    const [error, setError] = useState(null); 


    function handleError(error){
        const response = error.response
        if(response && response.status === 422){
            setErrors(response.data.errors)
            return;
        }
        if(response && response.status === 500){
            setError(response.data.message ? response.data.message : errorMessage)
            return;
        }
    }

    const save = (event) => {
        event.preventDefault()

        if(id){
            
            updateOrder(id,order).then(() => {
                successToast('The order was updated succsusfully!')
                navigate('/orders')

            })
            .catch(error => {
                handleError(error)
                errorToast('The order was not updated')
            })
            return;
        }

        
        saveOrder(order).then(()=>{
            navigate('/orders')
            successToast('The order was created sucsessfully!')

        })
        .catch(error => {
            handleError(error)
            errorToast('The order was not created')
        })


    }

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
                <h1>Update Order</h1>
            }
             {!id && 
            <h1>New Order Creation</h1>
             }
             
            <div className="card animated fadeDown">
                {loading && ( 
                    <div className="text-center"> Loading.... </div>
                )}

                {
                errors && 
                    <div className='alert'>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                    </div>
                }
                 {
                    error && 
                        <div className='alert'>
                            <p>{error}</p>
                        </div>
                }

                {!loading &&
                    <form onSubmit={save}>
                        <input onChange={ev=>setOrder({...order, waybill: ev.target.value})} value={order.waybill} placeholder="waybill" type="number" min="0"/>
                        <input onChange={ev=>setOrder({...order, customer_name: ev.target.value})} value={order.customer_name} placeholder="customer name"/>
                        <input onChange={ev=>setOrder({...order, customer_address: ev.target.value})} value={order.customer_address} placeholder="customer address"/>

                        <button onClick={save} className="btn-add">Save</button>
                    </form>
                }
               
            </div>
        </div>
    )
}