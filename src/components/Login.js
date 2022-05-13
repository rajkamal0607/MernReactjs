import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Navbaar from './Navbaar';
import { useNavigate } from 'react-router'

const Login = () => {

    const Navigate = useNavigate();

    const [user, setuser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setuser({
            ...user,
            [name]: value
        })
    }

    const userLogin = async (e) => {
        e.preventDefault();

        const { email, password } = user;

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert("error, Invalid Login Credentials");
            console.log("error, Invalid Login Credentials");
        } else {
            alert("Login Successful");
            console.log("Login Successful");
            Navigate("/");
        }
    };

    return (
        <>
            <Navbaar />
            <div className="container my-5">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <input className="form-control" type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <input className="form-control" type="number" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" onClick={userLogin} type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Login