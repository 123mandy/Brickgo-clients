import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Spinner from "../Spinner";
import axios from "axios"

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
        <div>
           Start your lego journey!
           {lego.map((item)=>{
               return(
                   <NavLink to={`/lego/${item._id}`}  key={item._id}>
                        <div>
                            <h2>Name: {item.name}</h2>
                            <h2>Price: {item.price}</h2>
                        </div>
                   </NavLink>
               )
           })}
        </div>
    )
}

export default LegoList;