import React, {useState} from "react";
import {Elements, CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import { loadStripe} from "@stripe/stripe-js";
import axios from "axios";

function UserCheckout(){
    const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

    const [success,setSuccess]=useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });
        
        if(!error){
            try{
                const {id} = paymentMethod;
                const response = await axios.post("http://localhost:8000/api/payment",{
                    amount: 1000,
                    id
                })
    
                if(response.data.sucess){
                    console.log("Successful payment");
                    setSuccess(true)
                }
            }catch(error){
                console.log("Error", error)
            }
        }else{
            console.log(error.message)
        }
    };

    

    return(
        <div>
            <form className="form-group">
                <h2>Payment Address</h2>
                <label>
                    Address:
                </label>
                <input
                />
                <label>
                    Suburb:
                </label>
                <input />
                <label>
                    City:
                </label>
                <input />
                <label>
                    Zip:
                </label>
                <input />
                <label>
                    Phone Number:
                </label>
                <input />
                <label>
                    Name:
                </label>
                <input />
            </form>
            <input type="submit" value="Checkout" />
            <div>
               <h1>Card Infomation</h1>
               <Elements stripe={stripePromise}>
                   <form>

                   </form>
               </Elements>
            </div>
        </div>
    )
}

export default UserCheckout;