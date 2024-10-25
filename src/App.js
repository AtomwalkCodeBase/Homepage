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
import LabManagement from "./components/LabManagement";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import Success from "./components/SuccessBanner";
import HrmComponent from "./components/hrm/HrmComponent";
import HrmFeaturesManagement from "./components/hrm/HrmFeaturesManagement";
import LeadManagement from "./components/crm/LeadManagement";

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
      <NavBar></NavBar>
      {/* <Success message="We have successfully recorded your information."></Success> */}
      <Router>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/signin.html" element={<Login />} />
          <Route path="/forgotpassword.html" element={<ForgetPassword />} />
          <Route path="/card.html" element={<Newcard />} />
          <Route path="/Product.html" element={<Product />} />
          <Route path="/contactUs.html" element={<ContactUs />} />
          <Route path="/aboutUs.html" element={<AbotUs />} />
          {/* <Route path="/pricing.html" element={<PricingRoute />} /> */}
          <Route path="/demo.html" element={<FormComponent />} />
          <Route path="/seals.html" element={<ContactSalesPage />} />
          <Route path="/crm.html" element={<AppPromo/>} />
          <Route path="/lms.html" element={<LabManagement/>} />
          <Route path="/Blog.html" element={<Blog/>} />
          <Route path="/BlogDetails.html" element={<BlogDetails/>} />
          <Route path="/hrm.html" element={<HrmComponent />} />
          <Route path="/leave.html" element={<HrmFeaturesManagement />} />
          <Route path="/claim.html" element={<HrmFeaturesManagement />} />
          <Route path="/employeehr.html" element={<HrmFeaturesManagement />} />
          <Route path="/payroll.html" element={<HrmFeaturesManagement/>} />
          <Route path="/leadManagement.html" element={<LeadManagement/>} />
        </Routes>
      </Router>
      {openslide&&<Askme setOpenslide={setOpenslide}/>}
      <FloatingActionButton setOpenslide={setOpenslide}></FloatingActionButton>
      <Footer2></Footer2>
    </div>
  );
}

export default App;
