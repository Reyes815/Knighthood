import React, { useState } from 'react';
import { Row, Col, Card, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/users/register', 
      {
        username,
        password,
        country,
        firstname,
        lastname
      });

      console.log(response);

      if (response.data) {
        navigate('/');
      } else {
        setMessage('Username already exists');
      }
    } catch (error) {
      setMessage('Error submitting the form');
    }
  };

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '50%',
        margin: '40px auto',
        border: '3px solid lightblue',
        borderRadius: '20px',
      }}>
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h2" className="border-bottom p-3 mb-0" style={{ textAlign: 'center', color: '#008DDA' }}>
            Start your Knighthood here!
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label style={{ color: '#008DDA', display: 'block' }} for="firstName">First Name</Label>
                <Input
                  style={{ width: '100%' }}
                  type="text"
                  id="firstName"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#008DDA', display: 'block' }} for="lastName">Last Name</Label>
                <Input
                  style={{ width: '100%' }}
                  type="text"
                  id="lastName"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#008DDA', display: 'block' }} for="username">Username</Label>
                <Input
                  style={{ width: '100%' }}
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#008DDA', display: 'block' }} for="password">Password</Label>
                <Input
                  style={{ width: '100%' }}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#008DDA', display: 'block' }} for="country">Country</Label>
                <Input
                  style={{ width: '100%' }}
                  type="test"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </FormGroup>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <p style={{ display: 'inline', textDecoration: 'none', color: '#000000', marginRight: '5px' }}>Already have an account?</p>
                <a href="/#/login" style={{ textDecoration: 'none', color: '#41C9E2' }}>Login!</a>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button
                  className="mt-2"
                  style={{
                    backgroundColor: '#41C9E2',
                    padding: '8px 20px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
            {message && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
          </CardBody>
        </Card>
      </Col>
    </Row>
    </div>
  );
};

export default Registration;