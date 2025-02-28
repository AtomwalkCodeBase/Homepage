import { useState } from "react"
import styled, { keyframes, css } from "styled-components"
import { ChevronDown, Sparkles } from "lucide-react"

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

// Styled components
const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7ff 0%, #e0e7ff 100%);
  padding: 3rem 1rem;
  position: relative;
  overflow: hidden;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
    z-index: 0;
  }
  
  &::before {
    top: -100px;
    left: -100px;
    animation: ${float} 8s ease-in-out infinite;
  }
  
  &::after {
    bottom: -100px;
    right: -100px;
    animation: ${float} 10s ease-in-out infinite reverse;
  }
`

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
`

const Title = styled.h1`
  font-size: 2.75rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    border-radius: 2px;
  }
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 600px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
`

const SparkleIcon = styled(Sparkles)`
  position: absolute;
  color: #4f46e5;
  animation: ${float} 3s ease-in-out infinite;
`

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const FAQItem = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  background: white;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.5s forwards;
  animation-delay: ${(props) => props.delay}ms;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`

const QuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1f2937;
  transition: all 0.3s ease;
  
  &:hover {
    color: #4f46e5;
  }
  
  ${(props) =>
    props.isOpen &&
    css`
    color: #4f46e5;
    background: linear-gradient(90deg, rgba(79, 70, 229, 0.08) 0%, rgba(79, 70, 229, 0) 100%);
  `}
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => (props.isOpen ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" : "#f3f4f6")};
  color: ${(props) => (props.isOpen ? "white" : "#6b7280")};
  transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  
  &:hover {
    animation: ${pulse} 1.5s infinite;
  }
`

const Answer = styled.div`
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s;
  padding: ${(props) => (props.isOpen ? "0 1.5rem 1.5rem" : "0 1.5rem")};
  color: #4b5563;
  line-height: 1.7;
  font-size: 1.05rem;
  
  p {
    margin-top: 0;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transform: translateY(${(props) => (props.isOpen ? "0" : "-10px")});
    transition: opacity 0.4s ease-in, transform 0.4s ease-in;
    transition-delay: ${(props) => (props.isOpen ? "0.2s" : "0")};
    border-left: 3px solid #e0e7ff;
    padding-left: 1rem;
    background: linear-gradient(90deg, rgba(224, 231, 255, 0.3) 0%, rgba(224, 231, 255, 0) 100%);
    border-radius: 0 8px 8px 0;
    padding: 0.75rem 1rem;
  }
`

const GradientButton = styled.button`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.2) 25%, 
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(255, 255, 255, 0) 100%);
    animation: ${shimmer} 3s infinite;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  animation: ${fadeIn} 1s ease-out;
  animation-delay: 0.8s;
  opacity: 0;
  animation-fill-mode: forwards;
`

// FAQ data
const faqData = [
    { id:1,question: "What is CRM, and how does it help my business?", answer: "Customer Relationship Management (CRM) solution manages Lead, Customer and Channel Partner data efficiently on a real time basis and can be accessed by all the stakeholders. Hence eliminating the risk of duplication of data . Operations like lead and customer tasks and Campaign Management can be tracked/completed efficiently. By consolidating these functions, CRM enhances customer satisfaction, boosts sales effectiveness, and improves overall business efficiency, leading to better customer retention and increased profitability." },
    { id:2,question: "Who can benefit from using the CRM module?", answer: "The CRM module benefits a wide range of users across various roles within an organization, including sales teams, customer service representatives, marketing departments, channel partners, and managers. Sales teams can use it to manage leads, track opportunities, and enhance customer interactions. Customer service representatives benefit from improved case management and better tracking of customer issues. Marketing departments can leverage CRM for targeted campaigns, lead nurturing, and performance tracking. Channel partners gain from streamlined lead distribution and incentive management. Managers benefit from comprehensive insights into sales performance, customer satisfaction, and team productivity, enabling them to make informed decisions and drive business growth." },
    { id:3,question: "How can I add or update customer details?", answer: "To add or update customer details, navigate to the CRM section in the left menu and select the ‘Customer List’ tab. A comprehensive list of customers will be displayed. To update an existing customer’s information, click on the desired customer’s name to view their details. You will then find an “Update” button; click this to access and modify any of the fields as needed. After making the required changes, simply click “Save” to update the customer details. To add a new customer, click the “Add Customer” button located in the top-right corner of the screen. Fill out the necessary details in the provided fields and click “Save” to record the new customer. The newly added customer will now appear in the Customer Details screen." },
    { id:4,question: "Can I import/export customer data?", answer: "Yes, you can import and export customer data. On the Customer Details page, there is an option available in the top right corner. To import data, simply click on the “Upload” option, and then provide the necessary details in the format required. After submitting the information, the system will fetch and upload the customer data into the CRM. To export data, a similar process can be followed from the same menu, allowing you to download customer details in a compatible format for backup or external use. This feature ensures seamless management of customer information across your business systems." },
    { id:5,question: "Does the CRM support customer segmentation?", answer: "Yes, our CRM supports customer segmentation through fields like Customer Group, and Customer Group (Secondary). While adding a new customer, you can assign values to these fields to categorize customers based on your segmentation criteria. This enables you to organize customers effectively, tailor your marketing strategies, and provide personalized services based on their group or type." },
    { id:6,question: "How can I track sales leads in the CRM?", answer: "To track sales leads in the CRM, navigate to the CRM section from the left menu and select the Leads tab. Here, you can view all your leads in a centralized dashboard, organized by their status in the sales pipeline. Each lead entry provides details like contact information, lead source, and current stage. You can update the status of a lead as it progresses through the sales funnel, add notes or tasks for follow-ups, and scheou to focus on high-priority opportunities. This streamlined process ensures efficient tracking and management of sales leads." },
    { id:7,question: "Can I create and send marketing campaigns through the CRM?", answer: "Yes, you can create and send marketing campaigns through the CRM. Users can choose to create custom templates or use system-generated templates for their campaigns. To get started, navigate to the CRM section in the left panel and click on Customer Campaigns. This will display a list of existing campaigns. To create a new one, click on the Add Campaign button in the top right corner. Fill in all the " },
    { id:8,question: "Does it support email templates and personalization?", answer: "Yes, the CRM supports email templates and personalization. You can create custom email templates or use predefined system templates to streamline your marketing and communication efforts. These templates can be personalized by including dynamic fields such as the recipient’s name, company, or other customer-specific details, ensuring each email feels tailored and relevant. This functionality makes it easy to maintain consistency in branding while delivering a personalized experience to your audience. Additionally, templates can be saved for reuse, improving efficiency and enhancing the effectiveness of your email campaigns." },
    { id:9,question: "How can I track campaign performance?", answer: "You can track campaign performance easily within the CRM. When creating a campaign, there are two options: Response Yes Button Text and Response No Button Text, where you can specify the labels for user reactions, such as Like and Dislike or any other relevant terms. Once the campaign is sent, recipients can interact with these buttons. To view the responses, go to the campaign list and click on List Responses for the specific campaign. This will display all the recipient responses, allowing you to gauge the campaign's success and gather valuable feedback for future improvements."},
    { id:10,question: "Can I automate customer lifecycle management? ", answer: "Yes, the CRM allows you to automate customer lifecycle management. It enables you to set up automated workflows that manage the entire customer journey from initial lead capture, through the sales process, to customer onboarding, and ongoing relationship management. You can automate follow-up actions, send personalized communications, track customer interactions, and manage renewals or upgrades based on predefined criteria. This automation ensures a consistent and efficient approach to managing customer relationships, enhances customer satisfaction, and drives retention and growth throughout the customer lifecycle."},
    { id:11,question: "Can I add custom fields or modules?", answer: "Yes, the CRM allows you to add custom fields or modules to tailor the system to your specific business needs. You can create and modify custom fields for existing modules, such as adding additional contact details, notes, or custom attributes related to leads, customers, or opportunities. Additionally, you can create entirely new modules to track unique data or processes specific to your business, such as custom project tracking or additional support metrics. These customizations enable the CRM to align more closely with your workflows and data management requirements, enhancing its functionality and usability."},
    { id:12,question: "How can I track campaign performance?", answer: ""},
]

export default function Commonfnadq() {
  const [openItems, setOpenItems] = useState([]);
  const [expandAll, setExpandAll] = useState(false)

  const toggleItem = (id) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    setExpandAll(!expandAll)
    if (!expandAll) {
      setOpenItems(faqData.map((item) => item.id))
    } else {
      setOpenItems([])
    }
  }

  return (
    <PageBackground>
      <FAQContainer>
        <FAQHeader>
          <SparkleIcon size={24} style={{ top: 10, left: "30%" }} />
          <SparkleIcon size={18} style={{ top: 40, right: "28%" }} />
          <Title>Frequently Asked Questions</Title>
          <Subtitle>Find answers to common questions about our products, services, and how we can help you.</Subtitle>
        </FAQHeader>

        <FAQList>
          {faqData.map((item, index) => (
            <FAQItem key={item.id} delay={200 + index * 100}>
              <QuestionButton isOpen={openItems.includes(item.id)} onClick={() => toggleItem(item.id)}>
                {item.question}
                <IconWrapper isOpen={openItems.includes(item.id)}>
                  <ChevronDown size={18} />
                </IconWrapper>
              </QuestionButton>

              <Answer isOpen={openItems.includes(item.id)}>
                <p>{item.answer}</p>
              </Answer>
            </FAQItem>
          ))}
        </FAQList>

        <ButtonContainer>
          <GradientButton onClick={toggleAll}>{expandAll ? "Collapse All" : "Expand All"}</GradientButton>
        </ButtonContainer>
      </FAQContainer>
    </PageBackground>
  )
}

