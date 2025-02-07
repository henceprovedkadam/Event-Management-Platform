import React, {useState} from 'react'
import {Container, Form, Col, Button} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/login', {email, password})
    .then(result => {console.log(result) 
      navigate('/home');
    })
    .catch((err) => {
      console.error("Login Failed: ", err);
    })
  }
  return (
    <>
    <Container>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Col>
              <Form.Label>Email: </Form.Label>
            </Col>
            <Col>
              <Form.Control 
                name="email" 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
        </Form.Group>
        <Form.Group>
            <Col>
              <Form.Label>Password: </Form.Label>
            </Col>
            <Col>
              <Form.Control 
                name="password" 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
        </Form.Group>
        <Button type="submit">
            Submit
        </Button>
      </Form>
    </Container>
    </>
  )
}

export default Login
