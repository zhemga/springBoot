import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Badge } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import CustomPagination from "../components/CustomPagination"

const rowsPerPage = 10;

export default class ControlAdmissions extends Component {
    state = {
        data: [],
        oldUrl: "",
        page: 1
    };

    getBody = (rows) => {

        return (
            <Table>
                <thead className="thead-light">
                    <tr>
                        <th className="border-0">Id</th>
                        <th className="border-0">Date</th>
                        <th className="border-0">Status</th>
                        <th className="border-0">User</th>
                        <th className="border-0">Medic</th>
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
            .sort((x, y) => {
                return (x.isHappened === y.isHappened) ? 0 : x.isHappened ? 1 : -1;
            })
            .sort((x, y) => {
                return (x.isCanceled === y.isCanceled) ? 0 : x.isCanceled ? 1 : -1;
            })
            .slice(from, to).map((el) => {
                return (
                    <tr>
                        <td>{el.id}</td>
                        <td>{el.dateTime}</td>
                        <td>{el.isHappened ? <Badge bg="success" text="dark" className="me-1">Is Happened</Badge> : el.isCanceled ? <Badge bg="danger" text="dark" className="me-1">Canceled</Badge> : <Badge bg="warning" text="dark" className="me-1">Not Happened</Badge>}</td>
                        <td>{el.user.username}</td>
                        <td>{el.medic.name + " " + el.medic.surname}</td>
                        <td><Button className="btn btn-danger pt-0 pb-0" onClick={() => { this.deleteAdmission(el.id) }}>Delete</Button></td>
                    </tr>
                );
            });

        return this.getBody(rows);
    };

    deleteAdmission = (id) => {
        axios
            .delete("http://localhost:8080/api/admissions/" + id
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
            page: 1
        });
    };

    paginationClick = (page) => {
        this.setState({
            page: page
        });
    };

    render() {
        const { request, data } = this.state;

        let totalRows = data.length;
        let totalPages = 0;
        if (totalRows % rowsPerPage == 0)
            totalPages = totalRows / rowsPerPage;
        else
            totalPages = parseInt(totalRows / rowsPerPage + 1);


        return (
            <main className="mt-4">
                <center>
                    <FontAwesomeIcon className="fa-10x text-primary" icon={faCalendarAlt} />
                    <h1 className="mt-2 text-primary">Control Admissions</h1>
                </center>
                <div className="card-body bg-white rounded border shadow mt-4 overflow-auto">
                    {this.getTable('http://localhost:8080/api/admissions/')}
                </div>
                <CustomPagination totalPages={totalPages} withIcons className="mt-4" onChangeNumber={this.paginationClick} />
            </main>
        );
    };
};
