import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button } from  'react-bootstrap';
import Calendar from 'react-calendar';
import Navbar from '../components/Navbar';
import {LoginContext} from '../context/context';

//random number generator for api call for quote 
function randomNum() {
    let num = Math.floor(Math.random()*1644)

    return num
}

const Main = (props) => {
    const {id} = useContext(LoginContext);
    var date = new Date().toDateString();
    const [user, setUser] = useState();
    const [quote, setQuote] = useState("");

    console.log(id)


    useEffect(() => {
        let idx = randomNum();
        axios.get('https://type.fit/api/quotes')
            .then((res) =>{
                console.log(res.data);
                setQuote(res.data[idx].text);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/get/' + id)
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
            <div className="container">
                <h5 align="center">{date}</h5>
                <blockquote className="blockquote">
                    <p>{quote}</p>
                </blockquote>
            </div>
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
                    <div className="panel-footer">
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