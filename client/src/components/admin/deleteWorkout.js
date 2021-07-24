import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const DeleteWorkout = (props) => {
    const {id, workoutid, afterDeleteHandler} = props;

    //delete handler for exporting. Is modular for all pages that need it through delete and mongo label.
    const deleteHandler = (e, id, workoutid) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/plans/' + id + '/delete/' + workoutid)
            .then((res) => {
                console.log(res.data);
                afterDeleteHandler(workoutid);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Button variant="danger" onClick={(e) => deleteHandler(e, id, workoutid)}>Delete Workout</Button>
    )
}

export default DeleteWorkout;