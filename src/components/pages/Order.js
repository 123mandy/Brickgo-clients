import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./Order.module.css";


function Order(){
    const param = useParams();
    console.log(param.userid)
    const [orders, setOrders]=useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const API = `https://brickgo-server.herokuapp.com/api/orders/my/${param.userid}`
    const fetchOrder = async()=>{
        const res = await axios.get(API)
        setOrders(res.data)
    }

    useEffect(()=>{
        fetchOrder()
    },[])

    useEffect(()=>{
        if(orders !== null ){
          setIsLoading(false)
        }
    },[orders])

    return(
        <div>
        {isLoading ? (
            <div className={styles.loading}>
                <img src="https://media.baamboozle.com/uploads/images/147872/1642758379_98425_gif-url.gif" className={styles.loadingImg} />
            </div>
        ):(
            <div className={styles.container}>
                {orders.length > 0 ? (
                     <div >
                         <h2>Your order details:</h2>
                         {orders.map((item)=>{
                             return(
                                 <div className={styles.singleOrder}>
                                     <p className={styles.title}>Items:</p>
                                     {item.product.map((p)=>{
                                         return(
                                             <div>
                                                 <p  className={styles.text}>{p.productName} X {p.qtyNeeded}</p>
                                             </div>
                                         )
                                     })}
                                     <p  className={styles.title}>Total Price:</p>
                                     <p className={styles.text}>{item.totalPrice}</p>
                                     <p  className={styles.title}>Post Address:</p>
                                     <p className={styles.text}>{item.address}, {item.suburb}, {item.city}, {item.zip}</p>
                                     <p  className={styles.title}>Contact number:</p>
                                     <p>{item.phone}</p>
                                 </div>
                             )
                         })}
                     </div> 
                    
                ):(
                   <p>You haven't placed any orders</p>
                )}    
            </div>
        )} 
        </div>       
    )
}

export default Order;