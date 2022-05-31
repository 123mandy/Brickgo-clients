import React, {useEffect, useState, useCallback} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { api} from '../helpers/helpers';
import axios from "axios";
import styles from "./LegoShow.module.css"

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
    const baseURL_userCart = `https://brickgo-server.herokuapp.com/api/users/${user._id}`;
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
                    <button className={styles.button_54}>Edit</button>
                    <button onClick={deleteProduct} className={styles.button_54}>Delete</button>
                </div>
            )
        }else{
            return(
                <div>
                    <button onClick={addToCart} className={styles.button_54}>Add to Cart</button>
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
        <div className={styles.container}>
        {product === null ? (''):(
            <div>
                <div className={styles.divContainer}>
                   <div className={styles.imgContainer}>
                   {product.image === []? (
                       <img src="https://www.nc-engineering.com/nccms/wp-content/uploads/2021/04/image-coming-soon-placeholder.png" className={styles.img}/>
                   ):(
                       <img src={product.image[0]} className={styles.img}/>
                   )}
                   </div>
                   <div className={styles.textContainer}>
                       <p className={styles.name}>{product.name}</p>
                       <p className={styles.price}>${product.price}</p>
                       <p className={styles.stock}>{product.qty} left in stock</p>
                       <p className={styles.description}>{product.description}</p> 
                   </div>
                </div>
              
            <AuthButton />
            </div>
        )}
        </div> 
    )
}

export default LegoShow;