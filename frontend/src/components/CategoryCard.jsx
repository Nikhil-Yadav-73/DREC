import Card from 'react-bootstrap/Card';
import './MyFooter.css'
import { Link } from 'react-router-dom';

const color_list = [
    'bg-primary',
    'bg-secondary',
    'bg-success',
    'bg-danger',
    'bg-warning',
    'bg-info',
    'bg-light',
    'bg-dark',
  ];

  function CategoryCard({ id, category}) {
    const bgColorClass = color_list[id % color_list.length];

    const textColorClass = ['bg-light', 'bg-warning'].includes(bgColorClass)
      ? 'text-dark'
      : 'text-white';
  
    return (
      <Card className={`mb-2 px-1 catecard ${bgColorClass} ${textColorClass}`}>
        <Card.Body>
          <Link to={`/category/${category}`}>
            <Card.Title>{category}</Card.Title>
          </Link>
        </Card.Body>
      </Card>
    );
  }

export default CategoryCard;