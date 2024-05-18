// Login.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { UserContext } from "./Usercontext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser_id } = useContext(UserContext);
//   const { setOrg_id } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/users/login', 
        {
            username,
            password
        }
      );

      if (response) {
        // get user_id using username & password
        setUser_id(response.data.user_id)

        navigate('/main_menu');
      } else {
        throw new Error("Invalid Login");
      }
    } catch (error) {
      setMessage("Error: ".concat(error));
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

<Row style={{ width: '80%' }}>
      <Col>
        <Card style={{ width: '100%' }}>
          <CardTitle
            tag="h2"
            className="border-bottom p-3 mb-0"
            style={{ textAlign: "center", color: "#008DDA" }}
          >
            Welcome to Knighthood!
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label style={{ color: "#008DDA", display: "block" }} for="username">
                  Username
                </Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #41C9E2",
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ color: "#008DDA", display: "block" }} for="password">
                  Password
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #41C9E2",
                  }}
                />
              </FormGroup>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <p style={{ display: "inline", textDecoration: "none", color: "#000000", marginRight: "5px" }}>
                  Don't have an account?
                </p>
                <a href="/register" style={{ textDecoration: "none", color: "#41C9E2" }}>
                  Register Now!
                </a>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  className="mt-2"
                  style={{
                    backgroundColor: "#41C9E2",
                    padding: "8px 20px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </Button>
              </div>
            </Form>
            <p style={{ color: "#008DDA", textAlign: "center", marginTop: "10px" }}>{message}</p>
          </CardBody>
        </Card>
      </Col>
    </Row>

    </div>
  );
};

export default Login;
