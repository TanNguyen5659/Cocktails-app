import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function Footer() {
  const footerStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#343a40" 
  };

  return (
    <Navbar style={footerStyle} bg="dark" variant="dark" expand="lg" >
      <Container>
        <Navbar.Text className="m-auto" style={{ color: 'rgba(255,255,255,.5)' }}>
          © {new Date().getFullYear()} MixologyHub
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Footer;