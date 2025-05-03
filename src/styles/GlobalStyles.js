import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    /* color: ${({ theme }) => theme.colors.text}; */
    transition: all 0.3s ease;
    color: #262626;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
 
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }
  input, select, textarea {
    font-family: 'Poppins', sans-serif;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
      outline: none;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.textLight};
    }
    
    th {
      background-color: ${({ theme }) => theme.colors.primaryLight};
      /* color: ${({ theme }) => theme.colors.primary}; */
      font-weight: 600;
      color: ${({ theme }) => theme.colors.textLight};
    }
    
    tr:hover {
      background-color: ${({ theme }) => theme.colors.backgroundAlt};
    }
  }
  .card {
    background: ${({ theme }) => theme.colors.card};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
      padding: 1rem;
      margin-bottom: 1rem;
      
      &:hover {
        transform: none;
      }
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .grid {
    display: grid;
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .gap-4 {
    gap: 1rem;
  }

  .p-4 {
    padding: 1rem;
  }

  .m-4 {
    margin: 1rem;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .mt-4 {
    margin-top: 1rem;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .rounded {
    border-radius: 4px;
  }

  .shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease forwards;
  }

  .responsive-table {
    overflow-x: auto;
    width: 100%;
  }

  .responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .grid-cols-2, .grid-cols-3, .grid-cols-4 {
      grid-template-columns: 1fr;
    }
    
    .responsive-grid {
      grid-template-columns: 1fr;
    }
    
    .hide-on-mobile {
      display: none;
    }
    
    .p-4 {
      padding: 0.75rem;
    }
    
    .m-4 {
      margin: 0.75rem;
    }
    
    h1 {
      font-size: 1.5rem;
    }
    
    h2 {
      font-size: 1.3rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .grid-cols-3, .grid-cols-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`
