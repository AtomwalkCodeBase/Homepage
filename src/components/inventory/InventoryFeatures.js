import React, { useEffect } from 'react';
import styled from 'styled-components';
import CheckMark from '../../assets/img/check_mark.png';
import img1 from '../../assets/img/ProcessInventorySetup.svg';
import img2 from '../../assets/img/Inventory_item.svg';
import img4 from '../../assets/img/OrderIn.svg';
import img5 from '../../assets/img/PhysicalInspection.svg';
import img6 from '../../assets/img/DecreaseItem.svg';
import img7 from '../../assets/img/StockItemReport.svg';
import img8 from '../../assets/img/ValuationReport.svg';
import img9 from '../../assets/img/ExpiryReport.svg';
import img10 from '../../assets/img/StockSafety.svg';
import img11 from '../../assets/img/aging.svg';
import { useLocation } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #D0FEF9; 
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


const InventoryFeatures = ({ data }) => {
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

  const features = isClaim === 'inventoryop'
    ? [
      {
        title: "Smart Inventory Management",
        subtitle: "Structured Setup for Better Control",
        description:
          "Organize and manage inventory with structured categories, location-wise tracking, and detailed item mapping for seamless operations.",
        benefits: [
          "Structured item categorization",
          "Location-based inventory tracking",
          "Centralized item management"
        ],
        imageSrc: img1,
        imageAlt: "Inventory Setup",
        imgPosition: "right"
      },
      {
        title: "Flexible Item Management",
        subtitle: "Track and Customize with Ease",
        description:
          "Manage inventory with batch tracking, supplier mapping, and customizable fields for a flexible, real-time experience.",
        benefits: [
          "Batch & expiry tracking",
          "Supplier-linked inventory",
          "Custom fields for flexibility"
        ],
        imageSrc: img2,
        imageAlt: "Inventory Item",
        imgPosition: "left"
      },
      {
        title: "Real-Time Stock Updates",
        subtitle: "Seamless Purchase Integration",
        description:
          "Automatically update inventory during goods receipt with accurate quantity and BIN location tracking.",
        benefits: [
          "Auto stock updates on receipt",
          "BIN location allocation",
          "Accurate real-time tracking"
        ],
        imageSrc: img4,
        imageAlt: "Increment of Inventory",
        imgPosition: "right"
      },
      {
        title: "Accurate Inventory Control",
        subtitle: "Physical Verification Made Simple",
        description:
          "Ensure stock accuracy with quick physical inspections and real-time adjustments to match actual inventory.",
        benefits: [
          "Easy stock verification",
          "Real-time adjustments",
          "Improved inventory accuracy"
        ],
        imageSrc: img5,
        imageAlt: "Physical Inspection",
        imgPosition: "left"
      },
      {
        title: "Automated Stock Movement",
        subtitle: "Track Usage and Plan Ahead",
        description:
          "Automatically adjust inventory during sales and work orders while maintaining full visibility of stock usage.",
        benefits: [
          "Auto stock deduction",
          "FIFO-based allocation",
          "Clear usage tracking"
        ],
        imageSrc: img6,
        imageAlt: "Decrement of Inventory",
        imgPosition: "right"
      }
    ]
    : isClaim === 'inventoryreport' ? [
      {
        title: "Smart Stock Insights",
        subtitle: "Track Inventory with Clarity",
        description:
          "Filter and analyze inventory by category, item, or date with detailed batch-level tracking for better decisions.",
        benefits: [
          "Advanced filtering options",
          "Real-time stock movement tracking",
          "Batch-level visibility"
        ],
        imageSrc: img7,
        imageAlt: "Stock Item Report",
        imgPosition: "right",
      },
      {
        title: "Accurate Valuation Tracking",
        subtitle: "Batch-Level Financial Insights",
        description:
          "Monitor inventory valuation with detailed batch insights including pricing, quantities, and stock flow.",
        benefits: [
          "Batch-wise valuation tracking",
          "Pricing and quantity insights",
          "Better financial planning"
        ],
        imageSrc: img8,
        imageAlt: "Valuation Report",
        imgPosition: "left",
      },
      {
        title: "Smart Expiry Management",
        subtitle: "Stay Ahead of Expiring Stock",
        description:
          "Track expiring inventory with smart filters and batch-level visibility to reduce waste and improve control.",
        benefits: [
          "Expiry tracking by time range",
          "Batch-level expiry visibility",
          "Reduced inventory wastage"
        ],
        imageSrc: img9,
        imageAlt: "Expiry Report",
        imgPosition: "right",
      },
      {
        title: "Safety Stock Dashboard",
        subtitle: "Maintain Optimal Inventory Levels",
        description:
          "Monitor stock levels with real-time insights and ensure timely replenishment to avoid stockouts.",
        benefits: [
          "Real-time stock insights",
          "Minimum level alerts",
          "Improved stock planning"
        ],
        imageSrc: img10,
        imageAlt: "Safety Stock Report",
        imgPosition: "left",
      },
      {
        title: "Stock Aging Insights",
        subtitle: "Optimize Inventory Movement",
        description:
          "Track stock aging to identify slow-moving items and improve turnover with data-driven decisions.",
        benefits: [
          "Aging-based stock analysis",
          "Identify slow-moving items",
          "Optimize inventory flow"
        ],
        imageSrc: img11,
        imageAlt: "Stock Aging Report",
        imgPosition: "right",
      }
    ] : [
      {

        title: 'Wire House Management',
        subtitle: 'Wire House Management Subtitle',
        description:
          'Wire House Management Description',
        benefits: ['Wire House Management Benifits 1', 'Wire House Management Benifits 2',],
        imageSrc: img1,  // Replace with relevant image variable for campaign execution
        imageAlt: 'Wire House Management',
        imgPosition: 'right',
      },

    ];

  const location = useLocation(); // Get the current URL
  useEffect(() => {
    // Get the query string (e.g., "?5")
    const queryString = location.search;

    // Extract the step manually if no key exists
    const stepMatch = queryString.match(/\?(\d+)/);
    const step = stepMatch ? parseInt(stepMatch[1], 10) : NaN;

    // Define base scroll offset values for each claim type
    const scrollOffsetMap = {
      inventoryop: 820,
      inventoryreport: 800,
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

export default InventoryFeatures