import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import Navbaar from './Navbaar';

const UserList = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const getdata = async () => {

        const res = await fetch("/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setUserdata(data)
            console.log("get data");
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
    return (
        <>
            <Navbaar />
                <div className="mt-5">
                    <div className="container">
                        <div className="add-btn mt-5">
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