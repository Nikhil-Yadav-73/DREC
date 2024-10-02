import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ id, name, price, image, rating, reviews }) {

  return (
    <Card style={{ width: '18rem' }}>
      <Link to={`/product/${id}`}>
        <Card.Img variant="top" src={image || 'https://via.placeholder.com/150'} alt={name} />
      </Link>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{price}</ListGroup.Item>
        
      </ListGroup>
      <Card.Body>
        <Link to={`/product/${id}`} className="btn btn-primary">
          View Product
        </Link>
      </Card.Body>
    </Card>
  );
}

import 'bootstrap/dist/css/bootstrap.min.css';
export default ProductCard;
