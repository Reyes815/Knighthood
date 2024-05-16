import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ButtonGrid from './buttongrid';
import {useParams} from 'react-router-dom';
export default function FixedContainer() {
  const {user_id} = useParams();
  function Timer() {
    const [time, setTime] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // Update time every second
  
      return () => clearInterval(interval); // Clean up interval
    }, []);
  
    return (
      <div style={{ color: 'black' }}>
      <div style={{ color: 'black' }}>{time}</div>
        <ButtonGrid currentTime={time} user_id = {user_id}/> 
      </div> // Set color to black
    );
  }

  return (
    <div className='App'>
      <React.Fragment>
      <CssBaseline />
      <Container fixed >  
        <Box sx={{ bgcolor: 'white'}}>
            <Timer/>
        </Box> 
      </Container>
    </React.Fragment>
    </div>
  );
}
