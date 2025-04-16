import React from 'react'
import LetsConnect from '../LetsConnect'
import FeatureBenifits from '../FeatureBenifits'
import TagImg from '../../assets/img/Step1_image.png'
import KeyFeaturesWaste from '../wasteManagement/KeyFeaturesWaste'
import HmsDetails from './HmsDetails'

const HmsHeroPage = () => {
  return (
    <>
             <LetsConnect title={"Easy Healthcare Management: Book, Track, Stay Connected"} description={"The Atomwalk HMS gives patients a simple way to book, manage, and keep track of their doctor appointments. It’s built for hospitals and clinics that handle many different types of doctors and services. The system makes it easy to see doctor schedules, check appointment statuses, and stay organized, so both patients and hospital staff have a hassle-free experience."} background={"#faf0b1"} lead={true} img={TagImg}></LetsConnect>
            <FeatureBenifits data={"Hospital"} />
            <KeyFeaturesWaste title={"HMS: Bringing Everyone Together"} description={"Our Healthcare Management System connects patients, doctors, and hospital staff in one easy-to-use platform, making sure everyone works together smoothly to provide great care."}></KeyFeaturesWaste>
        <HmsDetails />
    </>
  )
}

export default HmsHeroPage
