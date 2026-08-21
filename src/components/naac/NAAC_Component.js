import { Helmet } from 'react-helmet-async';
import LetsConnect from '../LetsConnect';
import KeyFeatureNAAC from './KeyFeatureNAAC';
import FeatureBenefits from '../FeatureBenifits';
import NewFAQSection from '../hrm/NewFAQSection';

export const naachome = 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/NAAC_PAGE_IMAGE/';

const NAACComponent = () => {
  return (
    <>
      <Helmet>
        <title>NAAC Accreditation Software | Atomwalk Technologies</title>
        <meta name="description" content="Simplify NAAC accreditation with Atomwalk's intelligent platform. Manage SSR, criterion-wise documents, committee meetings, academic records, student support, and research data effortlessly." />
        <meta name="keywords" content="NAAC software, NAAC accreditation software, SSR management, criterion-wise documentation, IQAC software, higher education accreditation, academic data management, NAAC compliance tool" />
        <link rel="canonical" href="https://home.atomwalk.com/naac.html" />
      </Helmet>

      <LetsConnect
        title={"Simplifying NAAC Accreditation for Educational Institutions"}
        description={"Manage SSR, criterion-wise documents, committee meetings, academic records, student support, research activities, and institutional data from an intelligent platform."}
        background={"#eae3ff"}
        lead={true}
        img={`${naachome}/naachome.png`}
      />
      <KeyFeatureNAAC />
      <FeatureBenefits data={`NAAC`} />
      <NewFAQSection data={`NAAC`} />
    </>
  );
};

export default NAACComponent;