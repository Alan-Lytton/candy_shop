import { AboutUs, Cart, EditCandy, OneCandy, UserForm, UserLogin, AllCandies, CreateCandy, LandingPage, AdminLanding, Deals } from './components/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Receipt from './components/Receipt';
// import PrivateRoute from './components/PrivateRoute';  

function App() {

  const [authorized, setAuthorized] = useState("");
  const [details, setDetails] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/deals" element={<Deals />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<AllCandies />} />
          <Route path="/about/us" element={<AboutUs />} />
          <Route path="/one/candy/:id" element={<OneCandy />} />
          <Route path="/candy/cart" element={<Cart setDetails={setDetails}/>} />
          <Route path="/candy/receipt" element={<Receipt details={details} setDetails={setDetails}/>} />
          <Route path="/admin/login" element={<UserLogin authorized={authorized} setAuthorized={setAuthorized} />} />
          <Route path="/admin/register" element={<UserForm authorized={authorized} setAuthorized={setAuthorized} />} />
          <Route path="/admin/dashboard" element={<AdminLanding  authorized={authorized} setAuthorized={setAuthorized}/>} />
          <Route path="/admin/candy/create" element={<CreateCandy  authorized={authorized} setAuthorized={setAuthorized}/>} />
          <Route path="/admin/candy/edit/:id" element={<EditCandy  authorized={authorized} setAuthorized={setAuthorized}/>} />
          {/* <Route path="/admin" element={<PrivateRoute />}>  */}
            {/* <Route index element={<AdminLanding authorized={authorized} setAuthorized={setAuthorized}/>} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;