import React, { useState, useEffect,useContext } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import {CartContext} from "../contexts/CartContext";
// import Select from 'react-select';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/allCandies.css';
import addToCart from '../contexts/CartContext'

const AllCandies = (props) => {

  const [candies, setCandies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [select, setSelect] = useState([]);
  const [addedMessage, setAddedMessage] = useState({});
  const {addToCart} = useContext(CartContext);

  useEffect(() => {
    axios.get("http://localhost:8000/api/candy")
      .then(res => setCandies(res.data.allCandy))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/category")
      .then(res => setCategories(res.data.categories))
      .catch(err => console.log(err));
  }, []);

  const filteredCandy = [...candies].filter(candy =>
    candy.candyCategory.includes(select)
);

  const handleAddToCart = (candy) => {
    addToCart(candy);
    setAddedMessage({ ...addedMessage, [candy._id]: true });
    setTimeout(() => {
      setAddedMessage({ ...addedMessage, [candy._id]: false });
    }, 1000);
  };

  return (
    <section className='all_candies_container'>
      <Navbar />
      <div className="all__candies__h1andfilter">
        <h1 className='main__title__allCandies'>Find your favorite candies </h1>
        <div className="select-container">
          <select 
            className="selecttagall"
            onChange={(e) => setSelect(e.target.value)}
          >
          <option value="">-- Filter By Category --</option>
            {categories.map((category,i) => (
          <option value={category.categoryName}>{category.categoryName}</option>
            ))}
          </select>
        </div>
      </div>
      {filteredCandy.length > 0 ?
        <section className="cadies_container">
          {filteredCandy.map((candy, i) => (
            <div key={candy._id} className="each_candy">
              <Link to={`/one/candy/${candy._id}`}>
                <img className='candy__image' src={candy.candyImage} alt="Placeholder" />
              </Link>
              <div className="each_candy_text">
                <h6 className='candy__title'> <Link to={`/one/candy/${candy._id}`}>{candy.candyName}</Link></h6>
                <h6 className='candy__price'>${candy.candyPrice}</h6>
                <button className='each__candy__addToCart' onClick={() => handleAddToCart(candy)} >Add to Cart!</button>
                <p className={`added-message${addedMessage[candy._id] ? ' show' : ''}`}>Added</p>

              </div>
            </div>
          ))}
      </section>
          :
          <p  className='main_error_empty'>Category Empty</p>
        }
      <Footer/>
    </section>
      )
}


export default AllCandies;