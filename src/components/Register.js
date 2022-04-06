import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import Navbaar from './Navbaar';

const Register = () => {

    const [inputVal, setInput] = useState({
        name: "",
        email: "",
        tech: "",
        password: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setInput((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addInputData = async (e) => {
        e.preventDefault();

        const { name, email, tech, password } = inputVal;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, tech, password
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert("error");
            console.log("error");
        } else {
            alert("data added");
            console.log("data added");
        }
    }
    return (
        <>
            <Navbaar />
            <div className="container">
                <LinkContainer to="/home">
                    <Button className="my-3" variant="primary">Home</Button>
                </LinkContainer>
                <Form className="my-4">
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <input type="text" className="form-control" value={inputVal.name} onChange={setdata} name="name" id="inpt_name" placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <input type="email" className="form-control" value={inputVal.email} onChange={setdata} name="email" id="inpt_email" placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Technology</Form.Label>
                        <input type="text" className="form-control" value={inputVal.tech} onChange={setdata} name="tech" id="inpt_tech" placeholder="Enter Tech" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <input className="form-control" type="number" value={inputVal.password} onChange={setdata} name="password" id="inpt_password" placeholder="Enter Password" />
                    </Form.Group>

                    <Button variant="primary" onClick={addInputData} type="submit">Submit</Button>
                </Form>
            </div>
        </>
    )
}

export default Register