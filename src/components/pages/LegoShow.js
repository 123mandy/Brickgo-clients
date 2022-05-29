import React, {useEffect, useState, useCallback} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { api} from '../helpers/helpers';
import axios from "axios";

function LegoShow(){
    const navigate = useNavigate()
    // User auth
    const {user} = useSelector((state)=>state.auth);
 
    // Get current lego information
    let params = useParams();
    const [product, setProduct] = useState(null);

    const getProduct = async(id)=>{
        const res =await api.getProduct(id);
        console.log(res);
        setProduct(res);
    };

    //Delete product
    const deleteProduct = async()=>{
        const res = await api.deleteProduct(params.id)
        console.log(res)
        navigate("/lego/list")
    }

    // Add product to shoppingcart
    const baseURL_userCart = `http://localhost:8000/api/users/${user._id}`;
    const addToCart = async()=>{
        const res = await axios.put(baseURL_userCart, {
            $push:{
                cart: {
                   productId: product._id,
                   productName: product.name,
                   productQty: product.qty,
                   productImage: product.image[0],
                   qtyNeeded:1,
                   productPrice: product.price
                }
            }
        });
        console.log(res.data)
        console.log("click")
    }

    // Condition render for button
    function AuthButton() {
        if(user._id === product.user){
            return(
                <div>
                    <button>Edit</button>
                    <button onClick={deleteProduct}>Delete</button>
                </div>
            )
        }else{
            return(
                <div>
                    <button onClick={addToCart}>Add to Cart</button>
                </div>
            )
        }
    }

    useEffect(()=>{
        if(product === null){
            getProduct(params.id);
        }
    },[])

    return(
        <div>
        {product === null ? (''):(
            <div>
            {product.image === []? (''):(
                <img src={product.image[0]} />
            )}
            <h2>Name:{product.name}</h2>
            <h2>Price: {product.price}</h2>
            <p>{product.description}</p>   
            <AuthButton />
            </div>
        )}
        </div> 
    )
}

export default LegoShow;