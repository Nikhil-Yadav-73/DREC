import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const NewPost = () => {
  const { user, authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State for the image file

  const NewPostF = async (e) => {
    e.preventDefault();
    
    // Prepare form data
    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image); // Append image if available

    let response = await fetch(`http://localhost:8000/api/new_post/${user.user_id}`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: formData
    });

    if (response.ok) {
      navigate("/posts");
    } else {
      const data = await response.json();
      alert('Posting failed: ' + (data.error || 'Unknown error'));
    }
  };

  return (
    <div>
      <MyNavbar/>
      <br />
      <h1 className='tw'>Make a new Post !</h1>
      <Form onSubmit={NewPostF}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Enter Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} // Set the image file
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <MyFooter />
    </div>
  );
};

export default NewPost;
