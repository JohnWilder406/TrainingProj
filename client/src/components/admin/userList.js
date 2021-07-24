import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Table, Button, Nav, Navbar } from  'react-bootstrap';
import Search from '../Search'
import DeleteButton from '../DeleteButton';
import Logout from '../Logout';

const UserList = (props) => {
    const [userList, setUserList] = useState([]);
    const [userDefault, setUserDefault] = useState([]);
    const [searchQuery, setSearchQuery] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/get')
            .then((res) => {
                console.log(res)
                setUserList(res.data)
                setUserDefault(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    //search filter
    const updateInput = async (searchQuery) => {
        const filtered = userDefault.filter(user => {
            if(user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
            }
            
        })
        setSearchQuery(searchQuery);
        setUserList(filtered)
    }

        //updates favorite status of each order in the database and also refreshes axios upon change so button 
    //reflects current status of favorite.
    const adminChange = (user, status) => {
        console.log(user)
        axios.put('http://localhost:8000/api/users/admin/' + user._id, {admin: status})
        .then(() => {
            return axios.get('http://localhost:8000/api/users/get')
                .then((res) => {
                    setUserList(res.data)
                    setUserDefault(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch(err => console.log(err));
    }

    const afterDeleteHandler = (deletedPlanId) => {
        let filteredUserArray = userList.filter((user) => {
            return user._id !== deletedPlanId
        })

        setUserList(filteredUserArray)
    }

    return (
        <Container>
        <h1>User List page</h1>
        <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Crusher Training Admin Portal</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/admin/main">Home</Link></Button>
                    <Button variant="outline-dark"><Link to="/admin/addplan">New Training Plan</Link></Button>
                    <Button variant="outline-dark"><Link to="/admin/userlist">User Management</Link></Button>
                </Nav>
                <Logout admin={true}/>
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>
        <Card className="modularForm">
                <Card.Body>
                    <Table bordered striped hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Admin?</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userList.map((user, idx) => {
                                    return (
                                        <tr key={idx}><td>{user.firstName}</td><td>{user.lastName}</td><td>{user.admin ? <Button variant="success" onClick={(e)=>adminChange(user, false)}>Yes</Button> : <Button variant="secondary" onClick={(e)=>adminChange(user, true)}>No</Button>}</td><td><DeleteButton id={user._id} afterDeleteHandler={afterDeleteHandler} deleteLabel={"Delete " + user.firstName + "?"} mongoLabel={"users"} /></td></tr>
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

export default UserList;