import React from "react";
import {FaSignInAlt, FaShoppingCart, FaUser, FaAlignJustify} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";
import styles from "./Header.module.css";
import { BsCardList,BsListStars,BsFillPlusCircleFill } from "react-icons/bs";
import { isRejected } from "@reduxjs/toolkit";


function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth);

    const onLogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return(
        <div className="header">
             
            <div className="logo">
                <ul>
                    <li>
                        <img src="https://media4.giphy.com/media/WsUFoCSxQVK2GJGorT/giphy.gif?cid=ecf05e47nqs1fj0c2yr4rf4fpk3v0j8l8wkpnto9wvij9583&rid=giphy.gif&ct=s" className={styles.logo}/>
                    </li>
                    <li>
                        <Link to={user ? "/lego/list" : "/"} className={styles.name}>BrickGo</Link>
                    </li>
                </ul>
              
            </div>
            <ul> 
                {!user ? (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup">
                                <FaUser /> Signup
                            </Link>
                        </li>
                    </>
                ):(
                    <>
                        <li>
                            <Link to='/lego/new'>
                                <BsFillPlusCircleFill /> New Lego
                            </Link>
                        </li>
                        <li>
                            <Link to={`/mylego/${user._id}`}>
                                <BsListStars /> My Lego
                            </Link>
                        </li>
                        <li>
                            <Link to={`/order/${user._id}`}>
                                <BsCardList /> My Order
                            </Link>
                        </li>
                        <li>
                            <Link to={`/cart/${user._id}`} >
                                <FaShoppingCart />Cart
                            </Link>    
                        </li>
                        <li>
                            <button className="btn" onClick={onLogout}>Logout</button>
                        </li>
                    </>

                )}
                
                
            </ul>
        </div>
    )   
}

export default Header;