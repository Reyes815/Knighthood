import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ButtonGrid from './buttongrid';

export default function FixedContainer() {
  function Timer() {
    const [time, setTime] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // Update time every second
  
      return () => clearInterval(interval); // Clean up interval
    }, []);
  
    return (
      <div style={{ color: 'black' }}>{time}</div> // Set color to black
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed >  
        <Box sx={{ bgcolor: 'white', height: '85vh'}}>
            <Timer/>
            <ButtonGrid/>
        </Box> 
      </Container>
    </React.Fragment>
  );
}