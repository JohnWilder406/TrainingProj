import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Table, Button, Form, Row, Col, Navbar, Nav } from  'react-bootstrap';
import ModularForm from '../components/form';
import Search from '../components/Search';

const EditTraining = (props) => {
    const {id} = props;
    const [plan, setPlan] = useState({});
    const [errors, setErrors] = useState({})
    const [workouts, setWorkouts] = useState([])
    const [workDefault, setWorkDefault] = useState([])
    const [searchQuery, setSearchQuery] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/api/plans/' + id)
            .then((res) => {
                console.log(res)
                setPlan(res.data)
                setWorkouts(res.data.workouts)
                setWorkDefault(res.data.workouts)
            })
    }, [])

    //search filter
    const updateInput = async (searchQuery) => {
        const filtered = workDefault.filter(plan => {
            if(plan.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return plan.name.toLowerCase().includes(searchQuery.toLowerCase())
            }
            
        })
        setSearchQuery(searchQuery);
        setWorkouts(filtered)
    }



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
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Crusher Training App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/admin/addplan">New Training Plan</Link></Button>
                    <Button variant="outline-dark"><Link to="/admin/main">Main Page</Link></Button>
                </Nav>
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>
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