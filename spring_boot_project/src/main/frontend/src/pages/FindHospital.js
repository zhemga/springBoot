import React, { Component } from "react";
import axios from "axios";
import { Table, Form, InputGroup, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Routes } from "../routes";
import CustomPagination from "../components/CustomPagination"

const rowsPerPage = 10; 

export default class FindHospital extends Component {
    state = {
        data: [],
        oldUrl: "",
        request: "",
        page: 1
    };

    getBody = (rows) => {
        return (
            <Table>
                <thead className="thead-light">
                    <tr>
                        <th className="border-0">Id</th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Address</th>
                        <th className="border-0">Find on Map</th>
                        <th className="border-0">Show Medics</th>
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
                    // , {
                    //     headers: {
                    //         Authorization: "Bearer " + localStorage.getItem("jwtToken")
                    //     }
                    // }
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
        let from = (page - 1) * 10;
        let to = from + 10;

        if(to > this.state.data.length)
            to = this.state.data.length;

        let rows = this.state.data.slice(from, to).map((el) => {
            return (
                <tr>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.address}</td>
                    <td><a className="btn btn-primary pt-0 pb-0" href={"https://maps.google.com/?q=" + el.address}>Find</a></td>
                    <td><Button className="btn btn-primary pt-0 pb-0" onClick={() => { this.redirectToFindDoctor(el.name) }}>Show</Button></td>
                </tr>
            );
        });

        return this.getBody(rows);
    };

    redirectToFindDoctor = (name) => {
        this.props.history.push({
            pathname: Routes.FindDoctor.path,
            hospitalName: name,
        });
    };

    credentialChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    paginationClick = (page) => {
        console.log(page);
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
            <main>
                <center>
                    <FontAwesomeIcon className="fa-10x text-primary" icon={faHospital} />
                    <h1 className="mt-2 text-primary">Hospitals</h1>
                </center>
                <Form className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                        <Form.Control autoFocus autoComplete="off" type="text" name="request" placeholder="Search" value={request} onChange={this.credentialChange} />
                    </InputGroup>
                </Form>
                <div className="card-body bg-white rounded border shadow mt-4">
                    {this.getTable('http://localhost:8080/api/hospitals/' + request)}
                </div>
                <CustomPagination totalPages={totalPages} withIcons className="mt-4" onChangeNumber={this.paginationClick} />
            </main>
        );
    };
};
