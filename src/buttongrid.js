import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import Popup from './components/Popup';
import InfiniteBackground from './InfiniteBackground';


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

export default function ButtonGrid() {
  const [position, setPosition] = useState({ x: 710, y: 650 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageSet, setCurrentImageSet] = useState([]);
  const [animationInterval, setAnimationInterval] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const buttonPressed = useRef(false);

  const [blockPosition, setBlockPosition] = useState({ x: 350, y: 515 });

  useEffect(() => {
    if (
      position.x < blockPosition.x + 100 && // Assuming avatar width is 100px
      position.x + 100 > blockPosition.x && // Assuming avatar width is 100px
      position.y < blockPosition.y + 50 && // Assuming block height is 50px
      position.y + 100> blockPosition.y // Assuming avatar height is 100px
    ) {
      console.log("Collision detected!");
      // Handle collision here (e.g., stop animation, reset positions, etc.)
    }
  }, [position, blockPosition]); // Add position and blockPosition as dependencies


  const startBlockAnimation = () => {
    const blockInterval = setInterval(() => {
        setBlockPosition(prevPosition => ({
          x: (prevPosition.x + 10 ), // Adjust based on your grid width and starting position
          y: prevPosition.y,
        }));

    }, animationIntervalTime);
  };

  useEffect(() => {
    startBlockAnimation();
  }, []);

  useEffect(() => {
    if (blockPosition.x >= 1080) {
      setBlockPosition({ x: 350, y: 515 });
      console.log("sdhfsldkfjk");
    }

    if(position == blockPosition){
      console.log("IIIII got hitt");
    }
  }, [blockPosition.x, position]);

  useEffect(() => {
    // Load the default image set when the component mounts
    setCurrentImageSet(idleImageSet['idle']);
    return clearAnimation;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      var name;
      switch( event.key ) {
        case 'a':
          name = 'Left'
          break;
        case 'w':
          name = 'Up'
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

      // if (!buttonPressed.current) {
        switch (event.key) {
          case 'a':
            // handleButtonPress('Left');
            console.log("hgdsgfds")
            startAnimation(-10, 0);
            break;
          case 'w':
            // handleButtonPress('Up');
            startAnimation(0, 0);
            break;
          case 'd':
            // handleButtonPress('Right');
            startAnimation(10, 0);
            break;
          default:
            break;
        }
        // buttonPressed.current = true;
      // }
    };

    const handleKeyUp = () => {
      // buttonPressed.current = false;
      clearAnimation();
    };

    document.addEventListener('keydown', handleKeyDown);
    // document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // document.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentImageSet]);

  // Function to start animation interval
  const startAnimation = (deltaX, deltaY) => {
    // if (!animationInterval) {
      const interval = setInterval(() => {
        setPosition(prevPosition => ({
          x:  prevPosition.x, //Math.max(Math.min(prevPosition.x + deltaX, 370), -370),
          y:  (prevPosition.y - 15),//Math.max(Math.min(prevPosition.y + deltaY, 180), -180)
        }));

        setCurrentImageIndex(currentIndex => (currentIndex+1) % currentImageSet.length);

      }, animationIntervalTime);

      // setAnimationInterval(interval);

      setTimeout(() => {
        clearInterval(interval);
        setAnimationInterval(null);
      }, 2500);
    // }
  };

  // Function to clear animation interval
  const clearAnimation = () => {
    clearInterval(animationInterval);
    setAnimationInterval(null);
  };

  // Function to handle button press
  const handleButtonPress = (buttonName) => {
    setCurrentImageSet(imageSets[buttonName]);
    setCurrentImageIndex(0); // Reset image index

    // Start animation interval
    switch (buttonName) {
      case 'Left':
        startAnimation(-10, 0);
        break;
      case 'Up':
        startAnimation(0, -10);
        break;
      case 'Right':
        startAnimation(10, 0);
        break;
      default:
        break;
    }
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    clearAnimation(); // Stop animation when mouse leaves button
  };

  const handleClosePopup = () => {
    setButtonPopup(false); // Function to close the popup
    window.location.reload();
};

  return (
    <Box sx={{ width: '80%', margin: "auto" }}>
      <Grid
  container
  justifyContent="center"
  alignItems="center"
  style={{ 
    minHeight: '700px', 
    width: '90%', 
    border: '2px solid black', 
    margin: "auto", 
    position: 'relative' // Add position relative to the grid
  }}
>
  <InfiniteBackground
    style={{ 
      position: 'absolute', // Position the background absolutely within the grid
      top: 0, 
      left: 0, 
      width: '100%', // Fill the entire width of the grid
      height: '100%', // Fill the entire height of the grid
    }}
  />
  <img
    src={currentImageSet[currentImageIndex]} // Set the image source dynamically
    alt="Animated Image"
    style={{ 
      position: 'relative',
      left: position.x,
      top: position.y,
      width: '100px', // Adjust the width as needed
      height: '100px', // Adjust the height as needed 
    }}
  />
</Grid>


      <Grid 
      container rowSpacing={1} 
      columnSpacing={{ xs: 1, sm: 2, md: 3}}>
        {Object.keys(imageSets).map((buttonName, index) => (
          <Grid item xs={3} key={index} margin={"auto"}>
            <StyledButton
              onClick={() => handleButtonPress(buttonName)}
              // onMouseLeave={handleMouseLeave}
            >
              {buttonName}
            </StyledButton>
          </Grid>
        ))}
      </Grid>
      <StyledButton className='test' onClick={() => setButtonPopup(true)}>Open Popup</StyledButton>
      <Popup trigger={buttonPopup} onClose={handleClosePopup}></Popup>
    </Box>
  );
}