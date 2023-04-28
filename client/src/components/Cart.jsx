import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import EmptyCart from '../assets/images/emptyCart.png';
import { CartContext } from '../contexts/CartContext';
import { Navbar, Footer } from '../components/index';
import React, { useContext, useState, useEffect } from 'react';
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


  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  // get discount price
  const getUpdatedPrice = (candy) => {
    if (candy.onSale && candy.candyDiscount > 0) {
      return  Math.floor((candy.candyPrice * candy.candyDiscount)*100)/100
    } else {
      return Math.floor(candy.candyPrice*100)/100
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
  const updatedCartItems = cartItems.map(candy => ({ ...candy, totalCost:  Math.floor((getUpdatedPrice(candy) * candy.quantity)*100)/100 }));

  // get subtotal of all the candies in cart
  const getSubTotal = () => {
    let subTotal = 0
    for (let i = 0; i < cartItems.length; i++) {
      subTotal += updatedCartItems[i].totalCost;
    }
    return Math.floor(subTotal * 100)/ 100
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
  
  const updatePriceRounded = (candy) => (
    Math.floor(candy.totalCost*100)/100
  )

  // create json formatted list of items for PayPal transaction
  const items = cartItems.map((aCandy) => (
    {
        name: aCandy.candyName,
        unit_amount: {
          currency_code: "USD",
          value: updatePriceRounded(aCandy).toFixed(2)
          // value: Math.floor((aCandy.candyPrice - aCandy.candyDiscount) * 100)/100
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
                <h6 className="candy__price__cart">Individual Total: ${updatePriceRounded(candy).toFixed(2)}</h6>
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
            {updatedCartItems.map((candy) => (
                <div key={candy._id} className='mapped_checkout_cart'>
                  <h4 className='candy_mapped_chcekout'>{truncateCandyName(candy.candyName)}</h4>
                  <div className="seperator">
                    <h4 className='candy_mapped_chcekout'>${updatePriceRounded(candy).toFixed(2)}</h4>
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
                            // value: (Math.floor(getSubTotal() * 100)/100).toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: getSubTotal().toFixed(2)
                                    // value: (Math.floor(getSubTotal() * 100)/100).toFixed(2)
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
                    alert("🍬🍭Payment successful Test!🍫🍡" + "\r" +
                    "Transaction completed by " + name.given_name + " " + name.surname + " for $" + amount.value + " " + amount.currency_code + "\r" +
                    "Order " + order_id + " will be shipped to: " + address.address_line_1 + ", " + address.admin_area_2 + ", " + address.admin_area_1 + ", " + address.postal_code + " " + address.country_code);
                  }}
                />
              </PayPalScriptProvider>
              <h6 className="disclaimer">* We will take your money but you won't get anything! Not a production site. for test purposes only, mock site. fake site. do not buy. stop it. portfolio project</h6>
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
