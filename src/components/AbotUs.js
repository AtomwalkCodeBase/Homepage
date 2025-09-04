import AboutUsBanner from './AboutUsBanner'
import PurposeComponent from './PurposeComponent'
import BelieveComponent from './BelieveComponent'
import LeadershipTeam from './LeadershipTeam'
import OurValues from './OurValues'
import AdvantageSection from './AdvantageSection'
import AdvisoryBoard from './AdvisoryBoard'
import PatentAndPublications from './PatentAndPublications'

const AbotUs = () => {
  return (
    <div>
      <AboutUsBanner></AboutUsBanner>
      <BelieveComponent></BelieveComponent>
      <PurposeComponent></PurposeComponent>
      <OurValues></OurValues>
      <AdvantageSection/>
      <LeadershipTeam></LeadershipTeam>
      <AdvisoryBoard/>
      <PatentAndPublications/>
    </div>
  )
}

export default AbotUs
