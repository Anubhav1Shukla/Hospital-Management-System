
import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        // You can use the username and password state variables to send the login request
        if(username === 'admin' && password === 'admin') {
            alert('Login successful');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                width: '200px',
                margin: '0 auto',
                padding: '20px',
            }}>

            <input
                type="text"
                style={{
                    marginBottom: '10px',
                
                padding: '10px',
                }}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                style={{
                    marginBottom: '10px',
                    padding: '10px',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </form>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
            
            }}>

            <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

