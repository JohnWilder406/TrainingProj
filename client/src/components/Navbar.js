import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button, Nav, Navbar} from  'react-bootstrap';
import Search from './Search';

const Navigation = (props) => {
    //Need to add user id for navigation, and functionality for Search.   
    

    return (
        <div className="container">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Crusher Training App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/main">Home</Link></Button>
                    <Button variant="outline-dark"><Link to="/users/:id/newworkout">New Workout</Link></Button>
                    <Button variant="outline-dark"><Link to="/users/:id/profile">Edit Profile</Link></Button>
                </Nav>
                <Search  />
            </Navbar>
        </div>
    )
}

export default Navigation;