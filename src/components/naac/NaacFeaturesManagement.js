import { useLocation } from 'react-router-dom';
import LetsConnect from '../LetsConnect';
import { Helmet } from "react-helmet-async";
import NAAC_FeatureDescription from './NAAC_FeatureDescription';
import { ProcessFlow } from '../hrm/ProcessFlow';
export const naachome = 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/Website-images/NAAC_PAGE_IMAGE';
const NAAC_FeaturesManagement = () => {
  const location = useLocation();

  const naacPages = [
    {
      path: "/naac-view.html",
      seoTitle: "Viewboard | Atomwalk NAAC",
      metaDescription: "Real-time overview of criterion-wise readiness and accreditation status with Atomwalk NAAC.",
      keywords: "NAAC viewboard, accreditation readiness, IQAC dashboard",
      canonical: "https://home.atomwalk.com/naac-view.html",
      title: "Achieve Academic Excellence with NAAC Dashboard",
      description: " Simplify compliance tracking with a comprehensive overview of pending documentation and institutional readiness milestones.",
      image: `${naachome}/naacdashboard.png`,
      data: "Viewboard"
    },

    {
      path: "/curricular-aspects.html",
      seoTitle: "C1: Curricular Aspects | Atomwalk NAAC",
      metaDescription: "Manage curriculum design, academic flexibility, and course outcomes aligned to NAAC Criterion 1.",
      keywords: "curricular aspects, curriculum design, NAAC criterion 1",
      canonical: "https://home.atomwalk.com/curricular-aspects.html",
      title: "C1: Curricular Aspects",
      description: "Design, deliver, and document your curriculum end-to-end — from program and course planning to academic flexibility, teacher inputs, and experiential learning — all mapped to NAAC Criterion 1 for audit-ready compliance.",
      image:`${naachome}/Curricularasp.png`,
      data: "CurricularAspects"
    },
    {
      path: "/teaching-learning.html",
      seoTitle: "C2: Teaching-Learning & Evaluation | Atomwalk NAAC",
      metaDescription: "Track admission processes, teaching-learning methods, and evaluation outcomes for NAAC Criterion 2.",
      keywords: "teaching learning evaluation, admission process, NAAC criterion 2",
      canonical: "https://home.atomwalk.com/teaching-learning.html",
      title: "C2: Teaching-Learning & Evaluation",
      description: "Tracks the complete academic delivery cycle for each program — from student enrolment and staffing ratios through classroom delivery, teacher quality, and internal assessment, right up to final outcome attainment and student feedback. Gives IQAC a single, criterion-ready view of how learning is planned, delivered, and evaluated across departments.",
      image:`${naachome}/teachinglearning.png`,
      data: "TeachingLearning"
    },
    {
      path: "/research-extension.html",
      seoTitle: "C3: Research & Extension | Atomwalk NAAC",
      metaDescription: "Track research output, publications, grants, and extension activities across departments.",
      keywords: "research and extension, publications, grants, NAAC criterion 3",
      canonical: "https://home.atomwalk.com/research-extension.html",
      title: "C3: Research & Extension",
      description: "Consolidates the institution's research and outreach footprint — publications, funded projects, seed money and grants, and extension/community activities — mapped by department and academic year, so IQAC has one criterion-ready record of research output and societal engagement for Criterion 3.",
      image: `${naachome}/researchextension.png`,
      data: "ResearchExtension"
    },
    {
      path: "/infrastructure.html",
      seoTitle: "C4: Infrastructure & Learning Resources | Atomwalk NAAC",
      metaDescription: "Maintain records of physical facilities, learning resources, and IT infrastructure.",
      keywords: "infrastructure, learning resources, NAAC criterion 4",
      canonical: "https://home.atomwalk.com/infrastructure.html",
      title: "C4: Infrastructure & Learning Resources",
      description: " Infrastructure & Learning Resources module serves as a centralized management framework designed to track, audit, and maintain an institution's foundational assets. By systematically cataloging physical, academic, and technological resources, this system ensures operational continuity, regulatory compliance, and optimal resource allocation across the entire organization.",
      image:` ${naachome}/infrastructure.png`,
      data: "Infrastructure"
    },
    {
      path: "/student-support.html",
      seoTitle: "C5: Student Support & Progression | Atomwalk NAAC",
      metaDescription: "Consolidate scholarships, placements, higher education progression, and grievance redressal data.",
      keywords: "student support, student progression, NAAC criterion 5",
      canonical: "https://home.atomwalk.com/student-support.html",
      title: "C5: Student Support & Progression",
      description: "Student Support & Progression module provides a unified framework to track, manage, and facilitate student success throughout their academic journey. By consolidating data on financial aid, career advancements, and student welfare, this system empowers institutions to offer timely assistance, foster upward mobility, and maintain transparent accountability.",
      image: `${naachome}/studentsupport.png`,
      data: "StudentSupport"
    },
    {
      path: "/governance.html",
      seoTitle: "C6: Governance, Leadership & Management | Atomwalk NAAC",
      metaDescription: "Track institutional leadership, strategic planning, and administrative processes.",
      keywords: "governance, leadership, institutional management, NAAC criterion 6",
      canonical: "https://home.atomwalk.com/governance.html",
      title: "C6: Governance, Leadership & Management",
      description: "Governance, Leadership & Management module provides a structured administrative framework designed to monitor institutional leadership, operational efficiency, and strategic execution. By digitalizing administrative workflows and strategic plans, this system ensures organizational transparency, smooth executive decision-making, and complete regulatory compliance across all institutional levels.",
      image: `${naachome}/governance.png`,
      data: "Governance"
    },
    {
      path: "/values-best-practices.html",
      seoTitle: "C7: Institutional Values & Best Practices | Atomwalk NAAC",
      metaDescription: "Document sustainability initiatives, inclusive practices, and institutional best practices.",
      keywords: "institutional values, best practices, NAAC criterion 7",
      canonical: "https://home.atomwalk.com/values-best-practices.html",
      title: "C7: Institutional Values & Best Practices",
      description: "Institutional Values & Best Practices module provides a dedicated platform to record, manage, and showcase an institution's commitment to social responsibility, sustainability, and cultural inclusivity. By organizing localized initiatives and systemic improvements into measurable data points, this system helps colleges and universities fulfill their civic duties while compiling clear evidence for external accreditation reviews.",
      image: `${naachome}/bestpractices.png`,
      data: "ValuesBestPractices"
    },

    {
      path: "/department.html",
      seoTitle: "Department Management | Atomwalk NAAC",
      metaDescription: "Enable department heads and faculty coordinators to manage criterion data centrally.",
      keywords: "department management, faculty coordinators, SSR preparation",
      canonical: "https://home.atomwalk.com/department.html",
      title: "Department Management",
      description: "The Department Dashboard provides an isolated, department-level workspace designed to bridge the gap between grassroots academic operations and central administrative monitoring. By giving individual department heads and faculty members direct control over their localized data, this module simplifies daily record-keeping while automatically aggregating data up to the main IQAC system.",
      image: `${naachome}/department.png`,
      data: "Department"
    },
    {
      path: "/scholarship.html",
      seoTitle: "Scholarship Management | Atomwalk NAAC",
      metaDescription: "Track active scholarships, grants, and institutional development schemes.",
      keywords: "scholarship management, grants tracking, institutional schemes",
      canonical: "https://home.atomwalk.com/scholarship.html",
      title: "Scholarship Management",
      description: "The Scholarship & Financial Aid module provides a secure, auditable, and centralized database to track financial support distributed across the student body. By linking individual student profiles with specific funding pipelines, this system simplifies eligibility verification, tracks fund disbursements, and auto-generates compliance records required for institutional transparency and national accreditation audits.",
      image: `${naachome}/scholarship.png`,
      data: "Scholarship"
    }
  ];

  const currentPage =
    naacPages.find(page => page.path === location.pathname) || naacPages[0];

  return (
    <>
      <Helmet>
        <title>{currentPage.seoTitle}</title>
        <meta name="description" content={currentPage.metaDescription} />
        <meta name="keywords" content={currentPage.keywords} />
        <link rel="canonical" href={currentPage.canonical} />
      </Helmet>

      <LetsConnect
        title={currentPage.title}
        description={currentPage.description}
        background="#eae3ff"
        lead={true}
        img={currentPage.image}
        breadcrumbTitle={"NAAC"}
        link={"/naac.html"}
      />     
      <ProcessFlow data={currentPage.data} />
      <NAAC_FeatureDescription data={currentPage.data}/>
    </>
  );
};

export default NAAC_FeaturesManagement;