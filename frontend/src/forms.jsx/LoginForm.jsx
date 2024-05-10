import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

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
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.token); 


            fetch('http://127.0.0.1:5001/post/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                },
            })
            .then(response => response.json())
            .then(postsData => {
                // Find the user with the matching username
                const user = postsData.find(post => post.author.username === username);
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user.author)); // store the user data
                    setNotification('Login successful!');
                    setShowModal(true);
                    handleLogin(); 
                } else {
                    throw new Error('User not found');
                }
            })
        })
        .catch((error) => {
            console.error('Error:', error);
            setNotification(error.message);
            setShowModal(true);
        });
    };

    useEffect(() => {
        if (notification === 'Login successful!') {
            setTimeout(() => {
                navigate('/userposts'); 
            }, 2000);
        }
    }, [notification, navigate]);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            {showModal && (
                <div style={styles.modal}>
                    <p style={styles.notification}>{notification}</p>
                </div>
            )}
            <div style={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    style={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    style={styles.input}
                />
                <button onClick={login} style={styles.button}>Login</button>
                <Link to="/register" style={{ ...styles.button, backgroundColor: 'green', marginTop: '10px', display: 'block', textAlign: 'center' }}>
                    Register
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxSizing: 'border-box',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    },
    notification: {
        textAlign: 'center',
        color: '#28a745',
    },
};

export default LoginForm;