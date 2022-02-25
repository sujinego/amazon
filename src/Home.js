import React from "react";
import Product from "./Product";
import './Home.css';


function Home() {
    return (
        <div className="home">
            <div className="home-container">
                <img className="home_image" 
                src=""/>
                    

                <div className="home_row">
                
                <Product id="2323" 
                    title="제품1"
                    price={30000} 
                    image="https://via.placeholder.com/50" alt="임시이미지" 
                    rating={5}
                    />
                
                <Product id="2322" 
                    title="제품2"
                    price={25000} 
                    image="https://via.placeholder.com/50" alt="임시이미지" 
                    rating={3}
                    />
                </div>

                <div className="home_row">
                <Product id="2321" 
                    title="제품3"
                    price={34000} 
                    image="https://via.placeholder.com/50" alt="임시이미지" 
                    rating={4}
                    />
                <Product id="2320" 
                    title="제품4"
                    price={55000} 
                    image="https://via.placeholder.com/50" alt="임시이미지" 
                    rating={5}
                    />
                </div>

                <div className="home_row">
                <Product id="2319" 
                    title="제품5"
                    price={25000} 
                    image="https://via.placeholder.com/50" alt="임시이미지" 
                    rating={5}
                    />
                </div>
    
            </div>
        </div>
    );
}
export default Home;