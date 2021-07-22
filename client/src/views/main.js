import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button } from  'react-bootstrap';
import Calendar from 'react-calendar';
import Navbar from '../components/Navbar';

const Main = (props) => {
    var date = new Date().toDateString();

    const [user, setUser] = useState();
    const [quote, setQuote] = useState("");

    //Going to work on this tomorrow. Running into an error. 'https://zenquotes.io/api/today' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    useEffect(() => {
        axios.get('https://zenquotes.io/api/quote/')
            .then((res) =>{
                console.log(res);
                setQuote(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get('/api/user/get/:id')
            .then((res) => {
                console.log(res);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    

    return (
        <div>
            <h1>User Main Page</h1>
            <Navbar />
            <Container>
                <h5 align="center">{date}</h5>
                <blockquote className="blockquote">
                    <p>{quote}</p>
                </blockquote>
            </Container>
            <div className=" container row" >
                <div className=" col-4 panel">
                    <div className="panel-heading">
                    <h3 className="panel-title">Work Out Details</h3>
                    </div>
                    <div className="panel-body">
                    <p>Workout Name</p>
                        <p>Duration</p>
                        <p>Intensity</p>
                        <p>Difficulty</p>
                    </div>
                    <div class="panel-footer">
                        <Button btn btn-Defualt>Complete</Button>
                    </div>
                </div>

                <div className=" col-8">
                    <Calendar className="calendar" />
                </div>  
            </div>
        </div>
        
    )
}

export default Main;