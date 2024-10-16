import AuthContext from '../context/AuthContext';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import ProductCard from './ProductCard';

function MyNavbar() {
  const { user } = useContext(AuthContext);
  let { authTokens, logoutUser } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [searchItems, setSearchItems] = useState();

  const handleSearch = async (e) => {
    e.preventDefault();
      let response = await fetch(`http://localhost:8000/api/items/search/?query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      });
      let data = await response.json();
      if (response.status === 200) {
        setSearchItems(data);
      } else if (response.statusText === 'Unauthorized') {
        logoutUser();
      } else {
        alert("Something went wrong! Try logging in again");
      }
  };

  return (
    <div>
      <Navbar expand="lg" className="drkx">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className='tw'>Govindam Sarees</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* <Nav.Link href="#" className='tw'>Home</Nav.Link> */}
            <NavDropdown title="Options" className='tw' id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3" >{user ? (<p onClick={logoutUser}>Logout</p>) : (<Link to="/login">Login</Link>)}</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
        </Form>
          
        </Navbar.Collapse>
        <Button className='mx-4' as={Link} to="/cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg>
        </Button>
        <Button  className='' as={Link} to="/profile">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
        </svg>
        </Button>
      </Container>
    </Navbar>

    { searchItems &&
      <div>
        <br></br>
        <h3 className='tw search-head'>Search results for '{query}'</h3>
        <div className="product-grid card-group-homeitems">
          {searchItems.map(homeItem => (
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
      </div>
    }

    </div>
  );
}

export default MyNavbar;