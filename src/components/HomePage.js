import React, { useEffect, useState } from 'react'
import TechMahindraSection, { Skills } from './Skills'
import Features from './Features'
import Testimonial from './Testimonial'
import ProductDemoModal from './ProductDemoModal'
import Success from './SuccessBanner'
import CustomerLogos from './CustomerLogos'
import HeroSection from './HeroSection'
import Contact from './Contact'
import { Helmet } from 'react-helmet-async';
import WhatsNew from './WhatsNew'
import AppsHero from './AppsHero'
import CTASection from './CTASection'
import RocketSteps from './RocketSteps'
import CustomerStoriesVideo from './CustomerStoriesVideo'
import ProcessFlowmap from './ProcessFlowmap'
import Carousel from './Carousel'
const HomePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showsuccess, setShowsuccess] = useState(false);
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
      {/* <HeroSection /> */}
      <Carousel></Carousel>
      <TechMahindraSection />
      <RocketSteps></RocketSteps>
      <Features></Features>
      <WhatsNew></WhatsNew>
      <CTASection></CTASection>
      <ProcessFlowmap />
      <CustomerStoriesVideo></CustomerStoriesVideo>
      <CustomerLogos />
      <Testimonial></Testimonial>

      <AppsHero></AppsHero>
      <Contact></Contact>
      <ProductDemoModal isOpen={modalIsOpen} onRequestClose={closeModal} setShowsuccess={setShowsuccess} />
    </div>
  )
}

export default HomePage
