import React, {useEffect, useState} from 'react';
import './Payment.css';
import {useStateValue} from './StateProvider';
import {Link, useHistory} from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal} from './Reducer';
import {CardElement,Elements,useElement, useStripe} from "@stripe/react-stripe-js";
import axios from 'axios';


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(true);
    const [processing , setProcessing] = useState("");
    const [succeded, setSucceded] = useState(false);

    const[clientSecret, setClientSecret] = useState(true);

    const stripe = useStripe();
    const element = useElement(true);

    useEffect(()=>{
        const setClientSecret = async () => {
            const res = await axios({
                method:'post',
                url:" /payment/create?total=${getBasketTotal(basket) *100}" 
            });
            setClientSecret(res .data.clientSecret)
        }
        setClientSecret();    
    }, [basket])
     
    const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true); 

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
            card: Elements.getElement(CardElement)
        }
        }).then(({paymentIntene}) => {
                setSucceded(true);
                setError(null);
                setProcessing("");

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        }
    )
    }
    const handleChange = event => {
        setDisable(event.empty);
        setError(event.error ? event.error.message: "");
    }

    return (
        <div className="payment">
            <div className="payment_container">
                <link to="/checkout" className="checkoutlink">
                    <h1>??????????????? ????????????({basket.length}?????? ??????????????? ???????????????.)</h1>
                </link>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>?????????</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email} ?????? ??????</p>
                        <p>?????????</p>
                        <p>????????????</p>
                    </div>
                </div>
            </div>
            
            <div className="payment_section">
                    <div className="payment_title">
                        <h3>?????? ??????</h3>
                    </div>
                    <div className="items">
                        {basket.map(item => (
                        <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating} />
                        ))}
                    </div>
                </div>
           <div className="payment_section">
               <div className="payment_title">
                   <h3>????????????</h3>
               </div>

               <div className="payment_details">
                   <form onSubmit={handleSubmit}>
                       <CardElement onChange={handleChange} />

                    <div className="payment_priceContainer">
                    <CurrencyFormat 
                        renderText={(value) => (
                            <>
                            <p>
                                ?????? ( {basket.length} items ) : <string> {value} ???</string>
                            </p>
                                <small className="subtotal_gitf">
                                    <input type="checkbox" />????????????

                                </small>
                            </>
                        )}

                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"???"}
                    />

                    <button disable={processing || disable || succeded }> <span>{processing ? <p>??????????????????</p> : "????????????"}</span></button>
                    </div>
                    {error && <div> {error} </div>}
                    
                    </form>
               </div>

           </div>
        </div>
    );
}

export default Payment;