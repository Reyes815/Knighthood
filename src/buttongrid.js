import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import Popup from './components/Popup';
import InfiniteBackground from './InfiniteBackground';
import Block from './block';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '90%', // Adjust as needed
  height: '80%', // Adjust as needed
  border: '2px solid', // Outline style
  borderColor: "black",
  margin: '5px',
}));

const imageSets = {
  'Left': ['left/knight-left1.png', 'left/knight-left2.png', 'left/knight-left3.png', 'left/knight-left4.png', 'left/knight-left5.png', 'left/knight-left6.png', 'left/knight-left7.png'],
  'Up': ['up/knight-up1.png', 'up/knight-up2.png', 'up/knight-up3.png', 'up/knight-up4.png', 'up/knight-up5.png', 'up/knight-up6.png'],
  'Right': ['right/knight-right1.png', 'right/knight-right2.png', 'right/knight-right3.png', 'right/knight-right4.png', 'right/knight-right5.png', 'right/knight-right6.png'],
};

const idleImageSet = {
  'idle': ['idle/knight-idle1.png','idle/knight-idle2.png','idle/knight-idle3.png','idle/knight-idle4.png', 'idle/knight-idle5.png','idle/knight-idle6.png','idle/knight-idle7.png', 'idle/knight-idle8.png','idle/knight-idle9.png'],
};

const animationIntervalTime = 200;
let counter = 0;
export default function ButtonGrid({currentTime, user_id}) {
  const [speed, setSpeed] = useState(20); 
  const [position, setPosition] = useState({ x: 416, y: 635 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageSet, setCurrentImageSet] = useState([]);
  const [animationInterval, setAnimationInterval] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const buttonPressed = useRef(false);
  useEffect(() => {
    // Load the default image set when the component mounts
    setCurrentImageSet(idleImageSet['idle']);
    return clearAnimation;
  }, []);

  useEffect(() => {
    
    if (position.y <= 10) {
      setPosition({ x: 416, y: 620 });
      startAnimation(0, 2);
      setSpeed(prevSpeed => prevSpeed + 10);
    }
  }, [position.y]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!animationInProgress) {
        var name;
        switch( event.key ) {
          case 'a':
            name = 'Left'
            break;
          case 'w':
            name = 'Up'
            counter++; 
            break;
          case 'd':
            name = 'Right'
            break;
          default:
            return;
        }

        setCurrentImageSet(imageSets[name]);
        setCurrentImageIndex(0); // Reset image index
        console.log(event.key);

        switch (event.key) {
          case 'a':
            startAnimation(-10, 0);
            break;
          case 'w':
            startAnimation(0, -11.7);
            break;
          case 'd':
            startAnimation(10, 0);
            break;
          default:
            break;
        }
      }
    };

    const handleKeyUp = () => {
      clearAnimation();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageSet, animationInProgress]);

  const startAnimation = (deltaX, deltaY) => {
    setAnimationInProgress(true);
    console.log(position);
    const interval = setInterval(() => {
        setPosition(prevPosition => {
          let newX = prevPosition.x + deltaX;
          let newY = prevPosition.y + deltaY;
          
          if (newX < 0) newX = 0;
          if (newX > 855) newX = 855;

            return {
                x: newX,
                y: newY,
            };
        });

        setCurrentImageIndex(currentIndex => (currentIndex + 1) % currentImageSet.length);
    }, animationIntervalTime);

    setTimeout(() => {
      clearInterval(interval);
      setAnimationInterval(null);
      setAnimationInProgress(false);
    }, 1300);
  };

  const clearAnimation = () => {
    clearInterval(animationInterval);
    setAnimationInterval(null);
    setAnimationInProgress(false);
  };

  const handleClosePopup = () => {
    setButtonPopup(false);
    window.location.reload();
  };

  const popupButtonClick = () => {
    setButtonPopup(true);
  };

  return (
    <Box sx={{ width: '80%', margin: "auto" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ 
          minHeight: '704px', 
          minWidth: '832px', 
          border: '2px solid black', 
          margin: "auto", 
          position: 'relative'
        }}
      >
        <InfiniteBackground
          style={{ 
            position: 'absolute',
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
          }}
        />
        <Block position={position} setPosition={setPosition} animationIntervalTime={animationIntervalTime} initialXRange={{ min: 0, max: 800 }} initialY={70} speed={speed} time={currentTime} count = {counter} user_id  = {user_id}/>
        <Block position={position} setPosition={setPosition} animationIntervalTime={animationIntervalTime} initialXRange={{ min: 0, max: 800 }} initialY={140} speed={speed} time={currentTime} count = {counter} user_id  = {user_id}/>
        <Block position={position} setPosition={setPosition} animationIntervalTime={animationIntervalTime} initialXRange={{ min: 0, max: 800 }} initialY={565} speed={speed} time={currentTime} count = {counter} user_id  = {user_id}/>
        <Block position={position} setPosition={setPosition} animationIntervalTime={animationIntervalTime} initialXRange={{ min: 0, max: 800 }} initialY={425} speed={speed} time={currentTime} count = {counter} user_id  = {user_id}/>
        <Block position={position} setPosition={setPosition} animationIntervalTime={animationIntervalTime} initialXRange={{ min: 0, max: 800 }} initialY={280} speed={speed} time={currentTime} count = {counter} user_id  = {user_id}/>
       
        <img
          src={currentImageSet[currentImageIndex]}
          alt="Animated Image"
          style={{ 
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: '64px',
            height: '64px', 
          }}
        />
      </Grid>

      <Grid 
        container rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3}}
      >
        {Object.keys(imageSets).map((buttonName, index) => (
          <Grid item xs={3} key={index} margin={"auto"}>
            <StyledButton
            >
              {buttonName}
            </StyledButton>
          </Grid>
        ))}
      </Grid>
      {/* <StyledButton className='test' onClick={() => popupButtonClick()}>Open Popup</StyledButton>
      <Popup trigger={buttonPopup} onClose={handleClosePopup} time={timerValue}></Popup> */}
    </Box>
  );
}
