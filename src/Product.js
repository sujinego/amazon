import React from "react";
import './Product.css';
import {useStateValue} from './StateProvider';


function Product( {id, title, image, price, rating} ) {
    const [{basket}, dispatch] = useStateValue();

const addToBasket = () => {
    dispatch({
        type:'ADD_TO_BAKET',
        item: {
            id:id,
            title:title,
            image:image,
            price:price,
            rating:rating,
        },
    });
};

console.log("장바구니", basket);

    return (
        <div className="product">
            <div className="product_info">
                <p>{ title }</p>
                <p className="product_price">
                    <small>가격</small>
                    <strong>{ price }</strong>
                    <small>원</small>
                </p>

                <div className="product_rating">
                    { Array(rating)
                            .fill()
                            .map(() => (
                                <p>★</p>
                            ))}
                </div>
            </div>
            <img src={ image} alt="임시이미지" />
            <button onClick={addToBasket}>장바구니 담기</button>
        </div>
    );

}
export default Product;