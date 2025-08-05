import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/Atom_walk_logo-removebg-preview.png';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import ProductMenu from './ProductMenu';

const Atomicon = styled.img`
  width: 180px;
`;

const ProductMenuWrapper = styled.div`
  position: relative; /* Necessary for positioning the dropdown menu */
`;

const LoginDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const LoginDropdownMenu = styled.div`
cursor: pointer;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px 0;
  min-width: 270px;
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};
  @media (max-width: 768px) {
  margin-right: -150px;
  }
`;

const LoginOption = styled.div`
  display: block;
  padding: 8px 16px;
  font-weight: 400;
  color: #333;
  /* text-decoration: none; */
  transition: background-color 0.2s;
  
  &:hover {
    background-color:rgb(209, 154, 24);
    font-weight: 600;
    color: #ffffff;
  }
`;

export const NavBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [opennavbar, setOpennavbar] = useState(true);
  const loginButtonRef = useRef(null);
  
  const pathsToHideNavbar = [
    'assessment',
    'wishes',
    'dashboard',
    'employees',
    'attendance-tracking',
    'leave-management',
    'holidays',
    'timesheet',
    'shifts',
    'appointees',
    'analytics',
    'helpdesk',
    "requestdesk",
    "resolvedesk",
    "profile",
    "claims",
    "payslip",
    "invoices",
    "tickets",
    "shift-detail",
    "appointments",
    "appointmentlist",
    "doctordashboard",
    "OPDappointments",
    "projectmanagement",
     "project-report",
     "my-training"
  ];
  
  useEffect(() => {
    const checkPath = () => {
      const currentPath = window.location.pathname;
      const shouldHideNavbar = pathsToHideNavbar.some(path => currentPath.includes(path));
      setOpennavbar(!shouldHideNavbar);
    };

    checkPath();

    // Listen to route changes via react-router
    // location changes when route changes
  }, [location]);
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

  // Handle clicks outside of the login dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginButtonRef.current && !loginButtonRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleERPLogin = () => {
    const queryParams = new URLSearchParams(location.search);
    const loggedInValue = queryParams.get("called_url");
    const crmurl=queryParams.get("base_url");
    const data='https://crm.atomwalk.com/atomwalk';
    if(crmurl){
      if(crmurl===data){
        window.location.href = 'https://crm.atomwalk.com/login/';
      }
      else{
        window.location.href = 'https://atomwalk.com/login/';
      };
    }
      else if (showLogin) {
      window.location.href = "https://www.atomwalk.com/login/";
      } else if(loggedInValue){ 
      window.location.href = loggedInValue;
    }
    else {
      window.location.href = "https://www.atomwalk.com/login/";
    };
  }
  const handleHRMSLogin = () => {
    window.location.href = "https://home.atomwalk.com/login/";
  };
 const handlecustomerLogin = () => {
    window.location.href = "https://home.atomwalk.com/customer/login.html";
  };
  const handleLoginClick = () => {
    // On mobile, toggle the dropdown instead of navigating directly
    if (window.innerWidth < 768) {
      setShowLoginDropdown(!showLoginDropdown);
    } else {
      // On desktop, show the dropdown on click
      setShowLoginDropdown(true);
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
      {opennavbar && <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <Atomicon src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="mobile">
            <Nav className="ms-auto">
              <Nav.Link href="/" className={activeLink === 'Home' ? 'active navbar-link' : 'navbar-link'} onClick={() => setActiveLink('Home')}>Home</Nav.Link>
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
              {showLogin ? (
                <LoginDropdownWrapper ref={loginButtonRef}>
                  <button 
                    className="vvd" 
                    onClick={handleLoginClick}
                    onMouseEnter={() => window.innerWidth >= 768 && setShowLoginDropdown(true)}
                    onMouseLeave={() => window.innerWidth >= 768 && setShowLoginDropdown(false)}
                  >
                    <span>Login</span>
                  </button>
                  <LoginDropdownMenu 
                    show={showLoginDropdown}
                    onMouseEnter={() => window.innerWidth >= 768 && setShowLoginDropdown(true)}
                    onMouseLeave={() => window.innerWidth >= 768 && setShowLoginDropdown(false)}
                  >
                    <LoginOption onClick={handleERPLogin}>
                      <span role="img" aria-label="ERP" style={{ marginRight: 8 }}>💼</span>
                      Login to ERP
                    </LoginOption>
                    <LoginOption onClick={handleHRMSLogin}>
                      <span role="img" aria-label="HRMS" style={{ marginRight: 8 }}>👤</span>
                      Login to Employee HRMS
                    </LoginOption>
                       <LoginOption onClick={handlecustomerLogin}>
                      <span role="img" aria-label="HRMS" style={{ marginRight: 8 }}>🛃</span>
                      Login as Customer
                    </LoginOption>
                  </LoginDropdownMenu>
                </LoginDropdownWrapper>
              ) : (
                <button onClick={() => window.history.back()} className="vvd">
                  <span>Back</span>
                </button>
              )}
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>}
    </div>
  );
};