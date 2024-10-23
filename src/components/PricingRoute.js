import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
// import "@fontsource/Centra";
import HeadBG from '../assets/img/pricingelusrtion.png';
import Logo1 from '../assets/img/logo1.png';
import Logo2 from '../assets/img/logo2.png';
import Logo3 from '../assets/img/logo3.png';
import PricingTableComponent from './PricingTableComponent';
import Testimonial from './Testimonial';

const Page = styled.div`
  background-color: white;
  color: blue;
  width: 100%;
  /* padding-top: 10px; */
  padding-bottom: 10px;
  /* height: 1472px; */
`;

const Header = styled.div`
  height: 472px;
  background-color: white;
  color: blue;
  display: flex;
  justify-content: center;
  
  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    height: auto; /* Allow height to adjust based on content */
   // padding: 20px; /* Add some padding for smaller screens */
  }
`;

const HeadBox = styled.div`
  height: 125%;
  width: 100%;
  background-color: #96ddbc;
  padding: 90px;
  padding-top: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  
  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    padding: 20px; /* Reduce padding for smaller screens */
    padding-top: 50px; /* Adjust top padding */
    flex-direction: column; /* Stack items vertically */
    justify-content: center; /* Center items */
    align-items: center; /* Center items */
  }
`;

const HeadTextArea = styled.div`
  color: #1c1b1f;
  font-family: Centra;
  font-size: 51.008px;
  font-weight: 400;
  line-height: 61.2px;
  margin-left: 40px;
  margin-top: 25px;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    font-size: 32px; /* Reduce font size for smaller screens */
    line-height: 38px; /* Adjust line height accordingly */
    margin-left: 0px; /* Center text by removing left margin */
    margin-top: 40px; /* Adjust top margin */
    text-align: center; /* Center align the text */
  }
`;



const HeadTextOne = styled.div`
  color: #1c1b1f;
  font-family: Centra;
  font-size: 51.008px;
  font-weight: 600;
  line-height: 61.2px;
  margin: 0px 0px 16px;
`;

const HeadPara = styled.p`
  color: #1c1b1f;
  width: 65%;
  font-size: 21px;
  word-wrap: normal;
  line-height: 31.504px;
  margin: 0px 0px 24px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeadImageArea = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;
  width: 60%;
  line-height: 26px;
  padding: 44px 0px 0px;
`;

const ButtonOne = styled.button`
  align-items: center;
  background-color: #aa00ea;
  border-color: #f3a3ff;
  border-radius: 100px;
  border-style: solid;
  border-width: 1.6px;
  color: #fff;
  font-weight: 500;
  line-height: 24px;
  padding: 14px 32px;
  text-align: center;
`;

const ButtonText = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
`;

const HeadImage = styled.div`
  line-height: 26px;
  img {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }
`;

const PlanArea = styled.div`
  line-height: 26px;
  margin: 144px 0px;
  width: 100%;
  margin-top: 180px;
  @media (max-width:768px) {
    margin-top: 70px;
  }
`;

const TitleOne = styled.h2`
  color: #1c1b1f;
  font-size: 38px;
  font-weight: 600;
  line-height: 45.6px;
  margin: 0px 0px 24px;
  text-align: center;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    font-size: 28px; /* Reduce font size for smaller screens */
    line-height: 34px; /* Adjust line height accordingly */
    margin: 0px 0px 16px; /* Reduce bottom margin */
    text-align: center;
  }
`;

const TitleTwo = styled.span`
  color: #8900c4;
  display: inline;
  font-size: 38px;
  font-weight: 600;
  line-height: 45.6px;
  text-align: center;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    font-size: 28px; /* Reduce font size for smaller screens */
    line-height: 34px; /* Adjust line height accordingly */
  }
`;

const TitlePara = styled.div`
  color: #1c1b1f;
  line-height: 24px;
  margin: 0px 417.788px 48px 417.775px;
  text-align: center;
  @media (max-width: 768px) {
    margin: 0px ;
  }
`;

const TableWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  margin-top: 30px;
  max-height: 600px;
  overflow-y: auto;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  position: relative;
`;

const Th = styled.th`
  background-color: #FCE6FF;
  color: #1c1b1f;
  padding: 50px 20px;
  font-size: larger;
  text-align: center;
  border: 2px solid #8900c4;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const Td = styled.td`
  padding: 20px;
  text-align: left;
  border: 1px solid #ddd;
`;

const PricingRoute = () => {
  const data = useMemo(
    () => [
      {
        modulePlane: 'Number of Employees',
        starter: 'Limited',
        essential: 'Unlimited',
        growth: 'Unlimited',
        enterprise: 'Unlimited',
      },
      {
        modulePlane: 'Cost Per Additional Employee',
        starter: 'Not Applicable',
        essential: '₹30/ month',
        growth: '₹60/ month',
        enterprise: '₹100/ month',
      },
      {
        modulePlane: 'Core HR',
        starter: 'Limited',
        essential: '✓',
        growth: '✓',
        enterprise: '✓',
      },
      // Add more rows as needed
    ],
    []
  );
  
const Counnt=styled.div`
color: #454545;
font-size: 15px;
margin-bottom: 5px;
`
  const columns = useMemo(
    () => [
      {
        Header: 'Modules and Features',
        accessor: 'modulePlane',
      },
      {
        Header: (
          <>
            <div>Starter</div>
            <div>₹ 0 / month</div>
            <Counnt>(Includes 25 Employees)</Counnt>
            <ButtonOne>Start Free Trial</ButtonOne>
          </>
        ),
        accessor: 'starter',
      },
      {
        Header: (
          <>
            <div>Essential</div>
            <div>₹ 3495 / month</div>
            <Counnt>(Includes 50 Employees)</Counnt>
            <ButtonOne>Start Free Trial</ButtonOne>
          </>
        ),
        accessor: 'essential',
      },
      {
        Header: (
          <>
            <div>Growth</div>
            <div>₹ 5495 / month</div>
            <Counnt>(Includes 50 Employees)</Counnt>
            <ButtonOne>Start Free Trial</ButtonOne>
          </>
        ),
        accessor: 'growth',
      },
      {
        Header: (
          <>
            <div>Enterprise</div>
            <div>₹ 7495 / month</div>
            <Counnt>(Includes 50 Employees)</Counnt>
            <ButtonOne>Start Free Trial</ButtonOne>
          </>
        ),
        accessor: 'enterprise',
      },
    ],
    []
  );
  
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const AddOnData = styled.div`
  display: flex;
  gap: 12px;
  line-height: 26px;
  margin: 0px 141.6px 144px;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    flex-direction: column; /* Stack the left and right sections vertically */
    margin: 0px 16px 24px; /* Reduce margins to fit mobile screens */
    gap: 8px; /* Reduce gap for more compact layout */
  }
`;

const AddOnLeft = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 26px;
  width: 50%;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    width: 100%; /* Take full width on mobile */
  }
`;

const AddOnRight = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 26px;
  width: 50%;

  /* Adjustments for mobile devices */
  @media (max-width: 768px) {
    width: 100%; /* Take full width on mobile */
  }
`;

  const BoxOne = styled.div`
  line-height: 26px;
  margin: 0px 0px 48px;
  `;
  const AddOnTitle = styled.div`
  color: #1c1b1f;
  font-family: Centra;
  font-size: 38px;
  font-weight: 600;
  line-height: 45.6px;
  margin: 0px 0px 32px;
  @media (max-width: 768px) {
    text-align: center;
  }
  `;
  const BoxTitle = styled.h5`
  color: #8900c4;
  font-family: Centra;
  font-size: 21.008px;
  font-weight: 600;
  line-height: 24px;
  `;
  const BoxHeading = styled.h6`
  color: #1c1b1f;
font-family: Centra;
font-weight: 600;
line-height: 19.2px;
  `;
  const BoxPara = styled.span`
  color: #1c1b1f;
  font-weight: normal;
  font-size: 17px;
  font-weight: 500;
  line-height: 18px;
  `;
  const BoxOnePara = styled.span`
  color: #1c1b1f;
font-size: 21.008px;
line-height: 31.504px;
@media (max-width: 768px) {
  text-align: center;
    display: flex;
    align-items: center;
}
  `;
  const BoxTwo = styled.div`
  background-color: #eefaf4;
  border-radius: 16px;
  line-height: 26px;
  margin: 0px 0px 12px;
  padding: 24px 32px;
  `;

  const BoxThree = styled.div`
  background-color: #fff8e6;
  border-radius: 16px;
  line-height: 26px;
  margin: 0px 0px 12px;
  padding: 24px 32px;
  `;
  const BoxFour = styled.div`
  background-color: #e6ffff;
  border-radius: 16px;
  line-height: 26px;
  margin: 0px 0px 12px;
  padding: 24px 32px;
  `;
  const BoxFive = styled.div`
  background-color: #fce6ff;
  border-radius: 16px 16px 0px 0px;
  line-height: 26px;
  padding: 24px 32px;
  `;
  const BoxSix = styled.div`
    border-color: #e8e8e9;
    border-radius: 0px 0px 16px 16px;
    border-style: solid;
    border-width: 0.8px;
    line-height: 26px;
    padding: 36px 158px 36px 48px;
  `;

  const ListSpace = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    line-height: 26px;
  `;
  const ListRow = styled.div`
    display: flex;
    line-height: 26px;
  `;
  const ListDot = styled.div`
    background-color: #76d3a8;
    border-radius: 50%;
    display: flex;
    line-height: 26px;
    margin: 8px 8px 0px 0px;
    width: 10px;
    height: 10px;
  `;
  const ListText = styled.li`
    display: list-item;
    line-height: 26px;
    list-style: none;
    text-align: left;
  `;
  const Feature = styled.div`
  align-items: center;
display: flex;
flex-direction: column;
justify-content: center;
line-height: 26px;
margin: 144px 71.04px;
  `;
  const FeatureBoxArea = styled.div`
  align-items: center;
display: flex;
flex-wrap: wrap;
gap: 16px;
justify-content: center;
line-height: 26px;
  `;
  const FeatureBox = styled.div`
    background-color: #eefaf4;
    border-radius: 20px;
    line-height: 26px;
  `;
  const FeatureBoxInner = styled.div`
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 26px;
  margin: 24px 0px;
  `;
  const SubTitle = styled.h3`
    color: #1c1b1f;
    font-family: Centra;
    font-size: 28px;
    font-weight: 500;
    line-height: 33.6px;
    text-align: center;
  `;
  const FeatureImage = styled.div`
    border-radius: 12px;
    display: inline;
    line-height: 26px;
    img {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }
  `;
  
const demo =()=>{
  window.location.href='/demo.html'
}
  return (
    <Page>
      <Header>
        <HeadBox>
          <HeadTextArea>
            <HeadTextOne>Take Our Pricing Challenge!</HeadTextOne>
            <HeadPara>
              23000+ companies endorse Atomwalk for exceptional software, support
              and service. Starting at INR 30/employee - the lowest license
              costs in its category
            </HeadPara>
            <ButtonOne onClick={demo}>
              <ButtonText>Discuss Price</ButtonText>
            </ButtonOne>
          </HeadTextArea>
          <HeadImageArea>
            <HeadImage>
              <img src={HeadBG} alt="Pricing Challenge Background" />
            </HeadImage>
          </HeadImageArea>
        </HeadBox>
      </Header>

      <PlanArea>
        <TitleOne>
          Choose the best plan <TitleTwo>for you</TitleTwo>
        </TitleOne>
        <TitlePara>
          Atomwalk offers plans for Small, Mid and Large businesses. Our plans
          differ in features, customisation options and fitment for different
          industries. View all features at once, or pick a module and compare
          plan-wise features
        </TitlePara>
        <TableWrapper>
          <Table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <Th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </Th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
      </PlanArea>
      <AddOnData>
              <AddOnLeft>
                <BoxOne>
                <AddOnTitle>Some <TitleTwo>greyt Add-ons</TitleTwo> to go?</AddOnTitle>
                <BoxOnePara>Give your Atomwalk account actual superpowers! Explore plan Add-Ons for attendance, performance management and employee engagement.</BoxOnePara>
                </BoxOne>
                <BoxTwo>
                  <BoxTitle>Performance Management System</BoxTitle>
                  <BoxHeading>Starts at ₹3000 for 50 employees</BoxHeading>
                  <BoxPara>360° Reportee-Manager Feedback and Reviews</BoxPara>
                </BoxTwo>
                <BoxThree>
                  <BoxTitle>Visage</BoxTitle>
                  <BoxHeading>₹20/user/month</BoxHeading>
                  <BoxPara>Al-powered Facial Recognition-Based attendance Marking</BoxPara>
                </BoxThree>
              </AddOnLeft>
              <AddOnRight>
                <BoxFour>
                  <BoxTitle>Visage</BoxTitle>
                  <BoxHeading>₹20/user/month</BoxHeading>
                  <BoxPara>Al-powered Facial Recognition-Based attendance Marking</BoxPara>
                </BoxFour>
                <BoxFive>
                <BoxTitle>Visage</BoxTitle>
                  <BoxHeading>₹20/user/month</BoxHeading>
                  <BoxPara>Al-powered Facial Recognition-Based attendance Marking</BoxPara>
                </BoxFive>
                <BoxSix>
                  <ListSpace>
                    <ListRow>
                      <ListDot></ListDot>
                      <ListText>GPS-based Attendance Marking</ListText>
                    </ListRow>
                    <ListRow>
                      <ListDot></ListDot>
                      <ListText>Workflows for Manager Review</ListText>
                    </ListRow>
                    <ListRow>
                      <ListDot></ListDot>
                      <ListText>Attendance Scheme-level Customizations</ListText>
                    </ListRow>
                    <ListRow>
                      <ListDot></ListDot>
                      <ListText>Geo Swipe Reports for Due Diligence</ListText>
                    </ListRow>
                  </ListSpace>
                </BoxSix>
              </AddOnRight>
      </AddOnData>

      <Feature>
      <TitleOne><TitleTwo>Exceptional software</TitleTwo> doesn't have to come at a cost</TitleOne>
      <TitlePara>Atomwalk offers the lowest cost-per-license (PEPM) in category</TitlePara>
        <FeatureBoxArea>
              <FeatureBox>
                <FeatureBoxInner>
                  <FeatureImage><img src={Logo1} alt="Feature Box" /></FeatureImage>
                  <TitleOne>77.78% lower cost</TitleOne>
                  <SubTitle>than Zoho</SubTitle>
                </FeatureBoxInner>
              </FeatureBox>
              <FeatureBox>
              <FeatureBoxInner>
                  <FeatureImage><img src={Logo2} alt="Feature Box" /></FeatureImage>
                  <TitleOne>183.33% lower cost</TitleOne>
                  <SubTitle>than HROne</SubTitle>
                </FeatureBoxInner>
              </FeatureBox>
              <FeatureBox>
              <FeatureBoxInner>
                  <FeatureImage><img src={Logo3} alt="Feature Box" /></FeatureImage>
                  <TitleOne>50% lower cost</TitleOne>
                  <SubTitle>than Keka</SubTitle>
                </FeatureBoxInner>
              </FeatureBox>
        </FeatureBoxArea>
      </Feature>

      <Testimonial></Testimonial>
    </Page>
  );
};

export default PricingRoute;
