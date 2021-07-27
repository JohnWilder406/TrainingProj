import React, { useContext } from 'react';
import {navigate} from '@reach/router';
import { Button, Container, Nav, Navbar} from  'react-bootstrap';
import Search from './Search';
import {LoginContext} from '../context/context';
import Logout from './Logout';

const Navigation = (props) => {
    const {id} = useContext(LoginContext); 
    

    return (
        <div>
            {/* <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{marginLeft: "10px"}} className="navbrand">Crusher Training Admin Portal</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button className="btn btn-dark" variant="outline-dark"><Link to="/main">Home</Link></Button>
                    <Button className="btn btn-dark" variant="outline-dark"><Link to="/users/' + id + '/newworkout">New Workout</Link></Button>
                    <Button className="btn btn-dark" variant="outline-dark"><Link to="/users/' + id + '/profile">Edit</Link></Button>
                </Nav>
                <div style={{marginLeft: "275px"}}>
                    <Search searchQuery={searchQuery} onChange={updateInput} />
                </div>
                <div style={{marginLeft: "10px"}}>
                    <Logout />
                </div>
            </Navbar> */}


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