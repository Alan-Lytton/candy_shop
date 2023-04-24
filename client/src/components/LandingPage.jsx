import axios from 'axios'
import "../css/landingPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollTrigger from 'react-scroll-trigger';
import { Navbar, Footer} from '../components/index';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from "../contexts/CartContext";
import candy_bowl from '../assets/images/candy_bowl.webp'
import React, { useState, useEffect, useContext } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [candies, setCandies] = useState([]);
  const [animate, setAnimate] = useState(false);
  const { addToCart, cartItems } = useContext(CartContext);

  // slider carasoul
  const settings = { dots: true, infinite: true, speed: 500,slidesToShow: 3,  slidesToScroll: 1 ,responsive: [ {breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1,},},{breakpoint: 1000, settings: { slidesToShow: 1, slidesToScroll: 1,},},],};

  // checks if item in stock
  const isStockReached = (candy) => {
    if (!cartItems) return false;
    const candyInCart = cartItems.find((item) => item._id === candy._id);
    return candyInCart && candyInCart.quantity >= candy.candyStock - 1;
  };

  // animation coming on slider div
  const onEnterViewport = () => {
    setAnimate(true);
  };
  const onExitViewport = () => {
    setAnimate(false);
  };

  // filter thru discounted candies
  const discountedCandies = candies.filter(
    (candy) => candy.onSale && candy.candyDiscount > 0.00
  );

  // navigate to shop
  function handleClick() {
    navigate('/shop');
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/candy")
      .then((res) => setCandies(res.data.allCandy))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-body">
    <span className='empty_body_span'></span>
      <div className='body'>
        <Navbar />
        <div className="all_item-container">
          <div className='containerLink'>
            <h6 className='title-link'> I'll take you to the candy shop.</h6>
            <h6 className='title-link'> One taste of what we got.</h6>
            <h6 className='title-link'> We'll have you spending all you got.</h6>
          </div>
          <div className="action-button">
            <button className="submit button" onClick={handleClick}>Shop Candies</button>
          </div>
        </div>
      </div>
     
      <ScrollTrigger onEnter={onEnterViewport} onExit={onExitViewport}>

        <section className={`section-one ${animate ? 'animate' : 'slide-in'}`}>
          <h1 className='section-one_title final_title__'>Shop now for discounted products!</h1>
          <div className="carasoul_container">

            <Slider {...settings}>
              {discountedCandies.map((candy, index) => (
                <div className='carasoul_all_togethor' key={index}>
                  <Link className='link_image_carasoul' to={`/one/candy/${candy._id}`}>
                    <img className="carousel-pic" src={candy.candyImage} alt={candy.candyName} /></Link>
                  <h6 className='candy__title candy__title__carasoul'>
                    <Link to={`/one/candy/${candy._id}`}>{candy.candyName}</Link>
                  </h6>
                  <div className="carousel-price">
                    <h6 className="carousel-original-price">{`$${candy.candyPrice.toFixed(2)}`} </h6>
                    <i class="fa-solid fa-arrow-right"></i>
                    <h6 className="carousel-discount-price">{`$${(candy.candyPrice - candy.candyDiscount).toFixed(2)}`}</h6>
                  </div>
                  <button
                    className='each__candy__addToCart landing_carasoul'
                    onClick={() => addToCart(candy)}
                    disabled={isStockReached(candy)}>
                    {isStockReached(candy) ? "Out of Stock" : "Add to Cart!"}
                  </button>
                </div>
              ))}
            </Slider>

            <button className='carasoul-button'> <Link className='link_to_deals' to={"/deals"}>Find Deals</Link> </button>
          </div>
        </section>
      </ScrollTrigger>

      <section className="landing_page_confident">
        <h1 className="total_titel">What we offer</h1>
        <div className="breaker_box">
          <h6 className='landing_page_confident__text'>Satisfy your cravings with delicious candy shipped right to your door. Whether you’re in the mood for sugar-free candy classics or bulk gummies, holiday assortments like Easter and Halloween candy, or old-time candy favorites like Necco Wafers and Gobstoppers, we have the sweets for you.</h6>
          <img className='landing_page_confident__image' src={candy_bowl} alt="" />
        </div>
      </section>
      <Footer />
    </div>
  )
}
export default LandingPage;

