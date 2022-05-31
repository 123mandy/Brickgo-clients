import React, {useEffect, useState} from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "axios";
import styles from "./PaymentForm.module.css";
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";



function PaymentForm(){
    const {user} = useSelector((state)=>state.auth);
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

    if(success){
        confetti();
    }

    

    useEffect(()=>{

    },[error])

    return(
        <div>
            {!success ? (
                <div>
                    <h2>Card information:</h2>
                    <p>Payment method</p>
                    <div>
                        <img src="https://www.theorchardcottage.co.nz/wp-content/uploads/2018/09/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos-768x229.png" className={styles.img}/>
                        <img src="https://www.pngkit.com/png/full/53-530494_american-express-american-express-logo-black.png" className={styles.img2}/>
                        <img src="https://kingdomanimalhospital.com/wp-content/uploads/2017/08/discover-card-logo.png" className={styles.img2}/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <fieldset  className={styles.test}>
                            <div>
                                <CardElement className={styles.input} option={CARD_OPTIONS}/>
                            </div>  
                        </fieldset>
                        <button className={styles.button_27}>Pay</button>
                    </form>
                </div>
            ):(
                <div className={styles.container}>
                    <h2>Your order is on the way!</h2>
                    <Link to={`/order/${user._id}`}>
                        <button className={styles.button_27}> Check your order</button>
                    </Link>
                </div>
            ) }
            
        </div>
    )
}

export default PaymentForm;