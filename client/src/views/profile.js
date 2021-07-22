import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, FormGroup, FormLabel, Row, Col, Button } from  'react-bootstrap';
import Navbar from '../components/Navbar';

const Profile = (props) => {
    const [errs, setErrs] = useState({});
    const [user, setUser] = useState({

    });

    const handleChange = () => {

    }
    return (
        <Container>
            <h1>Profile page</h1>
            <Navbar />
            <Card border="dark" ClassName="text-center">
                <Card.Header style={{textAlign: "center", fontSize: "24px"}}>Edit Profile</Card.Header>
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-6">
                                <Form.Label Column sm={3}>First Name:</Form.Label>
                                <Form.Control type="text" name="firstName" value={user.firstName} onChange={(e) => handleChange(e)} placeholder="Enter your first name" />
                                {errs.firstName ? <span className="error">{errs.firstName.message}</span> : null}
                            </Form.Group>
                            
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Last Name:</Form.Label>
                                <Form.Control type="text" name="lastName" value={user.lastName} onChange={(e) => handleChange(e)} placeholder="Enter your last name" />
                                {errs.lastName ? <span className="error">{errs.lastName.message}</span> : null}
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Email:</Form.Label>
                                <Form.Control type="text" name="email" value={user.email} onChange={(e) => handleChange(e)} placeholder="Enter your email" />
                                {errs.email ? <span className="error">{errs.email.message}</span> : null}
                            </Form.Group>
                        
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Birthday:</Form.Label>
                                <Form.Control type="date" name="birthday" value={user.birthday} onChange={(e) => handleChange(e)}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Height:</Form.Label>
                                <Form.Control type="text" name="height" value={user.height} onChange={(e) => handleChange(e)} placeholder="Enter your height"/>
                            </Form.Group>
                        

                        
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Sport:</Form.Label>
                                <Form.Control type="text" name="sport" value={user.sport} onChange={(e) => handleChange(e)} placeholder="Enter your preffered sport"/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Weight:</Form.Label>
                                <Form.Control type="text" name="weight" value={user.weight} onChange={(e) => handleChange(e)} placeholder="Enter your weight"/>
                            </Form.Group>
                        

                            <Form.Group as={Col} className="mb-6">
                                <Form.Label column sm={3}>Difficulty</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="difficulty"
                                        value={user.difficulty}
                                        onChange={(e) => handleChange(e)}>
                                        <option>Select Difficulty</option>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                        <option value="olympic">Olympic</option>
                                    </Form.Control>
                                    { 
                                    errs.difficulty ? <span className="error">{errs.difficulty.message}</span> : null
                                    }
                            </Form.Group>
                        </Row>
                        <Button className="btn btn-defualt">Cancel</Button>
                        <Button  style={{margin: "10px"}} type="submit" className="btn btn-primary">Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            
            
        </Container>
        
    )
}

export default Profile;