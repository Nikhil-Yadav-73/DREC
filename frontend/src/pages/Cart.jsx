import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; 
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import CategoryCard from '../components/CategoryCard';

const Cart = () => {
    // Example cart state with item details
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Item 1', price: 100, quantity: 1, image: 'item1.jpg' },
        { id: 2, name: 'Item 2', price: 150, quantity: 2, image: 'item2.jpg' },
    ]);
    const [discountCode, setDiscountCode] = useState('');
    const [shippingCharge] = useState(50); // Fixed shipping charge

    // Handle quantity change
    const updateQuantity = (id, increment) => {
        setCartItems(cartItems.map(item => 
            item.id === id
                ? { ...item, quantity: item.quantity + increment >= 1 ? item.quantity + increment : 1 }
                : item
        ));
    };

    // Handle item deletion
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Calculate total price and item count
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalCartValue = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const grandTotal = totalCartValue + shippingCharge;

    // Apply discount code (assuming a flat $20 discount for demo)
    const applyDiscount = () => {
        if (discountCode === 'DISCOUNT20') {
            alert('Discount applied: $20');
        } else {
            alert('Invalid discount code');
        }
    };

    return (
        <Container className='mb-5'>
            <MyNavbar />
            <h2 className='tw'>Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <Row key={item.id} className="align-items-center my-3 tw">
                            <Col xs={2}>
                                <img src={item.image} alt={item.name} className="img-fluid tw" />
                            </Col>
                            <Col xs={4}>
                                <h5>{item.name}</h5>
                            </Col>
                            <Col xs={2}>
                                <Form>
                                    <div className="d-flex align-items-center tw">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            -
                                        </Button>
                                        <Form.Control
                                            type="text"
                                            value={item.quantity}
                                            readOnly
                                            className="text-center mx-2 tw"
                                            style={{ width: '50px' }}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                            <Col xs={2}>
                                <h5>${item.price * item.quantity}</h5>
                            </Col>
                            <Col xs={2}>
                                <Button
                                    variant="danger"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <FaTrash />
                                </Button>
                            </Col>
                        </Row>
                    ))}

                    <Row className="mt-5">
                        <Col md={{ span: 4, offset: 4 }} className='mt-5'>
                            <h4 className=' tw'>Cart Summary</h4>
                            <Form.Group className="d-flex justify-content-between tw">
                                <Form.Label className=' tw'>Total Items:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={totalItems}
                                    readOnly
                                    plaintext
                                    className="text-right tw"
                                />
                            </Form.Group>
                            <Form.Group className="d-flex justify-content-between tw">
                                <Form.Label className=' tw'>Total Cart Value:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={`$${totalCartValue}`}
                                    readOnly
                                    plaintext
                                    className="text-right tw"
                                />
                            </Form.Group>
                            <Form.Group className="d-flex justify-content-between tw">
                                <Form.Label className=' tw'>Shipping Charges:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={`$${shippingCharge}`}
                                    readOnly
                                    plaintext
                                    className="text-right"
                                />
                            </Form.Group>
                            <Form.Group className="d-flex justify-content-between tw">
                                <Form.Label className=' tw'>Discount Code:</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type="text"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="Enter discount code"
                                        className="mr-2"
                                    />
                                    <Button onClick={applyDiscount}>Apply</Button>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-flex justify-content-between tw">
                                <Form.Label className=' tw'>Grand Total:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={`$${grandTotal}`}
                                    readOnly
                                    plaintext
                                    className="text-right"
                                />
                            </Form.Group>
                            <Button variant="success" className="w-100">
                                Checkout
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <MyFooter />
        </Container>
    );
};

export default Cart;