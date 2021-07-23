import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Table, Navbar, Nav, Button } from  'react-bootstrap';
import Search from '../components/Search';
import Logout from '../components/Logout';
import DeleteButton from '../components/DeleteButton';

const AdminMain = (props) => {
    const [plans, setPlans] = useState([]);
    const [plansDefault, setPlansDefault] = useState([]);
    const [searchQuery, setSearchQuery] = useState();

    //retrieves all training plans
    useEffect(() => {
        axios.get('http://localhost:8000/api/plans')
            .then((res) => {
                console.log(res)
                setPlans(res.data)
                setPlansDefault(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


        //search filter
        const updateInput = async (searchQuery) => {
            const filtered = plansDefault.filter(plan => {
                if(plan.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return plan.name.toLowerCase().includes(searchQuery.toLowerCase())
                }
                
            })
            setSearchQuery(searchQuery);
            setPlans(filtered)
        }
    
        const afterDeleteHandler = (deletedPlanId) => {
            let filteredPlanArray = plans.filter((plan) => {
                return plan._id !== deletedPlanId
            })
    
            setPlans(filteredPlanArray)
        }

    return (
        <Container className="mainContainer">
        <h1>Admin Main page </h1>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Crusher Training App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/admin/addplan">New Training Plan</Link></Button>
                    <Button variant="outline-dark"><Link to="/admin/userprogress">User Progress</Link></Button>
                </Nav>
                <Logout />
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>
            <Card className="modularForm">
                <Card.Body>
                    <Table bordered striped hover>
                        <thead>
                            <tr>
                                <th>Plan Name</th>
                                <th>Difficulty</th>
                                <th>Number of Workouts</th>
                                <th>Actions Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                plans.map((plan, idx) => {
                                    return (
                                        <tr key={idx}><td>{plan.name}</td><td>{plan.difficulty}</td><td>{plan.workouts.length}</td><td><Button variant="none"><Link to={"/admin/" + plan._id + "/editplan"}>Edit Plan</Link></Button><Button variant="none"><Link to={'/admin/training/' + plan._id + '/addworkout'}>Add Workout</Link></Button><DeleteButton mongoLabel={"plans"} deleteLabel={"Delete Training Plan"} id={plan._id} afterDeleteHandler={afterDeleteHandler} /></td></tr>
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

export default AdminMain;
