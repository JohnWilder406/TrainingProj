import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button } from  'react-bootstrap';
import Navbar from './Navbar';

const NewWorkout = (props) => {
    return (
        <Container>
            <h1>New Workout (user)</h1>
            <Navbar />
            <Card border="dark" className="text-center">
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-4">
                                <Form.Control type="text" name="workoutName" placeholder="Workout Name"/>
                            </Form.Group>

                            <Form.Group as={Col} className="col-4">
                                <Form.Control type="date" name="startDate"/>
                                <Form.Label>Starting Date</Form.Label>
                            </Form.Group>

                            <Form.Group as={Col} className="col-4">
                                <Button>Add to Calendar</Button>
                            </Form.Group> 
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default NewWorkout;