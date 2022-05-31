import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Spinner from "../Spinner";
import axios from "axios"
import styles from "./LegoList.module.css";
import {FaDollarSign} from "react-icons/fa";
import {motion} from "framer-motion";
import soldout from "../../imgs/soldout.png"

function LegoList(){
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth);

    //Set API
    const API = "https://brickgo-server.herokuapp.com/api/products"

    // Get state
    const [lego, setLego] = useState([]);
    // Get data from database
    const getAll = async()=>{
        const response = await axios.get(API);
        setLego(response.data.reverse())
    }


    useEffect(()=>{

        if(!user){
            navigate('/')
        }
        getAll()  

    },[user])

    
    return(
        <div className={styles.container}>
           {lego.map((item)=>{
               return(
                    <NavLink to={`/lego/${item._id}`}  key={item._id} className={styles.flexbox}>
                        <motion.div className={styles.alignLeft} initial={{ scale:0.1 }} animate={{scale: 1}}>
                            <div className={styles.imgContainer}>
                                <img src={item.image[0]} className={styles.img}/>
                            </div>
                            <div className={styles.textContainer}>
                                <p className={styles.name}>{item.name}</p>
                                <p className={styles.price}><FaDollarSign/>{item.price}</p>
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
                        </motion.div>
                   </NavLink>
               )
           })}
        </div>
    )
}

export default LegoList;