import '../css/navbar.css';
import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext'
import CompanyLogo from '../assets/images/gplogoshop.jpg';

const Navbar = () => {
    const { cartCount } = useContext(CartContext);
    const [isDarkMode, setIsDarkMode] = useState(false);

    function openMenu() {
        // navbar responsive burger menu
        document.body.classList += "menu--open"
    }
    function closeMenu() {
        document.body.classList.remove('menu--open')
    }

    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className="treact__nav">
            <div className="row">
                <div className="logo__mask">
                    <Link to={"/"}> <img className='logo_img' require src={CompanyLogo} alt="" /></Link>
                </div>
                <ul className="nav__links">

                    <Link to={'/shop'} className="dropbtn">Shop</Link>
                    <Link className="dropbtn" to={"/deals"}>Deals</Link>
                    <Link className='dropbtn' to={"/about/us"}>About Us</Link>
                </ul>
                <div className="signup">
                    <li className="signup__primary" style={{ position: 'relative' }}>
                        <Link className="a__primary" to={"/candy/cart"}>
                            <i className="fa-solid fa-cart-shopping second"></i>
                        </Link>
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </li>
                </div>

                <button className="btn__menu" onClick={openMenu}>
                    <i className="fas fa-bars"></i>
                </button>
                <div className="menu__backdrop">
                    <button className="btn__menu btn__menu--close" onClick={closeMenu}>
                        <i className="fas fa-times"></i>
                    </button>
                    <ul class="menu__links">
                        <li className="menu__list"><Link className="menu__link" to={"/candy/cart"}><i
                            className="fa-solid fa-cart-shopping closedCart"></i></Link>
                            {cartCount > 0 && <span className="new_cart_count">{cartCount}</span>}
                        </li>
                        <li class="menu__list"><Link to={"/shop"} class="menu__link">Shop</Link>
                        </li>
                        <li class="menu__list"><Link to={"/deals"} class="menu__link" >Deals</Link>
                        </li>
                        <li class="menu__list"><Link to={"/about/us"} class="menu__link" >About Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
