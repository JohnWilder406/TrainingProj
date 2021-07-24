import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Nav, Navbar, Button } from  'react-bootstrap';
import ModularForm from '../../components/admin/form';



const AddTraining = (props) => {
    const [errors, setErrors] = useState({})
    const [plan, setPlan] = useState({
        name: "",
        difficulty: "",
        duration: "", 
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/plans/add_plan', plan)
            .then((res) => {
                console.log(res.data)
                if(res.data.errors) {
                    setErrors(res.data.errors)
                } else {

                    navigate('/admin/training/' + res.data._id + '/addworkout')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <Container>
            <h1>Add Training Plan Page</h1>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Crusher Training App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/admin/main">Main Page</Link></Button>
                </Nav>
            </Navbar>
            <ModularForm object={plan} setObject={setPlan} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Plan"} />
        </Container>
    )
}

export default AddTraining;