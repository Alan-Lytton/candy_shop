import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/allCandiesFilterd.css';

const Filtered = () => {
  const [candies, setCandies] = useState([]);
  const [filteredCandies, setFilterdCandies] = useState([]);
  const[category, setCategory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/candy")
      .then(res => setCandies(res.data.allCandy))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
    .get(`http://localhost:8000/api/category/${id}`)
    .then(res => setCategory(res.data.oneCategory))
    .catch(err => console.log(err));
  }, [candies]);


  useEffect(() => {
    let tempArr = [];
    candies.map((candy)=>{
      if (category.categoryName == candy.candyCategory){
        tempArr.push(candy)
      }
    })
    setFilterdCandies(tempArr)
  }, [category]);

  return (
    <div>
    {filteredCandies.map((candy, i) => (
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
    </div>
  )
}

export default Filtered
