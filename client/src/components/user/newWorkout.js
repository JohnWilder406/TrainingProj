import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button, Table, Navbar, Nav } from  'react-bootstrap';
import Navigation from '../Navbar'
import moment from 'moment'
import Search from '../Search';

const NewWorkout = (props) => {
    //const [user, setUser] = useState({});
    const [training, setTraining] = useState([]);
    const [trainDefault, setTrainDefault] = useState([]);
    const [searchQuery, setSearchQuery] = useState();
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
        let currentDate = moment(startdate)
        console.log(currentDate)
        let newObject = {...newWorkout}
        newObject.startdate = currentDate
        console.log(newObject)
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

        // //search filter
    const updateInput = async (searchQuery) => {
        const filtered = trainDefault.filter(plan => {
            if(plan.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return plan.name.toLowerCase().includes(searchQuery.toLowerCase())
            }
            
        })
        setSearchQuery(searchQuery);
        setTraining(filtered)
    }
    
    return (
        <Container className="mainContainer">
            <Navigation />
            <Card border="dark" className="text-center">
                <Card.Body className="bodys">
                    <Form className="bodys">
                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-4">
                                <Form.Control 
                                    type="text" 
                                    name="name" 
                                    placeholder="Workout Name" 
                                    readOnly
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
                                <Button className="submit_btn" onClick={(e) => addCalendar(e, startdate)}>Add to Calendar</Button>
                            </Form.Group> 
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <div>
                <Navbar className="search">
                <Nav>
                <Navbar.Brand style={{marginRight: "850px", marginLeft: "10px", color: "#D5E5EE"}}>Search Workouts</Navbar.Brand>
                <Search searchQuery={searchQuery} onChange={updateInput} /> 
                </Nav>
                </Navbar>
                <Container className="bodys" style={{padding: "2%"}}>
                    <table>
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
                                                            <Button style={{backgroundColor: "#00060A"}}onClick={(e) => addNew(
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
                    </table>
                </Container>
            </div>
        </Container>
    );
}

export default NewWorkout;