import React, { useRef, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

const InfiniteBackground = () => {
  const backgroundRef = useRef(null);

  // UseEffect to handle movement logic based on key press
  useEffect(() => {
    const moveSpeed = 100; // Adjust movement speed as needed

    const handleKeyPress = (event) => {
      const background = backgroundRef.current;

      if (background && event.key === 'w') {
        const currentPosition = parseInt(background.style.backgroundPositionY || '0');
        background.style.backgroundPositionY = `${currentPosition + moveSpeed}px`;
      }
    };

    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  return (
    <div className="infinite-background" ref={backgroundRef}>
      {/* Content goes here */}
    </div>
  );
};

export default InfiniteBackground;
