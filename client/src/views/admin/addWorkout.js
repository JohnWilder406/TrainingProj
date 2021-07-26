import React, { useState } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Navbar, Nav, Button } from  'react-bootstrap';
import WorkoutForm from '../../components/admin/workoutform';

const AddWorkout = (props) => {
    const {id} = props;
    const [errors, setErrors] = useState({})
    const [workout, setWorkout] = useState({
        name: "",
        difficulty: "",
        duration: "", 
        intensity: "",
        frequency: ""
    })
    console.log(id)

    //adds workout to workout array in database
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/plans/' + id + '/add_workout', {workout})
            .then((res) => {
                console.log(res.data)
                if(res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate('/admin/main')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container classaName="mainContainer">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{marginLeft: "10px"}}>Crusher Training App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/admin/main">Main Page</Link></Button>
                </Nav>
            </Navbar>
            <WorkoutForm edit={false} linkid={id} object={workout} setObject={setWorkout} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Workout"}/>
        </Container>
    )
}

export default AddWorkout;