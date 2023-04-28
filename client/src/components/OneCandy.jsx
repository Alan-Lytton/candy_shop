
import axios from 'axios';
import '../css/oneCandy.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/index';
import { CartContext } from "../contexts/CartContext";
import PaymentBadge from '../assets/images/paymentBadges.png'
import React, { useState, useEffect, useContext } from 'react';

const OneCandy = () => {

    const { id } = useParams();
    const [candy, setCandy] = useState({});
    const { addedMessage, addToCart, cartCount, cartItems } = useContext(CartContext);
    const [candies, setCandies] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    //category recomendations
    const settings = { className: "center", dots: true, infinite: true, speed: 500, slidesToShow: 2, slidesToScroll: 1, responsive: [{ breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1, }, }, { breakpoint: 1000, settings: { slidesToShow: 1, slidesToScroll: 1, }, },], };

    // if stock reached they cant add to cart
    const isStockReached = (candy) => {
        if (!cartItems) return false;
        const candyInCart = cartItems.find((item) => item._id === candy._id);
        return candyInCart && candyInCart.quantity >= candy.candyStock - 1;
    };


    // calculate price of item on sale
    const calculatePrice = (candy) => {
        if (candy.onSale && candy.candyDiscount > 0) {
            return (candy.candyPrice - candy.candyDiscount);
            
        } else {
            return (candy.candyPrice);
        }
    };
    // get on and all candies

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/candy/${id}`)
            .then((res) => setCandy(res.data.oneCandy))
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/candy")
            .then(res => setCandies(res.data.allCandy))
            .catch(err => console.log(err));
    }, []);

    // filter thru the candies by category
    const filteredCandies = candies.filter(
        (candi) =>
            candi.candyCategory === candy.candyCategory && candi._id !== id
    );


    return (
        <section className='one_candy_container'>
            <Navbar cartCount={cartCount} />
            <section className="main_container_one_candy">
                <div className="candy_image_container">
                    <img className='one_candy_image' require src={candy.candyImage} alt="this is the iamge" />
                </div>
                <div className="candy_description_container">
                    <h6 className='candy__name__one'>{candy.candyName}</h6>
                    {candy.onSale && candy.candyDiscount > 0 ? (
                        <h6 className='candy__price__one'>
                            <span className='styled_candy_new_price' style={{ textDecoration: 'line-through' }}>
                                ${candy.candyPrice}
                            </span>{' '}
                            <span>${calculatePrice(candy)}</span>
                        </h6>
                    ) : (
                        <h6 className='candy__price__one'>Price: ${candy.candyPrice}</h6>
                    )}                    <h6 className='candy__description__one'>{candy.candyDescription}</h6>
                    <h6 className='candy__category__one'>Category: {candy.candyCategory}</h6>
                    <h6 className="candy__stock__one">In Stock: {candy.candyStock}</h6>
                    <div className="container_button_badges">
                        <button
                            className='add_to_cart_one'
                            onClick={() => addToCart(candy)}
                            disabled={isStockReached(candy)}
                        >
                            {isStockReached(candy) ? "Out of Stock" : "Add to Cart"}
                        </button>
                        <img className="imageBagePayment" src={PaymentBadge} alt="" />
                    </div>
                </div>
                <p className={`added-message${addedMessage[candy._id] ? ' show' : ''}`}>Added</p>
            </section>
            <div className="category_list_items">
                <h1 className='title_candy_categorttext'>Find some more {candy.candyCategory}</h1>
                <Slider className='slider_on_one_candy' {...settings}>
                    {filteredCandies.map((candi, i) => (
                        <div key={candi._id} className="each_candy">
                            <Link to={`/one/candy/${candi._id}`} onClick={() => window.scrollTo(0, 0)}>
                                <img className='candy__image__solo' src={candi.candyImage} alt="Placeholder" />
                            </Link>

                            <div className="each_candy_text">
                                <h6 className='candy__title'>
                                    <Link onClick={() => window.scrollTo(0, 0)} to={`/one/candy/${candi._id}`}>{candi.candyName}</Link>
                                </h6>
                                <h6 className='candy__price'>${candi.candyPrice}</h6>
                                <button
                                    className='each__candy__addToCart'
                                    onClick={() => addToCart(candi)}
                                    disabled={isStockReached(candi)}
                                >
                                    {isStockReached(candi) ? "Out of Stock" : "Add to Cart!"}
                                </button>
                                <p className={`added-message${addedMessage[candi._id] ? ' show' : ''}`}>Added</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <Footer />
        </section>
    )
}

export default OneCandy
