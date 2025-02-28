import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/loginpage/Login";
import ForgetPassword from "./components/loginpage/ForgetPassword";
import Newcard from "./components/Newcard";
import Product from "./components/Product";
import ContactUs from "./components/ContactUs";
import AbotUs from "./components/AbotUs";
import Footer2 from "./components/Footer2";
import Askme from "./components/loginpage/Askme";
import FloatingActionButton from "./components/FloatingActionButton";
import { useEffect, useState } from "react";
import ProductDemoModal from "./components/ProductDemoModal";
import FormComponent from "./components/FormComponent";
import PricingRoute from "./components/PricingRoute";
import ContactSalesPage from "./components/ContactSalesPage";
import AppPromo from "./components/AppPromo";
import LabManagement from "./components/lms/LabManagement";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import Success from "./components/SuccessBanner";
import HrmComponent from "./components/hrm/HrmComponent";
import HrmFeaturesManagement from "./components/hrm/HrmFeaturesManagement";
import LeadManagement from "./components/crm/LeadManagement";
import HerosectionCrm from "./components/crm/HerosectionCrm";
import LmsHeroSection from "./components/lms/LmsHeroSection";
import LabEqupmentmanagement from "./components/lms/LabEqupmentmanagement";
import LmsSytem from "./components/lms/LmsSytem";
import SalesHeroSection from "./components/sales/SalesHeroSection";
import SalesSytem from "./components/sales/SalesSystem";
import ProcessHeroPage from "./components/processproject/ProcessHeroPage";
import ProcessManagementSystem from "./components/processproject/ProjectManagementSystem";
import InventoryHeroPage from "./components/inventory/InventoryHeroPage";
import InventoryManagementSystem from "./components/inventory/InventoryManagementSystem";
import Assessment from "./components/Assessment";
import ThankYouPage from "./components/ThankYouPage";
import TermsAndConditions from "./components/TermConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Disclaimer from "./components/Disclaimer";
import Career from "./components/Career";
import Commonfnadq from "./components/Commonfnadq";

function App() {
  const[openslide,setOpenslide]=useState(false);
  const url = 'https://www.atomwalk.com/rest-auth/login/';
  const data = {
  username: 'ASUTOSH@PMA_00001', // Replace with actual username
  password: 'ashutosh@11'  // Replace with actual password
  };
  useEffect(()=>{
    if(!localStorage.getItem("apiResponse")){
       loginAndStore();
    }
  },[])
const loginAndStore=async()=>{
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify that we're sending JSON
      },
      body: JSON.stringify(data) // Convert the data object to JSON string
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    console.log('API Response:', responseData);
    localStorage.setItem('apiResponse', JSON.stringify(responseData));
  } catch (error) {
    console.error('Error during login:', error);
  }
}
  return (
    <div className="App">
      {/* <Success message="We have successfully recorded your information."></Success> */}
      <Router>
       <NavBar></NavBar>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/signin.html" element={<Login />} />
          <Route path="/forgotpassword.html" element={<ForgetPassword />} />
          <Route path="/card.html" element={<Newcard />} />
          <Route path="/Product.html" element={<Product />} />
          <Route path="/contactUs.html" element={<ContactUs />} />
          <Route path="/aboutUs.html" element={<AbotUs />} />
          <Route path="/pricing.html" element={<PricingRoute />} />
          <Route path="/demo.html" element={<FormComponent />} />
          <Route path="/seals.html" element={<ContactSalesPage />} />
          <Route path="/crm.html" element={<HerosectionCrm/>} />
          <Route path="/lms.html" element={<LmsHeroSection/>} />
          <Route path="/Blog.html" element={<Blog/>} />
          <Route path="/BlogDetails.html" element={<BlogDetails/>} />
          <Route path="/hrm.html" element={<HrmComponent />} />
          <Route path="/leave.html" element={<HrmFeaturesManagement />} />
          <Route path="/claim.html" element={<HrmFeaturesManagement />} />
          <Route path="/employeehr.html" element={<HrmFeaturesManagement />} />
          <Route path="/payroll.html" element={<HrmFeaturesManagement/>} />
          <Route path="/appraisal.html" element={<HrmFeaturesManagement/>} />
          <Route path="/attendance.html" element={<HrmFeaturesManagement/>} />
          <Route path="/leadManagement.html" element={<LeadManagement/>} />
          <Route path="/CustomerManagement.html" element={<LeadManagement/>} />
          <Route path="/Channelpartner.html" element={<LeadManagement/>} />
          <Route path="/aMCTracking.html" element={<LeadManagement/>} />
          <Route path="/campaignManagement.html" element={<LeadManagement/>} />
          <Route path="/userManagement.html" element={<LmsSytem/>} />
          <Route path="/equipmentManagement.html" element={<LmsSytem/>} />
          <Route path="/equipmentMaintenance.html" element={<LmsSytem/>} />
          <Route path="/reportandDashboard.html" element={<LmsSytem/>} />
          <Route path="/userroleManagement.html" element={<LmsSytem data={true}/>} />
          <Route path="/labProcessemplate.html" element={<LmsSytem data={true}/>} />
          <Route path="/labExperimentProject.html" element={<LmsSytem data={true}/>} />
          <Route path="/pIwithReport.html" element={<LmsSytem data={true}/>} />
          <Route path="/labmanagement.html" element={<LabManagement/>} />
          <Route path="/labequipmentmangement.html" element={<LabEqupmentmanagement/>} />
          <Route path="/sales.html" element={<SalesHeroSection/>} />
          <Route path="/saleslifecycle.html" element={<SalesSytem/>} />
          <Route path="/procurement.html" element={<SalesSytem/>} />
          <Route path="/compliance.html" element={<SalesSytem/>} />
          <Route path="/salesreport.html" element={<SalesSytem/>} />
          <Route path="/processandproject.html" element={<ProcessHeroPage/>} />
          <Route path="/process.html" element={<ProcessManagementSystem/>} />
          <Route path="/project.html" element={<ProcessManagementSystem/>} />
          <Route path="/activityreport.html" element={<ProcessManagementSystem/>} /> 
          <Route path="/inventory.html" element={<InventoryHeroPage/>} />
          <Route path="/inventoryop.html" element={<InventoryManagementSystem/>} />
          <Route path="/warehouse.html" element={<InventoryManagementSystem/>} />
          <Route path="/inventoryreport.html" element={<InventoryManagementSystem/>} />
          <Route path="/assessment.html" element={<Assessment/>} />
          <Route path="/thankyou.html" element={<ThankYouPage/>} />
          <Route path="/terms-and-conditions.html" element={<TermsAndConditions/>} />
          <Route path="/privacy-policy.html" element={<PrivacyPolicy/>} />
          <Route path="/disclaimer.html" element={<Disclaimer/>} />
          <Route path="/careers.html" element={<Career />} />
          <Route path="/fandq.html" element={<Commonfnadq/>} />
        </Routes>
      </Router>
      {/* {openslide&&<Askme setOpenslide={setOpenslide}/>} */}
      {/* <FloatingActionButton setOpenslide={setOpenslide}></FloatingActionButton> */}
      <Footer2></Footer2>
    </div>
  );
}

export default App;
