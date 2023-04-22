import React, {useContext} from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/cart.css';

const Cart = () => {
  const {cartItems} = useContext(CartContext);
  console.log(cartItems)


  return (
    <div>
      <Navbar />
      <form className='main_form_cart'>
        <div className="cart_items_card">
          {cartItems.map((candy, i) => (
            <div key={candy._id} className="each_candy__cart">
              <div className="each_candy_text__cart">
                <h6 className="candy__title__cart">
                  <Link to={`/one/candy/${candy._id}`}>{candy.candyName}</Link>
                </h6>
                <h6 className="candy__price__cart">Individual Total: ${candy.totalCost.toFixed(2)}</h6>
                <input className='number_input' type="number" value={candy.quantity} placeholder='Quantity' min={0} />
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

        </div>
      </form>
    </div>
  );
};

export default Cart;
