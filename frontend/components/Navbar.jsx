import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    navigate('/home');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
        MixologyHub
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home" style={{ textDecoration: 'none', color: 'lightblue' }}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about" style={{ textDecoration: 'none', color: 'lightgreen' }}>
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/forum" style={{ textDecoration: 'none', color: 'lightpink' }}>
            Forum
          </Nav.Link>
          <Nav.Link as={Link} to="/nearby" style={{ textDecoration: 'none', color: 'lightyellow' }}>
            Nearby
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/favorite" style={{ marginRight: '20px', color: 'lightgray' }}>
            Favorites
          </Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/userposts" style={{ marginRight: '20px', color: 'lightcoral' }}>
                Account
              </Nav.Link>
              <Nav.Link onClick={logoutAndRedirect} style={{ marginLeft: '10px', color: 'lightseagreen' }}>
                Log Out
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login" style={{ color: 'lightsalmon' }}>
              Log In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;