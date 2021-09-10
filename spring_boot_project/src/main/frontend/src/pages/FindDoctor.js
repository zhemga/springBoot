import React, { Component } from "react";
import axios from "axios";
import { Table, Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse, faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomPagination from "../components/CustomPagination"
import AdmissionModal from "../components/AdmissionModal"

const rowsPerPage = 10;

export default class FindDoctor extends Component {

    state = {
        data: [],
        oldUrl: "",
        request: this.props.location.hospitalName != null ? this.props.location.hospitalName : "",
        page: 1
    };

    getBody = (rows) => {
        return (
            <Table>
                <thead className="thead-light">
                    <tr>
                        <th className="border-0">Id</th>
                        <th className="border-0">Name/Surname</th>
                        <th className="border-0">Email</th>
                        <th className="border-0">Specialities</th>
                        <th className="border-0">Hospital</th>
                        <th className="border-0">Make Admission</th>
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
            let specialities = el.roles.filter(x => { return x.name != "User" && x.name != "Doctor"; }).map(x => x.name).join(", ");
            return (
                <tr>
                    <td>{el.id}</td>
                    <td>{el.name + " " + el.surname}</td>
                    <td>{el.username}</td>
                    <td>{specialities}</td>
                    <td>{el.hospital.name}</td>
                    <td>
                       <AdmissionModal doctorName={el.name + " " + el.surname} doctorEmail={el.username} hospitalName={el.hospital.name}></AdmissionModal>
                    </td>
                </tr>
            );
        });

        return this.getBody(rows);
    };

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
                    <FontAwesomeIcon className="fa-10x text-primary" icon={faUserNurse} />
                    <h1 className="mt-2 text-primary">Doctors</h1>
                </center>
                <Form className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                        <Form.Control autoFocus autoComplete="off" type="text" name="request" placeholder="Search" value={request} onChange={this.credentialChange} />
                    </InputGroup>
                </Form>
                <div className="card-body bg-white rounded border shadow mt-4 overflow-auto">
                    {this.getTable('http://localhost:8080/api/doctors/' + request, 1)}
                </div>
                <CustomPagination currentPage={page} currentPage={page} totalPages={totalPages} withIcons className="mt-4" onChangeNumber={this.paginationClick} />
            </main>
        );
    };
};
