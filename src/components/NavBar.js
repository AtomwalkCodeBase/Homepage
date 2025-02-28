import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/Atom_walk_logo-removebg-preview.png';
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import ProductMenu from './ProductMenu'; // Import the ProductMenu component

const Atomicon = styled.img`
  width: 180px;
`;

const ProductMenuWrapper = styled.div`
  position: relative; /* Necessary for positioning the dropdown menu */
`;

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const[opennavbar,setOpennavbar]=useState(true);
useEffect(()=>{
  if(location.pathname.includes('assessment')){
    setOpennavbar(false);
  }
  else{
    setOpennavbar(true);
  }
},[location.pathname])
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigatet = () => {
    const queryParams = new URLSearchParams(location.search);
    const loggedInValue = queryParams.get("called_url");
    const crmurl=queryParams.get("base_url");
    const data='https://crm.atomwalk.com/atomwalk';
    if(crmurl){
      if(crmurl==data){
        window.location.href = 'https://crm.atomwalk.com/login/';
      }
      else{
        window.location.href = 'https://atomwalk.com/login/';
      }
    }
   else if (showLogin) {
      window.location.href = "https://www.atomwalk.com/login/";
    } else if(loggedInValue){ 
      window.location.href = loggedInValue;
    }
    else {
      window.location.href = "https://www.atomwalk.com/login/";
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loggedInValue = queryParams.get("is_logged_in");
   if (loggedInValue === 'WUVT') {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [location]);

  return (
    <div>
     {opennavbar&&<Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand onClick={navigatet}>
          <Atomicon src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="mobile">
          <Nav className="ms-auto">
            <ProductMenuWrapper
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => setShowProductMenu(false)}
            >
              <Nav.Link
                href="/Product.html"
                className={activeLink === 'Product' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => setActiveLink('Product')}
              >
                Products
              </Nav.Link>
              <ProductMenu show={showProductMenu} />
            </ProductMenuWrapper>
            <Nav.Link href="/pricing.html" className={activeLink === 'Pricing' ? 'active navbar-link' : 'navbar-link'} onClick={() => setActiveLink('Pricing')}>Pricing</Nav.Link>
            <Nav.Link href="/aboutUs.html" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick={() => setActiveLink('about')}>About Us</Nav.Link>
            <Nav.Link href="/contactUs.html" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => setActiveLink('projects')}>Contact Us</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <button onClick={navigatet} className="vvd">{showLogin ? <span>Login</span> : <span>Back</span>}</button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>}
    </div>
  );
};
