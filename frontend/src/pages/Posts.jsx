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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const ToNewPost = () => {
        navigate("/new_post");
    };

    useEffect(() => {
        getPosts(currentPage);
    }, [currentPage]);

    const getPosts = async (page = 1) => {
        try {
            let response = await fetch(`http://localhost:8000/api/posts/?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            });

            let data = await response.json();
            console.log("Full API response:", data);

            if (response.ok) {
                // The data should now contain 'count' and 'results'
                if (data.results && Array.isArray(data.results)) {
                    setPosts(data.results);
                    console.log("Posts set:", data.results);
                    setTotalPages(Math.ceil(data.count / 12)); // Update totalPages based on count
                } else {
                    console.error("Expected data to have 'results' as an array, but got:", data);
                    setPosts([]);
                    setTotalPages(1); // Reset totalPages if data is invalid
                }
            } else {
                if (response.status === 401) {
                    logoutUser();
                } else {
                    alert("Something went wrong! Try logging in again");
                }
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
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
            <div className='tw text-center my-2 mb-5'>
                <h2>Posts</h2>
                <Button className='tw' onClick={ToNewPost}><FaPlus /> New post</Button>
            </div>
            <div className="product-grid card-group-homeitems">
                {posts.length > 0 ? (
                    posts.map(post => (
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
                    ))
                ) : (
                    <p className='tw'>No posts available</p>
                )}
            </div>

            <div className="pagination-controls text-center my-4 tw">
                <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                </Button>
                <span className="mx-2 tw">Page {currentPage} of {totalPages}</span>
                <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                </Button>
            </div>
              
            <MyFooter />
        </div>
    );
};

export default Posts;
