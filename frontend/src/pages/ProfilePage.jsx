import AuthContext from '../context/AuthContext';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; 
import { useContext, useState, useEffect } from 'react';


import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';

    const ProfilePage = () => {
        const { user } = useContext(AuthContext);
        const [userprofile, setUserProfile] = useState(null);
        let { authTokens, logoutUser } = useContext(AuthContext);

        const pastOrders = [
            { id: 1, date: '2024-09-20', total: '$150.00', status: 'Delivered' },
            { id: 2, date: '2024-08-15', total: '$80.00', status: 'Shipped' },
            { id: 3, date: '2024-07-10', total: '$200.00', status: 'Delivered' },
        ];
    
        const getUserProfile = async () => {
            let response = await fetch(`http://localhost:8000/api/userprofile/${user.user_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + String(authTokens.access)
              }
            });
            let data = await response.json();
        
            console.log("Response:", response);
            console.log("Data:", data);
        
            if (response.status === 200) {
              setUserProfile(data);
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
            profilePicture: userprofile ? userprofile.pfp : "default-image.png",
            name: user ? user.username : '',
            email: user ? user.email : '',
            phone: userprofile ? userprofile.phone : "+911 1234567890",
            city: userprofile ? userprofile.city : 'Jaipur',
            state: userprofile ? userprofile.state : 'Rajasthan',
            country: userprofile ? userprofile.country : 'Bharat'
        });
    
        
    
        const [formData, setFormData] = useState(profile);
    
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        useEffect(() => {
            if (userprofile) {
                setProfile({
                    profilePicture: userprofile.pfp || "default-image.png",
                    name: user.username,
                    email: user.email,
                    phone: userprofile.phone || "+911 1234567890",
                    city: userprofile.city || 'Jaipur',
                    state: userprofile.state || 'Rajasthan',
                    country: userprofile.country || 'Bharat'
                });
        
                setFormData({
                    name: user.username,
                    email: user.email,
                    phone: userprofile.phone || "+911 1234567890",
                    city: userprofile.city || 'Jaipur',
                    state: userprofile.state || 'Rajasthan',
                    country: userprofile.country || 'Bharat'
                });
            }
        }, [userprofile, user]);
        
        const handleSave = async (e) => {
            e.preventDefault();
        
            let response = await fetch(`http://localhost:8000/api/userprofile/${user.user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(formData)
            });
        
            if (response.status === 200) {
                // Fetch the updated profile
                await getUserProfile();
                alert('Profile updated successfully!');
            } else {
                alert('Error updating profile');
            }
        };

        return (
            <Container>
                <MyNavbar />
                <Row className="my-5">
                    <Col md={5}>
                        <Card>
                            <Card.Img variant="top" src={profile.profilePicture} alt="Profile" />
                            <Card.Body>
                                <Card.Title>{profile.name}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {profile.email}<br />
                                    <strong>Phone:</strong> {profile.phone}<br />
                                    <strong>Location:</strong> {profile.city}, {profile.state}, {profile.country}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
    
                    <Col md={7}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Edit Profile</Card.Title>
                                <Form onSubmit={handleSave}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formCountry">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="country"
                                            value={formData.country}
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
                </Row>
    
                {/* <Row className="mt-5">
                    <Col>
                        <h4 className='tw'>Past Orders</h4>
                        <ListGroup>
                            {pastOrders.map(order => (
                                <ListGroup.Item key={order.id}>
                                    <Row>
                                        <Col>Date: {order.date}</Col>
                                        <Col>Total: {order.total}</Col>
                                        <Col>Status: {order.status}</Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row> */}
    
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <MyFooter />
            </Container>
        );
    };
    
    export default ProfilePage;
    