import React, { useEffect } from 'react';
import styled from 'styled-components';
import CheckMark from '../../assets/img/check_mark.png';
import { useLocation } from "react-router-dom";
import { naachome } from './NAAC_Component';
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0ebf7; 
  padding: 20px;
  scroll-margin-top: 100px; /* keeps a fixed navbar from covering the section on scroll */
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    padding: 50px;
  }
`;

const ImageSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  img {
    width: 100%;
    max-width: 500px;
    border-radius: 14px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    border: 1px solid #ececec;
    background: #fff;
  }

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const BenefitsContainer = styled.div`
  /* background-color: #fff; */
  /* border-color: #e8e8e9;
  border-radius: 20px;
  border-style: solid;
  border-width: 0.8px; */
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  /* gap: 5px; */
  justify-content: center;
  line-height: 26px;
  /* padding: 5px; */
  text-align: center;

  p {
    color: #1c1b1f;
    line-height: 24px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 160px; */
    gap: 2px;
  }

  li img {
    width: 30px;
    height: 30px;
  }

  li span {
    color: #1E90FF; 
    font-size: 0.9rem;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    ul {
      justify-content: space-around;
    }
  }
`;

const TextSection = styled.div`
  text-align: center;
  color: #000;
  margin-top: 20px;

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 1.5rem;
    color: #6a1b9a;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    text-align: left;
    width: 50%;

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.2rem;
    }
  }
`;

const FeatureDescription = ({ data }) => {
  const isViewboard = data === 'Viewboard';
  const isC1 = data === 'CurricularAspects';
  const isC2 = data === 'TeachingLearning';
  const isC3 = data === 'ResearchExtension';
  const isC4 = data === 'Infrastructure';
  const isC5 = data === 'StudentSupport'; 
  const isC6 = data === 'Governance';
  const isC7 = data === 'ValuesBestPractices'; 
  const isDepartment = data === 'Department';
  const isScholarship = data === 'Scholarship';
  const getFeatureContent = (feature) => (
    <Features id={feature.id}>
      {feature.imgPosition === 'left' ? (
        <>
          <ImageSection>
            <img src={feature.imageSrc} alt={feature.imageAlt} />
          </ImageSection>
          <TextSection>
            <h1>{feature.title}</h1>
            <h2>{feature.subtitle}</h2>
            <p style={{ color: "#666" }}>{feature.description}</p>
            <BenefitsContainer>
              {/* <p>Key Benefits</p> */}
              <ul>
                {feature.benefits.map((benefit, index) => (
                  <li key={index}>
                    <img src={CheckMark} alt="Check mark" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </BenefitsContainer>
          </TextSection>
        </>
      ) : (
        <>
          <TextSection>
            <h1>{feature.title}</h1>
            <h2>{feature.subtitle}</h2>
            <p style={{ color: "#666" }}>{feature.description}</p>
            <BenefitsContainer>
              {/* <p>Key Benefits</p> */}
              <ul>
                {feature.benefits.map((benefit, index) => (
                  <li key={index}>
                    <img src={CheckMark} alt="Check mark" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </BenefitsContainer>
          </TextSection>
          <ImageSection>
            <img src={feature.imageSrc} alt={feature.imageAlt} />
          </ImageSection>
        </>
      )}
    </Features>
  );

  const features = isViewboard ? [
                    {
                      title: "IQAC Dashboard",
                      subtitle: "The central control tower for the institution's entire NAAC accreditation lifecycle.",
                      description: "Track live data-completion scores and required-screens-filled progress across the institution. Get at-a-glance stats on students, faculty, publications, research projects, placements, MoUs, patents, and extension activities, with criterion-wise completion bars for C1–C7 broken into their sub-metrics.",
                      benefits: [
                        "Live data-completion score with required-screens-filled tracker",
                        "At-a-glance institution stats — students, faculty, publications, research, placements, MoUs, patents, extension activities",
                        "Criterion-wise completion bars for C1–C7 with sub-metrics",
                        "One-click access to every criterion, branch, and academic year"
                      ],
                      imageSrc:`${naachome}/iqac-dashboard-preview.png` ,
                      imageAlt: "IQAC Dashboard showing NAAC data completion and criterion-wise progress",
                      imgPosition: "left"
                    },
                    {
                      title: "Principal's Dashboard",
                      subtitle: "A high-density, real-time snapshot of the college's global standing — built for leadership.",
                      description: "Get an overall NAAC Accreditation Readiness score with a live 'Ready' status indicator, a checklist view across all 7 criteria, and key performance indicators surfaced as quick-glance stat cards for leadership review.",
                      benefits: [
                        "Overall NAAC Accreditation Readiness score with live status",
                        "Checklist view across all 7 criteria",
                        "Key Performance Indicators as quick-glance stat cards",
                        "Criterion-wise marks distribution with focus area, max marks, weightage"
                      ],
                      imageSrc: `${naachome}/principal-dashboard-preview.png`,
                      imageAlt: "Principal's Dashboard showing NAAC accreditation readiness and KPIs",
                      imgPosition: "right"
                    },
                    {
                      title: "Department Dashboard",
                      subtitle: "Monitor exactly which departments are compliant and which data blocks are stalling the pipeline.",
                      description: "Switch between every branch — Basic Sciences, CSE, ECE, Life Science, MBA, and more — to see per-department readiness scores, required-data-entry progress, and a breakdown of faculty, publications, research projects, achievements, PhD scholars, FDPs, and patents.",
                      benefits: [
                        "Department switcher covering every branch",
                        "Per-department readiness score with progress bar",
                        "Breakdown of faculty, publications, research, achievements, PhD scholars, FDPs, patents",
                        "Pending Required Data alerts flagging exactly what's missing"
                      ],
                      imageSrc: `${naachome}/department-dashboard-preview.png`,
                      imageAlt: "Department Dashboard showing department-wise NAAC data readiness",
                      imgPosition: "left"
                    },
                    {
                      title: "IQAC Spider View",
                      subtitle: "Replaces spreadsheets with one interactive radar chart mapped against all 7 NAAC criteria.",
                      description: "See criterion-wise readiness percentages (C1–C7) at a glance, compare the institution against every individual department on an interactive spider/radar chart, and drill straight down into any branch with color-coded status dots that surface equilibrium gaps instantly.",
                      benefits: [
                        "Criterion-wise readiness percentage (C1–C7) at a glance",
                        "Interactive spider/radar chart comparing institution vs. departments",
                        "Department Readiness cards for drill-down",
                        "Color-coded per-criterion status dots for instant gap-spotting"
                      ],
                      imageSrc: `${naachome}/iqac-spider-view-preview.png`,
                      imageAlt: "IQAC Spider View showing a radar chart of criterion-wise readiness across departments",
                      imgPosition: "right"
                    }
                  ] : isC1 ? [
                    {
                      id: "c1-programs",
                      title: "Programs",
                      subtitle: "C1 — Curricular Aspects",
                      description: "A single, structured record of every academic program the institution offers.",
                      benefits: [
                        "Maintain UG and PG programs with department, duration, and seat details",
                        "Quick-edit cards for updating intake and program status each year",
                        "Acts as the base record that other C1 modules link back to",
                        "Keeps program data audit-ready for Criterion 1 documentation"
                      ],
                      imageSrc:`${naachome}/c1-programs-preview.png`,
                      imageAlt: "Programs screen listing all academic programs offered by the institution",
                      imgPosition: "left"
                    },
                    {
                      id: "c1-curriculum-revisions",
                      title: "Curriculum Revisions",
                      subtitle: "C1.1 — Revision History",
                      description: "Track how each program's curriculum has evolved, revision by revision.",
                      benefits: [
                        "Log major and minor revisions with batch and Board of Studies date",
                        "Tag revisions as industry-aligned or feedback-incorporated",
                        "Keep a running history across academic years, per program",
                        "Ready-made evidence trail for curriculum-flexibility metrics"
                      ],
                      imageSrc: `${naachome}/c1-curriculum-revisions-preview.png`,
                      imageAlt: "Curriculum Revisions screen tracking revision history across programs",
                      imgPosition: "right"
                    },
                    {
                      id: "c1-stakeholder-feedback",
                      title: "Stakeholder Feedback",
                      subtitle: "C1.4 — 360° Feedback",
                      description: "Feedback from students, faculty, employers, and alumni, in one consolidated view.",
                      benefits: [
                        "Capture ratings and comments across all stakeholder groups",
                        "Filter by academic year and stakeholder type",
                        "Pair each feedback entry with the action taken in response",
                        "Builds the evidence base for the feedback-and-ATR cycle"
                      ],
                      imageSrc: `${naachome}/c1-stakeholder-feedback-preview.png`,
                      imageAlt: "Stakeholder Feedback screen showing feedback from students, faculty, employers and alumni",
                      imgPosition: "left"
                    },
                    {
                      id: "c1-addon-courses",
                      title: "Add-on Courses",
                      subtitle: "KI 1.2 — Metrics 1.2.2 & 1.2.3",
                      description: "Certificate, diploma, and skill-development courses beyond the core curriculum.",
                      benefits: [
                        "Log course hours, offerings, and enrollment against the 30-hour minimum",
                        "Track completion counts alongside enrollment, per course",
                        "Flag courses with an explicit employability focus",
                        "Export the full course list for SSR documentation"
                      ],
                      imageSrc: `${naachome}/c1-addon-courses-preview.png`,
                      imageAlt: "Add-on and certificate courses screen with enrollment and completion tracking",
                      imgPosition: "right"
                    },
                    {
                      id: "c1-experiential-learning",
                      title: "Experiential Learning",
                      subtitle: "KI 1.3 — Metric 1.3.2",
                      description: "Courses built around project work, field work, and internships.",
                      benefits: [
                        "Classify each course by learning type — project, field work, or internship",
                        "Link every course to its parent program for traceability",
                        "Attach supporting evidence per course entry",
                        "Summarized totals ready for metric-level reporting"
                      ],
                      imageSrc:  `${naachome}/c1-experiential-learning-preview.png`,
                      imageAlt: "Experiential Learning Courses screen listing project, field work and internship courses",
                      imgPosition: "left"
                    },
                    {
                      id: "c1-student-projects",
                      title: "Student Projects",
                      subtitle: "KI 1.3 — Metric 1.3.3",
                      description: "Programme-wise participation in projects, field work, and internships.",
                      benefits: [
                        "Record participation counts against each programme's total strength",
                        "Auto-calculated participation percentage per record",
                        "Compare year-over-year participation across programmes",
                        "Attach supporting documents where available"
                      ],
                      imageSrc:  `${naachome}/c1-student-projects-preview.png`,
                      imageAlt: "Student Project, Field Work and Internship screen with programme-wise participation",
                      imgPosition: "right"
                    }
                  ] : 
                   isC2 ? [
  {
    id: "c2-enrolment-profile",
    title: "Student Enrolment and Profile",
    subtitle: "C2.1 — Student Enrolment & Profile",
    description: "A complete, category-wise picture of who is admitted, against how many seats were sanctioned.",
    benefits: [
      "Admission Summary tracks eligible applications, students admitted, and seats sanctioned per programme, with a live utilisation % for each",
      "Student Enrolment maintains the full roster — enrolment number, programme, year, gender, category, and active/inactive status — with bulk upload and XLS export",
      "Reserved Category Admissions breaks down earmarked vs. admitted seats by SC, ST, OBC, EWS, Divyang, and Others, with an auto-calculated fill rate per programme",
      "SC/ST/OBC/General/EWS distribution is summarized at a glance for quick equity reporting"
    ],
    imageSrc: `${naachome}/c2-student-enrolment-preview.png`,
    imageAlt: "Student Enrolment screen showing category-wise student counts and enrolment records",
    imgPosition: "left"
  },
  {
    id: "c2-student-teacher-ratio",
    title: "Student-Teacher Ratio",
    subtitle: "C2.2/C2.3 — Student-Teacher Ratio",
    description: "Keeps staffing adequacy and mentoring load visible, department by department.",
    benefits: [
      "Sanctioned Posts compares sanctioned vs. filled teaching positions per department, with vacant counts and a fill % bar for each",
      "Mentor-Mentee records every faculty mentor's assigned mentee count by department and academic year",
      "An institution-wide average mentor:mentee ratio (e.g. 1:9) is computed automatically from individual mentor loads",
      "Both screens flag understaffed departments early, ahead of SSR submission"
    ],
    imageSrc: `${naachome}/c2-mentor-mentee-preview.png`,
    imageAlt: "Mentor-Mentee screen showing mentor to student ratio by department",
    imgPosition: "right"
  },
  {
    id: "c2-teaching-learning-process",
    title: "Teaching-Learning Process",
    subtitle: "C2.3 — Teaching-Learning Process",
    description: "Connects what's assigned to each faculty member with how much of it has actually been delivered.",
    benefits: [
      "Course Allocations lists every faculty member's assigned courses per semester, with weekly teaching hours totalled automatically",
      "Teaching Plans tracks syllabus submission status — Draft, Submitted, or Approved — per faculty and course",
      "Hours-completed progress bars (e.g. 40/60 hours) show real-time syllabus completion against the planned load",
      "An average syllabus-completion percentage rolls up across all teaching plans for a quick institution-wide status check"
    ],
    imageSrc: `${naachome}/c2-course-allocations-preview.png`,
    imageAlt: "Course Allocations screen showing faculty course assignments per semester",
    imgPosition: "left"
  },
  {
    id: "c2-teacher-profile-quality",
    title: "Teacher Profile and Quality",
    subtitle: "C2.4 — Teacher Profile & Quality",
    description: "Faculty credentials, experience, and recognition, kept current and audit-ready.",
    benefits: [
      "Faculty Profiles record department, employee ID, qualification, experience, and joining date for every regular and contractual faculty member",
      "Total faculty, PhD holders, and regular-faculty counts are surfaced as headline stats, updated automatically as records change",
      "Teacher Awards & Fellowships logs state, national, and international recognitions per faculty member, with awarding agency and incentive details",
      "Bulk upload and department/qualification filters make it fast to keep large faculty rosters current each year"
    ],
    imageSrc: `${naachome}/c2-faculty-profiles-preview.png`,
    imageAlt: "Faculty Profiles screen showing qualification and experience records for teaching staff",
    imgPosition: "right"
  },
  {
    id: "c2-evaluation-process-reforms",
    title: "Evaluation Process and Reforms",
    subtitle: "C2.5 — Evaluation Process & Reforms",
    description: "Turnaround-time evidence for internal assessment, tracked from last exam to result declaration.",
    benefits: [
      "Exam Result Timeline records last-exam and result-declaration dates for every programme, semester, and academic year",
      "Days-to-result is calculated automatically per record, with color-coded flags for entries within or beyond the 30-day benchmark",
      "An average days-to-result figure rolls up across all programmes for quick evaluation-efficiency reporting",
      "XLS export makes the full timeline ready to attach as SSR evidence"
    ],
    imageSrc: `${naachome}/c2-exam-result-timeline-preview.png`,
    imageAlt: "Exam Result Timeline screen showing days between last exam and result declaration",
    imgPosition: "left"
  },
  {
    id: "c2-student-performance-outcomes",
    title: "Student Performance and Outcomes",
    subtitle: "C2.6 — Student Performance & Outcomes",
    description: "Measures how well each programme is meeting its defined learning outcomes.",
    benefits: [
      "Programme Outcome Attainment logs each PO/CO by programme and academic year, alongside its stated target percentage",
      "Actual attainment percentage is tracked against target, with an Attained / Not Attained status computed for each record",
      "Filterable by programme and academic year to spot outcome gaps at either level",
      "Attained-vs-not-attained counts are summarized up top for a fast programme-wide read"
    ],
    imageSrc: `${naachome}/c2-po-co-attainment-preview.png`,
    imageAlt: "Programme Outcome Attainment screen showing PO/CO attainment levels per programme",
    imgPosition: "right"
  },
  {
    id: "c2-student-satisfaction-survey",
    title: "Student Satisfaction Survey",
    subtitle: "C2.6 — Student Satisfaction Survey",
    description: "Direct student feedback on the teaching-learning process, rolled up by programme and year.",
    benefits: [
      "Survey responses are captured per programme and academic year, with an average rating computed automatically",
      "Response rate and total responses are tracked to gauge how representative each survey round is",
      "Programme-wise breakdowns make it easy to spot where satisfaction is lagging",
      "Consolidated ratings are ready to cite directly as SSR evidence for Metric 2.6.3"
    ],
    imageSrc: `${naachome}/c2-student-satisfaction-survey-preview.png`,
    imageAlt: "Student Satisfaction Survey screen showing feedback ratings on the teaching-learning process by programme",
    imgPosition: "left"
  }
] : isC3 ? [
  {
    id: "c3-publications",
    title: "Publications",
    subtitle: "C3.3 — Research Publications",
    description: "Every faculty publication in one place, with the indexing and impact data reviewers ask for first.",
    benefits: [
      "Log each publication with journal name, publication year, and Scopus/SCI/WoS indexing tag",
      "Capture impact factor and DOI per publication, with a direct link out for verification",
      "Flag international publications separately from domestic ones",
      "Filter by academic year and publication type, with total and SCI/Scopus/WoS counts surfaced up top"
    ],
    imageSrc: `${naachome}/c3-publications-preview.png`,
    imageAlt: "Publications screen listing faculty research publications with indexing and impact factor",
    imgPosition: "left"
  },
  {
    id: "c3-patents",
    title: "Patents",
    subtitle: "C3.4 — Patent Filings & Grants",
    description: "Tracks each patent from filing through to publication and grant.",
    benefits: [
      "Record patent title, inventors, application number, and filing date",
      "Track status through its lifecycle — Filed, Published, or Granted",
      "Distinguish Indian patents from international filings",
      "Total patents, granted count, and international count are surfaced as headline stats"
    ],
    imageSrc: `${naachome}/c3-patents-preview.png`,
    imageAlt: "Patents screen listing filed, published and granted patents with inventor details",
    imgPosition: "right"
  },
  {
    id: "c3-research-projects",
    title: "Research Projects",
    subtitle: "C3.1 — Funded Research Projects",
    description: "A running record of every externally funded project the institution has underway.",
    benefits: [
      "Log each project's funding agency, principal investigator, and government/non-government funding tag",
      "Track project status — Ongoing or Completed — by academic year",
      "Record grant amount per project, rolled up into a total-grants figure",
      "Filter by status and year to see the current active research portfolio at a glance"
    ],
    imageSrc: `${naachome}/c3-research-projects-preview.png`,
    imageAlt: "Research Projects screen listing funded projects with principal investigator and grant amount",
    imgPosition: "left"
  },
  {
    id: "c3-mous",
    title: "MoUs",
    subtitle: "C3.7 — Memoranda of Understanding",
    description: "Every formal partnership the institution holds with industry and academic bodies.",
    benefits: [
      "Record each MoU's partner organization, purpose, and industry/academic tag",
      "Track signed and expiry dates, with active/inactive status shown per record",
      "Filter the list by active status to see live partnerships instantly",
      "Total and active MoU counts are surfaced up top for quick reporting"
    ],
    imageSrc: `${naachome}/c3-mous-preview.png`,
    imageAlt: "MoUs and Collaborations screen listing active memoranda of understanding with partner institutions",
    imgPosition: "right"
  },
  {
    id: "c3-research-fellowships",
    title: "Research Fellowships",
    subtitle: "KI 3.1 — Metric 3.1.1",
    description: "Recognition and funded fellowships awarded to teaching staff, in one auditable list.",
    benefits: [
      "Record fellowship name, awarding agency, and type — National, International, or Post-Doctoral",
      "Track the award amount and date for each fellowship",
      "Link every fellowship to the faculty member who received it",
      "National, international, and post-doctoral counts are totalled automatically"
    ],
    imageSrc: `${naachome}/c3-research-fellowships-preview.png`,
    imageAlt: "Research Fellowships screen listing national and international fellowships awarded to faculty",
    imgPosition: "left"
  },
  {
    id: "c3-seed-money",
    title: "Seed Money",
    subtitle: "KI 3.1 — Metric 3.1.2",
    description: "Internal funding that kick-starts faculty research before it attracts external grants.",
    benefits: [
      "Log each seed-funded research title against the faculty member leading it",
      "Track the sanctioned amount per project, by year and academic year",
      "Attach the policy document backing each disbursement",
      "Total teachers funded and average amount per teacher roll up automatically"
    ],
    imageSrc: `${naachome}/c3-seed-money-preview.png`,
    imageAlt: "Seed Money screen showing internal research funding allocated to faculty by project",
    imgPosition: "right"
  },
  {
    id: "c3-research-fellows",
    title: "Research Fellows",
    subtitle: "KI 3.1 — Metric 3.1.4",
    description: "Tracks every JRF, SRF, Research Associate, and Post-Doctoral fellow enrolled under a faculty guide.",
    benefits: [
      "Record fellow name, fellowship type, granting agency, and qualifying exam",
      "Track duration and enrolment year alongside the assigned faculty guide",
      "Distinguishes JRF, SRF, Research Associate, and Post-Doctoral Fellow categories",
      "Category-wise totals (JRF, SRF, Post-Doc, Research Associate) are shown up top"
    ],
    imageSrc: `${naachome}/c3-research-fellows-preview.png`,
    imageAlt: "Research Fellows screen listing JRF, SRF and Post-Doctoral fellows enrolled under faculty guides",
    imgPosition: "left"
  },
  {
    id: "c3-dept-recognitions",
    title: "Dept Recognitions",
    subtitle: "KI 3.1 — Metric 3.1.6",
    description: "Special recognition and infrastructure grants earned by departments from national bodies.",
    benefits: [
      "Log each recognition's scheme name, awarding agency, and type — UGC-SAP, DST-FIST, DBT, or ICSSR",
      "Track validity period alongside the grant amount awarded",
      "Link every recognition to the department that holds it",
      "Total recognitions, departments covered, and total grant value are summarized up top"
    ],
    imageSrc: `${naachome}/c3-dept-recognitions-preview.png`,
    imageAlt: "Department Recognitions screen listing UGC-SAP, DST-FIST, DBT and ICSSR recognitions by department",
    imgPosition: "right"
  },
  {
    id: "c3-phd-scholars",
    title: "PhD Scholars",
    subtitle: "KI 3.4 — Metric 3.4.3",
    description: "Every scholar being guided by faculty, tracked from registration through to award.",
    benefits: [
      "Record scholar name, department, guide, and full thesis title",
      "Track registration year and, once complete, the award year",
      "Status field flags each scholar as Ongoing so guides can plan accordingly",
      "Total scholars vs. PhDs awarded gives an instant guidance-output snapshot"
    ],
    imageSrc: `${naachome}/c3-phd-scholars-preview.png`,
    imageAlt: "PhD Scholars screen listing scholars, guides, thesis titles and registration status",
    imgPosition: "left"
  },
  {
    id: "c3-econtent",
    title: "E-Content",
    subtitle: "KI 3.4 — Metric 3.4.7",
    description: "Digital teaching content faculty have built and published beyond the classroom.",
    benefits: [
      "Log each module's name, hosting platform (SWAYAM, MOOCs, government initiatives), and launch date",
      "Link every module to the faculty member who developed it",
      "Attach the live module link for direct reviewer access",
      "Total modules, faculty involved, and platforms used are tallied automatically"
    ],
    imageSrc: `${naachome}/c3-econtent-preview.png`,
    imageAlt: "E-Content Modules screen listing e-learning content developed by faculty across platforms",
    imgPosition: "right"
  },
  {
    id: "c3-collaborative-activities",
    title: "Collaborative Activities",
    subtitle: "KI 3.7 — Metric 3.7.1",
    description: "Joint work with industry and academic partners — internships, exchanges, and joint research.",
    benefits: [
      "Record each activity's title, collaborating agency, and nature — Internship, Faculty Exchange, or Joint Research",
      "Track duration and participating faculty or students per activity",
      "Attach supporting documentation for each collaboration",
      "Total activities, partner agencies, and activity types are counted up top"
    ],
    imageSrc: `${naachome}/c3-collaborative-activities-preview.png`,
    imageAlt: "Collaborative Activities screen listing internships, faculty exchange and joint research with industry",
    imgPosition: "left"
  },
  {
    id: "c3-extension-activities",
    title: "Extension Activities",
    subtitle: "KI 3.6 — Metrics 3.6.3 & 3.6.4",
    description: "NSS, NCC, and community outreach work that connects the institution to the public it serves.",
    benefits: [
      "Log each activity's title, type, organising unit, and government scheme it ties into",
      "Track student participation alongside total participant counts, per activity",
      "Date-stamp every activity for chronological SSR evidence",
      "Total activities, students participated, and overall participants roll up automatically"
    ],
    imageSrc: `${naachome}/c3-extension-activities-preview.png`,
    imageAlt: "Extension Activities screen listing NSS and community outreach programmes with participation counts",
    imgPosition: "right"
  }
] : isC4 ? [
  {
    id: "c4-assets",
    title: "Assets",
    subtitle: "C4.1 — Physical Assets",
    description: "Every physical asset the institution owns, in one connected register.",
    benefits: [
      "Asset Register tracks category, location, make, cost, and condition per item",
      "Search and filter by name, code, department, or location",
      "Ready-made inventory evidence for Criterion 4 audits"
    ],
    imageSrc: `${naachome}/c4-assets-preview.png`,
    imageAlt: "Asset Register screen listing infrastructure and equipment inventory",
    imgPosition: "left"
  },
  {
    id: "c4-laboratories",
    title: "Laboratories",
    subtitle: "C4.2 — Laboratories",
    description: "Lab facilities and equipment tracked department by department.",
    benefits: [
      "Laboratories records department, capacity, smart-lab status, and equipment on hand",
      "Search and filter by name, code, department, or location",
      "Ready-made inventory evidence for Criterion 4 audits"
    ],
    imageSrc: `${naachome}/c4-laboratories-preview.png`,
    imageAlt: "Laboratories screen showing lab facilities and equipment",
    imgPosition: "right"
  },
  {
    id: "c4-library-resources",
    title: "Library Resources",
    subtitle: "C4.3 — Library Resources",
    description: "Books, journals, and e-resources tracked year over year.",
    benefits: [
      "Library Resources logs total books, titles added, journals, and expenditure per year",
      "Compare current year against prior years instantly"
    ],
    imageSrc: `${naachome}/c4-library-resources-preview.png`,
    imageAlt: "Library Resources screen showing holdings and digital resources by academic year",
    imgPosition: "left"
  },
  {
    id: "c4-library-summary",
    title: "Library Summary",
    subtitle: "KI 4.2 — Library Summary",
    description: "Library data rolled up into one reporting table built for direct metric submission.",
    benefits: [
      "Library Summary rolls resource data into a year-wise table built for direct metric reporting",
      "Export-ready format for Metric 4.2.3 submission"
    ],
    imageSrc: `${naachome}/c4-library-summary-preview.png`,
    imageAlt: "Library Summary table showing year-wise library resources and expenditure",
    imgPosition: "right"
  },
  {
    id: "c4-elibrary-subscriptions",
    title: "e-Library Subscriptions",
    subtitle: "KI 4.2 — Digital Resources",
    description: "Digital subscriptions tracked with the same rigor as physical library assets.",
    benefits: [
      "e-Library Subscriptions tracks provider, membership, and expenditure per resource",
      "Rollup counts ready for Metric 4.2.2 reporting"
    ],
    imageSrc: `${naachome}/c4-elibrary-subscriptions-preview.png`,
    imageAlt: "e-Library Subscriptions screen listing digital resource providers and expenditure",
    imgPosition: "left"
  },
  {
    id: "c4-ict-facilities",
    title: "ICT Facilities",
    subtitle: "KI 4.3 — ICT-Enabled Facilities",
    description: "ICT-enabled classrooms and seminar halls, logged room by room.",
    benefits: [
      "ICT Facilities records room type, capacity, and ICT features per room",
      "Wi-Fi coverage, smart boards, and projector fit-outs logged per room",
      "Rollup counts ready for Metric 4.3.1 reporting"
    ],
    imageSrc: `${naachome}/c4-ict-facilities-preview.png`,
    imageAlt: "ICT-Enabled Facilities screen listing classrooms and seminar halls with ICT features",
    imgPosition: "right"
  },
  {
    id: "c4-infra-expenditure",
    title: "Infra Expenditure",
    subtitle: "KI 4.1 — Infrastructure Expenditure",
    description: "What was spent building infrastructure, tracked year by year.",
    benefits: [
      "Infra Expenditure logs budget allocated versus actual spend per year, excluding salary",
      "Multi-year view ready for Metric 4.1.4 evidence"
    ],
    imageSrc: `${naachome}/c4-infra-expenditure-preview.png`,
    imageAlt: "Infrastructure Expenditure screen showing year-wise expenditure excluding salary",
    imgPosition: "left"
  },
  {
    id: "c4-amc-contracts",
    title: "AMC Contracts",
    subtitle: "KI 4.4 — AMC Contracts",
    description: "What it costs to keep infrastructure running, contract by contract.",
    benefits: [
      "AMC Contracts tracks vendor, contract value, and renewal dates per maintenance agreement",
      "Maintenance spend split into academic and physical facilities",
      "Multi-year view ready for Metrics 4.4.1/4.4.2 evidence"
    ],
    imageSrc: `${naachome}/c4-amc-contracts-preview.png`,
    imageAlt: "AMC Contracts screen listing annual maintenance contracts for equipment and facilities",
    imgPosition: "right"
  },
  {
    id: "c4-qualitative-metrics",
    title: "Qualitative Metrics",
    subtitle: "Descriptive QIM Responses",
    description: "Narrative responses for the descriptive metrics spanning Criteria 4 through 7.",
    benefits: [
      "Write and store descriptive responses per metric, per year",
      "Track response counts across Criterion 4, 5, 6, and 7",
      "Filter responses by criterion for quick review",
      "Word count shown per response for SSR length checks"
    ],
    imageSrc: `${naachome}/c4-qualitative-metrics-preview.png`,
    imageAlt: "Qualitative Metrics screen showing descriptive responses across Criteria 4 to 7",
    imgPosition: "left"
  }
] : isC5 ? [
  {
    id: "c5-scholarships",
    title: "Scholarships",
    subtitle: "Financial Aid",
    description: "Every scholarship scheme is logged with its category and disbursed amount, giving a complete picture of the financial support each student receives.",
    benefits: [
      "Scheme-wise scholarship tracking with total amount disbursed",
      "Category filters with academic-year breakdown"
    ],
    imageSrc: `${naachome}/c5-scholarships-preview.png`,
    imageAlt: "Scholarships screen listing schemes, categories, and disbursed amounts",
    imgPosition: "left"
  },
  {
    id: "c5-placements",
    title: "Placements",
    subtitle: "Career Placement",
    description: "Company-wise placement records track programme, package, and placement type for a complete picture of career outcomes.",
    benefits: [
      "Company-wise placements with average package",
      "Bulk upload and academic-year filters"
    ],
    imageSrc: `${naachome}/c5-placements-preview.png`,
    imageAlt: "Placements screen listing company-wise placement records",
    imgPosition: "right"
  },
  {
    id: "c5-career-guidance",
    title: "Career Guidance",
    subtitle: "Career Guidance & Counselling",
    description: "Career guidance activities — mock interviews, resume clinics, and exam-guidance sessions — tracked with students benefited and placed tallied automatically.",
    benefits: [
      "Career-counselling activities with students benefited and placed",
      "Session type and outcome tracking"
    ],
    imageSrc: `${naachome}/c5-career-guidance-preview.png`,
    imageAlt: "Career Guidance and Counselling screen listing activities and outcomes",
    imgPosition: "left"
  },
  {
    id: "c5-student-achievements",
    title: "Student Achievements",
    subtitle: "Achievements",
    description: "Every sports, cultural, and academic achievement a student earns, with level, position, and supporting documentation.",
    benefits: [
      "Achievement records by type, level, and position won",
      "Supporting documentation attached per record"
    ],
    imageSrc: `${naachome}/c5-student-achievements-preview.png`,
    imageAlt: "Student Achievements screen listing sports, cultural, and academic achievements",
    imgPosition: "right"
  },
  {
    id: "c5-capacity-building",
    title: "Capacity Building",
    subtitle: "Capacity Building Programs",
    description: "Soft-skills, life-skills, and tech-awareness programs logged with delivering agency and students covered.",
    benefits: [
      "Skill-type tagged programs with student coverage totals",
      "Delivering-agency tracking per program"
    ],
    imageSrc: `${naachome}/c5-capacity-building-preview.png`,
    imageAlt: "Capacity Building Programs screen listing soft-skills and life-skills programs",
    imgPosition: "left"
  },
  {
    id: "c5-higher-education",
    title: "Higher Education Progression",
    subtitle: "Higher Education",
    description: "Every student's path from graduation to the institution and programme they were admitted into next, summarised by academic year.",
    benefits: [
      "Higher-education admissions by department and institution",
      "Cohort-wise reporting by academic year"
    ],
    imageSrc: `${naachome}/c5-higher-education-preview.png`,
    imageAlt: "Higher Education Progression screen listing students admitted to higher studies",
    imgPosition: "right"
  },
  {
    id: "c5-sports-cultural-events",
    title: "Sports & Cultural Events",
    subtitle: "Campus Life",
    description: "Every sports and cultural event logged with its level, participant count, and venue.",
    benefits: [
      "Sports & cultural events with participation and venue details",
      "Level-wise tracking for reporting"
    ],
    imageSrc: `${naachome}/c5-sports-cultural-events-preview.png`,
    imageAlt: "Sports and Cultural Events screen listing events, levels, and participation",
    imgPosition: "left"
  },
  {
    id: "c5-alumni",
    title: "Alumni",
    subtitle: "Alumni Network",
    description: "A searchable alumni directory with current employer, role, and location tracked per alumnus, and distinguished alumni flagged for recognition.",
    benefits: [
      "Searchable alumni directory with employer and role tracking",
      "Distinguished alumni flagged for recognition"
    ],
    imageSrc: `${naachome}/c5-alumni-preview.png`,
    imageAlt: "Alumni screen showing a searchable directory of alumni records",
    imgPosition: "right"
  },
  {
    id: "c5-grievances",
    title: "Grievances",
    subtitle: "Grievance Redressal",
    description: "Student and staff grievances recorded with category, status, and date filed, so open versus resolved counts are visible at a glance.",
    benefits: [
      "Category and status tracking with open/resolved counts",
      "Unique grievance ID assigned to every record"
    ],
    imageSrc: `${naachome}/c5-grievances-preview.png`,
    imageAlt: "Grievances screen listing student and staff grievance records with status",
    imgPosition: "left"
  }
] : isC6 ? [
  {
    id: "c6-egovernance",
    title: "e-Governance",
    subtitle: "Digital Administration",
    description: "Every e-Governance system the institution runs — across Administration, Finance, Admission, and Examination — logged with the year it went live, the software used, and the vendor behind it.",
    benefits: [
      "e-Governance coverage across all 4 institutional areas, with year implemented",
      "Software and vendor recorded per system"
    ],
    imageSrc: `${naachome}/c6-egovernance-preview.png`,
    imageAlt: "e-Governance screen listing digital systems adopted across administration, finance, admission, and examination",
    imgPosition: "left"
  },
  {
    id: "c6-faculty-development",
    title: "Faculty Development",
    subtitle: "FDPs & Orientation",
    description: "Every Faculty Development Programme, orientation, and short-term course attended, with organiser, dates, and mode recorded per faculty member.",
    benefits: [
      "FDP, orientation, and short-term course records per faculty",
      "Duration and mode tracked per programme"
    ],
    imageSrc: `${naachome}/c6-faculty-development-preview.png`,
    imageAlt: "Faculty Development Programs screen listing FDPs, orientation, and short-term courses attended",
    imgPosition: "right"
  },
  {
    id: "c6-funding-grants",
    title: "Funding Grants",
    subtitle: "Government & Non-Government Grants",
    description: "Government and non-government grants tracked by agency, purpose, and amount, with totals rolling up automatically by academic year.",
    benefits: [
      "Govt vs non-govt grant totals with purpose and academic year",
      "Automatic rollups by academic year"
    ],
    imageSrc: `${naachome}/c6-funding-grants-preview.png`,
    imageAlt: "Funding Grants screen listing government and non-government grants received",
    imgPosition: "left"
  },
  {
    id: "c6-faculty-financial-support",
    title: "Faculty Financial Support",
    subtitle: "Conference & Membership Funding",
    description: "Conference, workshop, and professional-membership funding per faculty member, with teachers benefited and total amount disbursed summarised at the top.",
    benefits: [
      "Faculty-wise conference and membership support with amount and year",
      "Teachers benefited and total disbursed summarised up top"
    ],
    imageSrc: `${naachome}/c6-faculty-financial-support-preview.png`,
    imageAlt: "Faculty Financial Support screen listing conference and membership funding for faculty",
    imgPosition: "right"
  },
  {
    id: "c6-quality-initiatives",
    title: "Quality Initiatives",
    subtitle: "Audits & Certifications",
    description: "Academic Administrative Audits, NIRF participation, ISO certifications, and collaborative quality programs, each logged with a category tag, description, and date range.",
    benefits: [
      "AAA, NIRF, ISO, and collaborative initiatives tagged by category",
      "Date ranges and outcome notes recorded per initiative"
    ],
    imageSrc: `${naachome}/c6-quality-initiatives-preview.png`,
    imageAlt: "Quality Initiatives screen listing AAA, NIRF, ISO, and collaborative quality programs",
    imgPosition: "left"
  }
] : isC7 ? [
  {
    id: "c7-green-campus",
    title: "Green Campus",
    subtitle: "Environmental Initiatives",
    description: "Every environmental initiative — spanning Energy Conservation, Water Conservation, Waste Management, and Biodiversity — logged with its start date, measurable impact, and, where applicable, investment and annual savings.",
    benefits: [
      "Green initiatives tagged by type, with impact, investment, and savings/yr",
      "Start date recorded per initiative"
    ],
    imageSrc: `${naachome}/c7-green-campus-preview.png`,
    imageAlt: "Green Campus Initiatives screen listing energy, water, waste, and biodiversity initiatives",
    imgPosition: "left"
  },
  {
    id: "c7-divyangjan-facilities",
    title: "Divyangjan Facilities",
    subtitle: "Accessibility",
    description: "Every accessibility facility for differently abled students and staff, tracked against the NAAC 8-point checklist, with description, year made available, and current status.",
    benefits: [
      "Divyangjan facility coverage against the 8-point NAAC checklist",
      "Year made available and current status tracked per facility"
    ],
    imageSrc: `${naachome}/c7-divyangjan-facilities-preview.png`,
    imageAlt: "Divyangjan Facilities screen listing accessibility facilities for differently abled students and staff",
    imgPosition: "right"
  },
  {
    id: "c7-gender-sensitization",
    title: "Gender Sensitization",
    subtitle: "Awareness Programs",
    description: "Gender sensitization programs — workshops, awareness drives, and committee-led sessions — recorded with date, participation, and outcome.",
    benefits: [
      "Gender sensitization programs with date, participation, and outcome",
      "Committee-led sessions logged per academic year"
    ],
    imageSrc: `${naachome}/c7-gender-sensitization-preview.png`,
    imageAlt: "Gender Sensitization screen listing gender sensitization programs and activities",
    imgPosition: "left"
  },
  {
    id: "c7-human-rights-activities",
    title: "Human Rights Activities",
    subtitle: "Value Education",
    description: "Every session conducted to build awareness of constitutional obligations, civic responsibility, and human rights on campus.",
    benefits: [
      "Human rights and value-education activities logged per academic year",
      "Session details captured for SSR evidence"
    ],
    imageSrc: `${naachome}/c7-human-rights-activities-preview.png`,
    imageAlt: "Human Rights Activities screen listing human rights and value education activities",
    imgPosition: "right"
  },
  {
    id: "c7-best-practices",
    title: "Best Practices",
    subtitle: "Institutional Best Practices",
    description: "The institution's two best practices — as capped by NAAC — recorded with objectives, the practice itself, and evidence of success.",
    benefits: [
      "Two best practices with objectives, description, and evidence of success",
      "Citation-ready narrative for SSR"
    ],
    imageSrc: `${naachome}/c7-best-practices-preview.png`,
    imageAlt: "Best Practices screen listing the institution's two best practices with objectives and evidence of success",
    imgPosition: "left"
  },
  {
    id: "c7-institutional-distinctiveness",
    title: "Institutional Distinctiveness",
    subtitle: "Vision & Thrust",
    description: "The one area most reflective of the institution's vision, with description, achievements, and future plans.",
    benefits: [
      "Distinctiveness area with achievements and future plans",
      "Citation-ready narrative for SSR"
    ],
    imageSrc: `${naachome}/c7-institutional-distinctiveness-preview.png`,
    imageAlt: "Institutional Distinctiveness screen listing the area distinctive to the institution's vision and thrust",
    imgPosition: "right"
  }
] : isDepartment ? [
  {
    id: "dept-step-coordinator-assignment",
    title: "Coordinator Assignment",
    subtitle: "Step 1 — Single Point of Ownership",
    description: "IQAC assigns a dedicated coordinator to every department, giving each unit clear ownership over its own NAAC data from the very start.",
    benefits: [
      "A named coordinator assigned per department",
      "Clear ownership established before data entry begins"
    ],
    imageSrc: `${naachome}/dept-step-coordinator-assignment.png`,
    imageAlt: "Coordinator Assignment screen showing a dedicated coordinator assigned to each department",
    imgPosition: "left"
  },
  {
    id: "dept-step-criterion-data-upload",
    title: "Criterion Data Upload",
    subtitle: "Step 2 — Data Enters Where It's Owned",
    description: "Assigned coordinators upload criterion-wise data for their department directly into the platform, keeping submissions structured and consistent across departments.",
    benefits: [
      "Criterion-wise data uploaded by each department's coordinator",
      "Consistent structure maintained across all departments"
    ],
    imageSrc: `${naachome}/dept-step-criterion-data-upload.png`,
    imageAlt: "Criterion Data Upload screen showing department coordinators entering criterion-wise data",
    imgPosition: "right"
  },
  {
    id: "dept-step-centralized-validation",
    title: "Centralized Validation",
    subtitle: "Step 3 — One Review Layer Catches Gaps Early",
    description: "IQAC reviews and validates every department submission against NAAC requirements before it counts, catching inconsistencies well before SSR compilation begins.",
    benefits: [
      "Every submission reviewed centrally by IQAC",
      "Gaps and inconsistencies flagged before compilation"
    ],
    imageSrc: `${naachome}/dept-step-centralized-validation.png`,
    imageAlt: "Centralized Validation screen showing IQAC reviewing department submissions against NAAC requirements",
    imgPosition: "left"
  },
  {
    id: "dept-step-ssr-preparation-handoff",
    title: "SSR Preparation Handoff",
    subtitle: "Step 4 — From Validated Data to SSR-Ready Dataset",
    description: "Once validated, data from every department is compiled and handed off as a single, SSR-ready dataset, with no last-minute reconciliation needed.",
    benefits: [
      "Validated data compiled into one unified dataset",
      "Handed off directly for SSR preparation"
    ],
    imageSrc: `${naachome}/dept-step-ssr-preparation-handoff.png`,
    imageAlt: "SSR Preparation Handoff screen showing validated department data compiled into a single SSR-ready dataset",
    imgPosition: "right"
  }
]

: isScholarship ? [
  {
    id: "scholarship-step-scheme-registration",
    title: "Scheme Registration",
    subtitle: "Step 1 — Every Scheme Defined Once, Up Front",
    description: "Government and institutional scholarship schemes are registered with their eligibility criteria defined from the start, giving every downstream step a single, reliable source of truth.",
    benefits: [
      "Govt and institutional schemes registered centrally",
      "Eligibility criteria defined at the point of registration"
    ],
    imageSrc:`${naachome}/scholarship-step-scheme-registration.png` ,
    imageAlt: "Scheme Registration screen showing government and institutional scholarship schemes with eligibility criteria",
    imgPosition: "left"
  },
  {
    id: "scholarship-step-beneficiary-mapping",
    title: "Beneficiary Mapping",
    subtitle: "Step 2 — The Right Students, Matched Automatically",
    description: "Eligible students are mapped to each scheme automatically based on category and criteria, removing manual cross-checking from beneficiary identification.",
    benefits: [
      "Students mapped to schemes by category and criteria",
      "Mapping done automatically, without manual cross-checking"
    ],
    imageSrc: `${naachome}/scholarship-step-beneficiary-mapping.png`,
    imageAlt: "Beneficiary Mapping screen showing eligible students mapped automatically to scholarship schemes",
    imgPosition: "right"
  },
  {
    id: "scholarship-step-disbursement-tracking",
    title: "Disbursement Tracking",
    subtitle: "Step 3 — Every Disbursement Logged as It Happens",
    description: "Disbursed amounts are tracked per beneficiary, scheme, and academic year in real time, so reporting never has to be reconstructed after the fact.",
    benefits: [
      "Amounts tracked per beneficiary, scheme, and academic year",
      "Disbursement data captured as it happens, not after"
    ],
    imageSrc: `${naachome}/scholarship-step-disbursement-tracking.png`,
    imageAlt: "Disbursement Tracking screen showing scholarship amounts tracked per beneficiary and academic year",
    imgPosition: "left"
  },
  {
    id: "scholarship-step-visibility-reporting",
    title: "Visibility & Reporting",
    subtitle: "Step 4 — From Tracked Data to a NAAC-Ready Report",
    description: "Consolidated scholarship data rolls up automatically into dashboards and NAAC-ready reports, giving IQAC a single, current view without manual compilation.",
    benefits: [
      "Consolidated dashboards built from tracked disbursement data",
      "NAAC-ready reports generated automatically"
    ],
    imageSrc: `${naachome}/scholarship-step-visibility-reporting.png`,
    imageAlt: "Visibility and Reporting screen showing consolidated scholarship dashboards and NAAC-ready reports",
    imgPosition: "right"
  }
] : [];
  const location = useLocation(); // Get the current URL

  useEffect(() => {
    // Get the query string (e.g., "?5")
    const queryString = location.search;

    // Extract the step manually if no key exists
    const stepMatch = queryString.match(/\?(\d+)/);
    const step = stepMatch ? parseInt(stepMatch[1], 10) : NaN;

    // Calculate scroll offset
    const scrollOffset = !isNaN(step) ? 700 + (step - 1) * 700 : 0;

    // Scroll the page
    if (scrollOffset > 0) {
      window.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  }, [location.search]);
  return <Container>{features.map(getFeatureContent)}</Container>;
};

export default FeatureDescription;