import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button } from  'react-bootstrap';
import Navbar from '../../components/Navbar';
import {LoginContext} from '../../context/context';
import moment from 'moment';
import CalendarComp from '../../components/user/calendar';
import randomNum from '../../helpers/random';
import mapper from '../../helpers/mapper';
import addDays from '../../helpers/adding';
import Logout from '../../components/Logout';


const Main = (props) => {
    const {id} = useContext(LoginContext);
    var date = new Date().toDateString();
    const [user, setUser] = useState();
    const [quote, setQuote] = useState("");
    const [events, setEvents] = useState([{
        start: moment().toDate(),
        end: moment()
            .add(1, "days")
            .toDate(),
        title: "No User Found"
    }])
    const [workout, setWorkout] = useState({});
    const [newWorkout, setNewWorkout] = useState({});

    console.log(id)

    // workout set function
    function today(arr) {
        let newObj = {}
        for (var i = 0; i < arr.length; i++) {
            let today = new Date(arr[i].startdate)
            if(today.toDateString() === date) {
                newObj = arr[i]
            }
        }
        return newObj
}
    //calls daily quote
    useEffect(() => {
        let idx = randomNum();
        axios.get('https://type.fit/api/quotes')
            .then((res) =>{
                setQuote(res.data[idx].text);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    //calls user data and populates current workout and calendar data
    useEffect(() => {
        axios.get('http://localhost:8000/api/user/get/' + id)
            .then((res) => {
                console.log(res.data.workouts)
                console.log(date);
                setUser(res.data);
                setEvents(mapper(res.data.workouts))
                setWorkout(today(res.data.workouts))
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //updates workout object to push start date forward and remove a workout from the total count.
    const workoutComplete = (e) => {
        e.preventDefault();
        let newDate = addDays(workout.startdate, workout.frequency)
        let newWorkout = {...workout};
        if(workout.number === 1) {
            newWorkout.complete = true
            newWorkout.number = workout.number - 1
            newDate = addDays(workout.startdate, 1000)
        } else {
            newWorkout.number = workout.number - 1
            newDate = addDays(workout.startdate, workout.frequency)
        }
        newWorkout.startdate = newDate
        setNewWorkout(newWorkout)
    }

    //updates workout object in database and repopulates the page with current data
    useEffect(() => {
        axios.put('http://localhost:8000/api/users/' + id + '/complete/' + workout._id, newWorkout)
            .then((res) => {
                console.log(res)
                axios.get('http://localhost:8000/api/user/get/'+ id)
                    .then((res) => {
                        console.log(res.data)
                        setEvents(mapper(res.data.workouts))
                        setWorkout(today(res.data.workouts))
                    })
            })
    }, [newWorkout])
    

    return (
        <div>
            <h1>User Main Page</h1>
            <Navbar />
            <Container>
                <h5 align="center">{date}</h5>
                <blockquote className="blockquote">
                    <p>{quote}</p>
                </blockquote>
            </Container>
            <Container as={Row}>
                <div className=" col-4 panel">
                    <div className="panel-heading">
                    <h3 className="panel-title">Work Out Details</h3>
                    </div>
                    <Form onSubmit={(e) => {workoutComplete(e)}}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Workout:
                            </Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    readOnly plaintext
                                    name="name"
                                    value={workout.name ? workout.name : "No Workout Today"}  />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Duration:
                            </Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    readOnly plaintext
                                    name="duration"
                                    value={workout.duration ? workout.duration + " mins": 0}  />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Intensity:
                            </Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    readOnly plaintext
                                    name="intensity"
                                    value={workout.intensity ? workout.intensity : "None"}  />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Difficulty:
                            </Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    readOnly plaintext
                                    name="difficulty"
                                    value={workout.difficulty ? workout.difficulty : "None"}  />
                            </Col>
                        </Form.Group>
                        <Button type="submit">Workout Complete</Button>
                    </Form>
                    <div className="panel-footer">
                    </div>
                </div>

                <div className=" col-8">
                    <CalendarComp eventList={events} />
                </div>  
            </Container>
        </div>
        
    )
}

export default Main;