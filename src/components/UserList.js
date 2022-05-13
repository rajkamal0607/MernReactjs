import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom';
import Navbaar from './Navbaar';

const UserList = () => {

    const Navigate = useNavigate();

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
    const getdata = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserdata(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
            Navigate("/login");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {
        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            getdata();
        }
    }

    const myStyle = {
        backgroundColor: '#95D1CC',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto'
    }
    return (
        <>
            <Navbaar />
            <div style={myStyle}>
                <div className="container">
                    <div className="add-btn">
                        <LinkContainer to="/register">
                            <Button className="my-3" variant="primary">Add</Button>
                        </LinkContainer>
                    </div>

                    <Table striped bordered hover>
                        <thead className="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Technology</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{id + 1}</td>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.password}</td>
                                                <td>{element.tech}</td>
                                                <td>
                                                    <LinkContainer to={`/edit/${element._id}`}>
                                                        <Button className="mx-2" variant="primary">Edit</Button>
                                                    </LinkContainer>
                                                    <Button className="mx-2" onClick={() => deleteuser(element._id)} variant="primary">Delete</Button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default UserList