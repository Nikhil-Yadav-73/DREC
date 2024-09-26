import {React, useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import MyNavbar from './MyNavbar';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <MyNavbar/>
      {user && <p>Hello {user.username}</p>}
      <Link to="/">Home</Link>
      <span> </span>
      {user ? (<p onClick={logoutUser}>Logout</p>) : (<Link to="/login">Login</Link>)}
    </div>
  );
};
import 'bootstrap/dist/css/bootstrap.min.css';
export default Header