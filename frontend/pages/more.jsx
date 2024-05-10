import React from 'react';
import { Nav } from 'react-bootstrap';

const ExploreMessi = () => {
  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/home">
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
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Explore More About Lionel Messi</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <img 
          src="https://pbs.twimg.com/media/F9t8tdjXEAAkleE?format=jpg&name=large" 
          alt="Lionel Messi" 
          style={{ width: '220px', height: 'auto' }}
        />
      </div>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Lionel Messi is an Argentine professional footballer widely regarded as one of the greatest players of all time. He plays as a forward for Paris Saint-Germain and the Argentina national team.
      </p>
      
      <h2 style={{ marginTop: '20px' }}>Early Life</h2>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Lionel Messi was born on June 24, 1987, in Rosario, Argentina. He was diagnosed with a growth hormone deficiency as a child, which led to FC Barcelona offering to pay for his medical treatment in exchange for him moving to Spain.
      </p>

      <h2 style={{ marginTop: '20px' }}>Career Highlights</h2>
      <ul style={{ marginLeft: '40px' }}>
        <li>Record 7-time Ballon d'Or winner</li>
        <li>Most goals in a calendar year: 91 goals in 2012</li>
        <li>Multiple-time UEFA Champions League winner with FC Barcelona</li>
        <li>Argentina's all-time leading goal scorer</li>
        <li>Winner of numerous La Liga titles with FC Barcelona</li>
      </ul>

      <h2 style={{ marginTop: '20px' }}>Personal Life</h2>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Messi is married to Antonela Roccuzzo, his childhood sweetheart. They have three children together: Thiago, Mateo, and Ciro.
      </p>

      <h2 style={{ marginTop: '20px' }}>Trivia</h2>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Messi's first contract with FC Barcelona was famously written on a napkin! He also holds a dual citizenship of Argentina and Spain.
      </p>
    </div>
  );
};

export default ExploreMessi;
