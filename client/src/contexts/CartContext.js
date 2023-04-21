import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, cartItems,  setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
