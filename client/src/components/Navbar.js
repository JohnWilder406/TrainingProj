import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button, Nav, Navbar} from  'react-bootstrap';
import Search from './Search';
import {LoginContext} from '../context/context';
import Logout from './Logout';

const Navigation = (props) => {
    const {id} = useContext(LoginContext);
    const {search, admin} = props
    //Need to add functionality for Search.   
    

    return (
        <div className="container">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Crusher Training App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button className="btn btn-link" variant="outline-dark" onClick={(e) => navigate('/main')}>Home</Button>
                    <Button className="btn btn-link" variant="outline-dark" onClick={(e) => navigate('/users/' + id + '/newworkout')}>New Workout</Button>
                    <Button className="btn btn-link" variant="outline-dark" onClick={(e) => navigate('/users/' + id + '/profile')}>Edit Profile</Button>
                </Nav>
                <Logout admin={admin}/>
                {
                    search ? <Search /> : <span></span>
                }
            </Navbar>
        </div>
    )
}

export default Navigation;