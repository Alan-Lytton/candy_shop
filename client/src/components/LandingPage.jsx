import React, { useState, useEffect } from 'react';
import "../css/landingPage.css";
import Navbar from './Navbar.jsx';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollTrigger from 'react-scroll-trigger';
import candy_bowl from '../assets/images/candy_bowl.webp'

const LandingPage = () => {
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
  
  const [animate, setAnimate] = useState(false);

  const onEnterViewport = () => {
    setAnimate(true);
  };

  const onExitViewport = () => {
    setAnimate(false);
  };
  return (
    <div className="main-body">
      <div className='body'>
        <Navbar />
        <div className="all_item-container">
          <div className='containerLink'>
            <h6 className='title-link'> I'll take you to the candy shop.</h6>
            <h6 className='title-link'> One taste of what we got.</h6>
            <h6 className='title-link'> We'll have you spending all you got.</h6>
          </div>
          <div className="action-button">
            <button className="submit button">Shop Candies</button>
          </div>
        </div>
      </div>
      <ScrollTrigger onEnter={onEnterViewport} onExit={onExitViewport}>
        <section className={`section-one ${animate ? 'animate' : 'slide-in'}`}>
        <h1 className='section-one_title'>Shop now for discounted products!</h1>
        <div className="carasoul_container">

          <Slider {...settings}>
            <div>
              <img className="carousel-pic" src="https://plus.unsplash.com/premium_photo-1675033559019-ca61c6e909df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60" alt="" />

            </div>
            <div>
              <img className="carousel-pic" src="https://plus.unsplash.com/premium_photo-1675033559019-ca61c6e909df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60" alt="" />

            </div>
            <div>
              <img className="carousel-pic" src="https://plus.unsplash.com/premium_photo-1675033559019-ca61c6e909df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60" alt="" />

            </div>
            <div>
              <img className="carousel-pic" src="https://plus.unsplash.com/premium_photo-1675033559019-ca61c6e909df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60" alt="" />

            </div>
            <div>
              <img className="carousel-pic" src="https://plus.unsplash.com/premium_photo-1675033559019-ca61c6e909df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60" alt="" />

            </div>
          </Slider>

          <button className='carasoul-button'>Buy</button>
        </div>
        </section>
      </ScrollTrigger>
      <section className="landing_page_confident">
      <h6 className="landing_page_confident__title">What we offer</h6>
      <div className="breaker_box">
      <h6 className='landing_page_confident__text'>Satisfy your cravings with delicious candy shipped right to your door. Whether you’re in the mood for sugar-free candy classics or bulk gummies, holiday assortments like Easter and Halloween candy, or old-time candy favorites like Necco Wafers and Gobstoppers, we have the sweets for you.</h6>
      <img className='landing_page_confident__image' src={candy_bowl} alt="" />
      </div>
      </section>
    </div>
  )
  }
export default LandingPage;
// <img className="carousel-pic" src="https://plus.unsplash.com/premium_photo-1675033559019-ca61c6e909df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60" alt="" />
