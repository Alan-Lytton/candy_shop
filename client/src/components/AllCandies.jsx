import axios from "axios";
import "../css/allCandies.css";
import { Link } from "react-router-dom";
import { Navbar, Footer } from '../components/index'
import { CartContext } from "../contexts/CartContext";
import React, { useState, useEffect, useContext } from "react";



const PAGE_SIZE = 27;

const AllCandies = () => {
  const [candies, setCandies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [select, setSelect] = useState("");
  const [addedMessage, setAddedMessage] = useState({});
  const { addToCart, cartItems } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  // scroll on top auto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // scrool To Top button
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight / 2) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // end

  // add items to cart
  const handleAddToCart = (candy) => {
    addToCart(candy);
    setAddedMessage({ ...addedMessage, [candy._id]: true });
    setTimeout(() => {
      setAddedMessage({ ...addedMessage, [candy._id]: false });
    }, 1000);
  };

  // checks if item out of stock so cant add to cart after
  const isStockReached = (candy) => {
    if (!cartItems) return false;
    const candyInCart = cartItems.find((item) => item._id === candy._id);
    return candyInCart && candyInCart.quantity >= candy.candyStock - 1;
  };

  // if item on discount it shows
  const getUpdatedPrice = (candy) => {
    if (candy.onSale && candy.candyDiscount > 0) {
      return candy.candyPrice - candy.candyDiscount
    } else {
      return candy.candyPrice;
    }
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Pagination
  const totalPages = Math.ceil(
    candies.filter((candy) => !select || candy.candyCategory.includes(select)).length /
    PAGE_SIZE
  );
  const pages = Array.from(Array(totalPages).keys());

  // get list of filterd candy
  const filteredCandy = [...candies]
    .filter((candy) => !select || candy.candyCategory.includes(select))
    .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);


  // get candy and category from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/candy")
      .then((res) => {
        setCandies(res.data.allCandy);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch((err) => {
        // console.log(err);
      }
  )}, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category")
      .then((res) => {
        setCategories(res.data.categories);
        setTimeout(() => {
          setIsLoading(false);
        },300);
      })
      .catch((err) => {
        // console.log(err);
      }
  )}, []);

  if (isLoading) {
    return (
      <div id="loading-wrapper">
  <div id="loading-text">LOADING</div>
  <div id="loading-content"></div>
</div>
    );
  }

  return (
    
    <section id="all_candies_scroller" className='all_candies_container'>
    <div className="navbar_sticky">
    <Navbar />
    </div>
      <div className="all__candies__h1andfilter">
        <h1 className='main__title__allCandies'>Find your favorite candies </h1>
        <div className="select-container">
          <select
            className="selecttagall"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="">-- Filter By Category --</option>
            {categories.map((category, i) => (
              <option key={i} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredCandy.length > 0 ? (
        <div>
          <section className="cadies_container">
            {filteredCandy.map((candy, i) => (
              <div key={candy._id} className="each_candy">
                <Link to={`/one/candy/${candy._id}`}>
                  <img className='candy__image' src={candy.candyImage} alt="Placeholder" />
                </Link>
                <div className="each_candy_text">
                  <h6 className='candy__title'>
                    <Link to={`/one/candy/${candy._id}`}>{candy.candyName}</Link>
                  </h6>
                  {candy.onSale && candy.candyDiscount > 0 ? (
                    <div>
                      <h6 className='candy__price discounted'> <span className="on_sale_candy">${candy.candyPrice.toFixed(2)}</span> ${getUpdatedPrice(candy).toFixed(2)}</h6>
                    </div>
                  ) : (
                    <h6 className='candy__price'>${candy.candyPrice.toFixed(2)}</h6>
                  )}
                  <button
                    className="each__candy__addToCart"
                    onClick={() => handleAddToCart(candy)}
                    disabled={isStockReached(candy)}
                  >
                    {isStockReached(candy) ? "Out of Stock" : "Add to Cart!"}
                  </button>
                  <p className={`added-message${addedMessage[candy._id] ? ' show' : ''}`}>Added</p>
                </div>
              </div>

            ))}
            {showButton && (
              <button className="scroll-top-button" onClick={handleScrollTop}>
                <i className="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
            )}
          </section>
          <div className="pagination">
            {pages.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`page-number${pageNumber === currentPage ? ' active' : ''}`}
                // onClick={() => setCurrentPage(pageNumber)}
                onClick={() => changePage(pageNumber)}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className='main_error_empty'>Category Empty</p>
      )}
      <Footer />
    </section>
  );
}
export default AllCandies;
