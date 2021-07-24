import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button, Table } from  'react-bootstrap';
import Navbar from './Navbar';

const NewWorkout = (props) => {
    const [user, setUser] = useState([]);
    const [training, setTraining] = useState([]);
    const [workout, setWorkout] = useState([]);
    const {id} = props;

    useEffect(() => {
        axios.get('http://localhost:8000/api/plans')
            .then((res) => {
                console.log(res);
                setTraining(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/get/' + id)
            .then((res) => {
                console.log(res);
                setUser(res.data);
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
                    {/* Currently this is pulling all plans from db. So if there is more than one it would likely populate with other works */}
                    {
                        training.map((plan, index) => {
                            return (
                                <tbody key={index}>
                                    {
                                        plan.workouts.map((workouts, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{workouts.name}</td>
                                                    <td>{workouts.duration}</td>
                                                    <td>{workouts.intensity}</td>
                                                    <td>{workouts.difficulty}</td>
                                                    <td>{workouts.frequency}</td>
                                                    <td>Add</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            )
                        })
                    }
                </Table>
            </div>
        </Container>
    );
}

export default NewWorkout;