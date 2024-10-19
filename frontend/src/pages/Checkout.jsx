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
        <h1>Checkout</h1>
    );
};

export default Checkout;