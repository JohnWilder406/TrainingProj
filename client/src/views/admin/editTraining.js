import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from '@reach/router';
import { Container, Card, Button, Navbar, Nav } from  'react-bootstrap';
import ModularForm from '../../components/admin/form';
import Search from '../../components/Search';
import DeleteWorkout from '../../components/admin/deleteWorkout';

const EditTraining = (props) => {
    const {id} = props;
    const [plan, setPlan] = useState({});
    const [errors, setErrors] = useState({})
    const [workouts, setWorkouts] = useState([])
    const [workDefault, setWorkDefault] = useState([])
    const [searchQuery, setSearchQuery] = useState()

    //retrieve plan information
    useEffect(() => {
        axios.get('http://localhost:8000/api/plans/' + id)
            .then((res) => {
                console.log(res)
                setPlan(res.data)
                setWorkouts(res.data.workouts)
                setWorkDefault(res.data.workouts)
            })
    }, [id])

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

    //resets page view to remove deleted plan
    const afterDeleteHandler = (deletedPlanId) => {
        let filteredWorkoutArray = workouts.filter((workout) => {
            return workout._id !== deletedPlanId
        })

        setWorkouts(filteredWorkoutArray)
    }


    //submits updated plan to database
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
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{marginLeft: "10px"}} >Crusher Training Admin Portal</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button className="btn btn-dark" variant="outline-dark"><Link to="/admin/main">Home</Link></Button>
                    <Button className="btn btn-dark" variant="outline-dark"><Link to="/admin/addplan">New Training Plan</Link></Button>
                    <Button className="btn btn-dark" variant="outline-dark"><Link to="/admin/userlist">User Management</Link></Button>
                </Nav>
                <div style={{marginLeft: "370px"}}>
                <Search searchQuery={searchQuery} onChange={updateInput} />
                </div>
            </Navbar>
            <ModularForm linkid={id} edit={true} object={plan} setObject={setPlan} errors={errors} handleSubmit={handleSubmit} submitLabel={"Edit Plan"}/>
            <Card border="dark" className="modularForm">
                <Card.Body className="bodys">
                    <table>
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
                                        <tr key={idx}>
                                            <td>{plan.name}</td>
                                            <td>{plan.duration}</td>
                                            <td>{plan.intensity}</td>
                                            <td>{plan.difficulty}</td>
                                            <td>{plan.frequency}</td>
                                            <td><Button style={{backgroundColor: "#00060A", marginRight: "10px"}}><Link className="button-link" to={"/admin/training/" + plan._id + "/editworkout"} state={{trainingid: id}}>Edit Workout</Link></Button>
                                            <DeleteWorkout afterDeleteHandler={afterDeleteHandler} workoutid={plan._id} id={id} /> </td>
                                        </tr>
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

export default EditTraining;