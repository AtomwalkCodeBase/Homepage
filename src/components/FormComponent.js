import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Background from './../assets/img/Backgroundyellow.jpg'
import axios from "axios";
import Success from './SuccessBanner';
// Styled Components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, rgb(237, 245, 255), #ffffff);
  background-image: url(${Background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const FormWrapper = styled.div`
  background-color: #e1fff6;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 20px;
  margin-top: 100px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #777777;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: #454545;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333333;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333333;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333333;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  gap:10px;
`;

const CheckBoxLabel = styled.label`
  margin-bottom: 5px;
  font-size: 1rem;
  color: #333333;
`;

const Button = styled.button`
  background-color: #ea5c49;
  color: #ffffff;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #f4260a;
  }
`;

const FormComponent = () => {
let currentDate = new Date();
let day = ("0" + currentDate.getDate()).slice(-2);  // Get current day
let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);  // Get current month
let year = currentDate.getFullYear();
// Format as DD-MM-YYYY
let formattedDate = `${day}-${month}-${year}`;
  const formInitialDetails = {
    name: "",
    company_name: "",
    task_name: "Book My Demo",
    mobile_number: "",
    email_id: "",
    add_task: "N",
    task_type: "Book My Demo",
    task_date: formattedDate,
    remarks:""
}
const [formDetails, setFormDetails] = useState(formInitialDetails);
const[showsuccess,setShowsuccess]=useState(false);
const [selectedRequirements, setSelectedRequirements] = useState([]); // To store selected requirements
const [numberOfEmployees, setNumberOfEmployees] = useState(""); // To store selected number of employees
const [hrTools, setHrTools] = useState(""); // To store HR tools info from TextArea

const onFormUpdate = (category, value) => {
  setFormDetails({
    ...formDetails,
    [category]: value
  })
}
const endpoint = 'https://www.atomwalk.com/api';
  const addLead =(e)=> {
    e.preventDefault();
    return authAxiosPost(`https://www.atomwalk.com/api/add_lead/PMA_00001/`,{ 'lead_data':formDetails});
   }
   const authAxiosPost = async (url, data) => {
    try {
      let token = localStorage.getItem('apiResponse');
      let parsedToken = JSON.parse(token);
      if (!token) {
        throw new Error('Token not found, please login.');
      }
      const axiosInstance = axios.create({
        baseURL: endpoint,
        headers: {
          Authorization: `Token ${parsedToken.key}`,
        },
      });
      const response = await axiosInstance.post(url, data);
      if (response.status == 200) {
        setFormDetails(formInitialDetails);
        setShowsuccess(true);
      }
    } catch (error) {
      console.log('Error making authenticated API call:', error);
      setFormDetails(formInitialDetails);
    }
   };
   useEffect(()=>{
    if(showsuccess){
      setTimeout(() => {
        setShowsuccess(false);
        window.location.href='/demo.html'
      }, 3000);
    }
  },[showsuccess]);
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedRequirements = checked
      ? [...selectedRequirements, value] // Add requirement if checked
      : selectedRequirements.filter((req) => req !== value); // Remove if unchecked

    setSelectedRequirements(updatedRequirements);

    // Update the remarks section with selected requirements
    setFormDetails({
      ...formDetails,
      remarks: `${hrTools}\nNumber of Employees: ${numberOfEmployees}\nRequirements: ${updatedRequirements.join(', ')}`
    });
  };

  // Handle number of employees selection
  const handleEmployeesChange = (e) => {
    const value = e.target.value;
    setNumberOfEmployees(value);

    // Update the remarks section with number of employees
    setFormDetails({
      ...formDetails,
      remarks: `${hrTools}\nNumber of Employees: ${value}\nRequirements: ${selectedRequirements.join(', ')}`
    });
  };

  // Handle HR tools info from TextArea
  const handleHrToolsChange = (e) => {
    const value = e.target.value;
    setHrTools(value);

    // Update the remarks section with HR tools info
    setFormDetails({
      ...formDetails,
      remarks: `${value}\nNumber of Employees: ${numberOfEmployees}\nRequirements: ${selectedRequirements.join(', ')}`
    });
  };
  return (
    <>
    {showsuccess&&<Success message="We have successfully recorded your information."></Success>}
    <Container>
      <FormWrapper>
        <Title>We are a call away!</Title>
        <Description>Discuss Pricing, take a Demo or share your business problems.</Description>
        <Form>
          <Input onChange={(e) => onFormUpdate('name', e.target.value)} type="text" placeholder="Full Name" />
          <Input onChange={(e) => onFormUpdate('mobile_number', e.target.value)} type="tel" placeholder="Phone" />
          <Input onChange={(e) => onFormUpdate('email_id', e.target.value)} type="email" placeholder="Work Email*" required />
          <Input onChange={(e) => onFormUpdate('company_name', e.target.value)} type="text" placeholder="Company Name" />
          <CheckBoxWrapper>
           <CheckBoxLabel>Please select your requirement(s):</CheckBoxLabel>
            <label>
              <input type="checkbox" name="requirement" value="Payroll" onChange={handleCheckboxChange} /> Payroll
            </label>
            <label>
              <input type="checkbox" name="requirement" value="Core HR" onChange={handleCheckboxChange} /> Core HR
            </label>
            <label>
              <input type="checkbox" name="requirement" value="Attendance Management" onChange={handleCheckboxChange} /> Attendance Management
            </label>
            <label>
              <input type="checkbox" name="requirement" value="Leave Management" onChange={handleCheckboxChange} /> Leave Management
            </label>
            <label>
              <input type="checkbox" name="requirement" value="Performance Management System" onChange={handleCheckboxChange} /> Performance Management System
            </label>
            <label>
              <input type="checkbox" name="requirement" value="Geo-Tagging" onChange={handleCheckboxChange} /> Geo-Tagging
            </label>
            <label>
              <input type="checkbox" name="requirement" value="Recruitment" onChange={handleCheckboxChange} /> Recruitment
            </label>
            <label>
              <input type="checkbox" name="requirement" value="Employee Self Service" onChange={handleCheckboxChange} /> Employee Self Service
            </label>
            <label>
              <input type="checkbox" name="requirement" value="Employee Engagement" onChange={handleCheckboxChange} /> Employee Engagement
            </label>
            <label>
              <input type="checkbox" name="requirement" value="Others" onChange={handleCheckboxChange} /> Others
            </label>
            <label>
              <input type="checkbox" name="requirement" value="All" onChange={handleCheckboxChange} /> All
            </label>
          </CheckBoxWrapper>

          <TextArea onChange={handleHrToolsChange} rows="4" placeholder="Are you currently using any HR tools? (Optional)" />
          
           <Select onChange={handleEmployeesChange}>
            <option value="">Number of Employees</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </Select>
          <Button onClick={addLead}>Book Meeting</Button>
        </Form>
      </FormWrapper>
    </Container>
    </>
  );
};

export default FormComponent;
