import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Form, Button, Col, Container} from 'react-bootstrap';
import axios from 'axios'

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/register', {name, email, password})
    .then(result => {console.log(result) 
      navigate('/login');
    })
    .catch((err) => {
      console.error("Registration Failed: ", err);
    })
  }
  return (
    <>
    <Container>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Col>
              <Form.Label>Name: </Form.Label>
            </Col>
            <Col>
              <Form.Control 
                name="username" 
                type="text"
                onChange={(e) => setName(e.target.value)}  
              />
            </Col>
        </Form.Group>
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

export default SignUp
