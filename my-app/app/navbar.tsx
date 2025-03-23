'use client'

import { Nav } from 'react-bootstrap';

export default function CustomNavbar() {
  return (
    <div className='Nav_style'>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="history">History</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="ai">AI</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>

  );
}
