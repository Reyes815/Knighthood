import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.scss'
import { Table, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('/api/scores');

        // console.log(response.data);
        setScores(response.data);
      } catch (err) {
        setError('Error fetching scores');
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/users/');
            // console.log(res.data);
            setUsers(res.data);
        } catch (err) {

        }
      }

      const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchUsers(), fetchScores()]);
        // console.log(users);
        setLoading(false);
      };

      fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users.length) {
    return <div>No users found.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Create a mapping from user_id to username
  const userMap = users.reduce((acc, user) => {
    acc[user.userid] = { username: user.username, country: user.country };
    return acc;
  }, {});

  // Process scores to keep only the highest score for each user
  const highestScores = scores.reduce((acc, score) => {
    if (!acc[score.userid] || score.score > acc[score.userid].score) {
      acc[score.userid] = score;
    }
    return acc;
  }, {});

  // Convert the highestScores object to an array and sort by score in descending order
  const sortedScores = Object.values(highestScores).sort((a, b) => b.score - a.score);

  const handleUsernameClick = (userId) => {
    // Implement the logic for handling username click here
    // console.log(`Username with ID ${userId} clicked`);
    navigate(`/user/scores/${userId}`);
  }

  return (
    <div className='App'>
      <div className="container_leaderboard">
      <h1>Leaderboard</h1>
	
	<div className="table">
		<div className="table-header">
			<div className="header__item"><a id="name" className="filter__link" >Rank</a></div>
			<div className="header__item"><a id="wins" className="filter__link filter__link--number" >Username</a></div>
			<div className="header__item"><a id="draws" className="filter__link filter__link--number" >Score</a></div>
			<div className="header__item"><a id="losses" className="filter__link filter__link--number" >Country</a></div>
		</div>
		<div className="table-content">
    {sortedScores.map((score, index) => (
                    <div className="table-row" key={index}>
                      <div className="table-data">{index + 1}</div>
                      <div className="table-data-username" onClick={() => handleUsernameClick(score.userid)}>
                      {userMap[score.userid].username}
                      </div>
                      <div className="table-data">{score.score}</div>
                      <div className="table-data">{userMap[score.userid].country}</div>
                    </div>
                  ))}
		</div>	
	</div>
</div>
    </div>
  );
};

export default Leaderboard;