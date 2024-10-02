import AuthContext from '../context/AuthContext';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../App.css';

function MyNavbar() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
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
            <Nav.Link href="#" className='tw'>Home</Nav.Link>
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
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;