import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button, Table } from  'react-bootstrap';
import Navbar from './Navbar';

const NewWorkout = (props) => {
    const [plan, setPlan] = useState({});
    const [workouts, setWorkouts] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/api/plans')
            .then((res) => {
                console.log(res);
                setPlan(res.data);
                setWorkouts(res.data.workouts);
                console.log("workouts " + workouts.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

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
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Workout</th>
                            <th>Duration(mins)</th>
                            <th>Intensity</th>
                            <th>Difficulty</th>
                            <th>Freq/Week</th>
                            <th>Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            workouts.map((plan, index) => (
                                <tr key={index}>
                                    <td>{plan.name}</td>
                                    <td>{plan.duration}</td>
                                    <td>{plan.intensity}</td>
                                    <td>{plan.difficulty}</td>
                                    <td>{plan.frequency}</td>
                                    <td>Add</td>
                                </tr>
                            ))
                        } */}
                        <tr>
                            <td>workout</td>
                            <td>duration</td>
                            <td>intensity</td>
                            <td>difficulty</td>
                            <td>freq/week</td>
                            <td>add</td>
                        </tr>
                    </tbody>
                    </Table>
            </div>
        </Container>
    );
}

export default NewWorkout;