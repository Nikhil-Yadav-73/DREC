import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';

const EditPost = () => {
  const { post_id } = useParams();
  const { user, authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [image, setImage] = useState(null);

  const handlechange = async(e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
        setPost(prevState => ({
            ...prevState,
            [name]: value,
            image: files[0]
        }));
    } else {
        setPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
  };

  const handlesave = async(e) => {
    e.preventDefault();
        const formData = new FormData();
    
        const PostData = {
            title: post.title,
            description: post.description
        };
        formData.append('post', JSON.stringify(PostData));
    
        if (post.image) formData.append('image', post.image);
    
        let response = await fetch(`http://localhost:8000/api/edit_post/${post_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
            body: formData
        });

        if (response.status === 200) {
            let data = await response.json();
            alert("Post updated successfully!");
            navigate('/posts');
        } else {
            alert("Failed to update post!");
        }
  };

  const GetPost = async () => {
    let response = await fetch(`http://localhost:8000/api/edit_post/${post_id}`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
    });

    const data = await response.json();
    if (response.status === 200) {
        setPost(data);
    } else {
      alert('Fetching failed: ' + (data.error || 'Unknown error'));
    }
  };

  useEffect(() => {
    GetPost();
  }, [])
  

  return (
    <div>
      <MyNavbar/>
      <br />
      <div className='d-flex mx-auto mt-5'>
        <h1 className='d-flex mx-auto tw mt-5'>Edit Post</h1>
      </div>
      <Form onSubmit={handlesave} className='mx-auto' style={{width: '50%'}}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            name='title'
            placeholder="Enter Title" 
            value={post.title || ''}
            onChange={handlechange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            name = "description"
            placeholder="Enter Description"
            value={post.description || ''}
            onChange={handlechange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control 
            type="file" 
            name='image'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br></br>
      <br></br>
      <br></br>
      <MyFooter />
    </div>
  );
};

export default EditPost;
