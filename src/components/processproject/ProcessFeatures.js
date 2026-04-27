import React, { useEffect } from 'react';
import styled from 'styled-components';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/ProductCategory.svg';
import img2 from '../../assets/img/ProcessInventorySetup.svg';
import img3 from '../../assets/img/EquipmentSetup.svg';
import img4 from '../../assets/img/DocumentSetup.svg';
import img5 from '../../assets/img/ActivitySetup.svg';
import img6 from '../../assets/img/ProcessSetup.svg';
import img7 from '../../assets/img/ProjectCreation.svg';
import img8 from '../../assets/img/UserActivity.svg';
import img9 from '../../assets/img/ProjectMangement.svg';
import img10 from '../../assets/img/ActivityDB.svg';
import img11 from '../../assets/img/ProjectDB.svg';
import img12 from '../../assets/img/ResourceUtilisationDB.svg';
import { useLocation } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #EAFCFF; 
  padding: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
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
    /* max-width: 500px; */
  }

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const BenefitsContainer = styled.div`
  /* background-color: #fff;
  border-color: #e8e8e9;
  border-radius: 20px;
  border-style: solid;
  border-width: 0.8px; */
  /* display: flex; */
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  line-height: 26px;
  padding: 24px;
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
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
    gap: 20px;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 400px; */
    gap: 8px;
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


const ProcessFeatures = ({ data }) => {
  const isClaim = data;
  const getFeatureContent = (feature) => (
    <Features>
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

  const features = isClaim === 'process'
    ? [
      {
        title: "Product Category Management",
        subtitle: "Organize Products with Ease",
        description:
          "Structure product categories to align operations and improve filtering and control.",
        benefits: [
          "Better product segmentation",
          "Easy product filtering",
          "Improved process alignment"
        ],
        imageSrc: img1,
        imageAlt: "Product Category",
        imgPosition: "right",
      },
      {
        title: "Smart Inventory Management",
        subtitle: "Structured Setup for Control",
        description:
          "Manage inventory with categorized items, location tracking, and centralized control.",
        benefits: [
          "Structured item categories",
          "Location-based tracking",
          "Centralized inventory control"
        ],
        imageSrc: img2,
        imageAlt: "Inventory Setup",
        imgPosition: "left",
      },
      {
        title: "Equipment Management",
        subtitle: "Track Usage and Availability",
        description:
          "Configure and manage equipment with scheduling, usage tracking, and load optimization.",
        benefits: [
          "Multi-equipment management",
          "Schedule and booking control",
          "Efficient load tracking"
        ],
        imageSrc: img3,
        imageAlt: "Equipment Setup",
        imgPosition: "right",
      },
      {
        title: "Document Configuration",
        subtitle: "Customize Reports with Ease",
        description:
          "Create and manage documents with real-time data insights for better decision-making.",
        benefits: [
          "Custom document setup",
          "Real-time data insights",
          "Improved reporting"
        ],
        imageSrc: img4,
        imageAlt: "Document Setup",
        imgPosition: "left",
      },
      {
        title: "Activity Management",
        subtitle: "Plan and Execute Efficiently",
        description:
          "Manage activities with resource allocation, equipment linking, and workflow customization.",
        benefits: [
          "Resource and item allocation",
          "Equipment integration",
          "Custom workflow setup"
        ],
        imageSrc: img5,
        imageAlt: "Activity Creation",
        imgPosition: "right",
      },
      {
        title: "Process Optimization",
        subtitle: "Streamline Manufacturing Workflows",
        description:
          "Create and manage processes with activity tracking, dependencies, and cost insights.",
        benefits: [
          "Define and track processes",
          "Manage activity dependencies",
          "Analyze costs and efficiency"
        ],
        imageSrc: img6,
        imageAlt: "Creation of Process",
        imgPosition: "left",
      }
    ] : isClaim === 'project' ? [
      {
        title: "Smart Work Order Management",
        subtitle: "From Sales to Execution",
        description:
          "Create projects directly from sales orders with auto-filled details and flexible customization.",
        benefits: [
          "Auto-linked sales orders",
          "Quick project setup",
          "Flexible customization"
        ],
        imageSrc: img7,
        imageAlt: "Project/Work Order Creation",
        imgPosition: "right",
      },
      {
        title: "Advanced Activity Tracking",
        subtitle: "Execute with Precision",
        description:
          "Manage activities with structured job cards, dependency tracking, and real-time inventory updates.",
        benefits: [
          "Structured job cards",
          "Dependency-based execution",
          "Real-time inventory tracking"
        ],
        imageSrc: img8,
        imageAlt: "User Activity Management",
        imgPosition: "left",
      },
      {
        title: "Quality & Compliance Tracking",
        subtitle: "Maintain Standards with Confidence",
        description:
          "Ensure consistent product quality and stay compliant with industry standards. Monitor quality checks, manage inspections, and keep records organized for better accountability.",
        benefits: [
          "Standardized quality checks",
          "Easy compliance management",
          "Clear audit records"
        ],
        imageSrc: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/qcdata.png",
        imageAlt: "Quality and Compliance Tracking",
        imgPosition: "right",
      },
      {
        title: "Manufacturing Costing & Margin Visibility",
        subtitle: "Control Costs, Improve Profitability",
        description:
          "Gain clear visibility into production costs and margins across every project. Monitor expenses, optimize resource usage, and make informed decisions to improve overall profitability.",
        benefits: [
          "Accurate cost breakdown",
          "Real-time margin insights",
          "Better resource utilization"
        ],
        imageSrc: img9,
        imageAlt: "Manufacturing Costing and Margin Visibility",
        imgPosition: "left",
      }
    ] : isClaim === 'activityreport' ? [
      {
        title: "Activity Dashboard",
        subtitle: "Track Tasks with Clarity",
        description:
          "Monitor activities, deadlines, and progress in real-time to keep projects on track and efficient.",
        benefits: [
          "Track ongoing & overdue tasks",
          "Real-time activity insights",
          "Smart filtering & sorting"
        ],
        imageSrc: img10,
        imageAlt: "User Activity Dashboard",
        imgPosition: "right",
      },
      {
        title: "Project Margin Dashboard",
        subtitle: "Maximize Profitability",
        description:
          "Compare planned vs actual margins with detailed cost and revenue insights for better decisions.",
        benefits: [
          "Margin comparison insights",
          "Revenue & cost breakdown",
          "Better profit control"
        ],
        imageSrc: img11,
        imageAlt: "Project Dashboard",
        imgPosition: "left",
      },
      {
        title: "Resource Utilization Dashboard",
        subtitle: "Optimize Resource Planning",
        description:
          "Analyze planned vs actual resource usage with detailed insights for efficient workload management.",
        benefits: [
          "Planned vs actual utilization",
          "User-level performance tracking",
          "Improved resource allocation"
        ],
        imageSrc: img12,
        imageAlt: "Resource Utilisation",
        imgPosition: "right",
      }
    ] : [
      {

        title: 'Activity Dashboards for Efficient Manufacturing Projects',
        subtitle: 'Track Activities and Ensure Operational Precision',
        description:
          'Atomwalk’s Activity Dashboard helps manufacturing teams efficiently track and manage tasks. Users can view assigned activities, track progress, and address overdue or pending tasks. Key metrics include overdue activities, upcoming deadlines, and completed milestones, with dynamic filters for quick sorting by date, type, or status. Designed to optimize workflows, the dashboard provides real-time access to activity details, ensuring seamless task execution and improved project efficiency in manufacturing operations.',
        benefits: ['Track personal activities, including ongoing, overdue, and completed tasks.', 'Access critical data like deadlines and completion statuses.', ' Access detailed project overviews, including overdue and future activities.', 'Sort activities by date, type, status, or assigned user for customized tracking.', 'Monitor progress, identify delays, and optimize task management.', ' Use dashboard insights to allocate resources effectively and meet deadlines.'],
        imageSrc: img10,  // Replace with relevant image variable for campaign execution
        imageAlt: 'User Activity Dashboard',
        imgPosition: 'right',
      },];

  const location = useLocation(); // Get the current URL
  useEffect(() => {
    // Get the query string (e.g., "?5")
    const queryString = location.search;

    // Extract the step manually if no key exists
    const stepMatch = queryString.match(/\?(\d+)/);
    const step = stepMatch ? parseInt(stepMatch[1], 10) : NaN;

    // Define base scroll offset values for each claim type
    const scrollOffsetMap = {
      process: 780,
      project: 800,
      activityreport: 870,
    };

    // Get the base offset value based on isClaim
    const baseScrollOffset = scrollOffsetMap[isClaim] || 0;

    // Calculate scroll offset
    const scrollOffset = !isNaN(step) ? baseScrollOffset + (step - 1) * baseScrollOffset : 0;

    // Scroll the page
    if (scrollOffset > 0) {
      window.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  }, [location.search, isClaim]); // Re-run when URL query changes


  return <Container>{features.map(getFeatureContent)}</Container>
}

export default ProcessFeatures