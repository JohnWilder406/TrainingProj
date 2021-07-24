import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Navbar, Nav, Table, Button } from  'react-bootstrap';
import Search from '../../components/Search';


//incomplete component- do not link to.

function calc(num) {
    let result;
    //duration of plan (# of days)
    //frequency of workout
    //freq * duration / 7

}

const UserProgress = (props) => {
    const [users, setUsers] = useState([]);
    const [plans, setPlans] = useState([]);
    const [progress, setProgress] = useState([]);
    const [progressDef, setProgressDef] = useState([]);
    const [searchQuery, setSearchQuery] = useState();

    useEffect(()=> {
        axios.get('http://localhost:8000/api/users/get')
            .then((res) => {
                console.log(res.data)
                setUsers(res.data)
                axios.get('http://localhost:8000/api/plans')
                    .then((res) => {
                        console.log(res.data)
                        setPlans(res.data)
                    })
            })
    }, [])

    useEffect(() => {
        let newArr = [];
        for(var i = 0; i < users.length; i++) {
            let newObj = {}
            for(var j = 0; j < plans.length; j++) {
                if(users[i].training === plans[j]._id) {
                    newObj = {
                        firstName: users[i].firstName,
                        lastName: users[i].lastName,
                        plan: plans[j].name,
                        done: 0,
                        left: 0
                    }
                    newArr.push(newObj)
                    console.log(newArr)
                }
            }
        }
        setProgress(newArr)
        setProgressDef(newArr)
    }, [])

        //search filter
        const updateInput = async (searchQuery) => {
            const filtered = progressDef.filter(user => {
                if(user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
                } else if(user.lastName.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
                }
                
            })
            setSearchQuery(searchQuery);
            setProgress(filtered)
        }

    return (
        <Container>
            <h1>User Progress Page</h1>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Crusher Training App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/admin/addplan">New Training Plan</Link></Button>
                    <Button variant="outline-dark"><Link to="">User Progress</Link></Button>
                </Nav>
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>
            <Table bordered striped hover>
                <thead>
                    <tr>
                        <th>User First Name</th>
                        <th>User Last Name</th>
                        <th>Training Plan</th>
                        <th># of Workouts Completed</th>
                        <th># of Workouts Left</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        progress.map((user,idx) => {
                            return (
                            <tr key={idx}><td>{user.firstName}</td><td>{user.lastName}</td><td>{user.plan}</td><td>{user.done}</td><td>{user.left}</td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default UserProgress;