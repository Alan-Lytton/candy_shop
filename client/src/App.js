import { AboutUs, EditCandy, OneCandy, UserForm, UserLogin, AllCandies, CreateCandy, LandingPage, AdminLanding, Deals, Cart } from './components/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/deals" element={<Deals />}/>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/candy/cart" element={<Cart/>}/>
          <Route path="/shop" element={<AllCandies/>}/>
          <Route path="/about/us" element={<AboutUs/>}/>
          <Route path="/admin/login" element={<UserLogin/>}/>
          <Route path="/one/candy/:id" element={<OneCandy/>}/>
          <Route path="/admin/register" element={<UserForm/>}/>
          <Route path="/admin/dashboard" element={<AdminLanding/>}/>
          <Route path="/admin/candy/create" element={<CreateCandy/>}/>
          <Route path="/admin/candy/edit/:id" element={<EditCandy/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
