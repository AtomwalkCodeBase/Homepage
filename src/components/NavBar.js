// Updated NavBar Component
import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo2.png';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import WhatWeDoMenu from "./WhatWeDoMenu";


const Atomicon = styled.img`
  width: 400px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 140px;
  }
`;

const WhatWeDoWrapper = styled.div`
  position: relative;
`;

const StyledNavLink = styled(Nav.Link)`
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #e11d2e;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after,
  &.active::after {
    width: 80%;
  }

  &:hover {
    color: #e11d2e !important;
    transform: translateY(-2px);
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #e31837 0%, #e31837 100%);
  color: white;
  border: none;
  padding: 12px 28px;
  /* border-radius: 50px; */
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(225, 29, 46, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(225, 29, 46, 0.4);
  }

  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 0.9rem;
  }
`;

const BackButton = styled(LoginButton)`
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
  background: white;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding: 12px 0;
  min-width: 280px;
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};
  animation: slideDown 0.2s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    margin-right: -120px;
    min-width: 260px;
  }
`;

const LoginOption = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-weight: 500;
  color: #2c2c2c;
  transition: all 0.3s ease;
  gap: 12px;
  
  &:hover {
    background: linear-gradient(135deg, #e11d2e 0%, #b01726 100%);
    color: white;
    padding-left: 28px;
  }

  .emoji {
    font-size: 1.2rem;
  }
`;

const MobileMenuOverlay = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
`;

export const NavBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showWhatWeDo, setShowWhatWeDo] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [opennavbar, setOpennavbar] = useState(true);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const loginButtonRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const navbarRef = useRef(null);

  const pathsToHideNavbar = [
    'assessment', 'wishes', 'dashboard', 'employees', 'attendance-tracking',
    'leave-management', 'holidays', 'timesheet', 'shifts', 'appointees',
    'analytics', 'helpdesk', "requestdesk", "resolvedesk", "profile", "claims",
    "payslip", "invoices", "tickets", "shift-detail", "appointments",
    "appointmentlist", "doctordashboard", "OPDappointments", "projectmanagement",
    "project-report", "DoctorDashboard", "IPDappointments", "patient-admission",
    "my-training", "fmsdashboard", "tasks", "customerList", "ticketList",
    "sampledashboard", "supervisordashboard", "samplestatus", "/equipmentBooking",
    "/upload", "/inventoryUpdate", "/expense-list", "/channel-partners/list",
    "/finance/employee-verification",
  ];

  useEffect(() => {
    const checkPath = () => {
      const currentPath = window.location.pathname;
      const shouldHideNavbar = pathsToHideNavbar.some(path => currentPath.includes(path));
      setOpennavbar(!shouldHideNavbar);
    };
    checkPath();
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

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, [opennavbar]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginButtonRef.current && !loginButtonRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleERPLogin = () => {
    const queryParams = new URLSearchParams(location.search);
    const loggedInValue = queryParams.get("called_url");
    const crmurl = queryParams.get("base_url");
    const data = 'https://crm.atomwalk.com/atomwalk';
    const myofficeurl = 'http://myoffice.atomwalk.com/atomwalk';
    if (crmurl) {
      if (crmurl === data) window.location.href = 'https://crm.atomwalk.com/login/';
      else if (crmurl === myofficeurl) window.location.href = 'http://myoffice.atomwalk.com/login/';
      else window.location.href = 'https://atomwalk.com/login/';
    } else if (showLogin) {
      window.location.href = "https://www.atomwalk.com/login/";
    } else if (loggedInValue) {
      window.location.href = loggedInValue;
    } else {
      window.location.href = "https://www.atomwalk.com/login/";
    }
  };

  const handleHRMSLogin = () => window.location.href = "https://home.atomwalk.com/login/";
  const handlecustomerLogin = () => window.location.href = "https://home.atomwalk.com/customer/login.html";
  const handleLabUserLogin = () => window.location.href = "https://home.atomwalk.com/LabUser/login.html";

  const handleLoginClick = () => {
    if (window.innerWidth < 768) {
      setShowLoginDropdown(!showLoginDropdown);
    } else {
      setShowLoginDropdown(true);
    }
  };

  const handleWhatWeDoClick = () => {
    if (showWhatWeDo) {
      setShowWhatWeDo(false);
    } else {
      setShowWhatWeDo(true);
    }

  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loggedInValue = queryParams.get("is_logged_in");
    setShowLogin(loggedInValue !== 'WUVT');
  }, [location]);

  return (
    <div>
      {opennavbar && (
        <>
          <Navbar
            ref={navbarRef}
            expand="md"
            className={scrolled ? "scrolled" : "notscrolled"}
            style={{
              height: '100px',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              transition: 'all 0.3s ease',
              background: scrolled ? 'rgba(246, 242, 234, 0.98)' : '#ffffff',
              backdropFilter: scrolled ? 'blur(10px)' : 'none',
              boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            <Container>
              <Navbar.Brand href="/">
                <Atomicon src={logo} alt="Logo" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav">
                <span className="navbar-toggler-icon"></span>
              </Navbar.Toggle>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto" style={{ gap: '25px' }}>
                  <WhatWeDoWrapper ref={whatWeDoRef}>
                    <StyledNavLink
                      onMouseEnter={() => handleWhatWeDoClick()}
                      style={{ cursor: 'pointer' }}
                      className={showWhatWeDo ? 'active' : ''}
                    >
                      What We Do
                    </StyledNavLink>
                  </WhatWeDoWrapper>

                  <StyledNavLink
                    href="/Careers.html"
                    className={activeLink === 'Careers' ? 'active' : ''}
                    onClick={() => setActiveLink('Careers')}
                  >
                    Careers
                  </StyledNavLink>
                  <StyledNavLink
                    href="/aboutUs.html"
                    className={activeLink === 'about' ? 'active' : ''}
                    onClick={() => setActiveLink('about')}
                  >
                    About Us
                  </StyledNavLink>
                  <StyledNavLink
                    href="/contactUs.html"
                    className={activeLink === 'projects' ? 'active' : ''}
                    onClick={() => setActiveLink('projects')}
                  >
                    Contact Us
                  </StyledNavLink>
                </Nav>
                <span className="navbar-text">
                  {showLogin ? (
                    <LoginDropdownWrapper ref={loginButtonRef}>
                      <LoginButton
                        onClick={handleLoginClick}
                        onMouseEnter={() => window.innerWidth >= 768 && setShowLoginDropdown(true)}
                        onMouseLeave={() => window.innerWidth >= 768 && setShowLoginDropdown(false)}
                      >
                        <span>Login →</span>
                      </LoginButton>
                      <LoginDropdownMenu
                        show={showLoginDropdown}
                        onMouseEnter={() => window.innerWidth >= 768 && setShowLoginDropdown(true)}
                        onMouseLeave={() => window.innerWidth >= 768 && setShowLoginDropdown(false)}
                      >
                        <LoginOption onClick={handleERPLogin}>
                          <span className="emoji">💼</span>
                          Login to ERP
                        </LoginOption>
                        <LoginOption onClick={handleHRMSLogin}>
                          <span className="emoji">👤</span>
                          Login to Employee HRMS
                        </LoginOption>
                        <LoginOption onClick={handlecustomerLogin}>
                          <span className="emoji">🛃</span>
                          Login as Customer
                        </LoginOption>
                        <LoginOption onClick={handleLabUserLogin}>
                          <span className="emoji">🥼</span>
                          Login as Lab User
                        </LoginOption>
                      </LoginDropdownMenu>
                    </LoginDropdownWrapper>
                  ) : (
                    <BackButton onClick={() => window.history.back()}>
                      <span>← Back</span>
                    </BackButton>
                  )}
                </span>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <WhatWeDoMenu
            show={showWhatWeDo}
            onClose={() => setShowWhatWeDo(false)}
            navbarHeight={navbarHeight}
          />
          {showWhatWeDo && <MobileMenuOverlay onClick={() => setShowWhatWeDo(false)} />}
          <div style={{ height: `${navbarHeight}px` }} />
        </>
      )}
    </div>
  );
};

export default NavBar;