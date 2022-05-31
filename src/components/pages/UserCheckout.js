import React, {useState, useEffect} from "react";
import {Elements} from "@stripe/react-stripe-js";
import {useSelector} from "react-redux";
import { loadStripe} from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import {Link,useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import styles from "./UserCheckout.module.css"

function UserCheckout(){
    const {user} = useSelector((state)=> state.auth)
    console.log(user._id)
    const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

    const [address, setAddress]=useState("");
    const [suburb, setSuburb]=useState("");
    const [city, setCity]=useState("");
    const [zip, setZip]=useState(null);
    const [phone, setPhone]=useState(null);
    const [name, setName]=useState("");
    const [postSuccess, setPostSucess]=useState(false);

    let params = useParams();
    const API_user = `https://brickgo-server.herokuapp.com/api/users/${params.userid}`
    const [cartInfo, setCartInfo] = useState([]);
    const [sumPrice, setSumPrice] = useState(null);

    const fetchUser = async()=>{
        const res = await axios.get(API_user)
        setCartInfo(res.data.cart);
        calPrice()
    }

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
    
    const API = "https://brickgo-server.herokuapp.com/api/orders"
    const createOrder = async(event)=>{
        event.preventDefault();
        const res = await axios.post(API,{
            name: name,
            user: params.userid,
            address: address,
            suburb: suburb,
            city: city,
            zip: zip,
            phone: phone,
            product: cartInfo,
            totalPrice: sumPrice
        })
        if(res.data.message === undefined){
            setPostSucess(true);
            Promise.all(
            cartInfo.map(async(item)=>{
                const api_update = `https://brickgo-server.herokuapp.com/api/products/${item.productId}`;
                const res = await axios.put(api_update,{
                    qty: item.productQty-item.qtyNeeded
                })
            })).then(async(err)=>{
                const api = `https://brickgo-server.herokuapp.com/api/users/${params.userid}`;
                await axios.put(api, {cart: []})
            })
            
        }
        
    }

    

    useEffect(()=>{
        fetchUser()
    },[]);

    useEffect(()=>{
        calPrice();
    },[cartInfo]);

   
    return(
        <div className={styles.alignleft}>
            {!postSuccess ? (
                <form className="form-group" >
                <h2>Payment Address:</h2>
                <label>
                    Address:
                </label>
                <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                onChange={(e)=>setAddress(e.target.value)}
                required
                />
                <label>
                    Suburb:
                </label>
                <input
                 type="text"
                 className="form-control"
                 id="suburb"
                 name="suburb"
                 onChange={(e)=>setSuburb(e.target.value)} 
                 required
                />
                <label>
                    City:
                </label>
                <input 
                type="text"
                className="form-control"
                id="city"
                name="city"
                onChange={(e)=>setCity(e.target.value)} 
                required
                />
                <label>
                    Zip:
                </label>
                <input 
                type="number"
                className="form-control"
                id="zip"
                name="zip"
                onChange={(e)=>setZip(e.target.value)} 
                required
                />
                <h2>Contact Info:</h2>
                <label>
                    Phone Number:
                </label>
                <input
                 type="number"
                 className="form-control"
                 id="phone"
                 name="phone"
                 onChange={(e)=>setPhone(e.target.value)}  
                />
                <label>
                    Name:
                </label>
                <input 
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={(e)=>setName(e.target.value)}
                required
                />
                <button onClick={createOrder} className={styles.button_27}>Save your details</button>
            </form>
            ):(
                <div>
                   <h2>Card Infomation:</h2>
                   <Elements stripe={stripePromise}>
                       <PaymentForm />
                   </Elements>
                </div>
            )}
            
            
        </div>
    )
}

export default UserCheckout;