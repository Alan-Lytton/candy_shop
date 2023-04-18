import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
    return (
        <nav className="treact__nav">
        <div className="row">
            <div className="logo__mask">
                <h1>Candy Shop Image</h1>
            </div>
            <ul className="nav__links">
                <div className="dropdown">
                    <a className="dropbtn">Shop</a>
                    <div className="dropdown-content">
                        <a  href="#">Best sellers</a>
                        <a href="#">Sweet</a>
                        <a href="#">Sour</a>
                        <a href="#">Spicy</a>
                        <a href="#">Chocolate</a>
                        <a href="#">Regional</a>
                    </div>
                </div>
                <div className="dropdown">
                    <a className="dropbtn">Deals</a>
                </div>
                <div className="dropdown">
                    <a className="dropbtn">About Us</a>
                </div>

                <div className="signup">
                    <li className="signup__primary"><a className="a__primary" href="/register"><i
                                className="fa-solid fa-cart-shopping"></i></a></li>
                </div>
            </ul>

            <button className="btn__menu" onclick="openMenu()">
                <i className="fas fa-bars"></i>
            </button>
            <div className="menu__backdrop">
                <button className="btn__menu btn__menu--close" onclick="closeMenu()">
                    <i className="fas fa-times"></i>
                </button>

                <ul className="menu__links">
                    <li className="menu__list"><a href="#" className="menu__link" onclick="closeMenu()">About</a></li>
                    <li className="menu__list"><a href="#" className="menu__link" onclick="closeMenu()">Blog</a></li>
                    <li className="menu__list"><a href="#" className="menu__link" onclick="closeMenu()">Pricing</a></li>
                    <li className="menu__list"><a href="#" className="menu__link-primary" onclick="closeMenu()"><i
                                className="fa-solid fa-cart-shopping"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    );
};

export default Navbar;
