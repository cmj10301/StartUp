'use client'

import { Container, Image, Nav, Navbar } from 'react-bootstrap';

export default function CustomNavbar() {
  return (
    <div className='Nav_style'>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">
            <Image
              src='/question.png'
              width={50}
              height={50}
              className='d-inline-block align-top'
              alt='Main icon'
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="history">History</Nav.Link>
            <Nav.Link href="ai">AI</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>

  );
}
