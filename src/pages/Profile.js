"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import {
  FaIdCard,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaLock,
  FaCamera,
  FaCheck,
  FaTimes,
  FaUserTie,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaTrophy,
  FaShieldAlt,
  FaPalette,
  FaMoon,
  FaSun,
  FaWater,
} from "react-icons/fa"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { useTheme } from "../context/ThemeContext"
import { toast } from "react-toastify"
import { getEmployeeInfo } from "../services/authServices"
import { setuserpinview } from "../services/productServices"

const PageHeader = styled.div`
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    color: white;
  }
  
  p {
    opacity: 0.8;
    margin: 0.5rem 0 0;
  }
`

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const ProfileSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }
`

const ProfileImage = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ProfileImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2));
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4));
  }
  
  svg {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem 1rem;
`

const ProfileName = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`

const ProfileRole = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin: 0.5rem 0 1rem;
  text-align: center;
  font-size: 1.1rem;
`

const BadgesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const StyledBadge = styled(Badge)`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  
  &.primary {
    background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    color: white;
    box-shadow: 0 4px 10px ${({ theme }) => theme.colors.shadow};
  }
  
  &.secondary {
    background: linear-gradient(to right, #11998e, #38ef7d);
    color: white;
    box-shadow: 0 4px 10px rgba(17, 153, 142, 0.3);
  }
`

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 1rem;
    min-width: 1.2rem;
    font-size: 1.2rem;
  }
  
  span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const SectionTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  }
`

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`

const DetailCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid ${(props) => props.color || props.theme.colors.primary};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`

const DetailLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${(props) => props.iconColor || props.theme.colors.primary};
  }
`

const DetailValue = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`

const PinResetSection = styled.div`
  padding: 1.5rem;
  background: linear-gradient(to right, ${({ theme }) => theme.colors.backgroundAlt}, ${({ theme }) => theme.colors.background});
  border-radius: 12px;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
`

const PinInputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const PinInput = styled.input`
  padding: 0.9rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  flex: 1;
  font-size: 1rem;
  letter-spacing: 0.1em;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.shadow};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
    letter-spacing: 0;
  }
`

const AlertBox = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  &.success {
    background-color: ${({ theme }) => theme.colors.success}22;
    color: ${({ theme }) => theme.colors.success};
    border-left: 4px solid ${({ theme }) => theme.colors.success};
  }
  
  &.error {
    background-color: ${({ theme }) => theme.colors.error}22;
    color: ${({ theme }) => theme.colors.error};
    border-left: 4px solid ${({ theme }) => theme.colors.error};
  }
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`

const StyledButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &.primary {
    background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    border: none;
    color: white;
    box-shadow: 0 4px 10px ${({ theme }) => theme.colors.shadow};
    
    &:hover {
      box-shadow: 0 6px 15px ${({ theme }) => theme.colors.shadow};
      transform: translateY(-2px);
    }
  }
  
  &.outline {
    background: ${({ theme }) => theme.colors.card};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primaryLight};
      transform: translateY(-2px);
    }
  }
  
  &.danger {
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    border: none;
    color: white;
    
    &:hover {
      box-shadow: 0 6px 15px rgba(255, 75, 43, 0.4);
      transform: translateY(-2px);
    }
  }
`

const TabContainer = styled.div`
  margin-bottom: 2rem;
`

const TabGroup = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 2rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 0;
    display: none;
  }
`

const TabButton = styled.button`
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
  color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.textLight)};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`

const StatCard = styled.div`
  background: linear-gradient(135deg, ${(props) => props.bgStart || props.theme.colors.primary}, ${(props) => props.bgEnd || props.theme.colors.secondary});
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px;
  position: relative;
`

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 500;
`

const StatIcon = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 2rem;
  opacity: 0.15;
`

// Theme selection components
const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const ThemeCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid ${(props) => (props.isActive ? props.theme.colors.primary : "transparent")};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`

const ThemePreview = styled.div`
  height: 120px;
  background: linear-gradient(135deg, ${(props) => props.colors.primary}, ${(props) => props.colors.secondary});
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    width: 60%;
    height: 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50px;
    left: 20px;
    width: 80%;
    height: 40px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
  }
`

const ThemeInfo = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ThemeName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const ThemeActiveIndicator = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 0.8rem;
  }
`

const ThemeIcon = styled.div`
  margin-right: 0.5rem;
  color: ${(props) => props.color || props.theme.colors.primary};
`

const Profile = () => {
  const [isEditingPin, setIsEditingPin] = useState(false)
  const [currentPin, setCurrentPin] = useState("")
  const [newPin, setNewPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [pinError, setPinError] = useState("")
  const [pinSuccess, setPinSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("personal")
  const [profileData, setProfileData] = useState({})
  const { currentTheme, changeTheme, themes } = useTheme()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getEmployeeInfo();
        setProfileData(res?.data[0]);

      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const getExperience = (joiningDate) => {
    if (!joiningDate) return "0 years"

    const joinDate = new Date(joiningDate)
    const now = new Date()

    let years = now.getFullYear() - joinDate.getFullYear()
    const hasNotCompletedThisYear =
      now.getMonth() < joinDate.getMonth() ||
      (now.getMonth() === joinDate.getMonth() && now.getDate() < joinDate.getDate())

    if (hasNotCompletedThisYear) {
      years--
    }

    return `${years} + year${years !== 1 ? "s" : ""}`
  }

  const handleThemeChange = (themeName) => {
    changeTheme(themeName)
    toast.success(`Theme changed to ${themes[themeName].name}`)
  }

  const handlePinReset = async() => {
    // Reset error and success messages
    setPinError("")
    setPinSuccess("")

    // Validate PIN inputs
    if (!currentPin || !newPin || !confirmPin) {
      setPinError("All fields are required")
      return
    }

    if (newPin !== confirmPin) {
      setPinError("New PIN and Confirm PIN do not match")
      return
    }

    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      setPinError("PIN must be a 4-digit number")
      return
    }

   const response=await setuserpinview(currentPin, newPin)
   console.log("Pin response",response)
    if (response?.status== 200) {
      setPinSuccess("PIN reset successfully")
      setIsEditingPin(false)
    }
    else{
      setPinError("Failed to reset PIN. Please try again.")
      setIsEditingPin(true)
    }
  
    setCurrentPin("")
    setNewPin("")
    setConfirmPin("")
  }

  const cancelPinReset = () => {
    setIsEditingPin(false)
    setCurrentPin("")
    setNewPin("")
    setConfirmPin("")
    setPinError("")
    setPinSuccess("")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <>
            <SectionTitle>Personal Information</SectionTitle>
            <DetailGrid>
              <DetailCard color="#4776E6">
                <DetailLabel iconColor="#4776E6">
                  <FaIdCard /> Employee ID
                </DetailLabel>
                <DetailValue>{profileData.emp_id || "Not specified"}</DetailValue>
              </DetailCard>

              <DetailCard color="#8E54E9">
                <DetailLabel iconColor="#8E54E9">
                  <FaUserTie /> Role
                </DetailLabel>
                <DetailValue>{profileData.grade_name || "Not specified"}</DetailValue>
              </DetailCard>

              <DetailCard color="#38A169">
                <DetailLabel iconColor="#38A169">
                  <FaBuilding /> Department
                </DetailLabel>
                <DetailValue>{profileData.department_name || "Not specified"}</DetailValue>
              </DetailCard>

              <DetailCard color="#DD6B20">
                <DetailLabel iconColor="#DD6B20">
                  <FaCalendarAlt /> Join Date
                </DetailLabel>
                <DetailValue>{profileData.date_of_join || "Not specified"}</DetailValue>
              </DetailCard>

              <DetailCard color="#3182CE">
                <DetailLabel iconColor="#3182CE">
                  <FaPhone /> Mobile
                </DetailLabel>
                <DetailValue>{profileData.mobile_number || "Not specified"}</DetailValue>
              </DetailCard>

              <DetailCard color="#805AD5">
                <DetailLabel iconColor="#805AD5">
                  <FaEnvelope /> Email
                </DetailLabel>
                <DetailValue>{profileData.email_id || "Not specified"}</DetailValue>
              </DetailCard>

              <DetailCard color="#D53F8C">
                <DetailLabel iconColor="#D53F8C">
                  <FaBirthdayCake /> Birthday
                </DetailLabel>
                <DetailValue>{profileData.dob || "Not specified"}</DetailValue>
              </DetailCard>

              <DetailCard color="#2B6CB0">
                <DetailLabel iconColor="#2B6CB0">
                  <FaMapMarkerAlt /> Location
                </DetailLabel>
                <DetailValue>{profileData.location || "Not specified"}</DetailValue>
              </DetailCard>
            </DetailGrid>
          </>
        )

      case "permissions":
        return (
          <>
            <SectionTitle>Approval Permissions</SectionTitle>
            <DetailGrid>
              <StatCard bgStart="#4776E6" bgEnd="#8E54E9" style={{ position: "relative" }}>
                <StatIcon>
                  <FaTrophy />
                </StatIcon>
                <StatLabel>Grade Level</StatLabel>
                <StatValue>{profileData.grade_level}</StatValue>
              </StatCard>

              <StatCard bgStart="#11998e" bgEnd="#38ef7d" style={{ position: "relative" }}>
                <StatIcon>
                  <FaShieldAlt />
                </StatIcon>
                <StatLabel>Claim Grade Level</StatLabel>
                <StatValue>{profileData.approve_data?.[0]?.claim_grade_level}</StatValue>
              </StatCard>

              <StatCard bgStart="#FF416C" bgEnd="#FF4B2B" style={{ position: "relative" }}>
                <StatIcon>
                  <FaCalendarAlt />
                </StatIcon>
                <StatLabel>Max Leave Days</StatLabel>
                <StatValue>{profileData.approve_data?.[2]?.max_days}</StatValue>
              </StatCard>

              <StatCard bgStart="#6B46C1" bgEnd="#9F7AEA" style={{ position: "relative" }}>
                <StatIcon>
                  <FaIdCard />
                </StatIcon>
                <StatLabel>Max Claim Amount</StatLabel>
                <StatValue>₹{profileData.approve_data?.[1]?.max_claim_amt}</StatValue>
              </StatCard>
            </DetailGrid>
          </>
        )

      case "security":
        return (
          <>
            <SectionTitle>Security Settings</SectionTitle>

            <StyledCard>
              <div style={{ padding: "1.5rem" }}>
                {pinSuccess && (
                  <AlertBox className="success">
                    <FaCheck />
                    {pinSuccess}
                  </AlertBox>
                )}

                {!isEditingPin ? (
                  <div>
                    <p style={{ marginBottom: "1.5rem", color: "#4a5568" }}>
                      Your PIN is used for secure transactions and approvals. It's recommended to change your PIN
                      periodically.
                    </p>
                    <StyledButton className="primary" onClick={() => setIsEditingPin(true)}>
                      <FaLock /> Reset PIN
                    </StyledButton>
                  </div>
                ) : (
                  <PinResetSection>
                    <SectionTitle>Reset Your PIN</SectionTitle>

                    {pinError && (
                      <AlertBox className="error">
                        <FaTimes />
                        {pinError}
                      </AlertBox>
                    )}

                    <DetailLabel>
                      <FaLock /> Current PIN
                    </DetailLabel>
                    <PinInput
                      type="password"
                      maxLength={4}
                      value={currentPin}
                      onChange={(e) => setCurrentPin(e.target.value)}
                      placeholder="Enter current PIN"
                    />

                    <PinInputGroup>
                      <div style={{ flex: 1 }}>
                        <DetailLabel>
                          <FaLock /> New PIN
                        </DetailLabel>
                        <PinInput
                          type="password"
                          maxLength={4}
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                          placeholder="Enter new PIN"
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <DetailLabel>
                          <FaCheck /> Confirm PIN
                        </DetailLabel>
                        <PinInput
                          type="password"
                          maxLength={4}
                          value={confirmPin}
                          onChange={(e) => setConfirmPin(e.target.value)}
                          placeholder="Confirm new PIN"
                        />
                      </div>
                    </PinInputGroup>

                    <ButtonGroup>
                      <StyledButton className="primary" onClick={handlePinReset}>
                        <FaCheck /> Reset PIN
                      </StyledButton>
                      <StyledButton className="outline" onClick={cancelPinReset}>
                        <FaTimes /> Cancel
                      </StyledButton>
                    </ButtonGroup>
                  </PinResetSection>
                )}
              </div>
            </StyledCard>
          </>
        )

      case "themes":
        return (
          <>
            <SectionTitle>Theme Settings</SectionTitle>
            <p style={{ marginBottom: "1.5rem", color: "#4a5568" }}>
              Customize the appearance of your HRMS dashboard by selecting a theme that suits your preference.
            </p>

            <ThemeGrid>
              <ThemeCard isActive={currentTheme === "default"} onClick={() => handleThemeChange("default")}>
                <ThemePreview colors={themes.default.colors} />
                <ThemeInfo>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon color={themes.default.colors.primary}>
                      <FaPalette />
                    </ThemeIcon>
                    <ThemeName>{themes.default.name}</ThemeName>
                  </div>
                  {currentTheme === "default" && (
                    <ThemeActiveIndicator>
                      <FaCheck />
                    </ThemeActiveIndicator>
                  )}
                </ThemeInfo>
              </ThemeCard>

              <ThemeCard isActive={currentTheme === "ocean"} onClick={() => handleThemeChange("ocean")}>
                <ThemePreview colors={themes.ocean.colors} />
                <ThemeInfo>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon color={themes.ocean.colors.primary}>
                      <FaWater />
                    </ThemeIcon>
                    <ThemeName>{themes.ocean.name}</ThemeName>
                  </div>
                  {currentTheme === "ocean" && (
                    <ThemeActiveIndicator>
                      <FaCheck />
                    </ThemeActiveIndicator>
                  )}
                </ThemeInfo>
              </ThemeCard>

              <ThemeCard isActive={currentTheme === "sunset"} onClick={() => handleThemeChange("sunset")}>
                <ThemePreview colors={themes.sunset.colors} />
                <ThemeInfo>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon color={themes.sunset.colors.primary}>
                      <FaSun />
                    </ThemeIcon>
                    <ThemeName>{themes.sunset.name}</ThemeName>
                  </div>
                  {currentTheme === "sunset" && (
                    <ThemeActiveIndicator>
                      <FaCheck />
                    </ThemeActiveIndicator>
                  )}
                </ThemeInfo>
              </ThemeCard>

              <ThemeCard isActive={currentTheme === "dark"} onClick={() => handleThemeChange("dark")}>
                <ThemePreview colors={themes.dark.colors} />
                <ThemeInfo>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon color={themes.dark.colors.primary}>
                      <FaMoon />
                    </ThemeIcon>
                    <ThemeName>{themes.dark.name}</ThemeName>
                  </div>
                  {currentTheme === "dark" && (
                    <ThemeActiveIndicator>
                      <FaCheck />
                    </ThemeActiveIndicator>
                  )}
                </ThemeInfo>
              </ThemeCard>
            </ThemeGrid>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Layout>
      <PageHeader>
        <h1>My Profile</h1>
        <p>Manage your personal information and account settings</p>
      </PageHeader>

      <ProfileContainer>
        <ProfileSidebar>
          <StyledCard>
            <ProfileImage>
              <img src={profileData.image || "/placeholder.svg"} alt={profileData.name} />
              <ProfileImageOverlay>
                <FaCamera /> Change Photo
              </ProfileImageOverlay>
            </ProfileImage>

            <ProfileInfo>
              <ProfileName>{profileData.name}</ProfileName>
              <ProfileRole>{profileData.grade_name}</ProfileRole>

              <BadgesContainer>
                <StyledBadge variant="primary">{profileData.is_manager ? "Manager" : "Employee"}</StyledBadge>
                <StyledBadge variant="secondary"> {getExperience(profileData.date_of_join)}</StyledBadge>
              </BadgesContainer>

              <div>
                <ProfileDetail>
                  <FaIdCard />
                  <span>Employee ID: {profileData.emp_id}</span>
                </ProfileDetail>
                <ProfileDetail>
                  <FaBuilding />
                  <span>{profileData.department_name || "Not specified"}</span>
                </ProfileDetail>
                <ProfileDetail>
                  <FaPhone />
                  <span>{profileData.mobile_number || "Not specified"}</span>
                </ProfileDetail>
                <ProfileDetail>
                  <FaEnvelope />
                  <span>{profileData.email_id || "Not specified"}</span>
                </ProfileDetail>
                <ProfileDetail>
                  <FaCalendarAlt />
                  <span>Joined: {profileData.date_of_join || "Not specified"}</span>
                </ProfileDetail>
                <ProfileDetail>
                  <FaMapMarkerAlt />
                  <span>{profileData.location || "Not specified"}</span>
                </ProfileDetail>
              </div>
            </ProfileInfo>
          </StyledCard>

          <StyledCard>
            <div style={{ padding: "1.5rem" }}>
              <SectionTitle>Quick Stats</SectionTitle>
              <div style={{ display: "grid", gap: "1rem" }}>
                <StatCard bgStart="#4C51BF" bgEnd="#6B46C1" style={{ position: "relative", minHeight: "120px" }}>
                  <StatIcon>
                    <FaCalendarAlt />
                  </StatIcon>
                  <StatLabel>Leave Balance</StatLabel>
                  <StatValue>{profileData.max_no_leave} Days</StatValue>
                </StatCard>
              </div>
            </div>
          </StyledCard>
        </ProfileSidebar>

        <ProfileContent>
          <StyledCard>
            <TabContainer>
              <TabGroup>
                <TabButton active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
                  <FaIdCard /> Personal Info
                </TabButton>
                <TabButton active={activeTab === "permissions"} onClick={() => setActiveTab("permissions")}>
                  <FaShieldAlt /> Permissions
                </TabButton>
                <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")}>
                  <FaLock /> Security
                </TabButton>
                <TabButton active={activeTab === "themes"} onClick={() => setActiveTab("themes")}>
                  <FaPalette /> Themes
                </TabButton>
              </TabGroup>

              {renderTabContent()}
            </TabContainer>
          </StyledCard>
        </ProfileContent>
      </ProfileContainer>
    </Layout>
  )
}

export default Profile
