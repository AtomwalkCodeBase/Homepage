"use client"

import { useState } from "react"
import styled, { keyframes } from "styled-components"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Badge from "../components/Badge"
import { FaGift, FaHeart, FaBirthdayCake, FaCalendarAlt, FaUserFriends } from "react-icons/fa"

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
  /* color: ${({ theme }) => theme.colors.text}; */
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

const WishFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 15px;
`

const LikeButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: ${(props) => (props.liked ? "#FF6584" : "#666")};
  cursor: pointer;
  
  svg {
    margin-right: 5px;
    animation: ${(props) => (props.liked ? pulse : "none")} 1s infinite;
  }
`

const EventBadge = styled(Badge)`
  position: absolute;
  top: 20px;
  right: 20px;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`

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

const Chocolate = styled.div`
  width: 24px;
  height: 14px;
  background: #5D4037;
  position: absolute;
  bottom: ${(props) => props.bottom || 20}%;
  right: ${(props) => props.right || 15}%;
  border-radius: 3px;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    height: 2px;
    background: #8D6E63;
    border-radius: 1px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 7px;
    width: 2px;
    height: 6px;
    background: #8D6E63;
    border-radius: 1px;
  }
  
  animation: ${swing} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || 0}s;
`

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

const MyWishes = () => {
  // Dummy data - in a real app, this would come from an API
  const [wishes, setWishes] = useState([
    {
      id: 1,
      sender: "John Smith",
      senderInitial: "JS",
      avatarColor: "#6C63FF",
      date: "Today",
      content:
        "Happy Birthday! Wishing you a day filled with happiness and a year filled with joy. May all your dreams and wishes come true, and may you feel this happiness all year round!",
      event: "Birthday",
      likes: 15,
      liked: false,
      featured: true,
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      senderInitial: "SJ",
      avatarColor: "#FF6584",
      date: "Today",
      content:
        "Hope your special day brings you all that your heart desires! Here's wishing you a day full of pleasant surprises! Happy birthday!",
      event: "Birthday",
      likes: 8,
      liked: false,
      featured: false,
    },
    {
      id: 3,
      sender: "Mike Williams",
      senderInitial: "MW",
      avatarColor: "#63FFDA",
      date: "Today",
      content:
        "Sending you smiles for every moment of your special day. Have a wonderful time and a very happy birthday!",
      event: "Birthday",
      likes: 12,
      liked: true,
      featured: false,
    },
    {
      id: 4,
      sender: "Emily Davis",
      senderInitial: "ED",
      avatarColor: "#FFD600",
      date: "Today",
      content:
        "May the joy that you have spread in the past come back to you on this day. Wishing you a very happy birthday!",
      event: "Birthday",
      likes: 5,
      liked: false,
      featured: false,
    },
    {
      id: 5,
      sender: "Alex Brown",
      senderInitial: "AB",
      avatarColor: "#2196F3",
      date: "Yesterday",
      content:
        "Congratulations on your work anniversary! It's been a pleasure working with you, and I appreciate your dedication and hard work.",
      event: "Work Anniversary",
      likes: 10,
      liked: false,
      featured: true,
    },
    {
      id: 6,
      sender: "Lisa Anderson",
      senderInitial: "LA",
      avatarColor: "#9C27B0",
      date: "Last week",
      content:
        "Happy work anniversary! Your contributions to the team have been invaluable, and we're lucky to have you!",
      event: "Work Anniversary",
      likes: 7,
      liked: true,
      featured: false,
    },
  ])

  const [activeFilter, setActiveFilter] = useState("All")
  const [stats, setStats] = useState({
    totalWishes: wishes.length,
    birthdayWishes: wishes.filter((wish) => wish.event === "Birthday").length,
    anniversaryWishes: wishes.filter((wish) => wish.event === "Work Anniversary").length,
    featuredWishes: wishes.filter((wish) => wish.featured).length,
  })

  const toggleLike = (id) => {
    setWishes(
      wishes.map((wish) => {
        if (wish.id === id) {
          return {
            ...wish,
            liked: !wish.liked,
            likes: wish.liked ? wish.likes - 1 : wish.likes + 1,
          }
        }
        return wish
      }),
    )
  }

  const filteredWishes =
    activeFilter === "All"
      ? wishes
      : wishes.filter((wish) => (activeFilter === "Featured" ? wish.featured : wish.event === activeFilter))

  // Generate confetti pieces
  const confettiColors = ["#6C63FF", "#FF6584", "#63FFDA", "#FFD600", "#FF80AB", "#4ECDC4"]
  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    rotate: Math.random() * 360,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * 5,
  }))

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
              <FaHeart />
            </StatsIcon>
            <StatsValue>{stats.totalWishes}</StatsValue>
            <StatsLabel>Total Wishes</StatsLabel>
          </StatsCard>

          <StatsCard>
            <StatsIcon color="#FF6584">
              <FaBirthdayCake />
            </StatsIcon>
            <StatsValue>{stats.birthdayWishes}</StatsValue>
            <StatsLabel>Birthday Wishes</StatsLabel>
          </StatsCard>

          <StatsCard>
            <StatsIcon color="#63FFDA">
              <FaCalendarAlt />
            </StatsIcon>
            <StatsValue>{stats.anniversaryWishes}</StatsValue>
            <StatsLabel>Anniversary Wishes</StatsLabel>
          </StatsCard>

          <StatsCard>
            <StatsIcon color="#FFD600">
              <FaUserFriends />
            </StatsIcon>
            <StatsValue>{stats.featuredWishes}</StatsValue>
            <StatsLabel>Featured Wishes</StatsLabel>
          </StatsCard>
        </StatsContainer>

        <FilterContainer>
          <Button variant={activeFilter === "All" ? "primary" : "outline"} onClick={() => setActiveFilter("All")}>
            All Wishes
          </Button>
          <Button
            variant={activeFilter === "Birthday" ? "primary" : "outline"}
            onClick={() => setActiveFilter("Birthday")}
          >
            Birthday
          </Button>
          <Button
            variant={activeFilter === "Work Anniversary" ? "primary" : "outline"}
            onClick={() => setActiveFilter("Work Anniversary")}
          >
            Work Anniversary
          </Button>
          <Button
            variant={activeFilter === "Featured" ? "primary" : "outline"}
            onClick={() => setActiveFilter("Featured")}
          >
            Featured
          </Button>
        </FilterContainer>

        {filteredWishes.length > 0 ? (
          <WishesContainer>
            {filteredWishes.map((wish) => (
              <WishCard key={wish.id} featured={wish.featured}>
                <WishHeader>
                  <WishAvatar color={wish.avatarColor}>{wish.senderInitial}</WishAvatar>
                  <WishSender>
                    <WishSenderName>{wish.sender}</WishSenderName>
                    <WishDate>{wish.date}</WishDate>
                  </WishSender>
                </WishHeader>
                <WishContent>{wish.content}</WishContent>
                <WishFooter>
                  <LikeButton liked={wish.liked} onClick={() => toggleLike(wish.id)}>
                    <FaHeart /> {wish.likes} likes
                  </LikeButton>
                  <Badge variant={wish.event === "Birthday" ? "secondary" : "primary"}>{wish.event}</Badge>
                </WishFooter>
              </WishCard>
            ))}
          </WishesContainer>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              <FaGift />
            </EmptyStateIcon>
            <EmptyStateText>No wishes found with the selected filter.</EmptyStateText>
            <Button variant="primary" onClick={() => setActiveFilter("All")}>
              View All Wishes
            </Button>
          </EmptyState>
        )}
      </PageContainer>
    </Layout>
  )
}

export default MyWishes
