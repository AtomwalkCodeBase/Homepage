"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { publicAxiosRequest } from "../services/HttpMethod"
import { empLoginURL } from "../services/ConstantServies"
import { getEmployeeInfo } from "../services/authServices"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const[profile, setProfile] = useState([])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getEmployeeInfo();
        setProfile(res?.data[0]);

      } catch (error) {
        console.error('Failed to fetch profile:', error);
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

  const login = async(userData) => {
    try {
      const payload = {
        mobile_number: userData.mobile,
        pin: parseInt(userData.password, 10), // Convert pin to an integer
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
         localStorage.setItem('mobileNumber', userData.mobile);
         localStorage.setItem('empId', emp_id);
         localStorage.setItem('empNoId', String(e_id));
         localStorage.setItem('userPin', userData.password);
         localStorage.setItem("hrmsUser", JSON.stringify(userData))
    setCurrentUser(userData)
    return true
  }
} catch (error) {
  console.log("Login error:", error)
  if (error.response && error.response.status === 401) {
    console.log("Invalid credentials")
    return false
  } else if (error.response && error.response.status === 500) {
    console.log("Server error")
    return false
  }
}
  }
 

  const logout = () => {
    localStorage.removeItem("hrmsUser")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    logout,
    loading,
    profile
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

