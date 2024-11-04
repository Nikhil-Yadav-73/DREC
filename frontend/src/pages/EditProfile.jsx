import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function EditProfile() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    let { authTokens, logoutUser } = useContext(AuthContext);
    const [userprofile, setUserProfile] = useState(null);
    const [userdata, setUserData] = useState(null);
    const [profile, setProfile] = useState({
        pfp: "default-image.png",
        name: 'empty',
        email: 'default@gmail.com',
        phone: "+911 1234567890",
        city: 'defaultcity',
        state: 'defaultstate',
        country: 'defaultcountry'
    });

    useEffect(() => {
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
                setProfile({
                    pfp: data.profile.pfp || "default-image.png",
                    name: data.user_data.username || 'empty',
                    email: data.user_data.email || 'default@gmail.com',
                    phone: data.profile.phone || "+911 1234567890",
                    city: data.profile.city || 'defaultcity',
                    state: data.profile.state || 'defaultstate',
                    country: data.profile.country || 'defaultcountry'
                });
            } else if (response.status === 401) {
                logoutUser();
            } else {
                alert("Something went wrong! Try logging in again");
            }
        };

        getUserProfile();
    }, [authTokens, logoutUser, user.user_id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'pfp') {
            setProfile(prevState => ({
                ...prevState,
                [name]: value,
                pfp: files[0]
            }));
        } else {
            setProfile(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        const profileData = {
            phone: profile.phone,
            city: profile.city,
            state: profile.state,
            country: profile.country
        };
        formData.append('profile', JSON.stringify(profileData));
    
        const userData = {
            username: profile.name,
            email: profile.email
        };
        formData.append('user_data', JSON.stringify(userData));
    
        if (profile.pfp) {
            formData.append('pfp', profile.pfp);
        }
    
        let response = await fetch(`http://localhost:8000/api/userprofile/${user.user_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
            body: formData
        });
    
        if (response.status === 200) {
            let data = await response.json();
            alert("Profile updated successfully!");
            navigate('/profile', { state: { updated: true } });
        } else {
            alert("Failed to update profile!");
        }
    };
    
    

    useEffect(() => {
        if (userprofile && userdata) {
            setProfile({
                pfp: userprofile.pfp || "default-image.png",
                name: userdata.username || 'empty',
                email: userdata.email || 'default@gmail.com',
                phone: userprofile.phone || "+911 1234567890",
                city: userprofile.city || 'defaultcity',
                state: userprofile.state || 'defaultstate',
                country: userprofile.country || 'defaultcountry'
            });
        }
    }, [userprofile, userdata]);
    

    return (
        <div>
            <MyNavbar />
            <div className='d-flex mx-auto'>
                <Col md={7} className='mx-auto mt-4 mb-2'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Edit Profile</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formFile">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        name="pfp"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={profile.city}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={profile.state}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        value={profile.country}
                                        onChange={handleChange}
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
}

export default EditProfile;