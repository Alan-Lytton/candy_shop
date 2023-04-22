import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/cart.css';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems)

  const getSubTotal = () => {
    let subTotal = 0
    for (let i = 0; i < cartItems.length; i++) {
      subTotal += cartItems[i].totalCost;
    }
    return subTotal
  };


  return (
    <div>
      <Navbar />
      <form className='main_form_cart'>
        <div className="cart_items_card">
          {cartItems.map((candy) => (
            <div key={candy._id} className="each_candy__cart">
              <div className="each_candy_text__cart">
                <h6 className="candy__title__cart">
                  <Link to={`/one/candy/${candy._id}`}>{candy.candyName}</Link>
                </h6>
                <h6 className="candy__price__cart">Individual Total: ${candy.totalCost.toFixed(2)}</h6>
                <input className='number_input' type="number" value={candy.quantity} placeholder='Quantity' min={0} />
                <i class="fa-solid fa-trash-can trashcan"></i>
              </div>
              <Link to={`/one/candy/${candy._id}`}>
                <img
                  className="candy__image__cart"
                  src={candy.candyImage}
                  alt="Placeholder"
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="checkout_main_section_cart">
          <h3 className='cart_summary_title'>Cart Summary</h3>
          <div className="scrollable_div">
            {cartItems.map((aCandy) => (
              <div key={aCandy._id} className='mapped_checkout_cart'>
                <h4 className='candy_mapped_chcekout'>{aCandy.candyName}</h4>
                <div className="seperator">
                  <h4 className='candy_mapped_chcekout'>${aCandy.totalCost.toFixed(1)}</h4>
                  <h4 className='candy_mapped_chcekout'>{aCandy.quantity}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="sub_total__container">
            <h4 className='checkout_subtotal'> Subtotal</h4>
            <h4 className='checkout_subtotal'>${getSubTotal().toFixed(2)}</h4>
          </div>
          <button className='checkout_btn'>Checkout</button>
        </div>
      </form>
    </div>
  );
};

export default Cart;
