import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import PostCard from '../components/PostCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const ToNewPost = () =>{
    navigate("/new_post")
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    let response = await fetch("http://localhost:8000/api/posts/", {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    });
    let data = await response.json();
    if (response.status === 200) {
      setPosts(data);
    } else if (response.statusText === 'Unauthorized') {
      logoutUser();
    } else {
      alert("Something went wrong! Try logging in again");
    }
  };

  const updateLikeCount = (postId, newLikes) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: newLikes } : post
    ));
  };

  return (
    <div>
      <MyNavbar />
      <Button className='tw' onClick={ToNewPost}><FaPlus /></Button>
      <div className="product-grid card-group-homeitems">
        {posts.map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.image}
            description={post.description}
            likes={post.likes}
            onLikeUpdate={updateLikeCount}
            creator_id={post.user_id}
          />
        ))}
      </div>
      <br /><br /><br /><br />
      <MyFooter />
    </div>
  );
};

export default Posts;
