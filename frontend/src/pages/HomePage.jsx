import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; 
import CategoryCard from '../components/CategoryCard';

const HomePage = () => {
  let [categories, setCategories] = useState([]);
  let [homeItems, setHomeItems] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    getCategories();
    getHomeItems();
  }, []);

  const getHomeItems = async () => {
    try {
      let response = await fetch("http://localhost:8000/api/items/", {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      });
      if (response.ok) {
        let data = await response.json();
        setHomeItems(Array.isArray(data.results) ? data.results : []);
      } else {
        handleFetchError(response);
      }
    } catch (error) {
      console.error("Error fetching home items:", error);
    }
  };
  

  const getCategories = async () => {
    try {
      let response = await fetch("http://localhost:8000/api/categories/", {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      });
      if (response.ok) {
        let data = await response.json();
        setCategories(data.results);
      } else {
        handleFetchError(response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFetchError = (response) => {
    if (response.statusText === 'Unauthorized') {
      logoutUser();
    } else {
      alert("Something went wrong! Try logging in again");
    }
  };

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < categories.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div>
      <MyNavbar />
      <div className="carousel-container">
        <button className="carousel-control-prev" onClick={prevSlide}>
          &#8249;
        </button>
        <div className="card-group">
          {Array.isArray(categories) && categories.slice(currentIndex, currentIndex + itemsPerPage).map(category => (
            <CategoryCard key={category.id} id={category.id} category={category.name} />
          ))}
        </div>
        <button className="carousel-control-next" onClick={nextSlide}>
          &#8250;
        </button>
      </div>
      <div className="product-grid card-group-homeitems">
        {Array.isArray(homeItems) && homeItems.map(homeItem => (
          <ProductCard
            key={homeItem.id}
            id={homeItem.id}
            name={homeItem.name}
            price={homeItem.price}
            image={homeItem.image}
            rating={homeItem.rating}
            reviews={homeItem.reviews}
            link1={homeItem.link1}
            link2={homeItem.link2}
          />
        ))}
      </div>
      <MyFooter />
    </div>
  );
};

export default HomePage;
