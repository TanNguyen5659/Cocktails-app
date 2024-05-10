import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function BootstrapBody() {
  return (
    <Container className="d-flex justify-content-center" style={{ height: '50vh' }}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://media.newyorker.com/photos/64bc4330ef09d4a0e04cb249/master/w_2240,c_limit/Rosen-Messi-Miami.jpg" />
        <Card.Body>
          <Card.Title>Best Soccer Player</Card.Title>
          <Card.Text>
            Lionel Messi, a footballing genius, has captivated audiences globally with his unparalleled skill and ability to transcend the sport. His remarkable career boasts an array of records and achievements, cementing his status as a true legend of the game.
          </Card.Text>
          <Link to="/more">
            <Button variant="primary">Explore more</Button>
          </Link>
          <Link to="/messi-stats">
            <Button variant="secondary">Messi Stats</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BootstrapBody;