import React from 'react'; 
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from './StateProvider';

function Subtotal() {
  return (
    <div className="subtotal">

        <CurrencyFormat 
        renderText={(value) => (
            <>
            <p>
                 총액 ( 0items ) : <string> 0원</string>
            </p>
                <small className="subtotal_gitf">
                    <input type="checkbox" />체크박스

                </small>
            </>
        )}

        decimalScale={2}
        value={0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />

        <button>결제하기</button>
    </div>
  );
}
export default Subtotal;