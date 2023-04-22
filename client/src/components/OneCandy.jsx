import Navbar from './Navbar'
import Footer from './Footer';
import '../css/oneCandy.css'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PaymentBadge from '../assets/images/paymentBadges.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OneCandy = ({onAddToCart, cartCount}) => {

    const { id } = useParams();
    const [candy, setCandy] = useState({});
    const [addedMessage, setAddedMessage] = useState({});


    const addToCart = (candy) => {
        onAddToCart(candy);
        setAddedMessage({ ...addedMessage, [candy._id]: true });
        setTimeout(() => {
            setAddedMessage({ ...addedMessage, [candy._id]: false });
        }, 1000);
    };

    const settings = {
        className: "center",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        // autoplay: true,    
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/candy/${id}`)
            .then((res) => setCandy(res.data.oneCandy))
            .catch((err) => console.log(err));
    }, [id]);

    const [candies, setCandies] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/candy")
            .then(res => setCandies(res.data.allCandy))
            .catch(err => console.log(err));
    }, []);

    // Filter candies by category
    const filteredCandies = candies.filter(candi => candi.candyCategory === candy.candyCategory);

    return (
        <section className='one_candy_container'>
            <Navbar cartCount={cartCount}/>
            <section className="main_container_one_candy">
                <div className="candy_image_container">
                    <img className='one_candy_image' require src={candy.candyImage} alt="this is the iamge" />
                </div>
                <div className="candy_description_container">
                    <h6 className='candy__name__one'>{candy.candyName}</h6>
                    <h6 className='candy__price__one'>Price: ${candy.candyPrice}</h6>
                    <h6 className='candy__description__one'>{candy.candyDescription}</h6>
                    <h6 className='candy__category__one'>Category: {candy.candyCategory}</h6>
                    <h6 className="candy__stock__one">In Stock: {candy.candyStock}</h6>
                    <div className="container_button_badges">
                    <button className='add_to_cart_one' onClick={() => addToCart(candy)}>Add to Cart</button>
                    <img className="imageBagePayment" src={PaymentBadge} alt="" />
                    </div>
                    </div>
                    <p className={`added-message${addedMessage[candy._id] ? ' show' : ''}`}>Added</p>
                </section>
                <div className="category_list_items">
                <h1 className='title_candy_categorttext'>Find some more {candy.candyCategory}</h1>
                <Slider {...settings}>
                        {filteredCandies.map((candi, i) => (
                            <div key={candi._id} className="each_candy">
                                <Link to={`/one/candy/${candy._id}`}>
                                    <img className='candy__image__solo' src={candi.candyImage} alt="Placeholder" />
                                </Link>
                                <div className="each_candy_text">
                                    <h6 className='candy__title'>
                                        <Link to={`/one/candy/${candi._id}`}>{candi.candyName}</Link>
                                    </h6>
                                    <h6 className='candy__price'>${candi.candyPrice}</h6>
                                    <button className='each__candy__addToCart' onClick={() => addToCart(candi)}>Add to Cart!</button>
                                    <p className={`added-message${addedMessage[candi._id] ? ' show' : ''}`}>Added</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <Footer/>
        </section>
    )
}

export default OneCandy
