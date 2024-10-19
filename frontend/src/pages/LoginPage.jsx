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
        <form className='mx-5' onSubmit={loginUser}>
            <br></br>
            <input type='text' name='username' placeholder='username' />
            <p></p>
            <input type='password' name='password' placeholder='password' />
            <p></p>
            <button type='submit'>Submit</button>
            <button className='mx-5' onClick={Signup}>Signup Here</button>
            <br></br>
        </form>
    </div>
  );
};

export default LoginPage