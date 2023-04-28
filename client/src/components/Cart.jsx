import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import EmptyCart from '../assets/images/emptyCart.png';
import { CartContext } from '../contexts/CartContext';
import { Navbar, Footer } from '../components/index';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/cart.css';
import useSound from "use-sound";
import cash from '../assets/sounds/cashSound.mp3';

// get paypal API key
const PAYPAL_API = process.env.REACT_APP_PAYPAL_API;

const Cart = () => {
  const [cashSound] = useSound(cash);
  const [errorMessage, setErrorMessage] = useState({})
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useContext(CartContext);

  // get discount price
  const getUpdatedPrice = (candy) => {
    if (candy.onSale && candy.candyDiscount > 0) {
      return (candy.candyPrice - candy.candyDiscount).toFixed(2);
    } else {
      return candy.candyPrice.toFixed(2);
    }
  };

  // slice the words so they dont get to big for teh cart total
  const truncateCandyName = (candyName) => {
    const words = candyName.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return candyName;
  };

// map thru updated cart items the ones with discount as well
  const updatedCartItems = cartItems.map(candy => ({ ...candy, totalCost: parseFloat(getUpdatedPrice(candy)) * candy.quantity }));


  // get subtotal of all the candies in cart
  const getSubTotal = () => {
    let subTotal = 0
    for (let i = 0; i < cartItems.length; i++) {
      subTotal += updatedCartItems[i].totalCost;
    }
    return subTotal
  };


// add or decrease the amount of candy in cart
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

  // depending on the purchase decrease the quantity of items in stock
  const updateCandyStock = async (candyId, quantity) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/candy/${candyId}/updateStock`, { quantity });
      // console.log("Candy stock updated:", response.data);
    } catch (error) {
      // console.error("Error updating candy stock:", error);
    }
  };

  // create json formatted list of items for PayPal transaction
  const items = cartItems.map((aCandy) => (
    {
        name: aCandy.candyName,
        unit_amount: {
          currency_code: "USD",
          value: (aCandy.candyPrice - aCandy.candyDiscount).toFixed(2)
        },
        quantity: aCandy.quantity,
    }
    ));


    //Don't hate, navigate (used to redirect during the Paypal onApprove function)
    const navigate = useNavigate();

  return (
    <div className="body_cart">
      <Navbar />
      <form className='main_form_cart'>
        <div className="cart_items_card">
        {updatedCartItems.map((candy) => (
            <div key={candy._id} className="each_candy__cart">
              <div className="each_candy_text__cart">
                <h6 className="candy__title__cart">
                  <Link className="cart_title_candy" to={`/one/candy/${candy._id}`}>{truncateCandyName(candy.candyName)}</Link>
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
        {updatedCartItems.length != 0 ?
          <div className="checkout_main_section_cart">
            <h3 className='cart_summary_title'>Cart Summary</h3>
            <div className="scrollable_div">
            {updatedCartItems.map((aCandy) => (
                <div key={aCandy._id} className='mapped_checkout_cart'>
                  <h4 className='candy_mapped_chcekout'>{truncateCandyName(aCandy.candyName)}</h4>
                  <div className="seperator">
                    <h4 className='candy_mapped_chcekout'>${aCandy.totalCost.toFixed(2)}</h4>
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
                      purchase_units: [{
                            amount: {
                            currency_code: "USD",
                            value: getSubTotal().toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: getSubTotal().toFixed(2)
                                },
                            }
                        },
                        items: items 
                    }]})
                  }}
                  onApprove={async (data, actions) => {
                    
                    const details = await actions.order.capture();
                    const name = details.payer.name;
                    const amount = details.purchase_units[0].amount;
                    const address = details.purchase_units[0].shipping.address;
                    const order_id = details.id;
                    {
                      cartItems.map((aCandy) => (
                        <div key={aCandy._id}>
                          {/* {console.log("THSIHISHIFHIUHIUHUIHUI", aCandy._id, aCandy.candyStock - aCandy.quantity)} */}
                          {updateCandyStock(aCandy._id, aCandy.candyStock - aCandy.quantity)}
                        </div>
                      ))
                    }
                    clearCart();
                    navigate("/")
                    // console.log(details)
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
              <img className="EmptyImage" src={EmptyCart} alt="empty" />
            </div>
            <span className="cart_empty_span"></span>
          </div>
        }
      </form>
      <Footer className="Footerclass" />
    </div>
  );
};

export default Cart;