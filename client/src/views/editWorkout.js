import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Navbar, Nav, Button } from  'react-bootstrap';
import WorkoutForm from '../components/workoutform';

const EditWorkout = (props) => {
    const {id, location} = props;
    const [errors, setErrors] = useState({})
    const [workout, setWorkout] = useState({})

    const training = location.state.trainingid

    useEffect(() => {
        axios.get('http://localhost:8000/api/plans/' + training)
        .then((res) => {
            console.log(res.data.workouts)
            let array = res.data.workouts
            for (var i = 0; i < array.length; i++) {
                if(array[i]._id === id) {
                    setWorkout(array[i])
                }
            }
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/plans/' + id +'/edit_workout', {workout})
            .then((res) => {
                console.log(res.data)
                if(res.data.errors) {
                    setErrors(res.data.errors)
                } 
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <Container>
        <h1>Edit Workout Plan Page (admin)</h1>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Crusher Training App</Navbar.Brand>
            <Nav className="mr-auto">
                <Button variant="outline-dark"><Link to="/admin/main">Main Page</Link></Button>
            </Nav>
        </Navbar>
        <WorkoutForm object={workout} setObject={setWorkout} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Workout"}/>
    </Container>
    )
}

export default EditWorkout;