import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import { BsCart } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import {useStateValue} from "./StateProvider";


function Header() {
    const [{ basket}, dispatch] = useStateValue();

    return (
        <div className="header">
            <Link to="/">
            <img className="header_logo" src="img/amazon_PNG24.png" />
            </Link>
            <div className="header_search">
                <input className="header_searchInput" type="text"/>
                <FiSearch className="header_searchIcon"/>
            </div>
         

            <div className="header_nav">
           
                <div className="header_option">
                    <span className="header_optionLineOne">안녕하세요</span>
                    <Link to="/login" className="homelogin">
                    <span className="header_optionLineTwo">로그인</span>
                    </Link>
                </div>
                <div className="header_option">
                    <span className="header_optionLineOne">돌아가기</span>
                    <span className="header_optionLineTwo">주문내역</span>
                </div>
                <div className="header_option">
                    <span className="header_optionLineOne">안녕하세요</span>
                    <span className="header_optionLineTwo">ooo님</span>
                </div>
                <Link to="/checkout">
                <div className="header_optionBasket">
                    <BsCart/>    
                    <span className="header_oprionLineTwoheader_basketCount">
                        {basket?.length}
                    </span>
                    </div>
                </Link>

            </div>

         </div>
    );
}

export default Header;