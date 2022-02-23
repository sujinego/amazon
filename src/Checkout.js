import React from 'react'; 
import './Checkout.css';
import Subtotal from './Subtotal';
import {useStateValue} from './StateProvider';


function Checkout() {
  return (
    <div className="checkout">
        <div className="checkout_left">
            <img className="checkout_ad"
            src="img/ad.jpg"
            alt="광고 이미지"/>

            <div>
                <h2 className="checkout_title">
                    장바구니입니다
                </h2>

                {/*장바구니 아이템들*/}
                {/*장바구니 아이템들*/}
                {/*장바구니 아이템들*/}
                {/*장바구니 아이템들*/}
                {/*장바구니 아이템들*/}
                {/*장바구니 아이템들*/}


            </div>
        </div>
        <div className="checkout_right">
            <Subtotal/>
            
        </div>
    </div>
    );
}

export default Checkout;