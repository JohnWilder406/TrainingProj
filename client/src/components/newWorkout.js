import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col } from  'react-bootstrap';
import Navbar from './Navbar';

const NewWorkout = (props) => {
    return (
        <div className="container">
            <h1>newWorkout page (user)</h1>
            <Navbar />
        </div>
    )
}

export default NewWorkout;