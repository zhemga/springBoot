import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from '@themesberg/react-bootstrap';
import DatePicker from "./DatePicker"
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";

export default (props) => {
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const { doctorName, doctorEmail, hospitalName } = props;
    const history = useHistory();

    let time = moment().add(1, 'days').set({ h: 8, m: 0 }).format("DD/MM/YYYY HH:mm");

    const createAdmission = function () {
        let data = { dateTime: time, medic: { username: doctorEmail } };

        axios
            .post("http://localhost:8080/api/admissions/", data,
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

    const timeSelection = function (selectedTime) {
        time = selectedTime;
    };

    return (
        <React.Fragment>
            <Button variant="primary" className="pt-0 pb-0" onClick={() => setShowDefault(true)}>Make Admission</Button>

            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h5">Confirm Admission</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Form onSubmit={createAdmission}>
                    <Modal.Body>
                        <p className="h6">Admission Data:</p>
                        <span className="h6">Doctor: </span> {doctorName}<br />
                        <span className="h6">Email: </span> {doctorEmail}<br />
                        <span className="h6">Hospital: </span> {hospitalName}<br />
                        <p className="h6 mt-2">Select Date: </p>
                        <DatePicker onTimeSelection={timeSelection} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit">
                            Make
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

