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
  }, []);

  useEffect(() => {
    getHomeItems();
  }, []);

  const getHomeItems = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/items/", {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    });
    let data = await response.json();
    if (response.status === 200) {
      setHomeItems(data);
    } else if (response.statusText === 'Unauthorized') {
      logoutUser();
    } else {
      alert("Something went wrong! Try logging in again");
    }
  };

  const getCategories = async () => {
    let response = await fetch("http://localhost:8000/api/categories/", {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    });
    let data = await response.json();
    if (response.status === 200) {
      setCategories(data);
    } else if (response.statusText === 'Unauthorized') {
      logoutUser();
    } else {
      alert("Something went wrong! Try logging in again");
    }
  };

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < notes.length) {
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
          {categories.slice(currentIndex, currentIndex + itemsPerPage).map(category => (
            <CategoryCard id={category.id} category={category.name}/>
          ))}
        </div>
        <button className="carousel-control-next" onClick={nextSlide}>
          &#8250;
        </button>
      </div>
      <div className="product-grid card-group-homeitems">
          {homeItems.map(homeItem => (
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <MyFooter />
    </div>
  );
};

export default HomePage;
