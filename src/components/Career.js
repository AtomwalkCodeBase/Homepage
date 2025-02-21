import React, { PureComponent } from 'react'
import AboutUsBanner from './AboutUsBanner'
import PurposeComponent from './PurposeComponent'
import BelieveComponent from './BelieveComponent'
import LeadershipTeam from './LeadershipTeam'
import OurValues from './OurValues'
import Leadership from './Leadership'
import AdvantageSection from './AdvantageSection'
import CareersHeader from './CareerHeader'
import CareerSlider from './CareerSlider'
import JobOpenings from './JobOpenings'

const Career = () => {
  return (
    <div>
        <CareersHeader/>
        <CareerSlider/>
        <JobOpenings/>
      
    </div>
  )
}

export default Career
