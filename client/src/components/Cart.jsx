import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CartContext } from '../contexts/CartContext';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/cart.css';
import Footer from '../components/Footer.jsx'

const PAYPAL_API = process.env.REACT_APP_PAYPAL_API;
console.log("THIS IS THE API KEY ", PAYPAL_API)
const Cart = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems)

  // const [emtyCart, setEmptyCart] = useState([])

  console.log("This is the cart item ", cartItems)

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

          <div className="paypal_container">
          
          <PayPalScriptProvider className="PayaplSection"
            options={{ "client-id": PAYPAL_API }} >
            <PayPalButtons className="checkout_btn"
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
                // On Approval function here
                const details = await actions.order.capture();
                const name = details.payer.name;
                const amount = details.purchase_units[0].amount;
                const address = details.purchase_units[0].shipping.address;
                const order_id = details.id;

                console.log(details)
                alert("🍬🍭Payment successful!🍫🍡" + "\r" +
                  "Transaction completed by " + name.given_name + " " + name.surname + " for $" + amount.value + " " + amount.currency_code + "\r" +
                  "Order " + order_id + " will be shipped to: " + address.address_line_1 + ", " + address.admin_area_2 + ", " + address.admin_area_1 + ", " + address.postal_code + " " + address.country_code);
              }}
            />
          </PayPalScriptProvider>
          </div>
        </div>
      </form>
<Footer/>
    </div>
  );
};

export default Cart;


