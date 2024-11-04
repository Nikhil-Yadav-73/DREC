import React from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; 
import { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';

function EditProfile (){
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    let { authTokens, logoutUser } = useContext(AuthContext);
    const [userprofile, setUserProfile] = useState(null);
    const [userdata, setUserData] = useState(null);

    const getUserProfile = async () => {
        let response = await fetch(`http://localhost:8000/api/userprofile/${user.user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        });
        let data = await response.json();
    
        if (response.status === 200) {
            setUserProfile(data.profile); 
            setUserData(data.user_data);
        } else if (response.status === 401) {
          logoutUser();
        } else {
          alert("Something went wrong! Try logging in again");
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    const [profile, setProfile] = useState({
        profilePicture: userprofile ? userprofile.pfp :"default-image.png",
        name: userdata ? userdata.username :'empty',
        email: userdata ? userdata.email : 'default@gmail.com',
        phone: userprofile ? userprofile.phone : "+911 1234567890",
        city: userprofile ? userprofile.city : 'defaultcity',
        state: userprofile ? userprofile.state :'defaultstate',
        country: userprofile ? userprofile.country : 'defaultcountry'
    });

    return (
        <div>
            <MyNavbar />
            <div className='d-flex mx-auto'>
                <Col md={7} className='mx-auto mt-4 mb-2'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Edit Profile</Card.Title>
                                        <Form>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={profile.name}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={profile.email}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    value={profile.phone}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formCity">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="city"
                                                    value={profile.city}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formState">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="state"
                                                    value={profile.state}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formCountry">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="country"
                                                    value={profile.country}
                                                />
                                            </Form.Group>
                                            <Button variant="primary" className='mt-2' type="submit">
                                                Save
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
            </div>
            <MyFooter />
      </div>
    );

};

export default EditProfile