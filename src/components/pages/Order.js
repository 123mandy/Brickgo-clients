import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";


function Order(){
    const param = useParams();
    console.log(param.userid)
    const [orders, setOrders]=useState([])
    const API = `https://brickgo-server.herokuapp.com/api/orders/my/${param.userid}`
    const fetchOrder = async()=>{
        const res = await axios.get(API)
        setOrders(res.data)
    }

    useEffect(()=>{
        fetchOrder()
    },[])

    return(
        
        <div>
            {orders.length > 0 ? (
                 <div>
                     {orders.map((item)=>{
                         return(
                             <div>
                                 {item.product.map((p)=>{
                                     return(
                                         <div>
                                             <p>{p.productName} X {p.qtyNeeded}</p>
                                         </div>
                                     )
                                 })}
                                 <p>{item.totalPrice}</p>
                                 <p>Send to: {item.address}, {item.suburb}, {item.city}, {item.zip}</p>
                                 <p>Contact: {item.phone}</p>
                             </div>
                         )
                     })}
                 </div> 
                
            ):(
               <p>comming soon</p>
            )}
            
        </div>
    )
}

export default Order;