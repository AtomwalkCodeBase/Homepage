"use client";

import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FaCalendarAlt, FaClock, FaUserMd, FaTimesCircle, FaCalendarPlus, FaStethoscope } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
import { getbookedlistview, doctorBookingView } from "../services/productServices";

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
  font-weight: 400;
`;

const TabContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 8px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  gap: 8px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  background: ${({ active, theme }) => 
    active 
      ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)` 
      : 'transparent'
  };
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ active }) => 
    active 
      ? `0 4px 20px rgba(0, 0, 0, 0.4)` 
      : 'none'
  };

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: ${({ active, theme }) => 
      active 
        ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)` 
        : 'rgba(255, 255, 255, 0.1)'
    };
    transform: translateY(-2px);
  }
`;

const AppointmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const AppointmentCard = styled.div`
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ isCancelled, isPast, theme }) =>
      isCancelled 
        ? `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` 
        : isPast 
          ? `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` 
          : `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`
    };
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const AppointmentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AppointmentImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  border: 3px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AppointmentInfo = styled.div`
  flex: 1;
`;

const AppointmentName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: #333333;
`;

const AppointmentSpecialty = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const AppointmentDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
`;

const AppointmentDetail = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  svg {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1rem;
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 4px 8px;
  border-radius: 20px;
  background: ${({ isCancelled, theme }) =>
    isCancelled 
      ? '#F44336' 
      : '#4CAF50'
  };
  color: #;
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  background: ${({ type, theme }) =>
    type === "calendar" 
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` 
      : type === "update" 
        ? theme.colors.secondary
        : theme.colors.error
  };
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 110px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }

  svg {
    margin-right: 6px;
    font-size: 1rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: ${({ theme }) => theme.colors.card};
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${({ theme }) => theme.colors.card};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.card};
`;

const ErrorText = styled.p`
  font-size: 1.2rem;
  margin: 16px 0;
`;

const RetryButton = styled.button`
  padding: 14px 28px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
  color: ${({ theme }) => theme.colors.card};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.card};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  svg {
    font-size: 80px;
    margin-bottom: 20px;
    opacity: 0.7;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.8;
    margin: 0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 24px;
  padding: 40px;
  width: 90%;
  max-width: 450px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from { transform: translateY(-20px) scale(0.95); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
  }
`;

const ModalIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ type, theme }) =>
    type === 'warning' 
      ? `linear-gradient(135deg, ${theme.colors.warning}, ${theme.colors.accent})` 
      : type === 'error'
        ? `linear-gradient(135deg, ${theme.colors.error}, ${theme.colors.warning})`
        : `linear-gradient(135deg, ${theme.colors.info}, ${theme.colors.text})`
  };
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: ${({ theme }) => theme.colors.card};
  font-size: 1.8rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 15px;
`;

const ModalText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 30px;
  line-height: 1.5;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  background: ${({ type, modalType, theme }) =>
    type === "yes" 
      ? (modalType === "cancel" ? theme.colors.error : theme.colors.secondary)
      : theme.colors.error
  };
  color: ${({ theme }) => theme.colors.card};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const normalizeTime = (startTime, endTime) => {
  if (!startTime || !endTime) return `${startTime || ""}-${endTime || ""}`;

  const formatTime = (time) => {
    if (time.includes("AM") || time.includes("PM")) return time;
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const normalizedHours = hours % 12 || 12;
    return `${normalizedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "Invalid Date";

  if (dateString.includes("-")) {
    const [day, month, year] = dateString.split("-").map(Number);
    if (!day || !month || !year) return dateString;

    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return dateString;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    return `${days[date.getDay()]}, ${day.toString().padStart(2, "0")} ${months[date.getMonth()]} ${year}`;
  }

  return dateString;
};

const parseFullDate = (dateStr) => {
  if (!dateStr) return null;

  try {
    if (dateStr.includes('-')) {
      const [day, month, year] = dateStr.split('-').map(Number);
      if (day && month && year) {
        return new Date(year, month - 1, day);
      }
    }

    if (dateStr.includes(',')) {
      const [, rest] = dateStr.split(', ');
      const [day, monthName, year] = rest.split(' ');
      const months = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
      const monthIndex = months.indexOf(monthName);
      if (monthIndex !== -1 && day && year) {
        return new Date(year, monthIndex, parseInt(day));
      }
    }

    return null;
  } catch (error) {
    console.error('Error parsing date:', dateStr, error);
    return null;
  }
};

const parseDateTimeForComparison = (dateString, timeString) => {
  if (!dateString || !timeString) return null;

  const date = parseFullDate(dateString);
  if (!date) return null;

  const match = timeString.match(/(\d+:\d+)([AP]M)?/i);
  if (!match) return null;

  const [time, period] = match.slice(1);
  let [hours, minutes] = time.split(':').map(Number);
  if (period) {
    if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
    if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
  }

  date.setHours(hours, minutes, 0, 0);
  return date;
};

let appointmentsState = {
  upcoming: [],
  past: [],
  cancelled: [],
};

const listeners = new Set();

export const getAppointments = () => appointmentsState;

export const subscribeToAppointments = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const notifyListeners = () => {
  listeners.forEach((callback) => callback(appointmentsState));
};

export const fetchBookedAppointments = async (customerId) => {
  try {
    if (!customerId) {
      throw new Error("Customer ID not found. Please log in.");
    }

    const response = await getbookedlistview(parseInt(customerId));
    console.log("getbookedlistview Response:", JSON.stringify(response, null, 2));

    const apiData = response.data || response;

    if (!apiData) {
      throw new Error("No data received from API");
    }

    const bookingsArray = Array.isArray(apiData) ? apiData : [apiData];

    const currentDateTime = new Date();

    const appointments = {
      upcoming: [],
      past: [],
      cancelled: []
    };

    bookingsArray.forEach(booking => {
      if (!booking || !booking.customer_data || !booking.equipment_data) {
        console.warn('Skipping invalid booking:', booking);
        return;
      }

      if (booking.customer_data.id.toString() !== customerId) {
        console.warn(`Skipping booking for different customer: ${booking.customer_data.id}`);
        return;
      }

      // const bookingDate = parseFullDate(booking.booking_date);
      const status = booking.status_display?.toLowerCase() || 'booked';

      const appointment = {
        id: booking.id?.toString() || `${Date.now()}-${Math.random()}`,
        booking_id: booking.booking_id?.toString() || booking.id?.toString(),
        doctorName: booking.equipment_data.name || 'Unknown Doctor',
        specialty: booking.equipment_data.equipment_type || 'Unknown Specialty',
        date: booking.booking_date || new Date().toISOString().split('T')[0],
        time: normalizeTime(booking.start_time, booking.end_time),
        image: booking.equipment_data.image || "/placeholder.svg?height=70&width=70",
        status: status,
        start_time: booking.start_time,
        end_time: booking.end_time,
        duration: parseFloat(booking.duration) || 1.0,
        doctor_id: booking.equipment_data.id?.toString(),
        customer_id: booking.customer_data.id?.toString(),
      };

      if (!appointment.booking_id || !appointment.customer_id) {
        console.warn('Skipping booking with missing booking_id or customer_id:', booking);
        return;
      }

      if (status === 'cancelled') {
        appointments.cancelled.push(appointment);
      } else {
        const appointmentDateTime = parseDateTimeForComparison(booking.booking_date, booking.start_time);
        if (appointmentDateTime && appointmentDateTime < currentDateTime) {
          appointments.past.push(appointment);
        } else {
          appointments.upcoming.push(appointment);
        }
      }
    });

    appointments.upcoming.sort((a, b) => {
      const dateA = parseFullDate(a.date);
      const dateB = parseFullDate(b.date);

      if (!dateA || !dateB) return 0;

      const timeA = a.start_time?.match(/(\d+:\d+)([AP]M)?/i);
      const timeB = b.start_time?.match(/(\d+:\d+)([AP]M)?/i);

      if (!timeA || !timeB) return dateA - dateB;

      let [hoursA, minutesA] = timeA[1].split(':').map(Number);
      let [hoursB, minutesB] = timeB[1].split(':').map(Number);

      if (timeA[2]) {
        if (timeA[2].toUpperCase() === 'PM' && hoursA !== 12) hoursA += 12;
        if (timeA[2].toUpperCase() === 'AM' && hoursA === 12) hoursA = 0;
      }
      if (timeB[2]) {
        if (timeB[2].toUpperCase() === 'PM' && hoursB !== 12) hoursB += 12;
        if (timeB[2].toUpperCase() === 'AM' && hoursB === 12) hoursB = 0;
      }

      dateA.setHours(hoursA, minutesA, 0, 0);
      dateB.setHours(hoursB, minutesB, 0, 0);

      return dateA - dateB;
    });

    appointments.past.sort((a, b) => {
      const dateA = parseFullDate(a.date);
      const dateB = parseFullDate(b.date);

      if (!dateA || !dateB) return 0;

      const timeA = a.start_time?.match(/(\d+:\d+)([AP]M)?/i);
      const timeB = b.start_time?.match(/(\d+:\d+)([AP]M)?/i);

      if (!timeA || !timeB) return dateB - dateA;

      let [hoursA, minutesA] = timeA[1].split(':').map(Number);
      let [hoursB, minutesB] = timeB[1].split(':').map(Number);

      if (timeA[2]) {
        if (timeA[2].toUpperCase() === 'PM' && hoursA !== 12) hoursA += 12;
        if (timeA[2].toUpperCase() === 'AM' && hoursA === 12) hoursA = 0;
      }
      if (timeB[2]) {
        if (timeB[2].toUpperCase() === 'PM' && hoursB !== 12) hoursB += 12;
        if (timeB[2].toUpperCase() === 'AM' && hoursB === 12) hoursB = 0;
      }

      dateA.setHours(hoursA, minutesA, 0, 0);
      dateB.setHours(hoursB, minutesB, 0, 0);

      return dateB - dateA;
    });

    appointments.cancelled.sort((a, b) => {
      const dateA = parseFullDate(a.date);
      const dateB = parseFullDate(b.date);

      if (!dateA || !dateB) return 0;

      const timeA = a.start_time?.match(/(\d+:\d+)([AP]M)?/i);
      const timeB = b.start_time?.match(/(\d+:\d+)([AP]M)?/i);

      if (!timeA || !timeB) return dateB - dateA;

      let [hoursA, minutesA] = timeA[1].split(':').map(Number);
      let [hoursB, minutesB] = timeB[1].split(':').map(Number);

      if (timeA[2]) {
        if (timeA[2].toUpperCase() === 'PM' && hoursA !== 12) hoursA += 12;
        if (timeA[2].toUpperCase() === 'AM' && hoursA === 12) hoursA = 0;
      }
      if (timeB[2]) {
        if (timeB[2].toUpperCase() === 'PM' && hoursB !== 12) hoursB += 12;
        if (timeB[2].toUpperCase() === 'AM' && hoursB === 12) hoursB = 0;
      }

      dateA.setHours(hoursA, minutesA, 0, 0);
      dateB.setHours(hoursB, minutesB, 0, 0);

      return dateB - dateA;
    });

    appointmentsState = appointments;
    notifyListeners();

    await localStorage.setItem('bookings', JSON.stringify([
      ...appointments.upcoming,
      ...appointments.past,
      ...appointments.cancelled
    ]));

    return appointments;
  } catch (error) {
    console.error('Error fetching booked appointments:', error);
    throw error;
  }
};

export const useAppointments = () => {
  const [appointments, setAppointments] = useState(appointmentsState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const customerId = localStorage.getItem("custId");
      const fetchedAppointments = await fetchBookedAppointments(customerId);
      setAppointments(fetchedAppointments);
    } catch (err) {
      setError(err.message);
      console.error('Error loading appointments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();

    const unsubscribe = subscribeToAppointments((updatedAppointments) => {
      setAppointments(updatedAppointments);
    });

    return () => unsubscribe();
  }, [loadAppointments]);

  const saveAppointmentsToStorage = useCallback(async (updatedAppointments) => {
    try {
      const allBookings = [
        ...updatedAppointments.upcoming.map(apt => ({ ...apt, status: 'upcoming' })),
        ...updatedAppointments.cancelled.map(apt => ({ ...apt, status: 'cancelled' })),
        ...updatedAppointments.past.map(apt => ({ ...apt, status: 'past' }))
      ];
      await localStorage.setItem('bookings', JSON.stringify(allBookings));
    } catch (error) {
      console.error('Error saving appointments to storage:', error);
    }
  }, []);

  const moveToCancelled = useCallback((appointmentId) => {
    const appointmentToCancel = appointmentsState.upcoming.find(a => a.id === appointmentId);
    if (!appointmentToCancel) return;

    const updatedAppointments = {
      ...appointmentsState,
      upcoming: appointmentsState.upcoming.filter(a => a.id !== appointmentId),
      cancelled: [...appointmentsState.cancelled, { ...appointmentToCancel, status: 'cancelled' }]
    };

    appointmentsState = updatedAppointments;
    setAppointments(updatedAppointments);
    saveAppointmentsToStorage(updatedAppointments);
    notifyListeners();
  }, [saveAppointmentsToStorage]);

  return {
    appointments,
    loading,
    error,
    refresh: loadAppointments,
    moveToCancelled,
  };
};

const MyBookedAppointments = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "upcoming";
  const customerId = params.get("custId") || localStorage.getItem("custId");
  const [activeTab, setActiveTab] = useState(tab);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cancelSuccessModalVisible, setCancelSuccessModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [calendarError, setCalendarError] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [cancelClick, setCancelClick] = useState(false);
  const [rescheduleClick, setRescheduleClick] = useState(false);
  const { appointments, loading, error, refresh, moveToCancelled } = useAppointments();

  useEffect(() => {
    const validateCustomerId = async () => {
      const storedCustomerId = localStorage.getItem("custId");
      if (!storedCustomerId || (customerId && storedCustomerId !== customerId)) {
        toast.error("Invalid or missing customer ID. Please log in.");
        navigate("/login");
        return;
      }
      setActiveTab(tab);
    };
    validateCustomerId();
  }, [tab, customerId, navigate]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const moveToCancel = async () => {
    const appointment = appointments.upcoming.find((a) => a.id === selectedAppointmentId);
    if (!appointment) {
      toast.error("Appointment not found.");
      setModalVisible(false);
      setCancelClick(false);
      return;
    }

    try {
      const storedCustomerId = localStorage.getItem("custId");
      if (!storedCustomerId) throw new Error("Customer ID not found. Please log in.");

      if (!appointment.booking_id) {
        throw new Error(`Invalid Booking ID for appointment: ${appointment.id}`);
      }
      if (!appointment.doctor_id) throw new Error("Doctor ID is missing.");
      if (!appointment.date) throw new Error("Booking date is missing.");
      if (!appointment.start_time || !appointment.end_time) {
        throw new Error("Start time or end time is missing.");
      }
      if (!appointment.duration) throw new Error("Duration is missing.");

      if (!appointment.booking_id.match(/^B_\d{8}_\d+$/)) {
        throw new Error(`Invalid Booking ID format: ${appointment.booking_id}. Expected format like B_YYYYMMDD_NNNN.`);
      }

      console.log("Cancelling Appointment:", {
        customer_id: parseInt(storedCustomerId),
        doctor_id: parseInt(appointment.doctor_id),
        booking_date: appointment.date,
        start_time: appointment.start_time,
        end_time: appointment.end_time,
        duration: appointment.duration,
        call_mode: "CANCEL",
        booking_id: appointment.booking_id
      });

      const response = await doctorBookingView(
        parseInt(storedCustomerId),
        parseInt(appointment.doctor_id),
        appointment.date,
        appointment.start_time,
        appointment.end_time,
        appointment.duration,
        "CANCEL",
        appointment.booking_id
      );

      if (response && (response.status === 200 || response.data?.success)) {
        moveToCancelled(selectedAppointmentId);
        setModalVisible(false);
        setCancelClick(false);
        setActiveTab("cancelled");
        setCancelSuccessModalVisible(true);
      } else {
        throw new Error('Failed to cancel the appointment. Unexpected response.');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      let errorMessage = 'Failed to cancel appointment. Please try again.';
      if (error.response) {
        console.error('Server Error Response:', JSON.stringify(error.response.data, null, 2));
        if (error.response.data.message?.includes('Booking record not found')) {
          errorMessage = `Booking ID ${appointment.booking_id} not found. It may have been cancelled or does not exist.`;
          await refresh();
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      setModalVisible(false);
      setCancelClick(false);
    }
  };

  const handleUpdate = (appointmentId) => {
    setModalVisible(true);
    setSelectedAppointmentId(appointmentId);
    setCancelClick(false);
    setRescheduleClick(true);
  };

  const handleCancel = (appointmentId) => {
    setModalVisible(true);
    setSelectedAppointmentId(appointmentId);
    setCancelClick(true);
    setRescheduleClick(false);
  };

  const onPressYes = () => {
    if (rescheduleClick) {
      const appointment = appointments.upcoming.find((a) => a.id === selectedAppointmentId);
      if (appointment) {
        navigate(`/DateTime`, {
          state: {
            booking_id: appointment.booking_id,
            id: appointment.doctor_id,
            name: appointment.doctorName,
            specialty: appointment.specialty,
            image: appointment.image,
            startTime: appointment.start_time,
            endTime: appointment.end_time,
            duration: appointment.duration,
            date: appointment.date,
            time: appointment.time,
            isReschedule: true,
          },
        });
      }
      setModalVisible(false);
      setRescheduleClick(false);
    }
  };

  const onPressNo = () => {
    setModalVisible(false);
    setCancelClick(false);
    setRescheduleClick(false);
  };

  const handleAddToCalendar = (appointment) => {
    toast.success(`Appointment with ${appointment.doctorName} added to your calendar.`);
    setCalendarModalVisible(true);
    setCalendarError(null);
  };

  const renderTabContent = (tabName) => (
    <div>
      {loading && appointments[tabName].length === 0 ? (
        <LoadingContainer theme={theme}>
          <LoadingSpinner theme={theme} />
          <h3>Loading your appointments...</h3>
          <p>Please wait while we fetch your data</p>
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer theme={theme}>
          <FaTimesCircle size={50} />
          <ErrorText>{error}</ErrorText>
          <RetryButton onClick={refresh} theme={theme}>Try Again</RetryButton>
        </ErrorContainer>
      ) : appointments[tabName]?.length > 0 ? (
        <AppointmentGrid>
          {appointments[tabName].map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              isCancelled={tabName === "cancelled"}
              isPast={tabName === "past"}
              theme={theme}
            >
              <AppointmentHeader>
                <AppointmentImage theme={theme}>
                  <img
                    src={appointment.image}
                    alt={appointment.doctorName}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg?height=70&width=70";
                    }}
                  />
                </AppointmentImage>
                <AppointmentInfo>
                  <AppointmentName theme={theme}>{appointment.doctorName}</AppointmentName>
                  <AppointmentSpecialty theme={theme}>{appointment.specialty}</AppointmentSpecialty>
                </AppointmentInfo>
                {(tabName === "cancelled" || tabName === "past") && (
                  <StatusBadge isCancelled={tabName === "cancelled"} theme={theme}>
                    {tabName === "cancelled" ? "Cancelled" : "Completed"}
                  </StatusBadge>
                )}
              </AppointmentHeader>

              <AppointmentDetails>
                <AppointmentDetail theme={theme}>
                  <FaCalendarAlt />
                  <span>{formatDate(appointment.date)}</span>
                </AppointmentDetail>
                <AppointmentDetail theme={theme}>
                  <FaClock />
                  <span>{appointment.time}</span>
                </AppointmentDetail>
              </AppointmentDetails>

              {tabName === "upcoming" && (
                <ButtonContainer>
                  <ActionButton type="calendar" onClick={() => handleAddToCalendar(appointment)} theme={theme}>
                    <FaCalendarPlus />
                    Add to Calendar
                  </ActionButton>
                  <ActionButton type="update" onClick={() => handleUpdate(appointment.id)} theme={theme}>
                    <FaCalendarAlt />
                    Reschedule
                  </ActionButton>
                  <ActionButton type="delete" onClick={() => handleCancel(appointment.id)} theme={theme}>
                    <FaTimesCircle />
                    Cancel
                  </ActionButton>
                </ButtonContainer>
              )}
            </AppointmentCard>
          ))}
        </AppointmentGrid>
      ) : (
        <EmptyState theme={theme}>
          <FaStethoscope />
          <h3>
            {tabName === "upcoming" && "No upcoming appointments"}
            {tabName === "past" && "No past appointments"}
            {tabName === "cancelled" && "No cancelled appointments"}
          </h3>
          <p>
            {tabName === "upcoming" && "Book an appointment to get started"}
            {tabName === "past" && "Your completed appointments will appear here"}
            {tabName === "cancelled" && "Your cancelled appointments will appear here"}
          </p>
        </EmptyState>
      )}
    </div>
  );

  return (
    <Layout>
      <PageContainer theme={theme}>
        <ContentWrapper>
          <PageHeader theme={theme}>
            <PageTitle theme={theme}>My Appointments</PageTitle>
            <PageSubtitle theme={theme}>Manage your healthcare appointments with ease</PageSubtitle>
          </PageHeader>

          <TabContainer theme={theme}>
            <TabButton
              active={activeTab === "upcoming"}
              onClick={() => handleTabChange("upcoming")}
              theme={theme}
            >
              Upcoming
            </TabButton>
            <TabButton
              active={activeTab === "past"}
              onClick={() => handleTabChange("past")}
              theme={theme}
            >
              Past
            </TabButton>
            <TabButton
              active={activeTab === "cancelled"}
              onClick={() => handleTabChange("cancelled")}
              theme={theme}
            >
              Cancelled
            </TabButton>
          </TabContainer>

          {renderTabContent(activeTab)}

          {isModalVisible && (
            <ModalOverlay theme={theme}>
              <ModalContainer theme={theme}>
                <ModalIcon type={cancelClick ? "error" : "warning"} theme={theme}>
                  <FaUserMd />
                </ModalIcon>
                <ModalTitle theme={theme}>
                  {cancelClick ? "Cancel Appointment" : "Reschedule Appointment"}
                </ModalTitle>
                <ModalText theme={theme}>
                  {cancelClick
                    ? "Are you sure you want to cancel this appointment? This action cannot be undone."
                    : "Do you want to reschedule this appointment? You'll be redirected to select a new date and time."}
                </ModalText>
                <ModalButtonContainer>
                  <ModalButton
                    type="yes"
                    modalType={cancelClick ? "cancel" : "reschedule"}
                    onClick={cancelClick ? moveToCancel : onPressYes}
                    theme={theme}
                  >
                    {cancelClick ? "Yes, Cancel" : "Yes, Reschedule"}
                  </ModalButton>
                  <ModalButton type="no" onClick={onPressNo} theme={theme}>
                    No, Keep It
                  </ModalButton>
                </ModalButtonContainer>
              </ModalContainer>
            </ModalOverlay>
          )}

          {calendarModalVisible && (
            <ModalOverlay theme={theme}>
              <ModalContainer theme={theme}>
                <ModalIcon type="success" theme={theme}>
                  <FaCalendarPlus />
                </ModalIcon>
                <ModalTitle theme={theme}>{calendarError ? "Calendar Error" : "Event Added Successfully"}</ModalTitle>
                <ModalText theme={theme}>
                  {calendarError || "The appointment has been successfully added to your calendar. You'll receive a reminder before your appointment."}
                </ModalText>
                <ModalButtonContainer>
                  <ModalButton type="yes" modalType="success" onClick={() => setCalendarModalVisible(false)} theme={theme}>
                    Got It!
                  </ModalButton>
                </ModalButtonContainer>
              </ModalContainer>
            </ModalOverlay>
          )}

          {cancelSuccessModalVisible && (
            <ModalOverlay theme={theme}>
              <ModalContainer theme={theme}>
                <ModalIcon type="success" theme={theme}>
                  <FaTimesCircle />
                </ModalIcon>
                <ModalTitle theme={theme}>Appointment Cancelled</ModalTitle>
                <ModalText theme={theme}>
                  Your appointment has been successfully cancelled. If you need to reschedule, you can book a new appointment anytime.
                </ModalText>
                <ModalButtonContainer>
                  <ModalButton type="yes" modalType="success" onClick={() => setCancelSuccessModalVisible(false)} theme={theme}>
                    Understood
                  </ModalButton>
                </ModalButtonContainer>
              </ModalContainer>
            </ModalOverlay>
          )}
        </ContentWrapper>
      </PageContainer>
    </Layout>
  );
};

export default MyBookedAppointments;