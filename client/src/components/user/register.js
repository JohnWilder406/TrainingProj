import React, {useState} from 'react';
import {Card, Form, Button, Row, Col, Container} from 'react-bootstrap';
import axios from 'axios'
import { Link, navigate } from '@reach/router';

const Register= () => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    //handles input changes on Registration form.

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    //registration function
    const register = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/register', user)
            .then(res => {
                console.log(res.data);
                if(res.data.errors) {
                    setErrs(res.data.errors)
                } else {
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
                setConfirmReg("Thank you for Registering, you can now log in!");
                setErrs({});
                navigate("/")
            }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container className='loginContainer'>
        <Card border="dark" className='text-center'>
        <Card.Header style={{textAlign: "center", fontSize: "24px"}}>Register</Card.Header>
        <Card.Body>
        <Form onSubmit={register}>
            { confirmReg !== "" ? <h4>{confirmReg}</h4> : null }
            <Form.Group as={Row}>
                <Form.Label column sm={3}>First Name:</Form.Label>
                <Col sm={9}>
                <Form.Control type="text" name="firstName" value={user.firstName} onChange={(e) => handleChange(e)} placeholder="Enter your first name" />
                {errs.firstName ? <span className="error">{errs.firstName.message}</span> : null}
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={3}>Last Name:</Form.Label>
                <Col sm={9}>
                <Form.Control type="text" name="lastName" value={user.lastName} onChange={(e) => handleChange(e)} placeholder="Enter your last name" />
                {errs.lastName ? <span className="error">{errs.lastName.message}</span> : null}
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={3}>Email:</Form.Label>
                <Col sm={9}>
                <Form.Control type="text" name="email" value={user.email} onChange={(e) => handleChange(e)} placeholder="Enter your email" />
                {errs.email ? <span className="error">{errs.email.message}</span> : null}
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={3}>Password:</Form.Label>
                <Col sm={9}>
                <Form.Control type="password" name="password" value={user.password} onChange={(e) => handleChange(e)} placeholder="Enter a password" />
                {errs.password ? <span className="error">{errs.password.message}</span> : null}
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={3}>Confirm Password:</Form.Label>
                <Col sm={9}>
                <Form.Control type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e) => handleChange(e)} placeholder="Re-enter your password" />
                {errs.confirmPassword? <span className="error">{errs.confirmPassword.message}</span> : null}
                </Col>
            </Form.Group>
        <Button variant="dark" type="submit" style={{width: "150px", textAlign: "center"}}>Register</Button>
        </Form> 
        </Card.Body>
        <Link to="/">Return to Login Page</Link>
    </Card> 
    </Container>
    )
}

export default Register;