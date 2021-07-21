import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col } from  'react-bootstrap';
import Navbar from '../components/Navbar';

const Profile = (props) => {
    return (
        <div class="container">
            <h1>Profile page</h1>
            <Navbar />
            
        </div>
        
    )
}

export default Profile;