import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {navigate} from '@reach/router'

const Logout = (props) => {
    //logs user out by deleting cookie and navigating to login page.
    const logout = () => {
        axios.post("http://localhost:8000/api/users/logout")
        .then((res) => {
            console.log(res.data);
            navigate("/");
        })
    }

    return (
        <Button className="mr-sm-2" variant="danger" onClick={logout}>Log Out</Button>
    )
}

export default Logout;