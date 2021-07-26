import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import { Container, Card, Table, Navbar, Nav, Button } from  'react-bootstrap';
import Search from '../../components/Search';
import Logout from '../../components/Logout';
import DeleteButton from '../../components/DeleteButton';

const AdminMain = () => {
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
    
        //refreshes page to remove deleted items
        const afterDeleteHandler = (deletedPlanId) => {
            let filteredPlanArray = plans.filter((plan) => {
                return plan._id !== deletedPlanId
            })
    
            setPlans(filteredPlanArray)
        }

    return (
        <Container className="mainContainer">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{marginLeft: "10px"}} className="navbrand">Crusher Training Admin Portal</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button className="btn btn-dark" variant="outline-dark"><Link to="/admin/main">Home</Link></Button>
                    <Button className="btn btn-dark" variant="outline-dark"><Link to="/admin/addplan">New Training Plan</Link></Button>
                    <Button className="btn btn-dark" variant="outline-dark"><Link to="/admin/userlist">User Management</Link></Button>
                </Nav>
                <div style={{marginLeft: "275px"}}>
                    <Search searchQuery={searchQuery} onChange={updateInput} />
                </div>
                <div style={{marginLeft: "10px"}}>
                    <Logout admin={true}/>
                </div>
            </Navbar>
            <Card border="dark" className="modularForm">
                <Card.Body className="bodys" >
                    <table>
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
                                        <tr key={idx}><td>{plan.name}</td><td>{plan.difficulty}</td><td>{plan.workouts.length}</td><td><Button style={{backgroundColor: "#00060A", marginRight: "10px"}} onClick={(e) => navigate("/admin/" + plan._id + "/editplan")}>Edit Plan</Button><Button style={{backgroundColor: "#00060A", marginRight: "10px"}} onClick={(e)=> navigate('/admin/training/' + plan._id + '/addworkout')}>Add Workout</Button><DeleteButton mongoLabel={"plans"} deleteLabel={"Delete Training Plan"} id={plan._id} afterDeleteHandler={afterDeleteHandler} /></td></tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AdminMain;
