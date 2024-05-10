import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const register = () => {
        const user = {
            username: username,
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        };

        fetch('http://127.0.0.1:5001/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (response.ok) {
                setNotification('Registration successful!');
                navigate('/home');
            } else {
                setNotification('Username or email already exists!');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            setNotification('An error occurred!');
        });
    };

    const goToHomePage = () => {
        navigate('/home');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register</h2>
            {notification && <p>{notification}</p>}
            {notification === 'Registration successful!' && <button onClick={goToHomePage}>Go to Home Page</button>}
            <div style={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    style={styles.input}
                />
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    style={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First Name"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Last Name"
                    style={styles.input}
                />
                <button onClick={register} style={styles.button}>Register</button>
                <Link to="/login" style={{ ...styles.button, backgroundColor: 'green', marginTop: '10px', display: 'block', textAlign: 'center' }}>
                    Login
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
};

export default RegisterPage;