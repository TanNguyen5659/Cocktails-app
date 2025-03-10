import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; 

function Nav1() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Messi's career</Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link> 
            <Nav.Link as={Link} to="/more">More</Nav.Link> 
            <Nav.Link as={Link} to="/messi-stats">Messi Stats</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Nav1;