import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import Navbaar from './Navbaar';

const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

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

    const { id } = useParams("");
    console.log(id);

    const getdata = async () => {
        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error");
        } else {
            setInput(data);
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const updateuser = async (e) => {

        const { name, email, tech, password } = inputVal;

        e.preventDefault();
        const res2 = await fetch(`/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, tech, password
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if (res2.status === 422 || !data2) {
            alert("fill the data");
        } else {
            alert("data updated");
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
                        <input className="form-control" type="text" value={inputVal.name} onChange={setdata} name="name" id="inpt_name" placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <input className="form-control" type="email" value={inputVal.email} onChange={setdata} name="email" id="inpt_email" placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Technology</Form.Label>
                        <input className="form-control" type="text" value={inputVal.tech} onChange={setdata} name="tech" id="inpt_tech" placeholder="Enter Tech" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <input className="form-control" type="number" value={inputVal.password} onChange={setdata} name="password" id="inpt_password" placeholder="Enter Password" />
                    </Form.Group>

                    <Button variant="primary" onClick={updateuser} type="submit">Submit</Button>
                </Form>
            </div>
        </>
    )
}

export default Edit