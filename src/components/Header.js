import React from "react";
import {FaSignInAlt, FaShoppingCart, FaUser} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";


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
               <Link to="/">BrickGo</Link>
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
                            <Link to="/legolist">
                                <FaSignInAlt /> Find your lego
                            </Link>
                        </li>
                        <li>
                            <button className="btn" onClick={onLogout}>Logout</button>
                        </li>
                        <li>
                            <Link to={`/cart/${user._id}`} >
                                <FaShoppingCart />
                            </Link>    
                        </li>

                    </>

                )}
                
                
            </ul>
        </div>
    )   
}

export default Header;