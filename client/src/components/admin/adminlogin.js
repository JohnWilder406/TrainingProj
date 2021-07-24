import React, { useState } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button, Modal } from  'react-bootstrap';

const AdminLogin = (props) => {
    const {setAdmin} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [show, setShow] = useState(false);

    //modal close function for error popup
    const handleClose = () => setShow(false);

    //login function
    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/admin/login", {
            email: email,
            password: password,
        },
        {
            withCredentials: true
        })
        .then((res) => {
            if(res.data.errors) {
                setErrors(res.data.errors)
            } else {
            setAdmin(true)
            navigate("/admin/main")
            }
        })
        .catch(err => {
            console.log(err);
            setShow(true)
        })
    }


    return (
        <Container className='loginContainer' >
        <Card border="dark" className="text-center">
        <Card.Header style={{fontSize: "24px"}}>Admin Login</Card.Header>
        <Card.Body>
        <Form  className='text-center' onSubmit={login}>
            <Form.Group as={Row} className='text-center'>
                <Form.Label column sm={2}>Email:</Form.Label>
                <Col sm={8}>
                <Form.Control type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Password:</Form.Label>
                <Col sm={8}>
                <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                </Col>
            </Form.Group>
        <Button className='mb-2' variant="dark" size="lg" type="submit" >Login</Button>
        </Form>
        </Card.Body>
        <Link style={{margin: 'auto'}} to="/">Not an Admin? Click here.</Link>
    </Card>
    <Modal show={show} onHide={handleClose}>
        <Modal.Body className="error text-center">
            {errors}
        </Modal.Body>
        <Modal.Footer>
            <Button style={{marginRight: "200px"}} variant="dark" onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
    </Container>
    )
}

export default AdminLogin;