import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './ProductCard.css';

function ProductCard({ id, name, price, image, rating, reviews, link1, link2 }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} alt={name} />
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
