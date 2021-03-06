import React, { Component } from "react";
import axios from "axios";
import { Table, Form, InputGroup, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomPagination from "../components/CustomPagination"
import MakeDoctorModal from "../components/MakeDoctorModal";

const rowsPerPage = 10;

export default class ControlUsers extends Component {
    state = {
        data: [],
        oldUrl: "",
        request: "",
        page: 1,
        userName: "",
        hospitalAddress: ""
    };

    getBody = (rows) => {
        return (
            <Table>
                <thead className="thead-light">
                    <tr>
                        <th className="border-0">Id</th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Roles</th>
                        <th className="border-0">Make Doctor</th>
                        <th className="border-0">Make User</th>
                        <th className="border-0">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

    getTable = (url) => {
        if (this.state.oldUrl != url) {
            axios
                .get(url
                    , {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwtToken")
                        }
                    }
                )
                .then((response) => {
                    this.setState(() => {
                        return {
                            data: response.data,
                            oldUrl: url
                        };
                    });
                })
                .catch((error) => {
                });
        }

        if (this.state.data.length == 0) {
            return (
                <center><h3 className="mt-3">Not Found!</h3></center>
            );
        }

        let page = this.state.page;
        let from = (page - 1) * rowsPerPage;
        let to = from + rowsPerPage;

        if (to > this.state.data.length)
            to = this.state.data.length;

        let rows = this.state.data.slice(from, to).map((el) => {
            return (
                <tr>
                    <td>{el.id}</td>
                    <td>{el.username}</td>
                    <td>{el.roles.map(x => x.name).join(", ")}</td>
                    <td><MakeDoctorModal disabledButton={el.roles.some(x => x.name === "Doctor" || x.name === "Admin")} userId={el.id} /> </td>
                    <td><Button disabled={!el.roles.some(x => x.name === "Doctor")} className="btn btn-primary pt-0 pb-0" onClick={() => { this.makeUser(el.id) }}>Make User</Button></td>
                    <td><Button disabled={el.roles.some(x => x.name === "Admin")} className="btn btn-danger pt-0 pb-0" onClick={() => { this.deleteUser(el.id) }}>Delete</Button></td>
                </tr>
            );
        });

        return this.getBody(rows);
    };

    makeUser = (id) => {
        axios
            .get("http://localhost:8080/api/makeUser/" + id
                , {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwtToken")
                    }
                }
            )
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
            });
    }

    deleteUser = (id) => {
        axios
            .delete("http://localhost:8080/api/users/" + id
                , {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwtToken")
                    }
                }
            )
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
            });
    }

    credentialChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.paginationClick(1);
    };

    paginationClick = (page) => {
        this.setState({
            page: page
        });
    };

    render() {
        const { request, data, page } = this.state;

        let totalRows = data.length;
        let totalPages = 0;
        if (totalRows % rowsPerPage == 0)
            totalPages = totalRows / rowsPerPage;
        else
            totalPages = parseInt(totalRows / rowsPerPage + 1);


        return (
            <main className="mt-4">
                <center>
                    <FontAwesomeIcon className="fa-10x text-primary" icon={faUser} />
                    <h1 className="mt-2 text-primary">Control Users</h1>
                </center>
                <Form className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                        <Form.Control autoFocus autoComplete="off" type="text" name="request" placeholder="Search" value={request} onChange={this.credentialChange} />
                    </InputGroup>
                </Form>
                <div className="card-body bg-white rounded border shadow mt-4 overflow-auto">
                    {this.getTable('http://localhost:8080/api/users/' + request)}
                </div>
                <CustomPagination currentPage={page} totalPages={totalPages} withIcons className="mt-4" onChangeNumber={this.paginationClick} />
            </main>
        );
    };
};
