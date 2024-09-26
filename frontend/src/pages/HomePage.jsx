import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import MyNavbar from '../components/MyNavbar';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';  // Import custom CSS

const HomePage = () => {
  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // Number of cards per slide

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/notes", {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    });
    let data = await response.json();
    if (response.status === 200) {
      setNotes(data);
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
          {notes.slice(currentIndex, currentIndex + itemsPerPage).map(note => (
            <ProductCard
              key={note.id}
              id={note.id}
              name={note.text}
              price={note.price}
              image={note.image}
              rating={note.rating}
              reviews={note.reviews}
              link1={note.link1}
              link2={note.link2}
            />
          ))}
        </div>
        <button className="carousel-control-next" onClick={nextSlide}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default HomePage;
