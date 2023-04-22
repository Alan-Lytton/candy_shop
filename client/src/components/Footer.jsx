import React from 'react'
import {Link} from 'react-router-dom'
import '../css/footer.css'
import CompanyLogo from '../assets/images/gplogoshop.jpg';


const Footer = () => {
    return (
        <div className="footer__container">
            {/* <div className='footer__content'> */}
                <div className='footer__links'>
                    <div><Link className='footer__links__color' to={'/shop'}>Shop</Link></div>
                    <div><Link className='footer__links__color' to={'#'}>Deals</Link></div>
                    <div><Link className="footer__links__color" to={"/about/us"}>About Us</Link></div>
                    <div><Link className='footer__links__color' to={'/candy/cart'}>Cart</Link></div>
                </div>
            {/* </div> */}
            <div className="footer__logo">
                <a href="/"><img className='logo_img' require src={CompanyLogo} alt="" /></a>
            </div>
            <div className='footer__bottom__info'>
                <p>© 2023 Coding Dojo Group Project</p>
            </div>
        </div>
    )
}

export default Footer