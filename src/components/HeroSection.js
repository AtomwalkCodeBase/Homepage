import React, { useState, useEffect, useRef, } from 'react';
import styled, { keyframes, css, createGlobalStyle } from 'styled-components';

// ─── Global ───────────────────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
`;

// ─── Keyframes ────────────────────────────────────────────────────────────────
const noise = keyframes`
  0%,100%{background-position:0 0}
  10%{background-position:-5% -10%}
  20%{background-position:-15% 5%}
  30%{background-position:7% -25%}
  40%{background-position:20% 25%}
  50%{background-position:-25% 10%}
  60%{background-position:15% 5%}
  70%{background-position:0% 15%}
  80%{background-position:25% 35%}
  90%{background-position:-10% 10%}
`;

const scanline = keyframes`
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;


const slideUp = keyframes`
  from { transform: translateY(110%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const floatParticle = keyframes`
  0%   { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 0.6; }
  100% { transform: translateY(-20vh) translateX(var(--dx)) rotate(var(--rot)); opacity: 0; }
`;

const orbitRing = keyframes`
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg); }
`;

const counterOrbit = keyframes`
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(-360deg); }
`;

const dataPulse = keyframes`
  0%,100%{ transform:scaleY(0.4); opacity:0.3; }
  50%    { transform:scaleY(1);   opacity:1; }
`;

const wordFlip = keyframes`
  0%   { transform: translateY(60px) rotateX(-90deg); opacity: 0; }
  40%  { transform: translateY(0) rotateX(0deg); opacity: 1; }
  60%  { transform: translateY(0) rotateX(0deg); opacity: 1; }
  100% { transform: translateY(-60px) rotateX(90deg); opacity: 0; }
`;

const glitch1 = keyframes`
  0%,100% { clip-path:inset(0 0 90% 0); transform:translate(-4px,0); }
  20%      { clip-path:inset(30% 0 50% 0); transform:translate(4px,0); }
  40%      { clip-path:inset(60% 0 20% 0); transform:translate(-2px,0); }
  60%      { clip-path:inset(80% 0 5% 0);  transform:translate(2px,0); }
  80%      { clip-path:inset(10% 0 70% 0); transform:translate(-4px,0); }
`;

const glitch2 = keyframes`
  0%,100% { clip-path:inset(80% 0 5% 0);  transform:translate(4px,0) skew(2deg); }
  20%      { clip-path:inset(0 0 90% 0);   transform:translate(-4px,0) skew(-2deg); }
  40%      { clip-path:inset(50% 0 30% 0); transform:translate(3px,0) skew(1deg); }
  60%      { clip-path:inset(20% 0 60% 0); transform:translate(-3px,0) skew(-1deg); }
  80%      { clip-path:inset(70% 0 10% 0); transform:translate(4px,0) skew(0deg); }
`;

const logoZoom = keyframes`
  from { transform: scale(0.6) rotateY(-20deg); opacity: 0; filter: blur(20px); }
  to   { transform: scale(1) rotateY(0deg); opacity: 1; filter: blur(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const lineGrow = keyframes`
  from { width: 0; opacity: 0; }
  to   { width: 80px; opacity: 1; }
`;



// ─── Layout ───────────────────────────────────────────────────────────────────
const HeroWrap = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;   //linear-gradient(to bottom, #ffffff, #f6f2ea );
  overflow: hidden;
  position: relative;
  font-family: 'Space Grotesk', sans-serif;
  perspective: 1000px;
  margin-top: -50px;
`;

// Film-grain noise overlay
const NoiseOverlay = styled.div`
  position: absolute;
  inset: -200%;
  width: 400%;
  height: 400%;
  pointer-events: none;
  z-index: 10;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  animation: ${noise} 0.3s steps(1) infinite;
`;

// Slow scan line
const ScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,58,110,0.08), transparent);
  z-index: 9;
  animation: ${scanline} 8s linear infinite;
  pointer-events: none;
`;

// Corner HUD marks
const Corner = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-color: rgba(255,58,110,0.35);
  border-style: solid;
  z-index: 8;
  pointer-events: none;
  ${({ $pos }) => {
    const styles = {
      tl: 'top:24px;left:24px;border-width:2px 0 0 2px;',
      tr: 'top:24px;right:24px;border-width:2px 2px 0 0;',
      bl: 'bottom:24px;left:24px;border-width:0 0 2px 2px;',
      br: 'bottom:24px;right:24px;border-width:0 2px 2px 0;',
    };
    return styles[$pos] || '';
  }}
`;

const HudLabel = styled.div`
  position: absolute;
  font-family: 'Space Grotesk', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,58,110,0.4);
  pointer-events: none;
  z-index: 8;
  ${({ $pos }) => {
    const styles = {
      tl: 'top:58px;left:24px;',
      tr: 'top:58px;right:24px;text-align:right;',
      bl: 'bottom:58px;left:24px;',
      br: 'bottom:58px;right:24px;text-align:right;',
    };
    return styles[$pos] || '';
  }}
`;

// Ambient orbs
const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(${({ $blur }) => $blur || 80}px);
  opacity: ${({ $o }) => $o || 0.15};
  background: ${({ $c }) => $c};
  width: ${({ $w }) => $w}px;
  height: ${({ $h }) => $h}px;
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y};
  transform: translate(-50%, -50%);
`;

// Orbit rings for logo scene
const Ring = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  border: 1px solid rgba(255,58,110,${({ $op }) => $op || 0.2});
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  animation: ${({ $rev }) => $rev ? counterOrbit : orbitRing} ${({ $dur }) => $dur}s linear infinite;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: ${({ $dotColor }) => $dotColor || '#ff3a6e'};
    border-radius: 50%;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px currentColor;
  }
`;

// Bars for data scene
const BarGroup = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 80px;
  justify-content: center;
  margin-bottom: 12px;
`;
const Bar = styled.div`
  width: 10px;
  border-radius: 3px 3px 0 0;
  background: ${({ $c }) => $c};
  animation: ${dataPulse} ${({ $dur }) => $dur}s ease-in-out infinite;
  animation-delay: ${({ $d }) => $d}s;
  box-shadow: 0 0 8px ${({ $c }) => $c}44;
`;

// Content
const Content = styled.div`
  text-align: center;
  max-width: 1100px;
  padding: 0 32px;
  position: relative;
  z-index: 5;
`;

const SceneWrap = styled.div`
  ${({ $exit }) => $exit && css`
    animation: ${fadeIn} 0.4s ease reverse forwards;
  `}
`;

// ─── Typography ───────────────────────────────────────────────────────────────
const BigLabel = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #ff3a6e;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.6s 0.2s both;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &::before, &::after {
    content: '';
    display: block;
    height: 1px;
    width: 40px;
    background: linear-gradient(90deg, transparent, #ff3a6e);
    animation: ${lineGrow} 0.8s 0.4s both;
  }
  &::after {
    background: linear-gradient(270deg, transparent, #ff3a6e);
  }
`;

const MaskedLine = styled.div`
  overflow: hidden;
  padding: 4px 0;
`;

const SlideText = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(64px, 10vw, 140px);
  letter-spacing: 0.04em;
  line-height: 0.92;
  color: #111111;
  animation: ${slideUp} 0.7s cubic-bezier(0.16,1,0.3,1) ${({ $d }) => $d || 0}s both;
`;

const AccentLine = styled(SlideText)`
  -webkit-text-stroke: 2px #e31837;
  color: transparent;
  animation: ${slideUp} 0.7s cubic-bezier(0.16,1,0.3,1) ${({ $d }) => $d || 0}s both;
`;

const GhostLine = styled(SlideText)`
  -webkit-text-stroke: 1px rgba(0,0,0,0.18);
  color: transparent;
`;

const Sub = styled.p`
  font-size: clamp(13px, 1.6vw, 18px);
  color: rgba(0,0,0,0.4);
  margin-top: 28px;
  letter-spacing: 0.06em;
  font-weight: 300;
  animation: ${fadeIn} 0.8s 0.8s both;
`;

// ─── Glitch title ─────────────────────────────────────────────────────────────
const GlitchWrap = styled.div`
  position: relative;
  display: inline-block;
`;

const GlitchBase = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(70px, 11vw, 150px);
  letter-spacing: 0.06em;
  line-height: 1;
  color: #111111;
`;

const GlitchLayer = styled.div`
  position: absolute;
  inset: 0;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(70px, 11vw, 150px);
  letter-spacing: 0.06em;
  line-height: 1;
  animation: ${({ $which }) => $which === 1 ? glitch1 : glitch2} 2.5s infinite;
  color: ${({ $which }) => $which === 1 ? '#ff3a6e' : '#4fc3f7'};
  opacity: 0.8;
`;

function GlitchTitle({ text }) {
  return (
    <GlitchWrap>
      <GlitchBase>{text}</GlitchBase>
      <GlitchLayer $which={1}>{text}</GlitchLayer>
      <GlitchLayer $which={2}>{text}</GlitchLayer>
    </GlitchWrap>
  );
}

// ─── Word Flip ────────────────────────────────────────────────────────────────
const FlipContainer = styled.div`
  height: clamp(70px, 11vw, 150px);
  overflow: hidden;
  display: inline-block;
  perspective: 300px;
`;

const FlipWord = styled.div`
  letter-spacing: 0.04em;
  line-height: 1;
  animation: ${wordFlip} 2.2s cubic-bezier(0.23,1,0.32,1) both;
  display: block;
  /* text-shadow: 0 0 40px rgba(255,58,110,0.25); */
`;

// ─── Shimmer Logo ─────────────────────────────────────────────────────────────
const LogoText = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(52px, 10vw, 120px);
  letter-spacing: 0.08em;
  line-height: 1;
  background: linear-gradient(
    105deg,
    #555 0%,
    #111 20%,
    #ff3a6e 35%,
    #111 50%,
    #555 65%,
    #111 80%,
    #555555 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${logoZoom} 1s cubic-bezier(0.16,1,0.3,1) both, ${shimmer} 3s linear 1s infinite;
`;


const rainbowShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 300% 50%;
  }
`;

const LogoTagline = styled.div`
  font-size: clamp(11px, 1.2vw, 15px);
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);
  margin-top: 20px;
  font-weight: 300;
  animation: ${fadeIn} 1s 0.8s both;
`;

// ─── Stats row (scene 5) ──────────────────────────────────────────────────────

const LogoText2 = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(52px, 10vw, 120px);
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 1;
  background: linear-gradient(
    90deg,
    #ff0066,
    #ff6600,
    #ffcc00,
    #33cc33,
    #0099ff,
    #6600cc,
    #ff0066
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${logoZoom} 1s cubic-bezier(0.16, 1, 0.3, 1) both, ${rainbowShift} 4s linear infinite;
`;


// ─── Pill suite ───────────────────────────────────────────────────────────────
const PillRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
`;
const Pill = styled.div`
  padding: 10px 28px;
  border-radius: 2px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(22px, 3.5vw, 38px);
  letter-spacing: 0.1em;
  opacity: 0;
  animation: ${slideUp} 0.5s cubic-bezier(0.16,1,0.3,1) ${({ $d }) => $d}s forwards;
  background: ${({ $bg }) => $bg};
  color: ${({ $col }) => $col};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 60%);
  }
`;

// ─── Particles ────────────────────────────────────────────────────────────────
const Spark = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  width: ${({ $s }) => $s}px;
  height: ${({ $s }) => $s}px;
  left: ${({ $x }) => $x}%;
  bottom: -20px;
  background: ${({ $c }) => $c};
  box-shadow: 0 0 ${({ $s }) => $s * 2}px ${({ $c }) => $c};
  animation: ${floatParticle} ${({ $dur }) => $dur}s ease-out ${({ $del }) => $del}s infinite;
  --dx: ${({ $dx }) => $dx}px;
  --rot: ${({ $rot }) => $rot}deg;
  opacity: 0;
`;
// ─── Progress dots ────────────────────────────────────────────────────────────
const Dots = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 8;
`;
const Dot = styled.div`
  width: ${({ $active }) => $active ? 24 : 6}px;
  height: 6px;
  border-radius: 3px;
  background: ${({ $active }) => $active ? '#ff3a6e' : 'rgba(0,0,0,0.15)'};
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  box-shadow: ${({ $active }) => $active ? '0 0 12px rgba(255,58,110,0.4)' : 'none'};
`;
function Particles() {
  const sparks = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    s: Math.random() * 4 + 1.5,
    c: ['#ff3a6e', '#ff8c42', '#ffca28', '#4fc3f7', '#a78bfa'][i % 5],
    dur: Math.random() * 8 + 6,
    del: Math.random() * 5,
    dx: (Math.random() - 0.5) * 200,
    rot: (Math.random() - 0.5) * 720,
  }));
  return <>{sparks.map(s => <Spark key={s.id} {...{ $x: s.x, $s: s.s, $c: s.c, $dur: s.dur, $del: s.del, $dx: s.dx, $rot: s.rot }} />)}</>;
}

// ─── Scenes ───────────────────────────────────────────────────────────────────
const WORDS = ['Pharma', 'Laboratories', 'Manufacturing', 'Seafood ', 'Projects', "Facility"];
function Scene0() {
  return (
    <>
      <BigLabel>Atomwalk Technologies</BigLabel>
      <MaskedLine><SlideText $d={0}>Unfolding</SlideText></MaskedLine>
      <MaskedLine><AccentLine $d={0.1}>The Future</AccentLine></MaskedLine>
      <MaskedLine><GhostLine $d={0.2}>Of Enterprises</GhostLine></MaskedLine>
      <Sub>Next-generation enterprise technology — reimagined from the ground up.</Sub>
    </>
  );
}


function Scene1() {
  return (
    <>
      <BigLabel>Intelligent Systems</BigLabel>
      <MaskedLine><SlideText $d={0.0}>Built the</SlideText></MaskedLine>
      <MaskedLine><SlideText $d={0.08}>Future</SlideText></MaskedLine>
      <MaskedLine><AccentLine $d={0.16}>Evolving in Real Time</AccentLine></MaskedLine>
      <Sub>Scalable architecture. Zero compromise. Infinite velocity.</Sub>
    </>
  );
}

function Scene2({ wordIdx }) {
  return (
    <>
      <BigLabel>Industry Solutions</BigLabel>
      <MaskedLine><SlideText $d={0}>Transforming</SlideText></MaskedLine>
      <FlipContainer>
        <FlipWord key={wordIdx}><AccentLine $d={0.1}>{WORDS[wordIdx]}</AccentLine></FlipWord>
      </FlipContainer>
      <Sub>Deep-domain intelligence across every vertical.</Sub>
    </>
  );
}

function Scene3() {
  return (
    <>
      <Particles />
      <BigLabel>Product Suite</BigLabel>
      <PillRow>
        {[
          ['ERP', 'rgba(255,58,110,0.08)', '#ff3a6e'],
          ['CRM', 'rgba(255,140,66,0.08)', '#ff8c42'],
          ['HRM', 'rgba(79,195,247,0.1)', '#2196f3'],
          ['LMS', 'rgba(167,139,250,0.08)', '#7c4dff'],
          ['HMS', 'rgba(169, 250, 139, 0.08)', '#54f442'],
        ].map(([tag, bg, col], i) => (
          <Pill key={tag} $d={i * 0.1} $bg={bg} $col={col}
            style={{ border: `1.5px solid ${col}55` }}
          >{tag}</Pill>
        ))}
      </PillRow>
      <Sub>One platform. Every enterprise function. Fully integrated.</Sub>
    </>
  );
}

function Scene4() {
  return (
    <>
      <BigLabel>Atomwalk Technologies</BigLabel>
      <MaskedLine><SlideText style={{ fontSize: "100px" }} $d={0.2}>Connected systems</SlideText></MaskedLine>
      <MaskedLine><AccentLine style={{ fontSize: "100px" }} $d={0.6}>Seamless workflows</AccentLine></MaskedLine>
      <MaskedLine><GhostLine style={{ fontSize: "100px" }} $d={0.9}>Complete visibility</GhostLine></MaskedLine>
      <Sub>Trusted by leading global enterprises.</Sub>
    </>
  );
}

function Scene5() {
  return (
    <>
      <BigLabel>Automation Layer</BigLabel>
      <BarGroup>
        {[70, 45, 85, 60, 95, 50, 75, 40, 90, 55, 80, 65].map((h, i) => (
          <Bar key={i}
            $c={['#ff3a6e', '#ff8c42', '#4fc3f7', '#a78bfa'][i % 4]}
            style={{ height: h + '%' }}
            $dur={0.8 + (i % 4) * 0.3}
            $d={i * 0.1}
          />
        ))}
      </BarGroup>
      <MaskedLine><GlitchTitle text="AI-DRIVEN" /></MaskedLine>
      <Sub>Automate complex workflows with intelligent, self-learning agents.</Sub>
    </>
  );
}

function Scene6() {
  return (
    <>
      <Particles />
      <LogoText>ATOMWALK</LogoText>
      <LogoTagline>Engineering Intelligent Enterprises</LogoTagline>
    </>
  );
}
function Scene7() {
  return (
    <>
      <Particles />
      <LogoTagline>The Future Belongs To Intelligent Systems</LogoTagline>
      <br />
      <GlitchTitle text="AW360" />
      {/* <LogoText2>AW360</LogoText2> */}
    </>
  );
}

const SCENES = [
  { Component: Scene0, dur: 2500, wordScene: false },
  { Component: Scene1, dur: 2500, wordScene: false },
  { Component: Scene7, dur: 3500, wordScene: false },
  { Component: Scene2, dur: 9000, wordScene: true },
  { Component: Scene3, dur: 3500, wordScene: false },
  { Component: Scene4, dur: 5500, wordScene: false },
  { Component: Scene5, dur: 5000, wordScene: false },
  { Component: Scene6, dur: 5000, wordScene: false },
];



// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const timerRef = useRef(null);
  const wordTimerRef = useRef(null);

  useEffect(() => {
    const { dur } = SCENES[sceneIdx];
    timerRef.current = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setSceneIdx(p => (p + 1) % SCENES.length);
        setExiting(false);
      }, 400);
    }, dur);
    return () => clearTimeout(timerRef.current);
  }, [sceneIdx]);

  useEffect(() => {
    if (SCENES[sceneIdx].wordScene) {
      wordTimerRef.current = setInterval(() => {
        setWordIdx(p => (p + 1) % WORDS.length);
      }, 2000);
    }
    return () => clearInterval(wordTimerRef.current);
  }, [sceneIdx]);

  const { Component } = SCENES[sceneIdx];

  return (
    <>
      <GlobalStyle />
      <HeroWrap>
        <NoiseOverlay />
        <ScanLine />

        {/* Ambient orbs */}
        <Orb $c="radial-gradient(circle, #ff3a6e, transparent)" $w={600} $h={600} $x="20%" $y="30%" $blur={120} $o={0.06} />
        <Orb $c="radial-gradient(circle, #4fc3f7, transparent)" $w={500} $h={500} $x="80%" $y="70%" $blur={100} $o={0.05} />
        <Orb $c="radial-gradient(circle, #a78bfa, transparent)" $w={400} $h={400} $x="60%" $y="20%" $blur={90} $o={0.04} />

        {/* HUD corners */}
        <Corner $pos="tl" /><Corner $pos="tr" /><Corner $pos="bl" /><Corner $pos="br" />
        <HudLabel $pos="tl">SYS.ACTIVE</HudLabel>
        <HudLabel $pos="tr">v4.2.1</HudLabel>
        <HudLabel $pos="bl">ATOMWALK.AI</HudLabel>
        <HudLabel $pos="br">2018</HudLabel>

        {/* Logo scene orbits */}
        {(sceneIdx === 6 || sceneIdx === 2) && (
          <>
            <Ring $size={340} $dur={12} $op={0.15} $dotColor="#ff3a6e" />
            <Ring $size={500} $dur={20} $op={0.1} $dotColor="#4fc3f7" $rev />
            <Ring $size={680} $dur={30} $op={0.07} $dotColor="#a78bfa" />
          </>
        )}

        <Content>
          <SceneWrap key={sceneIdx} $exit={exiting}>
            <Component wordIdx={wordIdx} />
          </SceneWrap>
        </Content>

        {/* Progress indicator */}
        {/* <Dots>
          {SCENES.map((_, i) => <Dot key={i} $active={i === sceneIdx} />)}
        </Dots> */}
      </HeroWrap>
    </>
  );
}