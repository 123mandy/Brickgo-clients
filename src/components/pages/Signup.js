import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {register, reset} from "../../features/auth/authSlice";
import Spinner from "../Spinner";



function Signup(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password:"",
        password2:"",
    });

    const {name, email, password, password2 } = formData;

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

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/lego/list')
        }

        dispatch(reset())

    },[user,isError,isSuccess,message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== password2){
            toast.error("Passwords do not match")
        }else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner/>
    }


    return(
        <div>
            <h1>
                Create your account
            </h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label>User name:</label>
                    <input type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter your name..."
                    onChange={onChange}
                    />
                </div>
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
                    <label>Password confirmation:</label>
                    <input type="password"
                    className="form-control"
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm your password..."
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Sign up</button>
                </div>

            </form>
        </div>
    )
}

export default Signup;