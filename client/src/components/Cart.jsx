import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import EmptyCart from '../assets/images/emptyCart.png';
import { CartContext } from '../contexts/CartContext';
import Footer from '../components/Footer.jsx'
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/cart.css';
import axios from 'axios';



const PAYPAL_API = process.env.REACT_APP_PAYPAL_API;


const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useContext(CartContext);

  const getSubTotal = () => {
    let subTotal = 0
    for (let i = 0; i < cartItems.length; i++) {
      subTotal += cartItems[i].totalCost;
    }
    return subTotal
  };
  const [errorMessage, setErrorMessage] = useState({})

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const candy = cartItems.find((item) => item._id === itemId);
    if (newQuantity > candy.candyStock - 1) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        [itemId]: `Cannot add more than ${candy.candyStock - 1} items for ${candy.candyName}`,
      }));
    } else {
      setErrorMessage((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[itemId];
        return newErrors;
      });
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  const updateCandyStock = async (candyId, quantity) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/candy/${candyId}/updateStock`, { quantity });
      console.log("Candy stock updated:", response.data);
    } catch (error) {
      console.error("Error updating candy stock:", error);
    }
  };
  
  



  return (
    <div className="body_cart">
      <Navbar />
      <form className='main_form_cart'>
        <div className="cart_items_card">
          {cartItems.map((candy) => (
            <div key={candy._id} className="each_candy__cart">
              <div className="each_candy_text__cart">
                <h6 className="candy__title__cart">
                  <Link className="cart_title_candy" to={`/one/candy/${candy._id}`}>{candy.candyName}</Link>
                </h6>
                <h6 className="candy__price__cart">Individual Total: ${candy.totalCost.toFixed(2)}</h6>
                <div className="quantity-control">
                  <button
                    className="quantity-button left_btn"
                    onClick={(event) => { event.preventDefault(); handleQuantityChange(candy._id, candy.quantity - 1) }}
                  >
                    -
                  </button>
                  <span className="quantity-display">{candy.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={(event) => { event.preventDefault(); handleQuantityChange(candy._id, candy.quantity + 1) }}
                  >
                    +
                  </button>
                  <button className="deleteFuncitonality" onClick={() => removeFromCart(candy._id, candy.quantity)} ><i class="fa-solid fa-trash-can trashcan"></i></button>
                </div>
                {errorMessage[candy._id] && (
                  <div className="error-message">{errorMessage[candy._id]}</div>
                )}
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
        {cartItems.length != 0 ?
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

            <div className="paypal_container">

              <PayPalScriptProvider className="PayaplSection"
                options={{ "client-id": PAYPAL_API }} >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: getSubTotal().toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    const name = details.payer.name;
                    const amount = details.purchase_units[0].amount;
                    const address = details.purchase_units[0].shipping.address;
                    const order_id = details.id;

                    {cartItems.map((aCandy) => (
                      <div key={aCandy._id}>
                      {console.log("THSIHISHIFHIUHIUHUIHUI",aCandy._id, aCandy.candyStock - aCandy.quantity)}
                              {updateCandyStock(aCandy._id,aCandy.candyStock - aCandy.quantity)}
                      </div>
                    ))}

                    
                    clearCart();

                    console.log(details)
                    alert("🍬🍭Payment successful!🍫🍡" + "\r" +
                      "Transaction completed by " + name.given_name + " " + name.surname + " for $" + amount.value + " " + amount.currency_code + "\r" +
                      "Order " + order_id + " will be shipped to: " + address.address_line_1 + ", " + address.admin_area_2 + ", " + address.admin_area_1 + ", " + address.postal_code + " " + address.country_code);
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
          :
          <div className="empty_container">
            <div className="wrapping_empty_cart">
              <img className="EmptyImage" src={EmptyCart} alt="" />
            </div>
            <span className="cart_empty_span"></span>
          </div>
        }
      </form>
      <Footer />
    </div>
  );
};

export default Cart;
