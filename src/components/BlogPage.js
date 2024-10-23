import React from 'react';
import styled from 'styled-components';

// Sample Images (Replace with actual image paths)
// import workforceImage from './workforceImage.jpg';
// import leaveManagementImage from './leaveManagementImage.jpg';
// import claimProcessingImage from './claimProcessingImage.jpg';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 20px 0;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  text-align: center;
  margin: 30px 0;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const BlogPage = () => {
  return (
    <Container>
      <Title>Revolutionize Workforce Management with Atomwalk HRM On-The-Go</Title>
      
      <ImageWrapper>
        <img src="https://www.dnkinfotelecom.com.br/wp-content/uploads/2021/01/WFM.png" alt="Workforce Management" />
      </ImageWrapper>
      
      <Paragraph>
        Managing a dynamic workforce has never been easier. Atomwalk HRM On-The-Go empowers businesses to streamline their HR processes with smart, mobile-first solutions that work in real-time. Designed for today’s fast-paced and distributed workforce, the app ensures that every aspect of employee management is simplified and efficient.
      </Paragraph>

      <Paragraph>
        With our app, employees can check-in and check-out seamlessly using the built-in location tracking feature. No more outdated manual attendance records or guesswork. Our real-time GPS location tracking ensures 100% accuracy in attendance management, making it easier than ever for employees to log their presence from any location. This is especially useful for remote teams or employees who are frequently on the move.
      </Paragraph>

      <Paragraph>
        Not only does Atomwalk HRM help track attendance, but it also offers employees a smart status calendar view, providing them with a clear visual of their attendance history. Employees can easily monitor their hours, check for missed check-ins, and stay on top of their time management. This improves transparency and promotes accountability across the workforce.
      </Paragraph>

      <Paragraph>
        For managers, Atomwalk HRM provides a bird's-eye view of attendance trends, helping you make informed decisions about staffing and time-off management. With comprehensive reports and insights, you can ensure that your team stays productive and compliant, no matter where they are working from.
      </Paragraph>

      <SectionTitle>Seamless Leave and Claim Management Anytime, Anywhere</SectionTitle>
      
      <ImageWrapper>
        <img src="https://media.licdn.com/dms/image/D5612AQG26zqve50FHQ/article-cover_image-shrink_720_1280/0/1693328750791?e=2147483647&v=beta&t=U9v7s3R6xZco5ui_VMkZKcRfJB4I9PiJ40m8pDj4uUk" alt="Leave Management" />
      </ImageWrapper>
      
      <Paragraph>
        Say goodbye to paperwork and complicated approval workflows. With Atomwalk HRM On-The-Go, employees can apply for leave directly from the app—whether it's Earned Leave, Loss of Pay, or Work From Home. Managers are immediately notified of these requests and can approve, reject, or provide feedback within seconds, drastically reducing approval delays and ensuring that time-off requests are handled smoothly.
      </Paragraph>

      <Paragraph>
        Employees can track their leave status, check remaining leave balances, and even plan future leave requests with ease. Whether they are on the go or at the office, managing time-off has never been this intuitive.
      </Paragraph>

      <Paragraph>
        But that’s not all. Expense claims are also made simple with Atomwalk HRM. Employees can submit claims by uploading receipts directly from their phone’s storage or by capturing real-time photos of bills and receipts using their mobile device. The app allows them to itemize and categorize expenses, ensuring a smooth submission process.
      </Paragraph>

      <ImageWrapper>
        <img src='https://www.cflowapps.com/wp-content/uploads/2023/02/clms_prcsautomtn.jpg' alt="Claim Processing" />
      </ImageWrapper>
      
      <Paragraph>
        For managers, reviewing claims is equally streamlined. The app enables them to review all supporting documents and approve, reject, or send the claim back for revisions based on their approval limits. This eliminates the hassle of chasing down paper receipts or emails, speeding up the reimbursement process.
      </Paragraph>

      <Paragraph>
        Atomwalk HRM On-The-Go enhances efficiency across the board, empowering employees and managers to handle their HR tasks anytime, anywhere, all from their mobile device. It’s more than just an app—it’s a complete HR solution in your pocket.
      </Paragraph>

      <SectionTitle>Why Choose Atomwalk HRM On-The-Go?</SectionTitle>
      
      <ul style={{color:"black"}}>
        <li>Real-Time Location Tracking: Know exactly where your team is clocking in from with precise GPS-enabled check-ins and check-outs.</li>
        <li>Comprehensive Attendance Management: Track attendance trends, generate reports, and make data-driven decisions to optimize workforce management.</li>
        <li>Smart Leave Management: Apply, review, and manage leave requests instantly, ensuring that your team always operates at peak efficiency.</li>
        <li>Efficient Claim Processing: Submit, review, and approve expense claims with ease, all from your mobile device.</li>
        <li>Managerial Control: Managers have access to insightful dashboards for approvals, employee data, and team performance, all at their fingertips.</li>
      </ul>
      
      <Paragraph>
        Atomwalk HRM On-The-Go transforms tedious HR tasks into quick, seamless interactions. Whether you’re a growing business or managing a large distributed team, Atomwalk HRM has you covered.
      </Paragraph>
    </Container>
  );
};

export default BlogPage;
