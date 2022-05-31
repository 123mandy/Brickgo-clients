import axios from "axios";
import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import styles from "./LegoList.module.css";
import soldout from "../../imgs/soldout.png"


function MyLego(){
    const param = useParams();
    const [products, setProducts]=useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const API = `https://brickgo-server.herokuapp.com/api/products/my/${param.userid}`
    const fetchProducts = async()=>{
        const res = await axios.get(API)
        setProducts(res.data)
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    useEffect(()=>{
        if(products !== null ){
          setIsLoading(false)
        }
    },[products])

    return(
        <div>
            { isLoading ? (
                <div className={styles.loading}>
                    <img src="https://media.baamboozle.com/uploads/images/147872/1642758379_98425_gif-url.gif" className={styles.loadingImg} />
                </div>
            ):(
                <div>
                    {products.length>0 ? (
                            <div className={styles.container}>
                                {products.map((item)=>{
                                    return(
                                        <NavLink to={`/lego/${item._id}`}  key={item._id} className={styles.flexbox}>
                                             <div className={styles.alignLeft}>
                                                 <div className={styles.imgContainer}>
                                                     <img src={item.image[0]} className={styles.img}/>
                                                 </div>
                                                 <div className={styles.textContainer}>
                                                     <p className={styles.name}>{item.name}</p>
                                                     <p className={styles.price}>${item.price}</p>
                                                     {item.qty === 0 ? (
                                                         <p className={styles.stock}>Out of stock</p>
                                                     ):(
                                                         <p className={styles.stock}>{item.qty} left in stock</p>
                                                     )}       
                                                 </div>
                                                 {item.qty === 0 ? (
                                                     <img src={soldout} className={styles.soldout} />
                                                 ):(
                                                     ""
                                                 )}
                                             </div>
                                        </NavLink>
                                    )
                                })}
                            </div>
                    ):(
                            <div>
                                nothing there
                            </div>
                    )}       
                </div>      
            )}
        </div>            
    )
}

export default MyLego;