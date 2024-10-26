import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import ItemDesc from './pages/ItemDesc';
import Category from './pages/Category';
import Cart from './pages/Cart';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import Checkout from './pages/Checkout';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';

function App() {
  const isAuthenticated = true;

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ItemDesc />} />
              <Route path="/category/:name" element={<Category />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/new_post' element={< NewPost/>} />
            </Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;