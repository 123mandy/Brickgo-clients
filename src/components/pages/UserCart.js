import React, {useState, useEffect} from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import style from "./UserCart.module.css";
import {FaBitbucket} from "react-icons/fa";


function UserCart(){
    const navigate = useNavigate()
    // User auth
    const {user} = useSelector((state)=>state.auth);
 
    // Get current user's shopping cart information
    let params = useParams();
    const API_user = `http://localhost:8000/api/users/${params.userid}`
    const [cartInfo, setCartInfo] = useState([]);
    const [sumPrice, setSumPrice] = useState(null)

    const fetchUser = async()=>{
        const res = await axios.get(API_user)
        setCartInfo(res.data.cart);
        calPrice();
        
    }
   
    //Add needed button function
    let addDisable = false;
    const AddNum = async(item)=>{
        if((item.qtyNeeded + 1) <= item.productQty){
            const res = await axios.put(API_user+`/${item.productId}`,{
                'cart.$.qtyNeeded': item.qtyNeeded+=1
            });
            fetchUser()
        }else{
           addDisable = true
        }
    }

    // Calculate total price
    const calPrice = function(){
        let sum = 0;
        if(cartInfo !== []){
        if(cartInfo.length >=1){
            for(let i=0; i<cartInfo.length; i++){
               sum += (cartInfo[i].productPrice *cartInfo[i].qtyNeeded);
            }
            
        }  
        setSumPrice(sum);
       }
    };
       

    //remove needed button function
    let removeDisable = false;
    const removeNum = async(item)=>{
        if((item.qtyNeeded - 1) >= 1){
            const res = await axios.put(API_user+`/${item.productId}`,{
                'cart.$.qtyNeeded': item.qtyNeeded-=1
            });
            fetchUser();
        }else{
           removeDisable = true
        }
        console.log("click")
    }
    
    // remove product from cart
    const baseURL_userCart = `http://localhost:8000/api/users/remove/${user._id}/`;
    const removeCart = async(item)=>{
        const res = await axios.put(baseURL_userCart + item.productId)
        console.log("click");
        fetchUser();
    }

    
    // create shopping cart component
    function ShoppingCart(){
        if(cartInfo.length > 0){
            return(
                <div>
                    {cartInfo.map((item)=>{
                        return(
                            <div className={style.item} key={item.productId}>
                                {item.productImage === undefined? (
                                    <img className={style.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUdxAYxFMMAG1YDKnIiCN94eZNUx0B3mrT8FVH-QCcry2avkL71uUGFBs_CvX45EKmPU&usqp=CAU"></img>
                                ):(
                                    <img className={style.img} src={item.productImage}></img>
                                )}
                                <h2>Name: {item.productName}</h2>
                                <div className={style.item}>
                                    <button className={!addDisable ? style.numButton : style.numButtonDisabled} disabled={addDisable} onClick={()=>AddNum(item)}>+</button>
                                    <p className={style.numInput}>{item.qtyNeeded}</p>
                                    <button className={style.numButton} disabled={removeDisable} onClick={()=>removeNum(item)}>-</button>
                                    <p>$ {item.productPrice * item.qtyNeeded}</p>
                                    <FaBitbucket onClick={()=>removeCart(item)} />

                                </div>                         	
                            </div>
                        )
                    })
                }               
                </div>
            )
        }else{
            return(
                <div>
                    <h1> Your shopping cart is empty</h1>
                </div>
            )
        }
    } 


    useEffect(()=>{
        fetchUser();
    },[sumPrice]);

    useEffect(()=>{
        calPrice();
    },[cartInfo]);


    return(
        <div>
            <ShoppingCart />
            <p>Total: ${sumPrice}</p>
            <Link to={`/checkout/${user._id}`}>
            <button >Checkout</button>
            </Link>
        </div>
    )
}

export default UserCart