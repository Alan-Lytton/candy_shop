import React, {createContext, useEffect, useState} from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(()=>{
    const cartCountFromStorage = localStorage.getItem('cartCount');
    return cartCountFromStorage ? JSON.parse(cartCountFromStorage) : 0;
  });
  const [cartItems, setCartItems] = useState(() => {
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    return cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];
  });
  const[addedMessage,setAddedMessage] = useState({})

  useEffect(() => {
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    const cartCountFromStorage = localStorage.getItem('cartCount');
    if (cartItemsFromStorage){
      setCartItems(JSON.parse(cartItemsFromStorage));
      setCartCount(JSON.parse(cartCountFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', JSON.stringify(cartCount));
  }, [cartItems]);

  const addToCart = (candy) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find((item) => item._id === candy._id);
      if (existingCartItem) {
        return prevCartItems.map((item) =>
            item._id === candy._id
                ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalCost: (item.quantity + 1) * item.candyPrice,
                }
                : item
        );
      } else {
        return [
          ...prevCartItems,
          {
            ...candy,
            quantity: 1,
            totalCost: candy.candyPrice,
          },
        ];
      }
    });
    setCartCount(cartCount+1);
    setAddedMessage({ ...addedMessage, [candy._id]: true });
    setTimeout(() => {
      setAddedMessage({ ...addedMessage, [candy._id]: false });
    }, 1000);
  };

  const clearCart = () => {
    setCartCount(0);
    setCartItems([]);
  };

  const removeFromCart = (itemId, quantity) => {
    const updatedCartItems = cartItems.filter((item) => item._id != itemId);
    setCartCount(cartCount - quantity);
    setCartItems(updatedCartItems);

  };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, cartItems, setCartItems, addToCart, removeFromCart, clearCart, addedMessage, setAddedMessage}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
