import React, { useEffect, useState } from 'react'
import { Banner } from './Banner'
import { Skills } from './Skills'
import Features from './Features'
import { Contact } from './Contact'
import Pricing from './Pricing'
import Customerstories from './Customerstories'
import TrustedCustomer from './loginpage/TrustedCustomer'
import Resource from './Resource'
import UnlockFuture from './UnlockFuture'
import PricingAvtar from './PricingAvtar'
import Testimonial from './Testimonial'
import ProductDemoModal from './ProductDemoModal'
import Success from './SuccessBanner'

const HomePage = () => {
const [modalIsOpen, setModalIsOpen] = useState(false);
const[showsuccess,setShowsuccess]=useState(false);
const token = localStorage.getItem('datacheck');
  const openModal = () => {
    setModalIsOpen(true);
  };
useEffect(()=>{
  if(!token){
      setTimeout(() => {
    openModal()
  }, 200000);
  }

},[])
  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(()=>{
    if(showsuccess){
      setTimeout(() => {
        setShowsuccess(false);
      }, 3000);
    }
  },[showsuccess])
  return (
    <div>
      {showsuccess&&<Success message="We have successfully recorded your information."></Success>}
    {/* <Banner></Banner> */}
    <Resource></Resource>
    <Skills></Skills>
    <UnlockFuture></UnlockFuture>
    <Features></Features>
    {/* need to work one that page  */}
   {/* <TrustedCustomer></TrustedCustomer> */}
   <Testimonial></Testimonial>
    <Pricing></Pricing>
    <PricingAvtar></PricingAvtar>
    <Contact setShowsuccess={setShowsuccess}></Contact>
    <ProductDemoModal isOpen={modalIsOpen} onRequestClose={closeModal} setShowsuccess={setShowsuccess} />
    </div>
  )
}

export default HomePage
