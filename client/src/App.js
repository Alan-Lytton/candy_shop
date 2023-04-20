import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateCandy from './components/CreateCandy';
import AboutUs from './components/AboutUs';
import UserForm from "./components/UserForm";
import UserLogin from "./components/UserLogin";
import EditCandy from './components/EditCandy';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/about/us' element={<AboutUs/>}/>
          <Route path='/admin/register' element={<UserForm/>}/>
          <Route path='/admin/login' element={<UserLogin/>}/>
          <Route path='/admin/candy/create' element={<CreateCandy/>}/>
          <Route path='/admin/candy/edit/:id' element={<EditCandy/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
