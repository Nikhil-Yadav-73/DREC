import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ProductCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>Libaas</Card.Title>
        
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>1400</ListGroup.Item>
        <ListGroup.Item>4.1 Stars, 7 reviews</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}
import 'bootstrap/dist/css/bootstrap.min.css';
export default ProductCard;