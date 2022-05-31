import React, {useEffect, useState} from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "axios";
import styles from "./PaymentForm.module.css";

function PaymentForm(){
    const [success,setSuccess]=useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("")

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "#fff",
                fontSize: "20px"
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });
        
        if(!error){
            try{
                const {id} = paymentMethod;
                const response = await axios.post("https://brickgo-server.herokuapp.com/api/payment",{
                    amount: 1000,
                    id
                })
                if(response.data.success){
                    console.log("Successful payment");
                    setSuccess(true)
                }
            }catch(error){
                console.log("Error", error)
            }
        }else{
            console.log(error.message)
            setError(error.message)
        }
    };
    
    function ErrorMessage(){
        if(error!==""){
            return(
                <p>{error.message}</p>
            )
        }
    }

    useEffect(()=>{

    },[error])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset  className={styles.test}>
                    <div>
                        <CardElement className={styles.input} option={CARD_OPTIONS}/>
                    </div>  
                </fieldset>
                {error ? (
                    <p>{error.message}</p>
                ):("") }
                <ErrorMessage />
                <button>Pay</button>
            </form>
        </div>
    )
}

export default PaymentForm;