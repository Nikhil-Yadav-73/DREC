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
    const [cartItems, setCartItems] = useState([]);
    const [items, setItems] =useState([]);
    const [discountCode, setDiscountCode] = useState('');
    const [shippingCharge] = useState(50);
    const { user } = useContext(AuthContext);
    const [userprofile, setUserProfile] = useState(null);
    let { authTokens, logoutUser } = useContext(AuthContext);


    useEffect(() => {
        getCartItems();
    }, []);
    

    const getCartItems = async () => {
        let response = await fetch(`http://localhost:8000/api/cart/${user.user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        });
        let data = await response.json();
        console.log("Cart Items Response Data:", data);
    
        if (response.status === 200) {
          setCartItems(data);
        } else if (response.status === 401) {
          logoutUser();
        } else {
          alert("Something went wrong! Try logging in again");
        }
    };

    const updateQuantity = (id, increment) => {
        setCartItems(cartItems.map(item => 
            item.id === id
                ? { ...item, quantity: item.quantity + increment >= 1 ? item.quantity + increment : 1 }
                : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    let totalCartValue = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        console.log(item);
        
        const price = parseFloat(item.item.price);
        const quantity = parseInt(item.item.quantity);
        console.log(`price  ${price}, quantity ${quantity}`);

        if (!isNaN(price) && !isNaN(quantity)) {
            totalCartValue += price * quantity;
        } else {
            console.log(`Invalid values for item ${item.item.name}: Price - ${item.item.price}, Quantity - ${item.item.quantity}`);
        }
    }

    const grandTotal = totalCartValue + shippingCharge;

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
                    {cartItems.map(cartItem => (
    <Row key={cartItem.id} className="align-items-center my-3 tw">
        <Col xs={2}>
            <img src={cartItem.item.image} alt={cartItem.item.name} className="img-fluid tw" />
        </Col>
        <Col xs={4}>
            <h5>{cartItem.item.name}</h5>
        </Col>
        <Col xs={2}>
            <Form>
                <div className="d-flex align-items-center tw">
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(cartItem.id, -1)}
                    >
                        -
                    </Button>
                    <Form.Control
                        type="text"
                        value={cartItem.quantity}
                        readOnly
                        className="text-center mx-2"
                        style={{ width: '50px' }}
                    />
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(cartItem.id, 1)}
                    >
                        +
                    </Button>
                </div>
            </Form>
        </Col>
        <Col xs={2}>
            <h5>${cartItem.item.price * cartItem.item.quantity}</h5>
        </Col>
        <Col xs={2}>
            <Button
                variant="danger"
                onClick={() => removeItem(cartItem.id)}
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