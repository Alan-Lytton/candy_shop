import React, { useEffect, useState} from "react";
import '../App.css';

const Receipt = () => {


    return (

            <div>
            {/* main content */}
                <button className="close"><a className="link" href="/">Close Receipt</a></button>
                <div className="receipt_container">
                    <h1>RECEIPT</h1>
                    <hr />
                    <div className="flex">
                        <div className="left">
                            <h2>Candy Shop</h2>
                            <h5 className="push_left">42 Wallaby Way</h5>
                            <h5 className="push_left">Sydney, Austrailia </h5>
                        </div>
                        <div className="right">
                            <h4 className="push_left">Ship To:</h4>
                            <p className="push_left">name.given_name</p>
                            <p className="push_left">customer address, state, zip</p>
                            <p className="push_left">customer country</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="left">
                            <h5 className="push_left">Invoice#: CS- 234234</h5>
                            <h5 className="push_left">Invoice Date: 4/30/23</h5>
                            <h4><span>&nbsp;&nbsp;</span></h4>
                        </div>
                        <div className="right">
                            {/* spacer */}
                        </div>
                    </div>
                    <div className="receipt_table">
                        <table className="r_table">
                            <thead>
                                <tr className="receipt_row">
                                    <th className="receipt_th">Item Desc.</th>
                                    <th className="receipt_th">Qty</th>
                                    <th className="receipt_th">Each</th>
                                    <th className="receipt_th">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="receipt_td">Almond Joy</td>
                                    <td className="receipt_td">1.49</td>
                                    <td className="receipt_td">3</td>
                                    <td className="receipt_td">4.47</td>
                                </tr>
                                <tr>
                                    <td className="receipt_td">Snickers King Size</td>
                                    <td className="receipt_td">2.99</td>
                                    <td className="receipt_td">3</td>
                                    <td className="receipt_td">8.97</td>
                                </tr>
                                <tr>
                                    <td className="receipt_td">Kit Kat Minis</td>
                                    <td className="receipt_td">5.99</td>
                                    <td className="receipt_td">3</td>
                                    <td className="receipt_td">17.97</td>
                                </tr>
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
                                    <td className="receipt_td_ST">$ 31.47</td>
                                </tr>
                                <tr>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td"></td>
                                    <td className="receipt_td">Total:</td>
                                    <td className="receipt_td">$ 31.47</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <br />
                    <br />
                    <h3 className="push_left">Notes:</h3>
                    <p className="push_left">"YOU GET NOTHING" - Willy Wonka</p>
                    <br />
                    <h3 className="push_left">Terms & Conditions</h3>
                    <p className="push_left">Seriously, we warned you. All payments are final, there will be no refunds.</p>
                    <br />
                    <hr />

                    <h2>Thanks for shopping with The Candy Shop!</h2>
                </div>
                    <button className="close"><a className="link" href="/">Close Receipt</a></button>
            </div>

    );
}

export default Receipt;