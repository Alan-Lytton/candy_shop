import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/allCandies.css';

const AllCandies = (props) => {

  const navigate = useNavigate();
  const [candies, setCandies] = useState([]);
  const [categories, setCategories] = useState([]);

  const { onAddToCart } = props;

  const options = categories.map((category) => ({
    value: category._id,
    label: category.categoryName,
  }));

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

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory) {
      navigate(`/filtered/candy/${selectedCategory.value}`);
    }
  };



  return (
    <section className='all_candies_container'>
      <Navbar />
      <div className="all__candies__h1andfilter">
        <h1 className='main__title__allCandies'>Find your favorite candies </h1>
        <div className="select-container">
          <Select
            options={options}
            placeholder="Categories"
            className="selecttagall"
            onChange={handleCategoryChange}
          />
        </div>
      </div>
      <section className="cadies_container">
        {candies.map((candy, i) => (
          <div key={candy._id} className="each_candy">
            <Link to={`/one/candy/${candy._id}`}>
              <img className='candy__image' src={candy.candyImage} alt="Placeholder" />
            </Link>
            <div className="each_candy_text">
              <h6 className='candy__title'> <Link to={`/one/candy/${candy._id}`}>{candy.candyName}</Link></h6>
              <h6 className='candy__price'>${candy.candyPrice}</h6>
              <button className='each__candy__addToCart' onClick={() => onAddToCart(candy)} >Add to Cart!</button>
            </div>
          </div>
        ))}
      </section>
      <Footer/>
    </section>
  )
}

export default AllCandies;
