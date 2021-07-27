import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import { Container, Card, Form, Row, Col, Button } from  'react-bootstrap';
import Navbar from '../../components/Navbar';
import {LoginContext} from '../../context/context';
import moment from 'moment'

const Profile = (props) => {
    const {id, setId} = useContext(LoginContext);
    const {idx} = props;
    const [plans, setPlans] = useState([])
    const [bday, setBday] = useState();
    const [errs, setErrs] = useState({});
    const [user, setUser] = useState({
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        training: "training",
        birthday: "birthday",
        height: "height",
        weight: "weight",
    });


    //updates form data
    const handleChange = (e) => {
        let newUser = { ...user};
        console.log(e.target.name)
        newUser[e.target.name] = e.target.value;
        setUser(newUser)
        console.log(user)
    }

    //gets user data to populate form
    useEffect(() => {
        axios.get('http://localhost:8000/api/user/get/' + idx)
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                setBday(moment(res.data.birthday)._i.substr(0,10));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [idx]);

    //updates user data in db
    const updateProfile = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/users/' + idx, user)
            .then((res) => {
                console.log(res);
                setId(idx)
                if(res.data.errors) {
                    setErrs(res.data.errors); 
                } else {
                    navigate('/main')
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //retrieves plans from db for form options
    useEffect(() => {
        axios.get('http://localhost:8000/api/plans')
            .then((res) => {
                console.log(res.data)
                setPlans(res.data)
            })
    }, [])

    return (
        <Container className='mainContainer'>
            <Navbar search={false}/>
            <Card border="dark" className="text-center">
                <Card.Header className="headers" style={{textAlign: "center", fontSize: "24px"}}>Edit Profile</Card.Header>
                <Card.Body  className="bodys">
                    <Form onSubmit={(e) => updateProfile(e)}>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>First Name:</Form.Label>
                                <Form.Control type="text" name="firstName" value={user.firstName ? user.firstName : ""} onChange={(e) => handleChange(e)} placeholder="Enter your first name" />
                                {errs.firstName ? <span className="error">{errs.firstName.message}</span> : null}
                            </Form.Group>
                            
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Last Name:</Form.Label>
                                <Form.Control type="text" name="lastName" value={user.lastName ? user.lastName : ""} onChange={(e) => handleChange(e)} placeholder="Enter your last name" />
                                {errs.lastName ? <span className="error">{errs.lastName.message}</span> : null}
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Email:</Form.Label>
                                <Form.Control type="text" name="email" value={user.email ? user.email : ""} onChange={(e) => handleChange(e)} placeholder="Enter your email" />
                                {errs.email ? <span className="error">{errs.email.message}</span> : null}
                            </Form.Group>
                        
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Birthday:</Form.Label>
                                <Form.Control type="date" name="birthday" value={user.birthday ? bday : ""} onChange={(e) => handleChange(e)}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Height (in inches):</Form.Label>
                                <Form.Control type="number" name="height" value={user.height ? user.height : 0} onChange={(e) => handleChange(e)} placeholder="Enter your height"/>
                            </Form.Group>
                        

                        
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={3}>Sport:</Form.Label>
                                <Form.Control 
                                    as="select"  
                                    name="training" 
                                    value={user.training ? user.training : 0} 
                                    onChange={(e) => handleChange(e)} 
                                    placeholder="Enter your preffered sport">
                                    <option value={0}>Please Select a plan</option>
                                    {
                                        plans.map((plan, idx) => {
                                            return(<option key={idx} value={plan._id}>{plan.name} ({plan.difficulty})</option>)
                                        })
                                    }
                                </Form.Control>


                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-6">
                                <Form.Label column sm={4}>Weight (in pounds):</Form.Label>
                                <Form.Control type="number" name="weight" value={user.weight ? user.weight : 0} onChange={(e) => handleChange(e)} placeholder="Enter your weight"/>
                            </Form.Group>
                        

                            {/* <Form.Group as={Col} className="mb-6">
                                <Form.Label column sm={3}>Difficulty</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="difficulty"
                                        value={user.difficulty}
                                        onChange={(e) => handleChange(e)}>
                                        <option>Select Difficulty</option>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                        <option value="olympic">Olympic</option>
                                    </Form.Control>
                                    { 
                                    errs.difficulty ? <span className="error">{errs.difficulty.message}</span> : null
                                    }
                            </Form.Group> */}
                        </Row>
                        <Button className="cancel_btn" onClick={(e) => navigate('/main')} >Cancel</Button>
                        <Button  style={{margin: "10px"}} type="submit" className="submit_btn">Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            
            
        </Container>
        
    )
}

export default Profile;