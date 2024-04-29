import React, { useState, useEffect, useRef } from 'react';
import Popup from './components/Popup';

const Block = ({ position, setPosition, animationIntervalTime }) => {
  const [blockPosition, setBlockPosition] = useState({ x: 0, y: 480 });
  const [buttonPopup, setButtonPopup] = useState(false);
  const buttonPressed = useRef(false);
  const [showPopup, setShowPopup] = useState(false);
  let timerValue = 69;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'w') {
        moveBlockDown(); // Call moveBlockDown when 'w' key is pressed
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  useEffect(() => {
    if (
      position.x < blockPosition.x + 100 &&
      position.x + 100 > blockPosition.x &&
      position.y < blockPosition.y + 50 &&
      position.y + 100 > blockPosition.y
    ) {
      console.log("Collision detected!");
      // Handle collision here (e.g., stop animation, reset positions, etc.)
      setShowPopup(true);
    }
  }, [position, blockPosition]);

  const startBlockAnimation = () => {
    const blockInterval = setInterval(() => {
      setBlockPosition(prevPosition => ({
        x: prevPosition.x + 10, // Adjust based on your grid width and starting position
        y: prevPosition.y,
      }));
    }, animationIntervalTime);
  };

  // useEffect(() => {
  //   if (position === blockPosition) {
  //     console.log("Collision detected!");
  //     setShowPopup(true); // Show the Popup when collision is detected
  //     // Handle collision here (e.g., stop animation, reset positions, etc.)
  //   }
  // }, [position, blockPosition]);

  useEffect(() => {
    startBlockAnimation();
  }, []);

  useEffect(() => {
    if (blockPosition.x >= 730) {
      setBlockPosition(prevPosition => ({ 
        x: 0, 
        y: prevPosition + 60 }));
      console.log("Block position reset");
    }

    // if (position === blockPosition) {
    //   console.log("Collision detected!");
    //   // Handle collision here
    // }
  }, [blockPosition.x, position]);



  const moveBlockDown = () => {
    // Function to move the block down when 'w' key is pressed
    setBlockPosition(prevPosition => ({
      x: prevPosition.x,
      y: prevPosition.y + 100, // Adjust the value as needed
    }));
  };

  const handleClosePopup = () => {
    setButtonPopup(false);
    window.location.reload();
  };

  const popupButtonClick = () => {
    setButtonPopup(true);
  };

  return (
    <>
    {showPopup && (
      <Popup trigger={true} onClose={handleClosePopup} time={timerValue}></Popup>
    )}
    <div
      style={{
        position: 'absolute',
        left: blockPosition.x,
        top: blockPosition.y,
        width: '100px', // Adjust the width of the block as needed
        height: '50px', // Adjust the height of the block as needed
        backgroundColor: 'red', // Customize the block's appearance
      }}
    >
    </div>
    </>
  );
};

export default Block;
