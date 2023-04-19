import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateCandy from './components/CreateCandy';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/admin/candy/create' element={<CreateCandy/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
