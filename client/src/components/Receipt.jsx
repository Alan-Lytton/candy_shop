import React, { useEffect} from "react";
import '../css/receipt.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import CompanyLogo from '../assets/images/gplogoshop.jpg';
import useSound from "use-sound";
import cash from '../assets/sounds/cashSound.mp3';

const Receipt = (props) => {
    
    // scroll on top auto
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const [Ka_ching] = useSound(cash);
    const { details } = props;
    const name = details.payer.name;
    const amount = details.purchase_units[0].amount;
    const address = details.purchase_units[0].shipping.address;
    const order_id = details.id;
    const items = details.purchase_units[0].items;

    return (
            <div onLoad={Ka_ching()} className="wrapper">
                <Navbar/>
                {/* recepit container */}
                <div className="receipt_container">
                    <h1>RECEIPT</h1>
                    <hr className="spacer"/>
                    <div className="flex">
                        {/* left upper section */}
                        <div className="left">
                            <img className='logo_img' require src={CompanyLogo} alt="Candy Shop" />
                            {/* <h4><span>&nbsp;&nbsp;</span></h4> */}
                            <h5 className="push_left">Invoice#: {order_id}</h5>
                        </div>
                        {/* right upper section */}
                        <div className="right">
                            <h4 className="push_left title">Ship To:</h4>
                            <h5 className="push_left">{name.given_name} {name.surname}</h5>
                            <h5 className="push_left"> {address.address_line_1}, { address.admin_area_2}, {address.admin_area_1}, {address.postal_code} {address.country_code}</h5>
                            <h5 className="push_left"></h5>
                        </div>
                    </div>
                    {/* items table*/}
                    <div className="receipt_table">
                        <table className="r_table">
                            <thead>
                                <tr className="receipt_row">
                                    <th className="receipt_th_1">Item Desc.</th>
                                    <th className="receipt_th_2">Qty</th>
                                    <th className="receipt_th_3">Each</th>
                                    <th className="receipt_th_4">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {/* map through items */}
                            {
                                items.map((item, index) =>{
                                    return(
                                <tr key ={index}>
                                    <td className="receipt_td">{item.name}</td>
                                    <td className="receipt_td">{item.unit_amount.value}</td>
                                    <td className="receipt_td">{item.quantity}</td>
                                    <td className="receipt_td">{(item.unit_amount.value * item.quantity).toFixed(2)}</td>
                                </tr>
                            )})}
                            {/* end map */}
                                <tr>
                                    <td className="receipt_td"> <span>&nbsp;&nbsp;</span></td>
                                    <td className="receipt_td"> <span>&nbsp;&nbsp;</span></td>
                                    <td className="receipt_td"> <span>&nbsp;&nbsp;</span></td>
                                    <td className="receipt_td"> <span>&nbsp;&nbsp;</span></td>
                                </tr>
                                <tr>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td_ST">Sub Total:</td>
                                    <td className="receipt_td_ST">$ {amount.value} </td>
                                </tr>
                                <tr>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td">Shipping:</td>
                                    <td className="receipt_td">$0.00</td>
                                </tr>
                                <tr>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td">Total:</td>
                                    <td className="receipt_td"><h3>${amount.value}</h3> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* notes */}
                    <h3 className="push_left notes">Notes:</h3>
                    <p className="push_left">"YOU GET NOTHING"</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Willy Wonka</p>
                    <br />
                    {/* t&c's */}
                    <h3 className="push_left notes">Terms & Conditions</h3>
                    <p className="push_left">Seriously, we warned you! All payments are final, there will be no refunds.</p>
                    <hr className="spacer" />
                    <h2 className="thanks" >Thanks for shopping with The Candy Shop!</h2>
                </div>
                <div className="close_container">
                    <button className="close"><a className="link" href="/">Close Receipt</a></button>
                </div>
                <Footer/>
            </div>
    );
}

export default Receipt;