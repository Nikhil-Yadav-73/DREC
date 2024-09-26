import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  const isAuthenticated = true;

  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;