import React, { useState,useHistory  } from 'react';
import axios from 'axios';

const Login = () => {
    const PORT = import.meta.env.VITE_PORT;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // const history = useHistory(); 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:${PORT}/api/auth/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            setMessage('Login successful!');
        } catch (err) {
            setMessage('Login failed. Please check your username and password.');
        }
        // history.push('/home');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
