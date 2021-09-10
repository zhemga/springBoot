import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Alert } from '@themesberg/react-bootstrap';
import DatePicker from "./DatePicker"
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";

export default (props) => {
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const { hospitalId, hospitalName, hospitalAddress } = props;
    const history = useHistory();

    const editHospital = function () {
        let hospitalNewName = document.getElementById("hospitalName" + hospitalId).value;
        let hospitalNewAddress = document.getElementById("hospitalAddress" + hospitalId).value;

        let data = { id: hospitalId, name: hospitalNewName ? hospitalNewName : hospitalName, address: hospitalNewAddress ? hospitalNewAddress : hospitalAddress };

        axios
            .put("http://localhost:8080/api/hospitals/", data,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwtToken")
                    }
                }
            )
            .then((response) => {
                window.location.reload();
            })
            .catch(error => {
                if (error.response.status === 500)
                    history.push(Routes.ServerError.path);
                else if (error.response.status === 404)
                    history.push(Routes.NotFound.path);
            });
    };

    return (
        <React.Fragment>
            <Button variant="primary" className="pt-0 pb-0" onClick={() => setShowDefault(true)}>Edit</Button>

            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h5">Edit Hospital</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Form onSubmit={editHospital}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Control id={"hospitalName" + hospitalId} autoComplete="off" type="text" name="hospitalName" defaultValue={hospitalName} required placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control id={"hospitalAddress" + hospitalId} autoComplete="off" type="text" name="hospitalAddress" defaultValue={hospitalAddress} required placeholder="Address" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit">
                            Edit
                        </Button>
                        <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

