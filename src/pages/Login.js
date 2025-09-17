import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { FaUser, FaLock, FaBuilding, FaSyncAlt, FaShieldAlt, FaUsers, FaChartLine, FaChevronDown } from "react-icons/fa"
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"
import { forgetUserPinView, getCompanyName } from "../services/productServices"
import { useNavigate } from "react-router-dom"
import { IoBarChartSharp, IoTicketOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineTimer } from "react-icons/md";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const PageBackground = styled.div`
  min-height: 100vh;
  background: url("https://raw.githubusercontent.com/AtomwalkCodeBase/Homepage/82e1ca7ffbf075279ba12e86846043a8ca20216a/src/assets/img/login_bg2.png") no-repeat center center fixed;
  background-size: cover;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
    pointer-events: none;
    backdrop-filter: blur(5px);
  }
`

const LoginContainer = styled.div`
  padding: 60px 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 60px 0.5rem 0.5rem;
  }
`

const LoginCard = styled.div`
  background: transparent;
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
  animation: ${slideUp} 0.8s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 360px;
    min-height: auto;
  }
`

const BrandSection = styled.div`
  background: linear-gradient(135deg, rgb(254, 254, 254), #0227bd);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: ${float} 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-height: 180px;
  }
`

const BrandContent = styled.div`
  text-align: center;
  color: #454545;
  z-index: 1;
  animation: ${fadeInLeft} 1s ease-out 0s;
`

const BrandTitle = styled.h1`
  font-size: 2.2rem; /* Slightly smaller */
  font-weight: 700;
  margin-bottom: 0.3rem;
  background: linear-gradient(135deg,rgb(147, 196, 244),rgb(43, 51, 163));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const BrandSubtitle = styled.p`
  font-size: 1rem; /* Smaller font */
  opacity: 0.9;
  margin-bottom: 1.5rem; /* Reduced margin */
  font-weight: 300;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem; /* Reduced gap */
  width: 100%;
  max-width: 280px; /* Slightly smaller */
`

const FeatureCard = styled.div`
  background:rgb(200, 210, 252);
  padding: 0.8rem; /* Reduced padding */
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.1rem;
    opacity: 0.9;
  }

  span {
    font-size: 0.85rem; /* Smaller font */
    font-weight: 500;
  }
`

const FormSection = styled.div`
  padding: 2rem 1.5rem; /* Reduced padding */
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`

const FormContainer = styled.div`
  width: 100%;
  max-width: 320px; /* Slightly smaller */
  margin: 0 auto;
  animation: ${slideUp} 0.8s ease-out 0.2s both;
`

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem; /* Reduced margin */
`

const FormTitle = styled.h2`
  font-size: 1.6rem; /* Smaller font */
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.3rem;
`

const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.85rem; /* Smaller font */
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Reduced gap between form groups */
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`

const FormLabel = styled.label`
  font-size: 0.85rem; /* Smaller font */
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const InputIcon = styled.div`
  position: absolute;
  left: 0.8rem; /* Adjusted for smaller inputs */
  color: ${({ theme }) => theme.colors.textLight};
  z-index: 1;
  font-size: 0.9rem; /* Smaller icon */
`
const InputRightIcon = styled.div`
  position: absolute;
  right: 0.8rem; /* Adjusted for smaller inputs */
  color: ${({ theme }) => theme.colors.textLight};
  z-index: 1;
  font-size: 1.1rem; /* Smaller icon */
  font-weight: 700;
  cursor: pointer
`

const StyledInput = styled.input`
  width: 100%;
  padding: 0.4rem 0.8rem 0.4rem 2.2rem; /* Shorter height, adjusted padding */
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 0.95rem; /* Smaller font */
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.background};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    background: white;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.4rem 0.8rem 0.4rem 2.2rem; /* Shorter height */
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 0.95rem; /* Smaller font */
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.background};
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    background: white;
  }
`
const DropdownIcon = styled(FaChevronDown)`
  position: absolute;
  right: 0.75rem; /* Adjust spacing as needed */
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
`;

const CaptchaContainer = styled.div`
  display: flex;
  gap: 0.4rem; /* Reduced gap */
  align-items: center;
`

const CaptchaDisplay = styled.div`
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 0.4rem 0.8rem; /* Smaller padding */
  font-family: 'Courier New', monospace;
  font-size: 1.1rem; /* Smaller font */
  font-weight: bold;
  letter-spacing: 1.5px;
  color: #454545;
  user-select: none;
  min-width: 100px; /* Smaller width */
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`

const RefreshButton = styled.button`
  background: #0227bd;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.6rem; /* Smaller padding */
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px; /* Smaller size */
  height: 36px;

  &:hover {
    background: #454545;
    transform: rotate(180deg);
  }

  &:active {
    transform: scale(0.95) rotate(180deg);
  }
`

const CaptchaInput = styled.input`
  flex: 0 0 auto; /* Remove flex growth, set to fixed size */
  padding: 0.4rem 0.5rem; /* Shorter height */
  max-width: 170px; /* Reduced width */
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 0.95rem; /* Smaller font */
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.background};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    background: white;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.6rem; /* Shorter height */
  background: linear-gradient(rgb(76, 84, 203));
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem; /* Smaller font */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`

const FormFooter = styled.div`
  text-align: center;
  margin-top: 0.3rem; /* Reduced margin */
`

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 0.85rem; /* Smaller font */
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
  }
`

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.8rem; /* Smaller font */
  margin-top: 0.3rem;
  padding: 0.4rem;
  background: #fdf2f2;
  border-radius: 6px;
  border-left: 3px solid #e74c3c;
`

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    company: "",
    captcha: ""
  })
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState([])
  const [placeholderdatas, setPlaceholderdatas] = useState("Employee ID/Mobile Number");
  const [loginData, setLoginData] = useState(true)
  const [captchaText, setCaptchaText] = useState("")
  const { login, error } = useAuth()
  const navigation = useNavigate()
  const [passShow, setPassShow] = useState(false)

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }

  useEffect(() => {
    const fetchCompanyName = async () => {
      const company = await getCompanyName(isFms)
      if (company.status === 200) {
        setCompanies(company.data)
      }
    }
    fetchCompanyName()
    setCaptchaText(generateCaptcha())
    if (localStorage.getItem("userToken")) {
      if(localStorage.getItem("fmsUser")){
        navigation("/fmsdashboard")
      }else{
      navigation("/dashboard")
      }
    }
  }, [])

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha())
    setFormData(prev => ({...prev, captcha: ""}))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Validation for mobile (max 12 characters)
    if (name === "mobile" && value.length > 12) {
      return
    }
    
    // Validation for password/pin (only numbers, max 6 digits)
    if (name === "password") {
      if (value.length > 6 || !/^\d*$/.test(value)) {
        return
      }
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCompanyChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      company: e.target.value,
    }))
    localStorage.setItem("dbName", e.target.value.split("_").slice(1).join("_"))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate captcha
    if (formData.captcha !== captchaText) {
      toast.error("Invalid captcha. Please try again.")
      refreshCaptcha()
      return
    }
    
    setLoading(true)

    // Simulate API call
    setTimeout(async () => {
      if (formData.mobile && formData.password) {
        const userData = {
          id: "1",
          name: "Ashutosh Mohapatra",
          mobile: formData.mobile,
          password: formData.password,
          role: "HR Manager",
          company: formData?.company?.split("_").slice(1).join("_") || "Acme Inc.",
        }
        await login(userData)
      } else {
        toast.error("Invalid credentials. Please try again.")
      }
      setLoading(false)
      refreshCaptcha()
    }, 500)
  }

  const handleForgotPass = async (e) => {
    e.preventDefault()
    
    // Validate captcha
    if (formData.captcha !== captchaText) {
      toast.error("Invalid captcha. Please try again.")
      refreshCaptcha()
      return
    }
    
    setLoading(true)
    const isMobileNumber = /^\d{10}$/.test(formData.mobile);
    const dbName = formData?.company?.split("_").slice(1).join("_") || "Acme Inc.";
    const userData = 
      isMobileNumber 
      ? { mobile_number: formData.mobile, dbName: dbName }
      : { emp_id: formData.mobile, dbName: dbName };
      
    const response = await forgetUserPinView(userData, dbName)
    if (response.status === 200) {
      toast.success("Pin sent to your registered E-mail Address.")
      setLoginData(true)
    } else {
      toast.error("Failed to send pin. Please try again.")
    }
    setLoading(false)
    refreshCaptcha()
  }

  const urlParams = new URLSearchParams(window.location.search)
  const product = urlParams.get("product")
  const isFms = product === "fms" || window.location.hash.replace('#','') === 'fms'

  return (
    <PageBackground>
      <LoginContainer style={{cursor: "pointer"}}>
        <LoginCard>
          <BrandSection>
            <BrandContent>
              <BrandTitle>{isFms ? "ATOMWALK FMS" : "ATOMWALK HRMS"}</BrandTitle>
              <BrandSubtitle>
                {isFms ? "Facility Management System" : "Modern Human Resource Management System"}
              </BrandSubtitle>
             {isFms ?
             <FeatureGrid>
                <FeatureCard>
                  <LuClipboardList />
                  <span>Task Management</span>
                </FeatureCard>
                <FeatureCard>
                  <IoTicketOutline />
                  <span>Customer Ticket management</span>
                </FeatureCard>
                <FeatureCard>
                  <MdOutlineTimer />
                  <span>SLA Monitoring</span>
                </FeatureCard>
                <FeatureCard>
                  <IoBarChartSharp />
                  <span>Analytics & Reports</span>
                </FeatureCard>
                <FeatureCard>
                  <FaUsers />
                  <span>Multi-Customer Management</span>
                </FeatureCard>
              </FeatureGrid>
             
             :<FeatureGrid>
                <FeatureCard>
                  <FaUsers />
                  <span>Employee Management</span>
                </FeatureCard>
                <FeatureCard>
                  <FaShieldAlt />
                  <span>Secure & Reliable</span>
                </FeatureCard>
                <FeatureCard>
                  <FaChartLine />
                  <span>Analytics & Reports</span>
                </FeatureCard>
              </FeatureGrid>}
            </BrandContent>
          </BrandSection>

          <FormSection>
            <FormContainer>
              <FormHeader>
                <FormTitle>
                  {loginData ? "Welcome Back" : "Reset PIN"}
                </FormTitle>
                <FormSubtitle>
                  {loginData 
                    ? "Please sign in to your account" 
                    : "Enter your details to reset your PIN"
                  }
                </FormSubtitle>
              </FormHeader>

              <Form onSubmit={loginData ? handleSubmit : handleForgotPass}>
                <FormGroup>
                  <FormLabel htmlFor="company">Company</FormLabel>
                  <InputContainer>
                    <InputIcon>
                      <FaBuilding />
                    </InputIcon>
                    <StyledSelect
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleCompanyChange}
                      required
                    >
                      <option value="" disabled>
                        Select your company
                      </option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.name}>
                          {company.ref_cust_name}
                        </option>
                      ))}
                    </StyledSelect>
                    <DropdownIcon />
                  </InputContainer>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="mobile">{placeholderdatas}</FormLabel>
                  <InputContainer>
                    <InputIcon>
                      <FaUser />
                    </InputIcon>
                    <StyledInput
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder={`Enter ${placeholderdatas}`}
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={12}
                      required
                    />
                  </InputContainer>
                </FormGroup>

                {loginData && (
                  <FormGroup>
                    <FormLabel htmlFor="password">PIN</FormLabel>
                    <InputContainer>
                      <InputIcon>
                        <FaLock />
                      </InputIcon>
                      <StyledInput
                        type={passShow? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter your PIN"
                        value={formData.password}
                        onChange={handleChange}
                        maxLength={6}
                        required
                      />
                      {formData.password && 
                      <InputRightIcon>
                        {passShow ? <VscEyeClosed onClick={() => setPassShow(!passShow)} /> : <VscEye onClick={() => setPassShow(!passShow)} />}
                        </InputRightIcon>}
                    </InputContainer>
                  </FormGroup>
                )}

                <FormGroup>
                  <FormLabel>Captcha</FormLabel>
                  <CaptchaContainer>
                    <CaptchaDisplay>{captchaText}</CaptchaDisplay>
                    <RefreshButton type="button" onClick={refreshCaptcha}>
                      <FaSyncAlt />
                    </RefreshButton>
                    <CaptchaInput
                      type="text"
                      name="captcha"
                  placeholder="Enter captcha"
                      value={formData.captcha}
                      onChange={handleChange}
                      required
                    />
                  </CaptchaContainer>
                </FormGroup>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <SubmitButton type="submit" disabled={loading}>
                  {loading 
                    ? (loginData ? "Signing in..." : "Submitting...") 
                    : (loginData ? "Sign In" : "Submit")
                  }
                </SubmitButton>

                <FormFooter>
                  <FooterLink 
                    onClick={() => setLoginData(!loginData)}
                  >
                    {loginData ? "Forgot PIN?" : "Back to Sign In"}
                  </FooterLink>
                </FormFooter>
              </Form>
            </FormContainer>
          </FormSection>
        </LoginCard>
      </LoginContainer>
    </PageBackground>
  )
}

export default Login