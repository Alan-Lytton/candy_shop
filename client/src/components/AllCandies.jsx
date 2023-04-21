import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Navbar from './Navbar';
import '../css/allCandies.css';

const AllCandies = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option3', label: 'Option 3' },
  ];
  const navigate = useNavigate();
  const [candies, setCandies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/candy")
      .then(res => setCandies(res.data.allCandy))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className='all_candies_container'>
      <Navbar />
      <div className="all__candies__h1andfilter">
        <h1 className='main__title__allCandies'>Find your favorite candies </h1>
        <div className="select-container">
          <Select options={options} placeholder="Categories" />
        </div>
      </div>
      <section className="cadies_container">
        {candies.map((candy, i) => (
          <div key={candy._id} className="each_candy">
            <a href={`/one/candy/${candy._id}`}>
              <img className='candy__image' src={candy.candyImage} alt="Placeholder" />
            </a>
            <div className="each_candy_text">
              <h6 className='candy__title'> <a href={`/one/candy/${candy._id}`}>{candy.candyName}</a></h6>
              <h6 className='candy__price'>${candy.candyPrice}</h6>
              <button className='each__candy__addToCart'>Add to Cart!</button>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}

export default AllCandies
