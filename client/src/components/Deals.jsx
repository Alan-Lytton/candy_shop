import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Navbar, Footer } from '../components/index';
import { Link } from "react-router-dom";
import "../css/allCandies.css";
import axios from "axios";

const Deals = () => {
    const [candies, setCandies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart, cartItems } = useContext(CartContext);


    // handle add to cart button
    const handleAddToCart = (candy) => {
        addToCart(candy);
    };
    // check if stock is reached if so dont let them add more
    const isStockReached = (candy) => {
        if (!cartItems) return false;
        const candyInCart = cartItems.find((item) => item._id === candy._id);
        return candyInCart && candyInCart.quantity >= candy.candyStock - 1;
    };

    // scroll window to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // get all the candies and filter thru the ones on sale
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/candy")
            .then((res) => {
                const saleCandies = res.data.allCandy.filter((candy) => candy.onSale);
                setCandies(saleCandies);
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            })
            .catch((err) => console.log(err));
    }, []);

    if (isLoading) {
        return (
            <div id="loading-wrapper">
                <div id="loading-text">LOADING</div>
                <div id="loading-content"></div>
            </div>
        );
    }
    return (
        <section className="all_candies_container">
            <Navbar />
            <h1 className="main__title__allCandies on_deals">Deals on Candies</h1>
            <section className="cadies_container">
                {candies.map((candy, i) => (
                    <div key={candy._id} className="each_candy">
                        <Link to={`/one/candy/${candy._id}`}>
                            <img
                                className="candy__image"
                                src={candy.candyImage}
                                alt="Placeholder"
                            />
                        </Link>
                        <div className="each_candy_text">
                            <h6 className="candy__title">
                                <Link to={`/one/candy/${candy._id}`}>{candy.candyName}</Link>
                            </h6>

                            {candy.onSale && candy.candyDiscount > 0 ? (
                                <div>
                                    <h6 className='candy__price discounted'> <span className="on_sale_candy">${candy.candyPrice.toFixed(2)}</span> ${(candy.candyPrice - candy.candyDiscount).toFixed(2)}</h6>
                                </div>
                            ) : (
                                <h6 className='candy__price'>${candy.candyPrice.toFixed(2)}</h6>
                            )}
                            <button
                                className="each__candy__addToCart"
                                onClick={() => handleAddToCart(candy)}
                                disabled={isStockReached(candy)}
                            >
                                {isStockReached(candy) ? "Out of Stock" : "Add to Cart!"}
                            </button>
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </section>
    );
};

export default Deals;
