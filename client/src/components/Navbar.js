import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import { Container, Card, Form, Row, Col, Button, Navbar} from  'react-bootstrap';
import Search from './Search';

const Navigation = (props) => {
    //Need to add user id for navigation, and functionality for Search.   
    

    return (
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/main">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href={"/users/:id/newworkout"}>New Workout</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href={"/users/:id/profile"}>Edit Profile</a>
                        </li>
                    </ul>
                    <Search  />
                </div>
            </nav>
        </div>
    )
}

export default Navigation;