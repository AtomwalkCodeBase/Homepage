import React, { useEffect, useState } from 'react'
import { Skills } from './Skills'
import Features from './Features'
import { Contact } from './Contact'
import Testimonial from './Testimonial'
import ProductDemoModal from './ProductDemoModal'
import Success from './SuccessBanner'
import CustomerLogos from './CustomerLogos'
import HeroSection from './HeroSection'
import Askme from './loginpage/Askme'
import PatentAndPublications from './PatentAndPublications'
import { Helmet } from 'react-helmet-async';
const HomePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showsuccess, setShowsuccess] = useState(false);
  const [openslide, setOpenslide] = useState(false);
  const token = localStorage.getItem('datacheck');
  const openModal = () => {
    setModalIsOpen(true);
  };
  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        openModal()
      }, 200000);
    }

  }, [])
  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    if (showsuccess) {
      setTimeout(() => {
        setShowsuccess(false);
      }, 3000);
    }
  }, [showsuccess])
  return (
    <div>
      <Helmet>
        <title>AI-Driven Cloud ERP Software | Atomwalk Technologies</title>
        <meta name="description" content="inventory, sales & purchase, HR management, lab management, campaign tracking, and financial accounting." />
        <meta name="keywords" content="Atomwalk ERP, Atomwalk software, Atomwalk solutions, Atomwalk platform" />
        <link rel="canonical" href="https://atomwalk.com/" />
      </Helmet>
      {showsuccess && <Success message="We have successfully recorded your information."></Success>}
      <HeroSection />
      <Skills></Skills>
      <Features></Features>
      <PatentAndPublications pageType="HOME_PAGE" />
      <Testimonial></Testimonial>
      <CustomerLogos />
      <Contact setShowsuccess={setShowsuccess}></Contact>
      <ProductDemoModal isOpen={modalIsOpen} onRequestClose={closeModal} setShowsuccess={setShowsuccess} />
      {openslide && <Askme setOpenslide={setOpenslide} />}
    </div>
  )
}

export default HomePage
