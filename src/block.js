import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';

const Block = ({ position, setPosition, animationIntervalTime, initialX, initialY, speed, time }) => {
  const [blockPosition, setBlockPosition] = useState({ x: initialX, y: initialY });
  const [showPopup, setShowPopup] = useState(false);
  const [timeToBlock, setTimeToBlock] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const PriestImageSet = {
    'walk': [
      'priest/cultist_priest_walk_1.png',
      'priest/cultist_priest_walk_2.png',
      'priest/cultist_priest_walk_3.png',
      'priest/cultist_priest_walk_4.png',
      'priest/cultist_priest_walk_5.png',
      'priest/cultist_priest_walk_6.png'
    ]
  };

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % PriestImageSet['walk'].length);
    }, animationIntervalTime);
  
    return () => {
      clearInterval(animationInterval);
    };
  }, [animationIntervalTime]);
  

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
      let currentTime = time;
      setTimeToBlock(currentTime);
      setShowPopup(true);
    }
  }, [position, blockPosition]);

  useEffect(() => {
    const blockInterval = setInterval(() => {
      setBlockPosition(prevPosition => ({
        x: prevPosition.x + speed, // Adjust based on speed
        y: prevPosition.y,
      }));
    }, animationIntervalTime);

    return () => {
      clearInterval(blockInterval);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  useEffect(() => {
    if (blockPosition.x >= 730) {
      setBlockPosition(prevPosition => ({ 
        x: 0, 
        y: prevPosition.y
      }));
      console.log("Block position reset");
      console.log(blockPosition.y);
    } else if (blockPosition.y >= 680) {
      
    }
  }, [blockPosition.x, blockPosition.y]);

  const moveBlockDown = () => {
    // Function to move the block down when 'w' key is pressed
    setBlockPosition(prevPosition => ({
      x: prevPosition.x,
      y: prevPosition.y , // Adjust the value as needed
    }));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.reload();
  };

  return (
    <>
      {showPopup && (
        <Popup trigger={true} onClose={handleClosePopup} time={timeToBlock}></Popup>
      )}
      <img
        src={PriestImageSet['walk'][currentImageIndex]}
        alt="Block"
        style={{
          position: 'absolute',
          left: blockPosition.x,
          top: blockPosition.y,
          width: '96px', // Adjust the width of the block as needed
          height: '96px', // Adjust the height of the block as needed
        }}
      />
    </>
  );
};

export default Block;
