import React, { PureComponent } from 'react'
import AboutUsBanner from './AboutUsBanner'
import PurposeComponent from './PurposeComponent'
import BelieveComponent from './BelieveComponent'
import LeadershipTeam from './LeadershipTeam'
import OurValues from './OurValues'
import Leadership from './Leadership'

const AbotUs = () => {
  return (
    <div>
      <AboutUsBanner></AboutUsBanner>
      {/* <BelieveComponent></BelieveComponent>
      <PurposeComponent></PurposeComponent>
      <OurValues></OurValues> */}
      <LeadershipTeam></LeadershipTeam>
      <Leadership></Leadership>
    </div>
  )
}

export default AbotUs
