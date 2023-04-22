import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { AboutUs, Filtered, EditCandy, OneCandy, UserForm, UserLogin, AllCandies, CreateCandy, LandingPage, AdminLanding } from './components/index';
import { CartContext } from './contexts/CartContext';
import Cart from './components/Cart'
function App() {
  const { cartCount, setCartCount, cartItems, setCartItems } = useContext(CartContext);

  const handleAddToCart = (addedCandy)=> {
    setCartCount(cartCount + 1);
    setCartItems([...cartItems, addedCandy]);
  }


  return (

    <div id="App" className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route
              path="/shop"
              element={<AllCandies onAddToCart={handleAddToCart} />}
            />
            <Route path="/about/us" element={<AboutUs />} />
            <Route path="/admin/login" element={<UserLogin />} />
            <Route
              path="/one/candy/:id"
              element={<OneCandy cartCount={cartCount} onAddToCart={handleAddToCart} />}
            />
            <Route path="/admin/register" element={<UserForm />} />
            <Route path="/admin/dashboard" element={<AdminLanding />} />
            <Route path="/admin/candy/create" element={<CreateCandy />} />
            <Route
              path="/filtered/candy/:id"
              element={<Filtered cartCount={cartCount} onAddToCart={handleAddToCart} />}
            />
            <Route path="/admin/candy/edit/:id" element={<EditCandy />} />
            <Route path="/candy/cart" element={<Cart cartItems = {cartItems}/>}/>
          </Routes>
        </BrowserRouter>
        </div>

  );
}

export default App;
