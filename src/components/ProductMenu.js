import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Hr from './../assets/img/human-resources1.png';
import Crm from './../assets/img/crm1.png';
import Lab from './../assets/img/Labtest.png';
import Erp from './../assets/img/erp.png';

// Keyframes for slide-down animation
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components for the menu
const ProductMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  z-index: 10;
  width: 400px;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px 0;
  display: ${({ show }) => (show ? 'block' : 'none')};
  animation: ${slideDown} 0.3s ease-out;
  color: #454545;
  .product-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-size: 1rem;
    font-weight: 500;

    &.active {
      background-color: #f39c12;
      color: #ffffff;

      .product-icon {
        transform: scale(1.1);
      }
    }

    &:hover {
      background-color: #f39c12;
      color: #ffffff;

      .product-icon {
        transform: scale(1.1);
      }
    }
  }

  .product-icon {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease;
  }
`;

const MenuTitle = styled.div`
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: 600;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  text-align: left;
  color: #343a40;
`;

const ProductMenu = ({ show }) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleProductClick = (product, path) => {
    setSelectedProduct(product);
    navigate(path);
  };

  return (
    <ProductMenuContainer show={show}>
      <MenuTitle>Explore Our Products</MenuTitle>
      <div
        className={`product-item ${selectedProduct === 'CRM' ? 'active' : ''}`}
        onClick={() => handleProductClick('CRM', '/crm.html')}
      >
        <img className="product-icon" src={Crm} alt="CRM" />
        <span>Customer Relationship Management (CRM)</span>
      </div>
      <div
        className={`product-item ${selectedProduct === 'HRM' ? 'active' : ''}`}
        onClick={() => handleProductClick('HRM', '/hrm.html')}
      >
        <img className="product-icon" src={Hr} alt="HRM" />
        <span>Human Resource Management (HRM)</span>
      </div>
      <div
        className={`product-item ${selectedProduct === 'LMS' ? 'active' : ''}`}
        onClick={() => handleProductClick('LMS', '/lms.html')}
      >
        <img className="product-icon" src={Lab} alt="LMS" />
        <span>Lab Management System (LMS)</span>
      </div>
      <div
        className={`product-item ${selectedProduct === 'ERP' ? 'active' : ''}`}
        onClick={() => handleProductClick('ERP', '/Product.html')}
      >
        <img className="product-icon" src={Erp} alt="ERP" />
        <span>Enterprise Resource Planning (ERP)</span>
      </div>
    </ProductMenuContainer>
  );
};

export default ProductMenu;
