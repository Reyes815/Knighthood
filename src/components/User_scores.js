import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './UserScores.scss';
import { Table, Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { useParams } from 'react-router-dom';

const UserScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserScores = async () => {
      try {
        const response = await axios.get(`/api/scores/user/${userId}`);
        setScores(response.data);
        console.log(response.data)
        
      } catch (err) {
        setError('Error fetching user scores');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserName = async () => {
      try {
        const response = await axios.get(`/users/userid/${userId}`);
        setUsername(response.data.username);
        console.log(response.data)
        
      } catch (err) {
        setError('Error fetching user scores');
      } finally {
        setLoading(false);
      }
    };



    fetchUserScores();
    fetchUserName();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='App'>
      <div className="container_leaderboard">
        <h1>{username}</h1>
        <div className="table">
          <div className="table-header">
            <div className="header__item"><a id="name" className="filter__link" >Scores</a></div>
          </div>
          <div className="table-content">
            {scores.map((score, index) => (
                      <div className="table-row" key={index}>
                        <div div className="table-data">{score.score}</div>
                      </div>
                    ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserScores;
