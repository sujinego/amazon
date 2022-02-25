import React from 'react';
import './CheckoutProduct.css'
import {useStateValue} from './StateProvider';


function CheckoutProduct( {id, title, image, price, rating, hiddenButton} ) {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id,            
        });
    };

    return (
        <div className="checkoutProduct">
           <img className="checkoutProduct_image" src={image} alt=""/>
           
           <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">
                    {title}
                </p>
                <p className="checkoutProduct_price">
                    <small>￦</small>
                    <string>{price}</string>
                    <small>원</small>
                </p>

                <div className="checkoutProduct_rating">
                    {
                        Array(rating)
                            .fill()
                            .map(()=>(
                                <p>★</p>
                            ))
                    }
                </div>

                {!hiddenButton && (<button onClick={removeFromBasket}>장바구니 삭제</button>)}
           </div>
          
        </div>
    );
}

export default CheckoutProduct;