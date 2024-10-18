import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom';
import SignupPage from './SignupPage';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const Signup = () => {
    navigate("/signup");
};

  return (
    <div>
        <form onSubmit={loginUser}>
            <p></p>
            <input type='text' name='username' placeholder='username' />
            <p></p>
            <input type='password' name='password' placeholder='password' />
            <p></p>
            <button type='submit'>Submit</button>
            <button onClick={Signup}>Signup Here</button>
        </form>
    </div>
  );
};

export default LoginPage