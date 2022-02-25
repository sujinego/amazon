import React from 'react'; 
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from './StateProvider';
import {getBasketTotal} from './Reducer';
import { useHistory } from "react-router-dom";



function Subtotal() {
  const history = useHistory();
  const [{ basket}, dispatch] = useStateValue();

  return (
    <div className="subtotal">

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

        <button onClick={e => history.pushState('/Payment')}>결제하기</button>
    </div>
  );
}
export default Subtotal;