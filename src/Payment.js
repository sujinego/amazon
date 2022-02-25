import React from 'react';
import './Payment.css';
import {useStateValue} from './StateProvider';
import {Link, useHistory} from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();
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

           </div>
        </div>
    );
}

export default Payment;