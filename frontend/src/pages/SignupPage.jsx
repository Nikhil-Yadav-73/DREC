import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: name,  // Assuming you are using 'username' in your User model
        password: password,
      }),
    });

    if (response.ok) {
      alert('Signup successful!');
      navigate('/login');  // Redirect to login page after successful signup
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
          name="name"
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
    </Form>
  );
}

export default SignupPage;



{/* <br></br>
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
      <br></br> */}