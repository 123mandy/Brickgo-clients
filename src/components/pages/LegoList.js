import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Spinner from "../Spinner";
import axios from "axios"
import styles from "./LegoList.module.css";
import {FaDollarSign} from "react-icons/fa";

function LegoList(){
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth);

    //Set API
    const API = "http://localhost:8000/api/products"

    // Get state
    const [lego, setLego] = useState([]);
    // Get data from database
    const getAll = async()=>{
        const response = await axios.get(API);
        setLego(response.data)
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
                        <div className={styles.alignLeft}>
                            <div className={styles.imgContainer}>
                                <img src={item.image[0]} className={styles.img}/>
                            </div>
                            <div className={styles.textContainer}>
                                <p className={styles.name}>{item.name}</p>
                                <p className={styles.price}><FaDollarSign/>{item.price}</p>
                                <p className={styles.stock}>{item.qty} left in stock</p>
                            </div>
                        </div>
                   </NavLink>
               )
           })}
        </div>
    )
}

export default LegoList;