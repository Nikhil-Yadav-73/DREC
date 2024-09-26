import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  
  return (
    <div>
        <form onSubmit={loginUser}>
            <p></p>
            <input type='text' name='username' placeholder='username' />
            <p></p>
            <input type='password' name='password' placeholder='password' />
            <p></p>
            <button type='submit'>Submit</button>
        </form>
    </div>
  );
};

export default LoginPage