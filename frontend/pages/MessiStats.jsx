import React from 'react';
import { Card, Nav } from 'react-bootstrap';

const MessiStats = () => {
    return (
        <div>
            <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/more">More</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/messi-stats">Messi Stats</Nav.Link>
                </Nav.Item>
            </Nav>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Lionel Messi Career Statistics</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">As of 2022</Card.Subtitle>
                    <Card.Text>
                        <ul>
                            <li>Club Appearances: 778</li>
                            <li>Club Goals: 672</li>
                            <li>International Appearances: 151</li>
                            <li>International Goals: 79</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};
export default MessiStats;;
