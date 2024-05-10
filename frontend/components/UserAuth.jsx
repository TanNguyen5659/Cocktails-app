import React, { useState } from 'react';

function UserAuth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {
        fetch('http://127.0.0.1:5001/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const login = () => {
        fetch('http://127.0.0.1:5001/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const logout = () => {
        fetch('http://127.0.0.1:5001/logout', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default UserAuth;