import AboutUsBanner from './AboutUsBanner'
import PurposeComponent from './PurposeComponent'
import BelieveComponent from './BelieveComponent'
import LeadershipTeam from './LeadershipTeam'
import OurValues from './OurValues'
import AdvantageSection from './AdvantageSection'

const AbotUs = () => {
  return (
    <div>
      <AboutUsBanner></AboutUsBanner>
      <BelieveComponent></BelieveComponent>
      <PurposeComponent></PurposeComponent>
      <OurValues></OurValues>
      <AdvantageSection/>
      <LeadershipTeam></LeadershipTeam>
      {/* <Leadership></Leadership> */}
    </div>
  )
}

export default AbotUs
