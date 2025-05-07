import { createContext, useState, useEffect, useContext } from "react"
import { publicAxiosRequest } from "../services/HttpMethod"
import { empLoginURL } from "../services/ConstantServies"
import { getCompanyInfo, getEmployeeInfo } from "../services/authServices"
// import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const[profile, setProfile] = useState([])
  const [companyInfo, setCompanyInfo] = useState([])   
  // const navigate = useNavigate()
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getEmployeeInfo();
        setProfile(res?.data[0]);

      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
      try {
        const res = await getCompanyInfo();
        setCompanyInfo(res?.data);
      }
      catch (error) {
        console.log('Failed to fetch company info:', error);
      }
    };
    fetchProfile();
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("hrmsUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const login = async (userData) => {
    try {
      // Determine if the input is a mobile number or emp_id
      const isMobileNumber = /^\d{10}$/.test(userData.mobile); // Assuming mobile numbers are 10 digits
      const isEmpId = !isMobileNumber; // If it's not a mobile number, treat it as emp_id
  
      const payload = isMobileNumber
        ? {
            mobile_number: userData.mobile,
            pin: parseInt(userData.password, 10),
          }
        : {
            emp_id: userData.mobile, // Using the same field but as emp_id
            pin: parseInt(userData.password, 10),
          };
  
      console.log('Sending payload:', payload);
  
      const response = await publicAxiosRequest.post(empLoginURL, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('API Response:', response);
  
      if (response.status === 200) {
        const { token, emp_id, e_id } = response.data;
        // Store token and emp_id in AsyncStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('mobileNumber', isMobileNumber ? userData.mobile : ''); // Only store if it's a mobile number
        localStorage.setItem('empId', emp_id);
        localStorage.setItem('empNoId', String(e_id));
        localStorage.setItem('userPin', userData.password);
        localStorage.setItem("hrmsUser", JSON.stringify(userData));
        localStorage.setItem("dbName", userData.company.split('_').slice(1).join('_'));
        setCurrentUser(userData);
        toast.success("Login successful!");
        window.location.href = "/dashboard";
        return true;
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Invalid credentials. Please try again.");
      if (error.response && error.response.status === 401) {
        console.log("Invalid credentials");
        return false;
      } else if (error.response && error.response.status === 500) {
        console.log("Server error");
        return false;
      }
      return false;
    }
  };
 

  const logout = () => {
    localStorage.removeItem("hrmsUser")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    logout,
    loading,
    profile,
    companyInfo
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

