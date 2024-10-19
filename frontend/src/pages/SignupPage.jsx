import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem('authTokens');
    return storedTokens ? JSON.parse(storedTokens) : null;
  });
  const [user, setUser] = useState(() => {
    if (authTokens) {
        return jwtDecode(authTokens.access);
    }
    return null;
  });

  
  const loginUser = async (username, password) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const decodedUser = jwtDecode(data.access);
            setAuthTokens(data);
            setUser(decodedUser);
            localStorage.setItem('authTokens', JSON.stringify(data));
            console.log("sab ho gaya");
            navigate("/");
            console.log('home pe gaya tha');
        } else {
            console.log(await response.json());
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: name, 
        password: password,
      }),
    });

    if (response.ok) {
      loginUser(name, password);
    } else {
      const data = await response.json();
      alert('Signup failed: ' + (data.error || 'Unknown error'));
    }
  };

  return (
    <Form className="signup-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3 tw" controlId="formBasicEmail">
        <Form.Label className='mt-5'>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3 tw" controlId="formBasicText">
        <Form.Label className=''>Name</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </Form.Group>

      <Form.Group className="mb-3 tw" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="primary" className="mb-5" type="submit">
        Submit
      </Button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Form>
  );
}

export default SignupPage;
