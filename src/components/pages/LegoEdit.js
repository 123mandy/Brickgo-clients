import React, {useEffect, useState, useCallback} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { api } from '../helpers/helpers';

function LegoEdit(){
    const navigate = useNavigate()
    // User auth
    const {user} = useSelector((state)=>state.auth);
    
    // Get current lego information
    let params = useParams();

    useEffect(()=>{
        
    },[])

    return(
        <div>
      
        </div> 
    )
}

export default LegoEdit;