import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import footers from "../assets/img/footericon.png"
import UnderConstructionPopup from "./UnderConstructionPopup";

const FooterWrapper = styled.footer`
background-image: url(${footers});
  /* background: radial-gradient(circle at 20% 20%, #0f172a, #020617); */
  color: #cbd5f5;
  padding: 80px 20px 30px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const Grid = styled.div`
  display: grid;
  gap: 40px;

  @media (min-width: 768px) {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
  }
`;

const Title = styled.h4`
  color: white;
  margin-bottom: 15px;
  font-size: 1rem;
  letter-spacing: 1px;
`;

const Logo = styled.h2`
  color: white;
  margin-bottom: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 0.9rem;

  svg {
    color: #22d3ee;
    margin-top: 3px;
  }
`;

const Links = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 10px;

    a {
      text-decoration: none;
      color: #94a3b8;
      font-size: 0.9rem;
      transition: 0.3s;

      &:hover {
        color: #22d3ee;
      }
    }
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;

  a {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #E31837;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: 0.3s;

    &:hover {
      transform: translateY(-3px);
      background: #b21010;
    }
  }
`;

const Bottom = styled.div`
  border-top: 1px solid #1e293b;
  margin-top: 50px;
  padding-top: 20px;
  text-align: center;
  font-size: 0.85rem;
  color: #94a3b8;

  a {
    color: white;
    text-decoration: none;
    margin: 0 5px;

    &:hover {
      color: #22d3ee;
    }
  }

  span {
    color: #22d3ee;
  }
`;

export default function Footer2() {
  const [opennavbar, setOpennavbar] = useState(true);
  const [openpop, setopenpop] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const pathsToHideNavbar = [
    'assessment',
    'hrmanual',
    'crmanual',
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
    // "appraisal",
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
    "DoctorDashboard",
    "IPDappointments",
    "patient-admission",
    "my-training",
    // FMSROUTES
    "fmsdashboard",
    "tasks",
    "customerList",
    "ticketList",
    "sampledashboard",
    "samplestatus",
    "supervisordashboard",
    "/expense-list",
  ];

  useEffect(() => {
    const checkPath = () => {
      const currentPath = window.location.pathname;
      const shouldHideNavbar = pathsToHideNavbar.some(path => currentPath.includes(path));
      setOpennavbar(!shouldHideNavbar);
    };

    checkPath();

    const handlePopState = () => {
      checkPath();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {opennavbar && (
        <FooterWrapper>
          <Container>
            <Grid>
              {/* LEFT */}
              <div>
                <Title>CONTACT US</Title>

                <ContactItem>
                  <FiPhone /> +91 7259555003
                </ContactItem>

                <ContactItem>
                  <FiMail /> info@atomwalk.com
                </ContactItem>

                <ContactItem>
                  <FiMapPin />
                  Gopalan Millennium Towers, Whitefield, Bengaluru
                </ContactItem>

                <Socials>
                  <a href="https://x.com/Atomwalk_Tech"><FaXTwitter /></a>
                  <a href="https://www.facebook.com/profile.php?id=61572466203683"><FaFacebookF /></a>
                  <a href="https://www.instagram.com/atomwalktechnologies"><FaInstagram /></a>
                  <a href="https://www.youtube.com/@AtomwalkTechnologies"><FaYoutube /></a>
                  <a href="https://www.linkedin.com/company/atomwalk-technologies"><FaLinkedinIn /></a>
                </Socials>
              </div>

              {/* SERVICES */}
              <div>
                <Title>SERVICES</Title>
                <Links>
                  <li><a href="/crm.html">CRM</a></li>
                  <li><a href="/hrm.html">HRM</a></li>
                  <li><a href="/lms.html">Lab Management</a></li>
                  <li><a href="/Product.html">ERP</a></li>
                  <li><a href="#">Energy Management</a></li>
                </Links>
              </div>

              {/* QUICK LINKS */}
              <div>
                <Title>QUICK LINKS</Title>
                <Links>

                  <li><a href="/aboutUs.html">About Us</a></li>
                  <li>
                    <a href="/Product.html">Products</a>
                  </li>
                  <li><a href="/contactUs.html">Contact Us</a></li>

                  <li>
                    <a href="/pricing.html">Pricing</a>
                  </li>
                  <li><a href="/blog.html">Blog</a></li>
                  <li>
                    <a href="https://atomwalk.netlify.app/login">Atomwalk Folder</a>
                  </li>

                </Links>
              </div>

              {/* HELP */}
              <div>
                <Title>HELP</Title>
                <Links>
                  <li>
                    <a href="/manual.html">Manual</a>
                  </li>
                  <li>
                    <a href="/faq.html">FAQs</a>
                  </li>
                  <li>
                    <a href="/Careers.html">Career</a>
                  </li>
                  <li>
                    <a href="/news-events.html">News and Event</a>
                  </li>

                  <li><a href="/terms-and-conditions.html">Terms & Conditions</a></li>
                  <li><a href="/privacy-policy.html">Privacy Policy</a></li>
                </Links>
              </div>
            </Grid>

            {/* BOTTOM */}
            <Bottom>
              © 2026 Atomwalk. All Rights Reserved.
              Made with <span>♥</span> in India
            </Bottom>
          </Container>
        </FooterWrapper>
      )}

      <UnderConstructionPopup
        visible={openpop}
        setvisible={setopenpop}
      />
    </>
  );
}