import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Badge from "../components/Badge"
import {
  FaGift,
  FaHeart,
  FaBirthdayCake,
  FaCalendarAlt,
  FaUserFriends,
  FaSpinner,
  FaSearch,
  FaEye,
} from "react-icons/fa"
import { getEventLists, getResponseLists } from "../services/productServices"
import Modal from "../components/modals/Modal"

// Animation keyframes
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`

const swing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// Styled components
const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
`

const Header = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});;
  border-radius: 12px;
  padding: 40px 20px;
  margin-bottom: 1.5rem;
  color: white;
  text-align: center;
  position: relative;
`

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  z-index: 2;
  position: relative;
  color: wheat;
`

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  z-index: 2;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const StatsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const StatsIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${(props) => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 15px;
`

const StatsValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`

const StatsLabel = styled.div`
  font-size: 1rem;
  color: #666;
`

const EventsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const EventCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid ${(props) => (props.selected ? "#6C63FF" : "transparent")};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${(props) => (props.type === "B" ? "#FF6584" : props.type === "W" ? "#63FFDA" : "#FFD600")};
  }
`

const EventHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

const EventIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => (props.type === "B" ? "#FF6584" : props.type === "W" ? "#63FFDA" : "#FFD600")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 15px;
`

const EventInfo = styled.div`
  flex: 1;
`

const EventTitle = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #333;
`

const EventDate = styled.div`
  font-size: 0.9rem;
  color: #666;
`

const EventDescription = styled.div`
  margin-bottom: 15px;
  color: #444;
  font-size: 1rem;
`

const EventFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ResponseCount = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  
  svg {
    margin-right: 5px;
  }
`

const ViewButton = styled.button`
  background: transparent;
  border: none;
  color: #6C63FF;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    text-decoration: underline;
  }
`

const WishesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const WishCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    right: -10px;
    width: 70px;
    height: 70px;
    background: ${(props) => (props.featured ? "linear-gradient(135deg, #FFDE59, #FF914D)" : "transparent")};
    border-radius: 0 0 0 70px;
    z-index: 1;
    opacity: ${(props) => (props.featured ? 1 : 0)};
  }
  
  &::after {
    content: '★';
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    z-index: 2;
    opacity: ${(props) => (props.featured ? 1 : 0)};
    font-size: 1.2rem;
  }
`

const WishHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

const WishAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => props.color || "#ddd"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 15px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const WishSender = styled.div`
  flex: 1;
`

const WishSenderName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
`

const WishDate = styled.div`
  font-size: 0.85rem;
  color: #666;
`

const WishContent = styled.div`
  margin-bottom: 15px;
  line-height: 1.6;
  color: #444;
  font-size: 1rem;
`

const WishImage = styled.div`
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
  }
`

const WishFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 15px;
`

// const LikeButton = styled.button`
//   background: transparent;
//   border: none;
//   display: flex;
//   align-items: center;
//   color: ${(props) => (props.liked ? "#FF6584" : "#666")};
//   cursor: pointer;
  
//   svg {
//     margin-right: 5px;
//     animation: ${(props) => (props.liked ? pulse : "none")} 1s infinite;
//   }
// `

// const EventBadge = styled(Badge)`
//   position: absolute;
//   top: 20px;
//   right: 20px;
// `

// const FilterContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
//   flex-wrap: wrap;
  
//   @media (max-width: 768px) {
//     justify-content: center;
//   }
// `

// Decorative elements
const Balloon = styled.div`
  width: ${(props) => props.size || 30}px;
  height: ${(props) => props.size * 1.2 || 36}px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: ${(props) => props.color};
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 20px;
    background: rgba(255, 255, 255, 0.7);
  }
  
  animation: ${float} ${(props) => props.duration || 5}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || 0}s;
`

// const Chocolate = styled.div`
//   width: 24px;
//   height: 14px;
//   background: #5D4037;
//   position: absolute;
//   bottom: ${(props) => props.bottom || 20}%;
//   right: ${(props) => props.right || 15}%;
//   border-radius: 3px;
//   z-index: 1;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 4px;
//     left: 4px;
//     right: 4px;
//     height: 2px;
//     background: #8D6E63;
//     border-radius: 1px;
//   }
  
//   &::after {
//     content: '';
//     position: absolute;
//     top: 4px;
//     left: 7px;
//     width: 2px;
//     height: 6px;
//     background: #8D6E63;
//     border-radius: 1px;
//   }
  
//   animation: ${swing} 3s ease-in-out infinite;
//   animation-delay: ${(props) => props.delay || 0}s;
// `

const Teddy = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #A1887F;
  bottom: ${(props) => props.bottom || 10}%;
  left: ${(props) => props.left || 10}%;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #A1887F;
    top: -5px;
  }
  
  &::before {
    left: 5px;
  }
  
  &::after {
    right: 5px;
  }
  
  animation: ${swing} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || 0}s;
`

const Gift = styled.div`
  position: absolute;
  width: ${(props) => props.size || 30}px;
  height: ${(props) => props.size || 30}px;
  background: ${(props) => props.color || "#FF6584"};
  right: ${(props) => props.right || 10}%;
  top: ${(props) => props.top || 20}%;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: ${(props) => props.size / 5 || 6}px;
    background: rgba(255, 255, 255, 0.5);
    top: ${(props) => props.size / 2 - props.size / 10 || 12}px;
    left: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: ${(props) => props.size / 5 || 6}px;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    top: 0;
    left: ${(props) => props.size / 2 - props.size / 10 || 12}px;
  }
  
  animation: ${float} ${(props) => props.duration || 6}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || 0}s;
`

const Cake = styled.div`
  position: absolute;
  width: 60px;
  height: 40px;
  background: #F8BBD0;
  border-radius: 5px 5px 0 0;
  bottom: ${(props) => props.bottom || 20}%;
  right: ${(props) => props.right || 5}%;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 10px;
    background: #FF80AB;
    bottom: -10px;
    border-radius: 0 0 10px 10px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 15px;
    background: #FFF176;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: -10px 0 0 #FFF176, 10px 0 0 #FFF176;
  }
  
  animation: ${float} 5s ease-in-out infinite;
`

const ConfettiContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`

const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${(props) => props.color};
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  opacity: 0.8;
  transform: rotate(${(props) => props.rotate}deg);
  
  animation: ${float} ${(props) => props.duration}s linear infinite;
  animation-delay: ${(props) => props.delay}s;
`

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 20px;
`

const EmptyStateText = styled.div`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 20px;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`

const LoadingSpinner = styled.div`
  color: #6C63FF;
  font-size: 2rem;
  margin-bottom: 15px;
  
  svg {
    animation: ${rotate} 1s linear infinite;
  }
`

const LoadingText = styled.div`
  color: #666;
  font-size: 1.1rem;
`

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #6C63FF;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  display: inline-block;
  color:${({ theme }) => theme.colors.primary};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background:${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`

const ModalImageContainer = styled.div`
  width: 100%;
  max-height: 500px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-top: 20px;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`



const MyWishes = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    birthdayEvents: 0,
    anniversaryEvents: 0,
    otherEvents: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      const id = localStorage.getItem('empId');
      try {
        const response = await getEventLists(id);
        if (response.status === 200) {
          const eventData = response.data;
          setEvents(eventData);
          
          // Calculate stats
          setStats({
            totalEvents: eventData.length,
            birthdayEvents: eventData.filter(event => event.event_type === 'B').length,
            anniversaryEvents: eventData.filter(event => event.event_type === 'W').length,
            otherEvents: eventData.filter(event => event.event_type !== 'B' && event.event_type !== 'W').length,
          });
          
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Handle event selection and fetch responses
  const handleEventSelect = async (event) => {
    setSelectedEvent(event);
    setLoadingResponses(true);
    
    try {
      const response = await getResponseLists(event.id);
      if (response.status === 200) {
        setResponses(response.data);
      }
    } catch (error) {
      console.error("Error fetching responses:", error);
      setResponses([]);
    } finally {
      setLoadingResponses(false);
    }
  };

  // Handle image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.event_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.emp_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_date?.includes(searchTerm)
  );

  // Generate confetti pieces
  const confettiColors = ["#6C63FF", "#FF6584", "#63FFDA", "#FFD600", "#FF80AB", "#4ECDC4"];
  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    rotate: Math.random() * 360,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * 5,
  }));

  // Get event type display
  const getEventTypeDisplay = (type) => {
    switch(type) {
      case 'B': return 'Birthday';
      case 'W': return 'Work Anniversary';
      default: return 'Event';
    }
  };

  // Get event icon
  const getEventIcon = (type) => {
    switch(type) {
      case 'B': return <FaBirthdayCake />;
      case 'W': return <FaCalendarAlt />;
      default: return <FaGift />;
  };
}

  // Get avatar color based on event type
  const getAvatarColor = (type) => {
    switch(type) {
      case 'B': return '#FF6584';
      case 'W': return '#63FFDA';
      default: return '#FFD600';
    }
  };

  return (
    <Layout title="My Wishes">
    <PageContainer>
      <ConfettiContainer>
        {confettiPieces.map((piece) => (
          <Confetti
            key={piece.id}
            color={piece.color}
            top={piece.top}
            left={piece.left}
            rotate={piece.rotate}
            duration={piece.duration}
            delay={piece.delay}
          />
        ))}
      </ConfettiContainer>

      <Header>
        {/* Decorative elements */}
        <Balloon size={40} color="#FF6B6B" top={10} left={10} duration={6} />
        <Balloon size={30} color="#4ECDC4" top={15} left={80} duration={7} delay={0.5} />
        <Balloon size={35} color="#FFD166" top={20} left={30} duration={5} delay={1} />
        <Balloon size={25} color="#FF70A6" top={5} left={60} duration={8} delay={1.5} />

        <Gift size={40} color="#FF6584" right={20} top={30} duration={7} delay={0.5} />
        <Gift size={25} color="#6C63FF" right={30} top={50} duration={5} delay={1.2} />

        <Cake bottom={15} right={10} />

        <Teddy bottom={20} left={15} delay={0.8} />

        <HeaderTitle>My Special Wishes</HeaderTitle>
        <HeaderSubtitle>
          A collection of heartfelt messages from your colleagues and friends on your special occasions.
        </HeaderSubtitle>
      </Header>

      <StatsContainer>
        <StatsCard>
          <StatsIcon color="#6C63FF">
            <FaGift />
          </StatsIcon>
          <StatsValue>{stats.totalEvents}</StatsValue>
          <StatsLabel>Total Events</StatsLabel>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#FF6584">
            <FaBirthdayCake />
          </StatsIcon>
          <StatsValue>{stats.birthdayEvents}</StatsValue>
          <StatsLabel>Birthdays</StatsLabel>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#63FFDA">
            <FaCalendarAlt />
          </StatsIcon>
          <StatsValue>{stats.anniversaryEvents}</StatsValue>
          <StatsLabel>Work Anniversaries</StatsLabel>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#FFD600">
            <FaUserFriends />
          </StatsIcon>
          <StatsValue>{stats.otherEvents}</StatsValue>
          <StatsLabel>Other Events</StatsLabel>
        </StatsCard>
      </StatsContainer>

      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder="Search events by name, date, or description..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {loading ? (
        <LoadingContainer>
          <LoadingSpinner>
            <FaSpinner />
          </LoadingSpinner>
          <LoadingText>Loading your events...</LoadingText>
        </LoadingContainer>
      ) : (
        <>
          <SectionTitle>My Events</SectionTitle>
          {filteredEvents.length > 0 ? (
            <EventsContainer>
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.event_id} 
                  type={event.event_type}
                  selected={selectedEvent?.event_id === event.event_id}
                  onClick={() => handleEventSelect(event)}
                >
                  <EventHeader>
                    <EventIcon type={event.event_type}>
                      {getEventIcon(event.event_type)}
                    </EventIcon>
                    <EventInfo>
                      <EventTitle>{event.event_text || getEventTypeDisplay(event.event_type)}</EventTitle>
                      <EventDate>{event.event_date}</EventDate>
                    </EventInfo>
                  </EventHeader>
                  <EventDescription>
                    {event.emp_name ? `For: ${event.emp_name}` : 'Special occasion'}
                  </EventDescription>
                  <EventFooter>
                    <ResponseCount>
                      <FaHeart /> {event.response_count || 0} wishes
                    </ResponseCount>
                    <ViewButton>
                      <FaEye /> View Wishes
                    </ViewButton>
                  </EventFooter>
                </EventCard>
              ))}
            </EventsContainer>
          ) : (
            <EmptyState>
              <EmptyStateIcon>
                <FaGift />
              </EmptyStateIcon>
              <EmptyStateText>No events found matching your search.</EmptyStateText>
              {searchTerm && (
                <Button variant="primary" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              )}
            </EmptyState>
          )}

          {selectedEvent && (
            <>
              <SectionTitle>
                Wishes for {selectedEvent.event_text || getEventTypeDisplay(selectedEvent.event_type)}
              </SectionTitle>
              
              {loadingResponses ? (
                <LoadingContainer>
                  <LoadingSpinner>
                    <FaSpinner />
                  </LoadingSpinner>
                  <LoadingText>Loading wishes...</LoadingText>
                </LoadingContainer>
              ) : responses.length > 0 ? (
                <WishesContainer>
                  {responses.map((response) => (
                    <WishCard key={response.id}>
                      <WishHeader>
                        <WishAvatar color={getAvatarColor(selectedEvent.event_type)}>
                          {response.r_emp_name ? response.r_emp_name.charAt(0) : 'U'}
                        </WishAvatar>
                        <WishSender>
                          <WishSenderName>{response.r_emp_name}</WishSenderName>
                          <WishDate>{response.response_date}</WishDate>
                        </WishSender>
                      </WishHeader>
                      
                      <WishContent>{response.r_text}</WishContent>
                      
                      {response.r_file && (
                        <WishImage onClick={() => handleImageClick(response.r_file)}>
                          <img src={response.r_file || "/placeholder.svg"} alt="Wish attachment" />
                        </WishImage>
                      )}
                      
                      <WishFooter>
                        <Badge variant={selectedEvent.event_type === 'B' ? "secondary" : "primary"}>
                          {getEventTypeDisplay(selectedEvent.event_type)}
                        </Badge>
                      </WishFooter>
                    </WishCard>
                  ))}
                </WishesContainer>
              ) : (
                <EmptyState>
                  <EmptyStateIcon>
                    <FaHeart />
                  </EmptyStateIcon>
                  <EmptyStateText>No wishes found for this event yet.</EmptyStateText>
                </EmptyState>
              )}
            </>
          )}
        </>
      )}
      
      {showImageModal && (
        <Modal onClose={() => setShowImageModal(false)}>
          <ModalImageContainer>
            <img src={selectedImage || "/placeholder.svg"} alt="Wish attachment" />
          </ModalImageContainer>
          <Button variant="primary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal>
      )}
    </PageContainer>
  </Layout>
  )
}
export default MyWishes

