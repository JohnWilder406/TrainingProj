import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col } from  'react-bootstrap';
import ModularForm from '../components/form';

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
                    navigate('/admin/main')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <Container>
            <h1>Add Training Plan Page</h1>
            <ModularForm object={plan} setObject={setPlan} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Plan"} />
        </Container>
    )
}

export default AddTraining;