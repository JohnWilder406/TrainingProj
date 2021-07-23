import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col } from  'react-bootstrap';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

function mapper(arr) {
    let newArr = []
    for (var i = 0; i < arr.length; i++) {
        let obj = {start: moment(arr[i].startdate), end: moment(arr[i].startdate), title: arr[i].name}
        newArr.push(obj)
    }

    return newArr
}

const CalendarComp = (props) => {
    const {id} = props
    const [user, setUser] = useState({})
    const [events, setEvents] = useState([{
        start: moment().toDate(),
        end: moment()
            .add(1, "days")
            .toDate(),
        title: "Testing"
    }])


    useEffect(() => {
        axios.get('http://localhost:8000/api/user/get/' + id)
            .then((res) => {
                console.log(res.data)
                setUser(res.data)
                setEvents(mapper(res.data.workouts))
            })
    }, [])

    return (
        <Container>
            <h1>Calendar Test Page</h1>
            <h2>Calendar Page for {user.firstName} </h2>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{height:500}}
            />
        </Container>
    )
}

export default CalendarComp;

