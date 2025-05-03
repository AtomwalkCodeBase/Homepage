"use client"

import { createContext, useState, useContext } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"

// Define our three themes
const themes = {
  default: {
    name: "Default",
    colors: {
      primary: "#6C63FF", // Vibrant purple
      primaryLight: "#E8E6FF",
      secondary: "#FF6584", // Punchy pink
      secondaryLight: "#FFE5EB",
      accent: "#63FFDA", // Mint green
      accentLight: "#E6FFF7",
      success: "#00C853",
      warning: "#FFD600",
      error: "#FF3D00",
      info: "#2196F3",
      background: "#F8F9FD",
      backgroundAlt: "#F0F2F8",
      card: "#FFFFFF",
      text: "#333333",
      textLight: "#666666",
      border: "#E0E0E0",
      shadow: "rgba(108, 99, 255, 0.1)",
    },
  },
  ocean: {
    name: "Ocean",
    colors: {
      primary: "#0277BD", // Deep blue
      primaryLight: "#E1F5FE",
      secondary: "#00BCD4", // Cyan
      secondaryLight: "#E0F7FA",
      accent: "#26A69A", // Teal
      accentLight: "#E0F2F1",
      success: "#00C853",
      warning: "#FFC107",
      error: "#F44336",
      info: "#29B6F6",
      background: "#F5F7FA",
      backgroundAlt: "#E1F5FE",
      card: "#FFFFFF",
      text: "#263238",
      textLight: "#546E7A",
      border: "#CFD8DC",
      shadow: "rgba(2, 119, 189, 0.1)",
    },
  },
  sunset: {
    name: "Sunset",
    colors: {
      primary: "#FF5722", // Deep orange
      primaryLight: "#FBE9E7",
      secondary: "#FF9800", // Orange
      secondaryLight: "#FFF3E0",
      accent: "#FFC107", // Amber
      accentLight: "#FFF8E1",
      success: "#4CAF50",
      warning: "#FF9800",
      error: "#F44336",
      info: "#2196F3",
      background: "#FFF8F6",
      backgroundAlt: "#FFF3E0",
      card: "#FFFFFF",
      text: "#3E2723",
      textLight: "#5D4037",
      border: "#FFCCBC",
      shadow: "rgba(255, 87, 34, 0.1)",
    },
  },
  dark: {
    name: "Dark",
    colors: {
      primary: "#483A6F",       
      primaryLight: "#2E2845",  
      secondary: "#1A5F51",     
      secondaryLight: "#0E3D35",
      accent: "#7E3B54",        
      accentLight: "#4A2432",   
      success: "#1F5C2E",       
      warning: "#7D5700",       
      error: "#7D2B2B",         
      info: "#2C5282",          
      background: "#0A0A0A",    
      backgroundAlt: "#121212", 
      card: "#1A1A1A",          
      text: "#E0E0E0",          
      textLight: "#8A8A8A",     
      border: "#2A2A2A",        
      shadow: "rgba(0, 0, 0, 0.6)", 
    },
  }
}

// Create the context
const ThemeContext = createContext()

// Create a custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext)

// Create the theme provider component
export const ThemeProvider = ({ children }) => {
  // Get the saved theme from localStorage or use default
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("hrms-theme")
    return savedTheme ? savedTheme : "default"
  })

  // Update the theme
  const changeTheme = (themeName) => {
    setCurrentTheme(themeName)
    localStorage.setItem("hrms-theme", themeName)
  }

  // Get the current theme object
  const theme = themes[currentTheme] || themes.default

  // Add fonts and other theme properties
  const completeTheme = {
    ...theme,
    fonts: {
      body: "'Poppins', sans-serif",
      heading: "'Poppins', sans-serif",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    breakpoints: {
      xs: "320px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
    },
    borderRadius: {
      sm: "0.125rem",
      md: "0.25rem",
      lg: "0.5rem",
      xl: "1rem",
      full: "9999px",
    },
    shadows: {
      sm: "0 1px 3px rgba(0, 0, 0, 0.12)",
      md: "0 4px 6px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
      xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
    },
    transitions: {
      fast: "0.2s ease",
      normal: "0.3s ease",
      slow: "0.5s ease",
    },
  }

  return (
    <ThemeContext.Provider value={{ theme: completeTheme, currentTheme, changeTheme, themes }}>
      <StyledThemeProvider theme={completeTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
