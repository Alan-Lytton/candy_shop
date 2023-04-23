import { AboutUs, EditCandy, OneCandy, UserForm, UserLogin, AllCandies, CreateCandy, LandingPage, AdminLanding } from './components/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Cart from './components/Cart'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/shop" element={<AllCandies/>}/>
          <Route path="/about/us" element={<AboutUs />}/>
          <Route path="/admin/login" element={<UserLogin />}/>
          <Route path="/one/candy/:id" element={<OneCandy />}/>
          <Route path="/admin/register" element={<UserForm/>}/>
          <Route path="/admin/dashboard" element={<AdminLanding/>}/>
          <Route path="/admin/candy/create" element={<CreateCandy/>}/>
          <Route path="/admin/candy/edit/:id" element={<EditCandy/>}/>
          <Route path="/candy/cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
