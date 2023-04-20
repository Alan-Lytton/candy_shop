import React, { useState, useEffect } from 'react';
import "../css/landingPage.css";
import Navbar from './Navbar.jsx';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LandingPage = () => {
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 1000,


  };
  return (
    <div className="main-body">
      <div className='body'>
        <Navbar />
        <div className="all_item-container">
          <div className='containerLink'>
            <h1 className='title-link'> I'll take you to the candy shop.</h1>
            <h1 className='title-link'> One taste of what we got.</h1>
            <h1 className='title-link'> We'll have you spending all you got.</h1>
          </div>
          <div className="action-button">
            <button className="submit button">Shop Candies</button>
          </div>
        </div>
      </div>
      <section className="section-one">
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
        </div>
      </section>
      
    </div>
  )
}

export default LandingPage;
// <img className="carousel-pic" src="https://plus.unsplash.com/premium_photo-1675033559019-ca61c6e909df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60" alt="" />
