import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';
import CompanyLogo from '../assets/images/gplogoshop.jpg';

function openMenu() {
    document.body.classList += "menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}

const Navbar = () => {
    return (
        <nav className="treact__nav">
            <div className="row">
                <div className="logo__mask">
                    <img className='logo_img' require src={CompanyLogo} alt="" />
                </div>
                <ul className="nav__links">
                    <div className="dropdown">
                        <a href='/all/candies' className="dropbtn">Shop</a>
                        <div className="dropdown-content">
                            <a href="#">Best sellers</a>
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
                    <Link className='dropbtn' to="/about/us">About Us</Link>
                    </div>

                </ul>
                <div className="signup">
                    <li className="signup__primary"><a className="a__primary" href="/register"><i
                        className="fa-solid fa-cart-shopping second"></i></a></li>
                </div>
                <button className="btn__menu" onClick={openMenu}>
                    <i className="fas fa-bars"></i>
                </button>

                <div className="menu__backdrop">
                    <button className="btn__menu btn__menu--close" onClick={closeMenu}>
                        <i className="fas fa-times"></i>
                    </button>
                    <ul class="menu__links">

                    <li className="menu__list"><a className="menu__link" href="/register"><i
                    className="fa-solid fa-cart-shopping closedCart"></i></a></li>


                        <li class="menu__list"><a href="#" class="menu__link">Shop</a>
                        </li>
                        <li class="menu__list"><a href="/show/feed" class="menu__link" >Deals</a>
                        </li>
                        <li class="menu__list"><a href="/about/us" class="menu__link" >About Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
