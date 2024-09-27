import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './ProductCard.css';
import { useState } from 'react';

function ProductCard({ id, name, price, image, rating, reviews, link1, link2 }) {

  // let [item, setItem] = useState([]);

  // const getItem = async () => {
  //   let response = await fetch(`http://127.0.0.1:8000/api/items/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': "application/json",
  //       'Authorization': 'Bearer ' + String(authTokens.access)
  //     }
  //   });
  //   let data = await response.json();
  //   if (response.status === 200) {
  //     setItem(data);
  //   } else if (response.statusText === 'Unauthorized') {
  //     logoutUser();
  //   } else {
  //     alert("Something went wrong! Try logging in again");
  //   }
  // };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image}  alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{price}</ListGroup.Item>
        <ListGroup.Item>{`${rating} Stars, ${reviews} reviews`}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href={link1}>Card Link</Card.Link>
        <Card.Link href={link2}>Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

import 'bootstrap/dist/css/bootstrap.min.css';
export default ProductCard;
