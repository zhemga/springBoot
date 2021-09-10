import React, { Component } from "react";
import axios from "axios";
import { Table, Form, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import CustomPagination from "../components/CustomPagination"

const rowsPerPage = 10;

export default class ControlRoles extends Component {
    state = {
        data: [],
        oldUrl: "",
        page: 1,
        roleName: ""
    };

    getBody = (rows) => {

        return (
            <Table>
                <thead className="thead-light">
                    <tr>
                        <th className="border-0">Id</th>
                        <th className="border-0">Name</th>
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

        let rows = this.state.data
            .slice(from, to).map((el) => {
                return (
                    <tr>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                        <td><Button className="btn btn-danger pt-0 pb-0" onClick={() => { this.deleteRole(el.id) }}>Delete</Button></td>
                    </tr>
                );
            });

        return this.getBody(rows);
    };

    createRole = () => {
        let data = { "name": this.state.roleName };
        axios
            .post("http://localhost:8080/api/roles/",
                data,
                {
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

    deleteRole = (id) => {
        axios
            .delete("http://localhost:8080/api/roles/" + id
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
            [event.target.name]: event.target.value
        });
    };

    paginationClick = (page) => {
        this.setState({
            page: page
        });
    };

    render() {
        const { roleName, data } = this.state;

        let totalRows = data.length;
        let totalPages = 0;
        if (totalRows % rowsPerPage == 0)
            totalPages = totalRows / rowsPerPage;
        else
            totalPages = parseInt(totalRows / rowsPerPage + 1);


        return (
            <main className="mt-4">
                <center>
                    <FontAwesomeIcon className="fa-10x text-primary" icon={faScroll} />
                    <h1 className="mt-2 text-primary">Control Roles</h1>
                </center>
                <Form onSubmit={this.createRole}>
                    <Form.Label>Create New Role</Form.Label>
                    <Form.Group className="mb-3 d-flex flex-row w-100">
                        <Form.Control autoComplete="off" type="text" name="roleName" value={roleName} onChange={this.credentialChange} required placeholder="Role Name" />
                        <Button className="ms-2" type="submit">Create</Button>
                    </Form.Group>
                </Form>
                <div className="card-body bg-white rounded border shadow mt-4 overflow-auto">
                    {this.getTable('http://localhost:8080/api/roles/')}
                </div>
                <CustomPagination totalPages={totalPages} withIcons className="mt-4" onChangeNumber={this.paginationClick} />
            </main>
        );
    };
};
