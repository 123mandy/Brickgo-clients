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
    const API_user = `https://brickgo-server.herokuapp.com/api/users/${params.userid}`
    const [cartInfo, setCartInfo] = useState(null);
    const [sumPrice, setSumPrice] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchUser = async()=>{
        const res = await axios.get(API_user)
        setCartInfo(res.data.cart);
        calPrice();
    }
   
    //Add needed button function

    const AddNum = async(item)=>{
        if((item.qtyNeeded + 1) <= item.productQty){
            const res = await axios.put(API_user+`/${item.productId}`,{
                'cart.$.qtyNeeded': item.qtyNeeded+=1
            });
            fetchUser()
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
 
    const removeNum = async(item)=>{
        if((item.qtyNeeded - 1) >= 1){
            const res = await axios.put(API_user+`/${item.productId}`,{
                'cart.$.qtyNeeded': item.qtyNeeded-=1
            });
            fetchUser();
        }
    }
    
    // remove product from cart
    const baseURL_userCart = `https://brickgo-server.herokuapp.com/api/users/remove/${user._id}/`;
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
                            <div className="header" key={item.productId}>
                                <div className="logo">
                                    <ul>
                                         {item.productImage === undefined? (
                                             <img className={style.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUdxAYxFMMAG1YDKnIiCN94eZNUx0B3mrT8FVH-QCcry2avkL71uUGFBs_CvX45EKmPU&usqp=CAU"></img>
                                         ):(
                                             <img className={style.img} src={item.productImage}></img>
                                         )}
                                         <p className={style.name}>{item.productName}</p>
                                    </ul>
                                </div>
                                <ul className={style.parent}>
                                    <li>
                                       <p className={style.price}>$ {item.productPrice * item.qtyNeeded}</p>  
                                    </li>
                                    <button className={item.qtyNeeded < item.productQty ? style.numButton : style.numButtonDisabled} onClick={()=>AddNum(item)}>+</button>
                                    <p className={style.numInput}>{item.qtyNeeded}</p>
                                    <button className={item.qtyNeeded > 1 ? style.numButton : style.numButtonDisabled} onClick={()=>removeNum(item)}>-</button>
                                    <li>
                                        <button  onClick={()=>removeCart(item)} className={style.remove}><FaBitbucket/> Remove</button>
                                    </li>
                                    {item.qtyNeeded === item.productQty ? (
                                    <p className={style.warning}>Can't add more! Only {item.productQty} in stock</p>
                                    ):("")} 
                                </ul>                             	
                            </div>
                        )
                    })
                } 
                    <div className={style.textalign_right}>
                         <p className={style.total}>Total: ${sumPrice}</p>
                         <Link to={`/checkout/${user._id}`}>
                             <button className={style.button_54}>Checkout</button>
                         </Link>
                    </div>             
                </div>
            )
        }else{
            return(
                <div>
                    <h1> Your shopping cart is empty</h1>
                    <Link to='/lego/list'>
                        <button className={style.button_54}>Explore your interest</button>
                    </Link>
                </div>
            )
        }
    } 


    useEffect(()=>{
        fetchUser();
    },[sumPrice]);

    useEffect(()=>{
        if(isLoading === false){
           calPrice();
        }
    },[cartInfo, isLoading]);

    useEffect(()=>{
        if(cartInfo !== null ){
          setIsLoading(false)
        }
    },[cartInfo])


    return(
        <div >
            {isLoading ? (
                <div className={style.loading}>
                    <img src="https://media.baamboozle.com/uploads/images/147872/1642758379_98425_gif-url.gif" className={style.loadingImg} />
                </div>
            ):(
                <div>
                    {cartInfo.length > 0 ? (
                        <div>
                            {cartInfo.map((item)=>{
                                    return(
                                        <div className="header" key={item.productId}>
                                            <div className="logo">
                                                <ul>
                                                     {item.productImage === undefined? (
                                                         <img className={style.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUdxAYxFMMAG1YDKnIiCN94eZNUx0B3mrT8FVH-QCcry2avkL71uUGFBs_CvX45EKmPU&usqp=CAU"></img>
                                                     ):(
                                                         <img className={style.img} src={item.productImage}></img>
                                                     )}
                                                     <p className={style.name}>{item.productName}</p>
                                                </ul>
                                            </div>
                                            <ul className={style.parent}>
                                                <li>
                                                   <p className={style.price}>$ {item.productPrice * item.qtyNeeded}</p>  
                                                </li>
                                                <button className={item.qtyNeeded < item.productQty ? style.numButton : style.numButtonDisabled} onClick={()=>AddNum(item)}>+</button>
                                                <p className={style.numInput}>{item.qtyNeeded}</p>
                                                <button className={item.qtyNeeded > 1 ? style.numButton : style.numButtonDisabled} onClick={()=>removeNum(item)}>-</button>
                                                <li>
                                                    <button  onClick={()=>removeCart(item)} className={style.remove}><FaBitbucket/> Remove</button>
                                                </li>
                                                {item.qtyNeeded === item.productQty ? (
                                                <p className={style.warning}>Can't add more! Only {item.productQty} in stock</p>
                                                ):("")} 
                                            </ul>                             	
                                        </div>
                                    )
                                })
                            } 
                                <div className={style.textalign_right}>
                                     <p className={style.total}>Total: ${sumPrice}</p>
                                     <Link to={`/checkout/${user._id}`}>
                                         <button className={style.button_54}>Checkout</button>
                                     </Link>
                                </div>             
                        </div>
                    ):(
                        <div>
                            <h1> Your shopping cart is empty</h1>
                            <Link to='/lego/list'>
                                <button className={style.button_54}>Explore your interest</button>
                            </Link>
                        </div>
                    )}
                </div>
            )}         
        </div>
    )
}

export default UserCart