import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {login, reset} from "../../features/auth/authSlice";
import Spinner from "../Spinner";


function Login(){
    const [formData, setFormData] = useState({
        email: "",
        password:"",
    });

    const {email, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state)=> state.auth
    )

    const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value 
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/lego/list')
        }
        dispatch(reset())
    },[user,isError,isSuccess,message, navigate, dispatch])

    if(isLoading){
        return <Spinner/>
    }

    return(
        <div>
            <h1>
                Log in your account
            </h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email..."
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password..."
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Log up</button>
                </div>
            </form>
        </div>
    )
}

export default Login;