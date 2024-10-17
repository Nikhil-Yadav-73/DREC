import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './ItemDesc.css';
import MyFooter from '../components/MyFooter';
import MyNavbar from '../components/MyNavbar';
import AuthContext from '../context/AuthContext';


const ItemDesc = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState(null);
    const [recommendedItems, setRecommendedItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const itemId = Number(id);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/items/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        const fetchRecommendedItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/items/recommended/${id}`);
                console.log('Recommended items fetched:', response.data);
                setRecommendedItems(response.data);
            } catch (error) {
                console.error('Error fetching recommended items:', error);
            }
        };

        fetchItem();
        fetchRecommendedItems();
    }, [id]);


    if (!item) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/items/add_to_cart/${user.user_id}/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
    
            console.log('Item added to cart:', response.data);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    

    return (
        
<Container>
<MyNavbar />
            <Row className="my-5">
                <Col md={6}>
                    <img src={item.image} alt={item.name} className="img-fluid" />
                </Col>
                <Col md={6}>
                    <h2 className='tw'>{item.name}</h2>
                    <p className='tw'>{item.description}</p>
                    <p className='tw'><strong>Price:</strong> ${item.price}</p>
                    <p className='tw'><strong>Material:</strong> {item.material}</p>
                    <p className='tw'><strong>Category:</strong> {item.category.name}</p>
                    {item.category.name === 'kurti' && (
                        <Form.Group controlId="sizeSelect">
                            <Form.Label className='tw'>Select Size:</Form.Label>
                            <Form.Control
                            as="select"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            >
                            <option value="">Select size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="xlarge">X-Large</option>
                            <option value="xxlarge">XX-Large</option>
                            </Form.Control>
                        </Form.Group>
                    )}
                    <Button variant="primary" className="mt-3" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Col>
            </Row>
            <hr />
            <h3 className='tw'>Recommended Products</h3>
            <Row>
                {recommendedItems.map((recommendedItem) => (
                    <Col md={3} key={recommendedItem.id} className='rec-item-card'>
                        <ProductCard
                            key={recommendedItem.id}
                            id={recommendedItem.id}
                            name={recommendedItem.name}
                            price={recommendedItem.price}
                            image={recommendedItem.image}
                            rating={recommendedItem.rating}
                            reviews={recommendedItem.reviews}
                            link1={recommendedItem.link1}
                            link2={recommendedItem.link2}
                        />
                    </Col>
                ))}
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <MyFooter />
        </Container>
    );
};

export default ItemDesc;
