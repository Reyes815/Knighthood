import React, { useState, useEffect } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '90%', // Adjust as needed
  height: '80%', // Adjust as needed
  border: '2px solid', // Outline style
  borderColor: "black",
  margin: '5px',
}));

const imageSets = {
  'idle': ['idle/knight-idle1.png','idle/knight-idle2.png','idle/knight-idle3.png','idle/knight-idle4.png'],
  'Left': ['idle/knight-idle1.png'],
  'Up': ['idle/knight-idle1.png'],
  'Right': ['idle/knight-idle1.png'],
};

const animationIntervalTime = 200;

export default function ButtonGrid() {
  const [position, setPosition] = useState({ x: 0, y: 300 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageSet, setCurrentImageSet] = useState([]);
  const [animationInterval, setAnimationInterval] = useState(null);

  useEffect(() => {
    // Load the default image set when the component mounts
    setCurrentImageSet(imageSets['idle']);
    return clearAnimation;
  }, []);

  // Function to start animation interval
  const startAnimation = (deltaX, deltaY) => {
    if (!animationInterval) {
      const interval = setInterval(() => {
        setPosition(prevPosition => ({
          x: Math.max(Math.min(prevPosition.x + deltaX, 370), -370),
          y: Math.max(Math.min(prevPosition.y + deltaY, 180), -180)
        }));
        setCurrentImageIndex(currentIndex => (currentIndex+1) % currentImageSet.length);
      }, animationIntervalTime);
      setAnimationInterval(interval);
    }
  };

  // Function to clear animation interval
  const clearAnimation = () => {
    clearInterval(animationInterval);
    setAnimationInterval(null);
  }

  // Function to handle button hover
  const handleButtonHover = (buttonName) => {
    setCurrentImageSet(imageSets[buttonName]);
    setCurrentImageIndex(0); // Reset image index

    // Start animation interval
    switch (buttonName) {
      case 'Left':
        startAnimation(-10, 0);
        break;
      case 'Right':
        startAnimation(10, 0);
        break;
      case 'Jump':
        startAnimation(0, -10);
        break;
      default:
        break;
    }
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    clearAnimation(); // Stop animation when mouse leaves button
  };

  return (
    <Box sx={{ width: '80%', margin: "auto"}}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '700px', width: '90%', border: '2px solid black', margin: "auto"}}
      >
        <img
          src={currentImageSet[currentImageIndex]} // Set the image source dynamically
          alt="Animated Image"
          style={{ 
          position: 'relative',
          left: position.x,
          top: position.y,
          width: '32px', // Adjust the width as needed
          height: '32px', // Adjust the height as needed 
          }}
        />
      </Grid>

      <Grid 
      container rowSpacing={1} 
      columnSpacing={{ xs: 1, sm: 2, md: 3}}>
        {Object.keys(imageSets).map((buttonName, index) => (
          <Grid item xs={3} key={index} margin={"auto"}>
            <StyledButton
              onMouseOver={() => handleButtonHover(buttonName)}
              onMouseLeave={handleMouseLeave}
            >
              {buttonName}
            </StyledButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
