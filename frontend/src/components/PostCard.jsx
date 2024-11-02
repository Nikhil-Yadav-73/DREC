import { useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { FaThumbsUp, FaTrash } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import "./ProductCard.css"

function PostCard({ id, title, creator_id, description, image, likes, onLikeUpdate, onDelete }) {
    const { user, authTokens, logoutUser } = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState(likes);

    console.log(title, user.user_id, " ", creator_id);

    const LikePost = async () => {
        let response = await fetch(`http://localhost:8000/api/like_post/${user.user_id}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        });
        let data = await response.json();
        if (response.status === 200) {
            setLikeCount(data.likes);
            onLikeUpdate(id, data.likes);
            console.log("Item liked");
        } else if (response.status === 401) {
            logoutUser();
        }
    };

    const deletePost = async() => {
        let response = await fetch(`http://localhost:8000/api/delete_post/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        });
        let data = await response.json();
        if (response.status === 200) {
            onDelete(id);
        } else if (response.status === 401) {
            logoutUser();
        }
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image || 'https://via.placeholder.com/150'} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{description}</ListGroup.Item>
                <ListGroup.Item>Likes: {likeCount}</ListGroup.Item>
                <Button onClick={LikePost}><FaThumbsUp /></Button>
                {(user.user_id === creator_id || user.user_id === 1) ? <button className='delete_btn' onClick={deletePost}><FaTrash /></button> : <br></br>}
            </ListGroup>
        </Card>
    );
}

export default PostCard;
