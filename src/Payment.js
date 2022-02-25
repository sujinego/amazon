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
                    <h1>장바구니로 돌아가기({basket.length}개의 상품목록이 존재합니다.)</h1>
                </link>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>배송지</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email} 님의 주소</p>
                        <p>경기도</p>
                        <p>일산동구</p>
                    </div>
                </div>
            </div>
            
            <div className="payment_section">
                    <div className="payment_title">
                        <h3>상품 목록</h3>
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
                   <h3>결제하기</h3>
               </div>

               <div className="payment_details">
                   <form onSubmit={handleSubmit}>
                       <CardElement onChange={handleChange} />

                    <div className="payment_priceContainer">
                    <CurrencyFormat 
                        renderText={(value) => (
                            <>
                            <p>
                                총액 ( {basket.length} items ) : <string> {value} 원</string>
                            </p>
                                <small className="subtotal_gitf">
                                    <input type="checkbox" />체크박스

                                </small>
                            </>
                        )}

                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"￦"}
                    />

                    <button disable={processing || disable || succeded }> <span>{processing ? <p>결제중입니다</p> : "결제하기"}</span></button>
                    </div>
                    {error && <div> {error} </div>}
                    
                    </form>
               </div>

           </div>
        </div>
    );
}

export default Payment;