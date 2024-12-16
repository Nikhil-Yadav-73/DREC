import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? JSON.parse(storedTokens) : null;
    });

    const [user, setUser] = useState(() => {
        if (authTokens) return jwtDecode(authTokens.access);
        return null;
    });

    useEffect(() => {
        if (authTokens) {
            try {
                setUser(jwtDecode(authTokens.access));
            } catch (error) {
                console.error("Invalid token:", error);
                logoutUser();
            }
        }
    }, [authTokens]);

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            });
           
            if (response.ok) {
                const data = await response.json();
                const decodedUser = jwtDecode(data.access);
                setAuthTokens(data);
                setUser(decodedUser);
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate("/");
            } else {
                console.log(await response.json());
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };   

    const updateToken = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: authTokens?.refresh,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            setAuthTokens(data);
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, 240000);
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate("/login");
    };

    const ContextData = {
        loginUser,
        logoutUser,
        authTokens,
        user,
    };

    return (
        <AuthContext.Provider value={ContextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
