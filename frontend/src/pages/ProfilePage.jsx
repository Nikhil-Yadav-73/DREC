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
        const [userdata, setUserData] = useState(null);

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
            profilePicture: userprofile ? userprofile.pfp : "default-image.png",
            name: user ? user.username : 'empty',
            email: userdata ? userdata.email : 'default@gmail.com',
            phone: userprofile ? userprofile.phone : "+911 1234567890",
            city: userprofile ? userprofile.city : 'Jaipur',
            state: userprofile ? userprofile.state : 'Rajasthan',
            country: userprofile ? userprofile.country : 'Bharat'
        });
    

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
    