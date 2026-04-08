import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { getCustomerListView } from '../../../services/productServices';
import { useEffect } from 'react';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 90vh;
  }
`;

const ModalHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: white;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const SearchContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  padding-left: 40px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const CustomerList = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const CustomerItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: 2px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const CustomerName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CustomerDetails = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const CustomerSelectionModal = ({ onClose, onSelectCustomer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customerList();
    }, [])

    const customerList = async () => {
        const response = await getCustomerListView();
        setCustomers(response.data);
    }

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCustomerClick = (customer) => {
        if (onSelectCustomer) {
            onSelectCustomer(customer);
        }
        onClose();
    };

    return (
        <Modal onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Select Customer</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <SearchContainer>
                    <SearchWrapper>
                        <SearchIcon>
                            <FaSearch />
                        </SearchIcon>
                        <SearchInput
                            type="text"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </SearchWrapper>
                </SearchContainer>

                <CustomerList>
                    {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer, index) => (
                            <CustomerItem
                                key={index}
                                onClick={() => handleCustomerClick(customer)}
                            >
                                <CustomerName>{customer.name}</CustomerName>
                            </CustomerItem>
                        ))
                    ) : (
                        <NoResults>No customers found</NoResults>
                    )}
                </CustomerList>
            </ModalContent>
        </Modal>
    );
};

export default CustomerSelectionModal;