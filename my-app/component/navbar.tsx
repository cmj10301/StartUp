'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';

export default function CustomNavbar() {
  const pathname = usePathname();
  return (
    <div className='nav_style'>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} href="/">
            <Image
              src='/question.png'
              width={50}
              height={50}
              className='d-inline-block align-top'
              alt='Main icon'
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/" className={pathname === '/' ? 'active' : ''}>Home</Nav.Link>
            <Nav.Link as={Link} href="history"  className={pathname === '/history' ? 'active' : ''}>History</Nav.Link>
            <Nav.Link as={Link} href="ai"  className={pathname === '/ai' ? 'active' : ''}>AI</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>

  );
}
