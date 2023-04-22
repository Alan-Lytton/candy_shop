import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { AboutUs, Filtered, EditCandy, OneCandy, UserForm, UserLogin, AllCandies, CreateCandy, LandingPage, AdminLanding } from './components/index';
import { CartContext } from './contexts/CartContext';
import Cart from './components/Cart'
function App() {
  const { cartCount, setCartCount, cartItems, setCartItems } = useContext(CartContext);

  const handleDuplicates = (candy) => {
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
    setCartCount((prevCartCount) => prevCartCount + 1);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/shop"
            element={<AllCandies onAddToCart={handleDuplicates} />}
          />
          <Route path="/about/us" element={<AboutUs />} />
          <Route path="/admin/login" element={<UserLogin />} />
          <Route
            path="/one/candy/:id"
            element={<OneCandy cartCount={cartCount} onAddToCart={handleDuplicates} />}
          />
          <Route path="/admin/register" element={<UserForm />} />
          <Route path="/admin/dashboard" element={<AdminLanding />} />
          <Route path="/admin/candy/create" element={<CreateCandy />} />
          <Route
            path="/filtered/candy/:id"
            element={<Filtered cartCount={cartCount} onAddToCart={handleDuplicates} />}
          />
          <Route path="/admin/candy/edit/:id" element={<EditCandy />} />
          <Route path="/candy/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
