import Navbar from './Navbar'
import '../css/oneCandy.css'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import KitKat from '../assets/images/kitkat.png'
import PaymentBadge from '../assets/images/paymentBadges.png'
const OneCandy = () => {
    const { id } = useParams();
    const [candy, setCandy] = useState({});
  
    useEffect(() => {
      axios
        .get(`http://localhost:8000/api/candy/${id}`)
        .then((res) => setCandy(res.data.oneCandy))
        .catch((err) => console.log(err));
    }, [id]);
    return (
        <section className='one_candy_container'>
            <Navbar />
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
                <button className='add_to_cart_one'>Add to Cart</button>
                <img className="imageBagePayment" src={PaymentBadge} alt=""  />
                </div>
                </div>
            </section>
        </section>
    )
}

export default OneCandy
