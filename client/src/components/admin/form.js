import React from 'react';
import {navigate} from '@reach/router';
import { Card, Form, Row, Col, Button } from  'react-bootstrap';

const ModularForm = (props) => {
    const {object, setObject, errors, handleSubmit, submitLabel, edit, linkid} = props


    //input function to load changes into form for submission.
    const inputChange = (e) => {
        let newObject = { ...object};
        console.log(e.target.name)
        newObject[e.target.name] = e.target.value;
        setObject(newObject)
        console.log(newObject)
    }

    return (
        <Card border="dark" className="modularForm">
            <h1>Modular Form Page</h1>
            <Card.Body>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Plan Name
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                name="name"
                                value={object.name ? object.name : ""}
                                onChange={(e) => inputChange(e)} />
                            {
                                errors.name ? <span className="error">{errors.name.message}</span> : null
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Difficulty
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                as="select"
                                name="difficulty"
                                value={object.difficulty ? object.difficulty : ""}
                                onChange={(e) => inputChange(e)}>
                                <option>Select Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                                <option value="olympic">Olympic</option>
                            </Form.Control>
                                { 
                                errors.difficulty ? <span className="error">{errors.difficulty.message}</span> : null
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={2}>
                        Duration
                    </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                as="select"
                                name="duration"
                                value={object.duration ? object.duration : ""}
                                onChange={(e) => inputChange(e)}>
                                <option>Select Duration</option>
                                <option value="42">6 weeks</option>
                                <option value="84">12 weeks</option>
                                <option value="126">18 weeks</option>
                                <option value="168">24 weeks</option>
                            </Form.Control>
                                {
                                    errors.description ? <span className="error">{errors.description.message}</span> :
                                    errors.email ? <span className="error">{errors.email.message}</span> : null
                                }
                        </Col>
                    </Form.Group>
                <Form.Group as={Row}>
                    {
                        edit ? <><Col sm={{span: 1, offset: 4}}>
                <Button variant="dark" style={{width: "150px"}} type="submit">{submitLabel}</Button>
                </Col>
                <Col sm={{span: 1, offset: 1}}>
                <Button variant="dark" style={{width: "150px"}} onClick={(e) => navigate('/admin/training/' + linkid + '/addworkout')}>Add Workout</Button>
                </Col></> : <><Col sm={{span: 1, offset: 5}}>
                <Button variant="dark" style={{width: "150px"}} type="submit">{submitLabel}</Button>
                </Col></>

                    }
                </Form.Group>
            </Form>
        </Card.Body>
    </Card>
    )
}

export default ModularForm;


