import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const DeleteButton = (props) => {
    const {id, afterDeleteHandler, deleteLabel, mongoLabel} = props;

    //delete handler for exporting. Is modular for all pages that need it through delete and mongo label.
    const deleteHandler = (e, id) => {
        e.preventDefault();
        axios.delete('http://localhost:8000/api/'+ mongoLabel + '/' + id)
            .then((res) => {
                console.log(res.data);
                afterDeleteHandler(id);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Button variant="danger" onClick={(e) => deleteHandler(e, id)}>{deleteLabel}</Button>
    )
}

export default DeleteButton;