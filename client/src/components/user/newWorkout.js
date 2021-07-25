import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button, Table } from  'react-bootstrap';
import Navbar from '../Navbar';

const NewWorkout = (props) => {
    //const [user, setUser] = useState({});
    const [training, setTraining] = useState([]);
    const [newWorkout, setNewWorkout] = useState({});
    const [userWorkout, setUserWorkout] = useState({});
    const [startdate, setStartdate] = useState();
    const workoutRef = useRef(userWorkout);
    const {id} = props;

    //gets training plans for mapping over
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
    
    //this function adds the newWork out to the input field of the form.
    const addNew = (name, complete, duration, intensity, difficulty, frequency, startdate) => { 
        setNewWorkout({ 
            name: name,
            complete: false, 
            duration: duration, 
            intensity: intensity, 
            difficulty: difficulty, 
            frequency: frequency,
            startdate: ""
        });
    }

    //Sets the start date
    const addCalendar = (e, startdate ) => {
        e.preventDefault();

        let newObject = {...newWorkout}
        newObject.startdate = startdate
        setUserWorkout(newObject);
    } 
    
    //adds the newWorkout to the users workouts array.
    useEffect(() => {
        if(userWorkout !== workoutRef.current) {
            axios.put('http://localhost:8000/api/users/' + id + '/add', {workout: userWorkout})
                .then((res) => {
                    console.log(res)
                    navigate('/main')
                })
                .catch((err) => {
                    console.log(err);
                })
            
        } else {
            console.log(userWorkout);
        }

    }, [userWorkout]);
    
    return (
        <Container>
            <h1>New Workout (user)</h1>
            <Navbar search={true}/>
            <Card border="dark" className="text-center">
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-4">
                                <Form.Control 
                                    type="text" 
                                    name="name" 
                                    placeholder="Workout Name" 
                                    value={newWorkout.name ? newWorkout.name : ""}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="col-4">
                                <Form.Control 
                                    type="date" 
                                    name="startdate" 
                                    value={startdate} 
                                    onChange={(e) => setStartdate(e.target.value)}
                                />
                                <Form.Label>Starting Date</Form.Label>
                            </Form.Group>

                            <Form.Group as={Col} className="col-4">
                                <Button onClick={(e) => addCalendar(e, startdate)}>Add to Calendar</Button>
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
                                                    <td>
                                                        <Button onClick={(e) => addNew(
                                                            workouts.name,
                                                            workouts.complete, 
                                                            workouts.duration, 
                                                            workouts.intensity, 
                                                            workouts.difficulty, 
                                                            workouts.frequency
                                                            )}>Add
                                                        </Button>
                                                        </td>
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