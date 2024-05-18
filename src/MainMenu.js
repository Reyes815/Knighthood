import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
  // console.log(user_id)
  const navigate = useNavigate();

  const handlePlayGame = () => {
    // Handle the play game action
    // console.log('Play Game button clicked');
    navigate('/main_app')
    // You can add your navigation logic here
  };

  const handleLeaderboard = () => {
    // Handle the leaderboard action
    // console.log('Leaderboard button clicked');
    // You can add your navigation logic here
    navigate('/leaderboard')
  };

  
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Main Menu</h1>
        <button style={styles.button} onClick={handlePlayGame}>
          Play Game
        </button>
        <button style={styles.button} onClick={handleLeaderboard}>
          Leaderboard
        </button>
      </div>
    );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#282c34',
  },
  title: {
    color: '#61dafb',
    fontSize: '48px',
    marginBottom: '40px',
  },
  button: {
    backgroundColor: '#61dafb',
    color: '#282c34',
    border: 'none',
    padding: '15px 30px',
    fontSize: '24px',
    cursor: 'pointer',
    margin: '10px',
    borderRadius: '5px',
  },
};

export default MainMenu;