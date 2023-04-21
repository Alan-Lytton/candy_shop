import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/allCandiesFilterd.css';
import Navbar from '../components/Navbar.jsx'
import Select from 'react-select';
import { Link } from 'react-router-dom';


const Filtered = ({onAddToCart, cartCount}) => {
  const navigate = useNavigate();

  const addToCart = () => {
    onAddToCart();
  };

  const [candies, setCandies] = useState([]);
  const [filteredCandies, setFilterdCandies] = useState([]);
  const[category, setCategory] = useState([]);
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/category")
      .then(res => setCategories(res.data.categories))
      .catch(err => console.log(err));
  }, []);


  const options = categories.map((category) => ({
    value: category._id,
    label: category.categoryName,
  }));

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory) {
      navigate(`/filtered/candy/${selectedCategory.value}`);
    }
  };

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
    <div className="main_body_filterd">
     <Navbar cartCount={cartCount}/>
    <div className="all__candies__h1andfilter">
    <h1 className='title_main_body_filter'>Find all the {category.categoryName} here! </h1>
    <div className="select-container">
    <Select
      options={options}
      placeholder="Categories"
      className="selecttagall"
      onChange={handleCategoryChange}
    />
  </div>
    </div>
    <div className='cadies_container'>
    {filteredCandies.map((candy, i) => (
      <div key={candy._id} className="each_candy">
      <Link to={`/one/candy/${candy._id}`}>
        <img className='candy__image' src={candy.candyImage} alt="Placeholder" />
      </Link>
      <div className="each_candy_text">
        <h6 className='candy__title'> <Link to={`/one/candy/${candy._id}`}>{candy.candyName}</Link></h6>
        <h6 className='candy__price'>${candy.candyPrice}</h6>
        <button className='each__candy__addToCart' onClick={addToCart}>Add to Cart!</button>
      </div>
    </div>
    ))}
    </div>
    </div>
  )
}

export default Filtered
