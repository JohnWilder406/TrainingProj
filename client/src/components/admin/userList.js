import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from '@reach/router';
import { Container, Card, Button, Nav, Navbar } from  'react-bootstrap';
import Search from '../Search'
import DeleteButton from '../DeleteButton';
import Logout from '../Logout';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [userDefault, setUserDefault] = useState([]);
    const [searchQuery, setSearchQuery] = useState();

    //retrieves all users from database
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

//refreshes page view to remove deleted item
    const afterDeleteHandler = (deletedPlanId) => {
        let filteredUserArray = userList.filter((user) => {
            return user._id !== deletedPlanId
        })

        setUserList(filteredUserArray)
    }

    return (
        <Container>
        <Navbar  bg="dark" variant="dark">
            <Navbar.Brand style={{marginLeft: "10px"}}>Crusher Training Admin Portal</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/admin/main">Home</Link></Button>
                    <Button variant="outline-dark"><Link to="/admin/addplan">New Training Plan</Link></Button>
                </Nav>
                <div style={{marginLeft: "460px"}}>
                    <Search searchQuery={searchQuery} onChange={updateInput} />
                </div>
                <div style={{marginLeft: "10px"}}>
                    <Logout admin={true}/>
                </div>
            </Navbar>
        <Card className="modularForm">
            <Card.Body>
                <table>
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
                </table>
            </Card.Body>
        </Card>
    </Container>
        
    )
}

export default UserList;