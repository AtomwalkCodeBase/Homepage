import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/Atom_walk_logo-removebg-preview.png';
import styled from 'styled-components';
const Atomicon =styled.img`
width: 180px;
`

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const navigatet=()=>{
    window.location.href="https://www.atomwalk.com/login/"
  }

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <Atomicon src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="mobile">
            <Nav className="ms-auto">
              <Nav.Link href="/Product.html" className={activeLink === 'Product' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Product')}>Products</Nav.Link>
              <Nav.Link href="/pricing.html" className={activeLink === 'Pricing' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Pricing')}>Pricing</Nav.Link>
              <Nav.Link href="/aboutUs.html" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('about')}>About Us</Nav.Link>
              <Nav.Link href="/contactUs.html" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Contact Us</Nav.Link>
            </Nav>
            <span className="navbar-text">

                <button onClick={navigatet} className="vvd"><span>Login</span></button>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}
