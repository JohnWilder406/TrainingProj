import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Button } from  'react-bootstrap';
import Navigation from '../../components/Navbar';
import {LoginContext} from '../../context/context';
import moment from 'moment';
import CalendarComp from '../../components/user/calendar';
import randomNum from '../../helpers/random';
import mapper from '../../helpers/mapper';
import addDays from '../../helpers/adding';



const Main = () => {
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


    // workout set function
    function today(arr) {
        let newObj = {}
        for (var i = 0; i < arr.length; i++) {
            let today =  new Date(arr[i].startdate).toDateString()
            if(today == date) {
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
        axios.get('http://localhost:8000/api/users/get/' + id)
            .then((res) => {
                console.log(res.data.workouts)
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

    const workoutMissed = (e) => {
        e.preventDefault();
        let newDate = addDays(workout.startdate, workout.frequency)
        let newWorkout = {...workout};
        if(workout.number === 1) {
            newWorkout.complete = true
            newWorkout.number = workout.number
            newDate = addDays(workout.startdate, 1000)
        } else {
            newWorkout.number = workout.number
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
                axios.get('http://localhost:8000/api/users/get/'+ id)
                    .then((res) => {
                        console.log(res.data)
                        setEvents(mapper(res.data.workouts))
                        setWorkout(today(res.data.workouts))
                    })
            })
    }, [newWorkout])
    

    return (
        <Container className="mainContainer">
            <Navigation search={false}/>
            <div className="blue">
                <div className="quotes">
                    <h5 align="center">{date}</h5>
                    <blockquote className="quotes">
                        <p>{quote}</p>
                    </blockquote>
                </div>
                <Container className="mainSpacing" as={Row}>
                    <div className="col-4 panel">
                        <div className="panel-heading">
                            <h3 className="title">Workout Details</h3>
                            
                            <Form className="workoutDetails" onSubmit={(e) => {workoutComplete(e)}}>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Workout:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control
                                            readOnly plaintext
                                            name="name"
                                            value={workout.name ? workout.name : "No Workout Today"}  />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Duration:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control
                                            readOnly plaintext
                                            name="duration"
                                            value={workout.duration ? workout.duration + " mins": 0}  />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Intensity:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control
                                            readOnly plaintext
                                            name="intensity"
                                            value={workout.intensity ? workout.intensity : "None"}  />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Difficulty:
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control
                                            readOnly plaintext
                                            name="difficulty"
                                            value={workout.difficulty ? workout.difficulty : "None"}  />
                                    </Col>
                                    </Form.Group>
                                <Button className="submit_btn" type="submit">Workout Complete</Button>
                                <Button style={{marginLeft: "5px"}}className="submit_btn" onClick={(e) => workoutMissed(e)}>Missed Workout</Button>
                            </Form>
                        </div>
                        <div className="panel-footer">
                        </div>
                    </div>

                    <div className=" col-8">
                        <div className="mainCalendar">
                            <CalendarComp eventList={events} />
                        </div>
                    </div>  
                </Container>
            </div>
        </Container>
        
    )
}

export default Main;