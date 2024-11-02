import React, { PureComponent } from 'react'
import "./HomePage.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';

const Category = () => {
    const { name } = useParams();
    const [items, setItems] = useState(null);

    console.log(name);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/categories/${name}`);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchItems();
    }, [name]);

    

    if (!items) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <MyNavbar />
            <h3 className='search-head mt-4 pt-4'>{name}</h3>
            <div className="product-grid card-group-homeitems my-5">
                {items.map(item => (
                <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    rating={item.rating}
                    reviews={item.reviews}
                    link1={item.link1}
                    link2={item.link2}
                />
                ))}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <MyFooter />
        </div>
    )
}

export default Category;