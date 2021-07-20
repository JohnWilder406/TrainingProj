import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Table, Button, Form, Row, Col } from  'react-bootstrap';
import ModularForm from '../components/form';

const EditTraining = (props) => {
    const {id} = props;
    const [plan, setPlan] = useState({});
    const [errors, setErrors] = useState({})
    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/plans/' + id)
            .then((res) => {
                console.log(res)
                setPlan(res.data)
                setWorkouts(res.data.workouts)
            })
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/plans/' + id, plan)
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
            <h1>Edit Training page</h1>
            <ModularForm object={plan} setObject={setPlan} errors={errors} handleSubmit={handleSubmit} submitLabel={"Edit Plan"}/>
            <Card className="modularForm">
                <Card.Body>
                    <Table bordered striped hover>
                        <thead>
                            <tr>
                                <th>Workout Name</th>
                                <th>Duration</th>
                                <th>Intensity</th>
                                <th>Difficulty</th>
                                <th>Frequency</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                workouts.map((plan, idx) => {
                                    return (
                                        <tr key={idx}><td>{plan.name}</td><td>{plan.duration}</td><td>{plan.intensity}</td><td>{plan.difficulty}</td><td>{plan.frequency}</td><td><Button variant="none"><Link to={"/admin/training/" + plan._id + "/editworkout"} state={{trainingid: id}}>Edit Workout</Link></Button><Button variant="none"><Link to={'/admin/training/' + id + '/addworkout'}>Add Workout</Link></Button></td></tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default EditTraining;