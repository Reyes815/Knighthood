import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';

const getRandomInitialX = (range) => {
  return Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
};

const Block = ({ position, setPosition, animationIntervalTime, initialXRange, initialY, speed, time, count, user_id }) => {
  const [blockPosition, setBlockPosition] = useState({ x: getRandomInitialX(initialXRange), y: initialY });
  const [showPopup, setShowPopup] = useState(false);
  const [points, setPoints] = useState(0);
  const [hasCollided, setHasCollided] = useState(false); // New state variable to track collision
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0); // State variable to track current frame index

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
      setCurrentFrameIndex(prevIndex => (prevIndex + 1) % PriestImageSet['walk'].length);
      setBlockPosition(prevPosition => ({
        x: prevPosition.x + speed,
        y: prevPosition.y,
      }));
    }, animationIntervalTime);

    return () => {
      clearInterval(animationInterval);
    };
  }, [animationIntervalTime, speed]);

  useEffect(() => {
    if (
      !hasCollided && // Check if collision has not occurred yet
      position.x < blockPosition.x + 50 &&
      position.x + 50 > blockPosition.x &&
      position.y < blockPosition.y + 60 &&
      position.y + 60 > blockPosition.y
    ) {
      console.log("Collision detected!");
      setPoints(Math.max(count * 10 - time, 0));
      setShowPopup(true);
      setHasCollided(true); // Set hasCollided to true to prevent further detection
    }
  }, [position, blockPosition, count, time, hasCollided]);

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.reload();
  };

  useEffect(() => {
    if (blockPosition.x >= 850) {
      setBlockPosition(prevPosition => ({ 
        x: 0, 
        y: prevPosition.y
      }));
      console.log("Block position reset");
      console.log(blockPosition.y);
    }
  }, [blockPosition.x, blockPosition.y]);

  return (
    <>
      {showPopup && (
        <Popup trigger={true} onClose={handleClosePopup} time={points} user_id={user_id}></Popup>
      )}

      <img
        src={PriestImageSet['walk'][currentFrameIndex]} 
        alt="Block"
        style={{
          position: 'absolute',
          left: blockPosition.x,
          top: blockPosition.y,
          width: '56px', // Adjust the width of the block as needed
          height: '70px', // Adjust the height of the block as needed
        }}
      />
    </>
  );
};

export default Block;
