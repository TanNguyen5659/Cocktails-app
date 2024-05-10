import React, { useState, useEffect } from 'react';

function UserDetailsPage() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/user/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      {userData.map(user => (
        <div key={user.id} style={styles.userContainer}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  userContainer: {
    marginBottom: '30px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
  },
};

export default UserDetailsPage;
