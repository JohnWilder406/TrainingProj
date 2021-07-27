import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import { Container, Navbar, Nav, Button } from  'react-bootstrap';
import WorkoutForm from '../../components/admin/workoutform';

const EditWorkout = (props) => {
    const {id, location} = props;
    const [errors, setErrors] = useState({})
    const [workout, setWorkout] = useState({})
    const [workId, setWorkId] = useState()

    const training = location.state.trainingid

    useEffect(() => {
        axios.get('http://localhost:8000/api/plans/' + training)
        .then((res) => {
            console.log(res.data.workouts)
            let array = res.data.workouts
            for (var i = 0; i < array.length; i++) {
                if(array[i]._id === id) {
                    setWorkout(array[i])
                    setWorkId(array[i]._id)
                }
            }
        })
    }, [training, id])

    console.log(workId)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/plans/' + workId +'/edit_workout', {workout})
            .then((res) => {
                console.log(res.data)
                if(res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate('/admin/'+ training + '/editplan')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand style={{marginLeft: "10px"}}>Crusher Training App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/admin/main">Main Page</Link></Button>
                </Nav>
            </Navbar>
            <WorkoutForm edit={true} linkid={training} object={workout} setObject={setWorkout} errors={errors} handleSubmit={handleSubmit} submitLabel={"Update Workout"}/>
        </Container>
    )
}

export default EditWorkout;