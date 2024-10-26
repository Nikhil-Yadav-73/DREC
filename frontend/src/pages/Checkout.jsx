import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './ItemDesc.css';
import MyFooter from '../components/MyFooter';
import MyNavbar from '../components/MyNavbar';
import AuthContext from '../context/AuthContext';

const Checkout = () => {
    return (
        <div className='tw'>
            <MyNavbar />
            <h1 className='tw'>Checkout</h1>
            <div className="purchase-card">
                <Container>
                    <h3>vsfdb</h3>
                    <br />
                    <h3>vsfdb</h3>
                    <br />
                    <h3>vsfdb</h3>
                    <hr />
                    <h3>vsfdb</h3>
                    <br />
                    <h3>vsfdb</h3>
                </Container>
            </div>
            <MyFooter />
        </div>
    );
};

export default Checkout;