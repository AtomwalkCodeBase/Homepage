import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaBed,
  FaChevronDown,
  FaSpinner,
  FaCalendar,
  FaClock,
  FaUser
} from 'react-icons/fa';
import { 
  getEquipentTypeListView, 
  getAvailableRoomslistView, 
  getEquipmentListView,
  doctorBookingView 
} from '../services/productServices';
import { toast } from 'react-toastify';
import Button from './Button';

const CONTROL_HEIGHT = '42px';

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-right: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  appearance: none;
  width: 100%;
  height: ${CONTROL_HEIGHT};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textLight};
  transition: ${({ theme }) => theme.transitions.fast};
  
  ${Select}:focus + & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.fast};
  height: ${CONTROL_HEIGHT};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const DateSlotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;

  & > .left,
  & > .right {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.md};
    & > * {
      width: 100%;
      justify-content: stretch;
    }
  }
`;

// Using shared Button component instead of a local NextButton style
const SearchButton = styled(Button)`
  height: ${CONTROL_HEIGHT};
  display: inline-flex;
  align-items: center;
  margin-right: auto;
  justify-content: center;
  min-width: 120px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    min-width: unset;
  }
`;

const InlineControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  width: 100%;
  
  & > ${Input} {
    flex: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const EquipmentCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EquipmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const EquipmentName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const EquipmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const DateSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const DateSlot = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['$available', '$selected', '$isBooked'].includes(prop)
})`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $selected, $available, $isBooked, theme }) => {
    if ($isBooked) return theme.colors.error;
    if ($selected) return theme.colors.primary;
    if ($available) return theme.colors.success;
    return theme.colors.backgroundAlt;
  }};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    opacity: ${({ $isBooked }) => $isBooked ? 1 : 0.9};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SlotDate = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const SlotTime = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  opacity: 0.9;
`;

const BedAllocation = ({ onNext, onBack, readOnly = false, patientData, bedData }) => {
  const [formData, setFormData] = useState({
    roomName: '',
    daysExpected: '',
    selectedEquipment: null,
    selectedSlots: [], // Changed to array for multiple slots
    startTime: '',
    endTime: '',
    duration: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypesLoading, setRoomTypesLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableRoomsLoading, setAvailableRoomsLoading] = useState(false);
  const [equipmentList, setEquipmentList] = useState([]);
  const [equipmentListLoading, setEquipmentListLoading] = useState(false);
  const [matchedEquipment, setMatchedEquipment] = useState([]);

  // Generate next 7 days for slot display
  const generateDateSlots = () => {
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      slots.push({
        date: date,
        dateString: date.toISOString().split('T')[0],
        displayDate: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        dayOfWeek: date.getDay()
      });
    }
    
    return slots;
  };

  const dateSlots = generateDateSlots();

  // Fetch equipment types on component mount
  useEffect(() => {
    const fetchEquipmentTypes = async () => {
      setRoomTypesLoading(true);
      try {
        const response = await getEquipentTypeListView();
        if (response && response.data) {
          setRoomTypes(response.data);
        }
      } catch (error) {
        console.error('Error fetching equipment types:', error);
        toast.error('Failed to fetch equipment types');
      } finally {
        setRoomTypesLoading(false);
      }
    };

    fetchEquipmentTypes();
  }, []);

  // Fetch all equipment details
  useEffect(() => {
    const fetchEquipmentList = async () => {
      setEquipmentListLoading(true);
      try {
        const response = await getEquipmentListView();
        if (response && response.data) {
          setEquipmentList(response.data);
        }
      } catch (error) {
        console.error('Error fetching equipment list:', error);
        toast.error('Failed to fetch equipment list');
      } finally {
        setEquipmentListLoading(false);
      }
    };

    fetchEquipmentList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchAvailableRooms = async () => {
    if (!formData.roomName) {
      toast.warning('Please select an Bed type first.');
      return;
    }
    
    try {
      setAvailableRoomsLoading(true);
      const numDays = parseInt(formData.daysExpected || '14', 10);
      const response = await getAvailableRoomslistView(formData.roomName, numDays);
      const availableRoomsData = response?.data || [];

      const normalize = (s) => (s || '').toString().trim().toLowerCase();
      // Match available rooms with equipment details and propagate a reliable id
      const matched = availableRoomsData.map(room => {
        const equipmentDetail = equipmentList.find(eq => normalize(eq.name) === normalize(room.name));
        const derivedId = room.id ?? room.equipment_id ?? room.eq_id ?? room.facility_id ?? equipmentDetail?.id;
        return {
          ...room,
          id: derivedId,
          equipment_id: derivedId,
          equipmentDetails: equipmentDetail || null
        };
      });

      setAvailableRooms(availableRoomsData);
      setMatchedEquipment(matched);
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      toast.error('Failed to fetch available rooms');
    } finally {
      setAvailableRoomsLoading(false);
    }
  };

  const handleSlotClick = (equipment, slot) => {
    if (readOnly) return;
    setFormData(prev => {
      const isDifferentEquipment = !prev.selectedEquipment || prev.selectedEquipment.name !== equipment.name;
      const currentSelected = isDifferentEquipment ? [] : prev.selectedSlots;

      // First click: set anchor
      if (currentSelected.length === 0) {
        return {
          ...prev,
          selectedEquipment: equipment,
          selectedSlots: [slot]
        };
      }

      // Second click: select range between anchor and clicked
      const anchorDate = new Date(currentSelected[0].dateString);
      const clickedDate = new Date(slot.dateString);
      const startRange = anchorDate < clickedDate ? anchorDate : clickedDate;
      const endRange = anchorDate < clickedDate ? clickedDate : anchorDate;

      const rangedSlots = dateSlots.filter(ds => {
        const d = new Date(ds.dateString);
        return d >= startRange && d <= endRange;
      });

      return {
        ...prev,
        selectedEquipment: equipment,
        selectedSlots: rangedSlots
      };
    });
  };

  const isSlotAvailable = (equipment, slot) => {
    if (!equipment.equipmentDetails) return false;
    
    // const { no_of_slots } = equipment.equipmentDetails;
    
    // Check if slot is in the past (yesterday or earlier)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const slotDate = new Date(slot.dateString);
    
    if (slotDate < today) {
      return false; // Past dates are not available
    }
    return true;
  };

  const handleBooking = async () => {
    if (!formData.selectedEquipment || formData.selectedSlots.length === 0) {
      toast.warning('Please select an Bed and at least one time slot.');
      return;
    }

    // Get customer_id from patientData prop (from PatientAdmission dropdown)
    if (!patientData || !patientData.patientId) {
      toast.error('Patient ID not found. Please select a patient first.');
      return;
    }

    try {
      setLoading(true);

      // Format date as DD-MM-YYYY
      const toDDMMYYYY = (iso) => {
        const [y, m, d] = iso.split('-');
        return `${d}-${m}-${y}`;
      };

      // Determine first/last selected dates
      const sorted = [...formData.selectedSlots].sort((a, b) => new Date(a.dateString) - new Date(b.dateString));
      const startISO = sorted[0].dateString;
      const endISO = sorted[sorted.length - 1].dateString;

      // Resolve equipment id robustly
      const equipmentId = Number(
        formData.selectedEquipment?.equipmentDetails?.id ??
        formData.selectedEquipment?.equipment_id ??
        formData.selectedEquipment?.id ??
        formData.selectedEquipment?.facility_id ??
        formData.selectedEquipment?.eq_id
      );

      if (!equipmentId) {
        toast.error('Bed ID missing. Please reselect Bed.');
        setLoading(false);
        return;
      }

      const bookingData = {
        customer_id: Number(patientData.patientId),
        equipment_id: equipmentId,
        booking_date: toDDMMYYYY(startISO),
        booking_end_date: toDDMMYYYY(endISO),
        start_time: '06:00 AM',
        end_time: '06:00 AM',
        duration: '24',
        remarks: '',
        status: 'ADD_BOOKING',
        call_mode: 'ADD_BOOKING'
      };

      const response = await doctorBookingView(bookingData);

      if (response && response.status === 200) {
        toast.success(`Bed booked from ${bookingData.booking_date} to ${bookingData.booking_end_date}`);
        // Move to next step after successful booking
        onNext({
          equipment: formData.selectedEquipment,
          slots: formData.selectedSlots,
          patientData: patientData
        });
      } else {
        toast.error('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error booking Bed:', error);
      toast.error('Error booking Bed: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <SectionTitle>Bed Booking</SectionTitle>
      
      {(!patientData || !patientData.patientId) && (
        <div style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          borderRadius: '8px', 
          padding: '12px', 
          marginBottom: '20px',
          color: '#856404'
        }}>
          <strong>⚠️ Warning:</strong> No patient selected. Please go back to Patient Details and select a patient first.
        </div>
      )}
      
      <FormGrid>
        <FormGroup>
          <Label>Bed Type</Label>
          <SelectWrapper>
            <Select name="roomName" value={formData.roomName} onChange={handleInputChange} disabled={readOnly}>
              <option value="">Select Bed type</option>
              {roomTypesLoading ? (
                <option value="" disabled>Loading...</option>
              ) : (
                roomTypes.map((roomType, index) => (
                  <option key={index} value={roomType[0]}>
                    {roomType[1]}
                  </option>
                ))
              )}
            </Select>
            <SelectIcon>
              <FaChevronDown />
            </SelectIcon>
          </SelectWrapper>
        </FormGroup>

        {/* <FormGroup>
          <Label>Days Expected</Label>
          <Input
            type="number"
            name="daysExpected"
            placeholder="Enter days expected"
            value={formData.daysExpected}
            onChange={handleInputChange}
            min="1"
            max="14"
            disabled={readOnly}
          />
        </FormGroup> */}

        <FormGroup>
          <Label>&nbsp;</Label>
          <SearchButton
            type="button"
            variant="primary"
            onClick={handleSearchAvailableRooms}
            disabled={readOnly || availableRoomsLoading || !formData.roomName}
          >
            {availableRoomsLoading ? <FaSpinner /> : 'Search'}
          </SearchButton>
        </FormGroup>
      </FormGrid>

      {availableRoomsLoading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
          <p>Loading available Beds...</p>
        </div>
      )}

            {matchedEquipment.length > 0 && !availableRoomsLoading && (
         <div>
           <Label>Available Beds & Time Slots</Label>
           {matchedEquipment.map((equipment, index) => (
             <EquipmentCard key={`${equipment.name}-${index}`}>
               <EquipmentHeader>
                 <EquipmentName>{equipment.name}</EquipmentName>
               </EquipmentHeader>
               
               <DateSlotsGrid>
                 {dateSlots.map((slot) => {
                   const isAvailable = isSlotAvailable(equipment, slot);
                   const isSelected = formData.selectedEquipment?.name === equipment.name && 
                                    formData.selectedSlots.some(selectedSlot => selectedSlot.dateString === slot.dateString);
                   
                    return (
                     <DateSlot
                       key={slot.dateString}
                       as="button"
                       variant="ghost"
                       $available={isAvailable}
                       $selected={isSelected}
                       $isBooked={!isAvailable}
                        disabled={readOnly || !isAvailable}
                       onClick={() => isAvailable && handleSlotClick(equipment, slot)}
                     >
                       <SlotDate>{slot.displayDate}</SlotDate>
                       <SlotTime>
                         {isAvailable ? 'Available' : 'Unavailable'}
                       </SlotTime>
                     </DateSlot>
                   );
                 })}
               </DateSlotsGrid>
             </EquipmentCard>
           ))}
         </div>
       )}

              {/* Booked Details Section */}
       {(formData.selectedEquipment && formData.selectedSlots.length > 0) && (
         <div style={{ 
           background: '#e8f5e8', 
           border: '1px solid #4caf50', 
           borderRadius: '8px', 
           padding: '16px', 
           marginTop: '20px' 
         }}>
           <h4 style={{ margin: '0 0 12px 0', color: '#2e7d32' }}>
             📋 Booked Details
           </h4>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
             <strong style={{ color: '#2e7d32' }}>
               {formData.selectedEquipment.name}
             </strong>
             <span style={{ color: '#666' }}>|</span>
             <span style={{ color: '#2e7d32' }}>
               {formData.selectedSlots.map(slot => slot.displayDate).join(', ')}
             </span>
             <span style={{ color: '#666', fontSize: '0.9em' }}>
               ({formData.selectedSlots.length} day{formData.selectedSlots.length > 1 ? 's' : ''})
             </span>
           </div>
         </div>
       )}

       {readOnly && !formData.selectedEquipment && Array.isArray((bedData && bedData.slots) || []) && bedData.slots.length > 0 && (
         <div style={{ 
           background: '#e8f5e8', 
           border: '1px solid #4caf50', 
           borderRadius: '8px', 
           padding: '16px', 
           marginTop: '20px' 
         }}>
           <h4 style={{ margin: '0 0 12px 0', color: '#2e7d32' }}>
             📋 Booked Details
           </h4>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
             <strong style={{ color: '#2e7d32' }}>
               {bedData?.equipment?.name || 'Selected Bed'}
             </strong>
             <span style={{ color: '#666' }}>|</span>
             <span style={{ color: '#2e7d32' }}>
               {bedData.slots.map(slot => slot.displayDate || slot).join(', ')}
             </span>
             <span style={{ color: '#666', fontSize: '0.9em' }}>
               ({bedData.slots.length} day{bedData.slots.length > 1 ? 's' : ''})
             </span>
           </div>
         </div>
       )}

      <ActionButtons>
        <div className="left">
          <Button
            type="button"
            variant="secondary"
            onClick={onBack}
          >
            Back
          </Button>
        </div>
        <div className="right">
          {!readOnly ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleBooking}
              disabled={loading || !formData.selectedEquipment || formData.selectedSlots.length === 0}
            >
              {loading ? <FaSpinner /> : <FaBed />}
              {loading ? 'Booking...' : 'Book Bed'}
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={() => onNext(bedData)}
              disabled={!bedData || !Array.isArray((bedData && bedData.slots) || []) || bedData.slots.length === 0}
            >
              Next
            </Button>
          )}
        </div>
      </ActionButtons>
    </FormContainer>
  );
};

export default BedAllocation;