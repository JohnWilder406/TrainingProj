import React, { useContext } from 'react';
import {navigate} from '@reach/router';
import { Button, Nav, Navbar} from  'react-bootstrap';
import {LoginContext} from '../context/context';
import Logout from './Logout';

const Navigation = () => {
    const {id} = useContext(LoginContext); 
    

    return (
        <div>
            <Navbar bg="dark" variant="dark" className="userNav">
                <Navbar.Brand style={{marginLeft: "10px"}}>Crusher Training App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button className="btn btn-link" variant="outline-dark" onClick={(e) => navigate('/main')}>Home</Button>
                    <Button className="btn btn-link" variant="outline-dark" onClick={(e) => navigate('/users/' + id + '/newworkout')}>New Workout</Button>
                    <Button className="btn btn-link" variant="outline-dark" onClick={(e) => navigate('/users/' + id + '/profile')}>Edit Profile</Button>
                </Nav>
                <div style={{marginLeft: "50%"}}>
                    <Logout />
                </div>
            </Navbar>
        </div>
    )
}

export default Navigation;